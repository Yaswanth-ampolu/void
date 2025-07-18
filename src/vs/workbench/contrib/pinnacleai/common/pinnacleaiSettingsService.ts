/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { Emitter, Event } from '../../../../base/common/event.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import { deepClone } from '../../../../base/common/objects.js';
import { IEncryptionService } from '../../../../platform/encryption/common/encryptionService.js';
import { registerSingleton, InstantiationType } from '../../../../platform/instantiation/common/extensions.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';

import { defaultProviderSettings, getModelCapabilities, ModelOverrides } from './modelCapabilities.js';
import { PINNACLEAI_SETTINGS_STORAGE_KEY } from './storageKeys.js';
import { defaultSettingsOfProvider, FeatureName, ProviderName, ModelSelectionOfFeature, SettingsOfProvider, SettingName, providerNames, ModelSelection, modelSelectionsEqual, featureNames, PinnacleAIStatefulModelInfo, GlobalSettings, GlobalSettingName, defaultGlobalSettings, ModelSelectionOptions, OptionsOfModelSelection, ChatMode, OverridesOfModel, defaultOverridesOfModel, MCPUserStateOfName as MCPUserStateOfName, MCPUserState } from './pinnacleaiSettingsTypes.js';


// name is the name in the dropdown
export type ModelOption = { name: string, selection: ModelSelection }



type SetSettingOfProviderFn = <S extends SettingName>(
	providerName: ProviderName,
	settingName: S,
	newVal: SettingsOfProvider[ProviderName][S extends keyof SettingsOfProvider[ProviderName] ? S : never],
) => Promise<void>;

type SetModelSelectionOfFeatureFn = <K extends FeatureName>(
	featureName: K,
	newVal: ModelSelectionOfFeature[K],
) => Promise<void>;

type SetGlobalSettingFn = <T extends GlobalSettingName>(settingName: T, newVal: GlobalSettings[T]) => void;

type SetOptionsOfModelSelection = (featureName: FeatureName, providerName: ProviderName, modelName: string, newVal: Partial<ModelSelectionOptions>) => void


export type PinnacleSettingsState = {
	readonly settingsOfProvider: SettingsOfProvider; // optionsOfProvider
	readonly modelSelectionOfFeature: ModelSelectionOfFeature; // stateOfFeature
	readonly optionsOfModelSelection: OptionsOfModelSelection;
	readonly overridesOfModel: OverridesOfModel;
	readonly globalSettings: GlobalSettings;
	readonly mcpUserStateOfName: MCPUserStateOfName; // user-controlled state of MCP servers

	readonly _modelOptions: ModelOption[] // computed based on the two above items
}

// type RealPinnacleSettings = Exclude<keyof PinnacleSettingsState, '_modelOptions'>
// type EventProp<T extends RealPinnacleSettings = RealPinnacleSettings> = T extends 'globalSettings' ? [T, keyof PinnacleSettingsState[T]] : T | 'all'


export interface IPinnacleSettingsService {
	readonly _serviceBrand: undefined;
	readonly state: PinnacleSettingsState; // in order to play nicely with react, you should immutably change state
	readonly waitForInitState: Promise<void>;

	onDidChangeState: Event<void>;

	setSettingOfProvider: SetSettingOfProviderFn;
	setModelSelectionOfFeature: SetModelSelectionOfFeatureFn;
	setOptionsOfModelSelection: SetOptionsOfModelSelection;
	setGlobalSetting: SetGlobalSettingFn;
	// setMCPServerStates: (newStates: MCPServerStates) => Promise<void>;

	// setting to undefined CLEARS it, unlike others:
	setOverridesOfModel(providerName: ProviderName, modelName: string, overrides: Partial<ModelOverrides> | undefined): Promise<void>;

	dangerousSetState(newState: PinnacleSettingsState): Promise<void>;
	resetState(): Promise<void>;

	setAutodetectedModels(providerName: ProviderName, modelNames: string[], logging: object): void;
	toggleModelHidden(providerName: ProviderName, modelName: string): void;
	addModel(providerName: ProviderName, modelName: string): void;
	deleteModel(providerName: ProviderName, modelName: string): boolean;

	addMCPUserStateOfNames(userStateOfName: MCPUserStateOfName): Promise<void>;
	removeMCPUserStateOfNames(serverNames: string[]): Promise<void>;
	setMCPServerState(serverName: string, state: MCPUserState): Promise<void>;
}




const _modelsWithSwappedInNewModels = (options: { existingModels: PinnacleAIStatefulModelInfo[], models: string[], type: 'autodetected' | 'default' }) => {
	const { existingModels, models, type } = options

	const existingModelsMap: Record<string, PinnacleAIStatefulModelInfo> = {}
	for (const existingModel of existingModels) {
		existingModelsMap[existingModel.modelName] = existingModel
	}

	const newDefaultModels = models.map((modelName, i) => ({ modelName, type, isHidden: !!existingModelsMap[modelName]?.isHidden, }))

	return [
		...newDefaultModels, // swap out all the models of this type for the new models of this type
		...existingModels.filter(m => {
			const keep = m.type !== type
			return keep
		})
	]
}


export const modelFilterOfFeatureName: {
	[featureName in FeatureName]: {
		filter: (
			o: ModelSelection,
			opts: { chatMode: ChatMode, overridesOfModel: OverridesOfModel }
		) => boolean;
		emptyMessage: null | { message: string, priority: 'always' | 'fallback' }
	} } = {
	'Autocomplete': { filter: (o, opts) => getModelCapabilities(o.providerName, o.modelName, opts.overridesOfModel).supportsFIM, emptyMessage: { message: 'No models support FIM', priority: 'always' } },
	'Chat': { filter: o => true, emptyMessage: null, },
	'Ctrl+K': { filter: o => true, emptyMessage: null, },
	'Apply': { filter: o => true, emptyMessage: null, },
	'SCM': { filter: o => true, emptyMessage: null, },
}


const _stateWithMergedDefaultModels = (state: PinnacleSettingsState): PinnacleSettingsState => {
	let newSettingsOfProvider = state.settingsOfProvider

	// recompute default models
	for (const providerName of providerNames) {
		const defaultModels = defaultSettingsOfProvider[providerName]?.models ?? []
		const currentModels = newSettingsOfProvider[providerName]?.models ?? []
		const defaultModelNames = defaultModels.map(m => m.modelName)
		const newModels = _modelsWithSwappedInNewModels({ existingModels: currentModels, models: defaultModelNames, type: 'default' })
		newSettingsOfProvider = {
			...newSettingsOfProvider,
			[providerName]: {
				...newSettingsOfProvider[providerName],
				models: newModels,
			},
		}
	}
	return {
		...state,
		settingsOfProvider: newSettingsOfProvider,
	}
}

const _validatedModelState = (state: Omit<PinnacleSettingsState, '_modelOptions'>): PinnacleSettingsState => {

	let newSettingsOfProvider = state.settingsOfProvider

	// recompute _didFillInProviderSettings
	for (const providerName of providerNames) {
		const settingsAtProvider = newSettingsOfProvider[providerName]

		const didFillInProviderSettings = Object.keys(defaultProviderSettings[providerName]).every(key => !!settingsAtProvider[key as keyof typeof settingsAtProvider])

		if (didFillInProviderSettings === settingsAtProvider._didFillInProviderSettings) continue

		newSettingsOfProvider = {
			...newSettingsOfProvider,
			[providerName]: {
				...settingsAtProvider,
				_didFillInProviderSettings: didFillInProviderSettings,
			},
		}
	}

	// update model options
	let newModelOptions: ModelOption[] = []
	for (const providerName of providerNames) {
		const providerTitle = providerName // displayInfoOfProviderName(providerName).title.toLowerCase() // looks better lowercase, best practice to not use raw providerName
		if (!newSettingsOfProvider[providerName]._didFillInProviderSettings) continue // if disabled, don't display model options
		for (const { modelName, isHidden } of newSettingsOfProvider[providerName].models) {
			if (isHidden) continue
			newModelOptions.push({ name: `${modelName} (${providerTitle})`, selection: { providerName, modelName } })
		}
	}

	// now that model options are updated, make sure the selection is valid
	// if the user-selected model is no longer in the list, update the selection for each feature that needs it to something relevant (the 0th model available, or null)
	let newModelSelectionOfFeature = state.modelSelectionOfFeature
	for (const featureName of featureNames) {

		const { filter } = modelFilterOfFeatureName[featureName]
		const filterOpts = { chatMode: state.globalSettings.chatMode, overridesOfModel: state.overridesOfModel }
		const modelOptionsForThisFeature = newModelOptions.filter((o) => filter(o.selection, filterOpts))

		const modelSelectionAtFeature = newModelSelectionOfFeature[featureName]
		const selnIdx = modelSelectionAtFeature === null ? -1 : modelOptionsForThisFeature.findIndex(m => modelSelectionsEqual(m.selection, modelSelectionAtFeature))

		if (selnIdx !== -1) continue // no longer in list, so update to 1st in list or null

		newModelSelectionOfFeature = {
			...newModelSelectionOfFeature,
			[featureName]: modelOptionsForThisFeature.length === 0 ? null : modelOptionsForThisFeature[0].selection
		}
	}


	const newState = {
		...state,
		settingsOfProvider: newSettingsOfProvider,
		modelSelectionOfFeature: newModelSelectionOfFeature,
		overridesOfModel: state.overridesOfModel,
		_modelOptions: newModelOptions,
	} satisfies PinnacleSettingsState

	return newState
}





const defaultState = () => {
	const d: PinnacleSettingsState = {
		settingsOfProvider: deepClone(defaultSettingsOfProvider),
		modelSelectionOfFeature: { 'Chat': null, 'Ctrl+K': null, 'Autocomplete': null, 'Apply': null, 'SCM': null },
		globalSettings: deepClone(defaultGlobalSettings),
		optionsOfModelSelection: { 'Chat': {}, 'Ctrl+K': {}, 'Autocomplete': {}, 'Apply': {}, 'SCM': {} },
		overridesOfModel: deepClone(defaultOverridesOfModel),
		_modelOptions: [], // computed later
		mcpUserStateOfName: {},
	}
	return d
}


export const IPinnacleSettingsService = createDecorator<IPinnacleSettingsService>('PinnacleSettingsService');
class PinnacleSettingsService extends Disposable implements IPinnacleSettingsService {
	_serviceBrand: undefined;

	private readonly _onDidChangeState = new Emitter<void>();
	readonly onDidChangeState: Event<void> = this._onDidChangeState.event; // this is primarily for use in react, so react can listen + update on state changes

	state: PinnacleSettingsState;

	private readonly _resolver: () => void
	waitForInitState: Promise<void> // await this if you need a valid state initially

	constructor(
		@IStorageService private readonly _storageService: IStorageService,
		@IEncryptionService private readonly _encryptionService: IEncryptionService,
		// could have used this, but it's clearer the way it is (+ slightly different eg StorageTarget.USER)
		// @ISecretStorageService private readonly _secretStorageService: ISecretStorageService,
	) {
		super()

		// at the start, we haven't read the partial config yet, but we need to set state to something
		this.state = defaultState()

		// this is resolved once we've read the config
		let resolver: () => void;
		this.waitForInitState = new Promise<void>(resolve => {
			resolver = resolve
		})
		this._resolver = resolver!

		this.readAndInitializeState()
	}

	dangerousSetState = async (newState: PinnacleSettingsState) => {
		this.state = newState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	async resetState() {
		this.state = defaultState()
		await this._storeState()
		this._onDidChangeState.fire()
	}

	async readAndInitializeState() {
		let readS: PinnacleSettingsState
		try {
			readS = await this._readState()
		} catch (e) {
			console.error('Error reading state', e)
			readS = defaultState()
		}

		// merge in default models
		readS = _stateWithMergedDefaultModels(readS)

		// validate model state
		readS = _validatedModelState(readS)

		// set state
		this.state = readS
		this._resolver()
		this._onDidChangeState.fire()
	}

	private async _readState(): Promise<PinnacleSettingsState> {
		const stateStr = this._storageService.get(PINNACLEAI_SETTINGS_STORAGE_KEY, StorageScope.APPLICATION)
		if (!stateStr) {
			return defaultState()
		}
		try {
			const state = JSON.parse(stateStr)
			return state
		} catch (e) {
			console.error('Error parsing state', e)
			return defaultState()
		}
	}

	private async _storeState() {
		this._storageService.store(PINNACLEAI_SETTINGS_STORAGE_KEY, JSON.stringify(this.state), StorageScope.APPLICATION, StorageTarget.USER)
	}

	setSettingOfProvider: SetSettingOfProviderFn = async (providerName, settingName, newVal) => {
		// if we're setting an API key, encrypt it
		if (settingName === 'apiKey' && typeof newVal === 'string') {
			newVal = await this._encryptionService.encrypt(newVal) as any
		}

		const newState: PinnacleSettingsState = {
			...this.state,
			settingsOfProvider: {
				...this.state.settingsOfProvider,
				[providerName]: {
					...this.state.settingsOfProvider[providerName],
					[settingName]: newVal,
				},
			},
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	private _onUpdate_syncApplyToChat() {
		// if the Apply feature is set to a model, make sure the Chat feature is set to the same model
		if (this.state.modelSelectionOfFeature['Apply'] !== null) {
			this.setModelSelectionOfFeature('Chat', this.state.modelSelectionOfFeature['Apply'])
		}
	}

	private _onUpdate_syncSCMToChat() {
		// if the SCM feature is set to a model, make sure the Chat feature is set to the same model
		if (this.state.modelSelectionOfFeature['SCM'] !== null) {
			this.setModelSelectionOfFeature('Chat', this.state.modelSelectionOfFeature['SCM'])
		}
	}

	setGlobalSetting: SetGlobalSettingFn = async (settingName, newVal) => {
		const newState: PinnacleSettingsState = {
			...this.state,
			globalSettings: {
				...this.state.globalSettings,
				[settingName]: newVal,
			},
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	setModelSelectionOfFeature: SetModelSelectionOfFeatureFn = async (featureName, newVal) => {
		const newState: PinnacleSettingsState = {
			...this.state,
			modelSelectionOfFeature: {
				...this.state.modelSelectionOfFeature,
				[featureName]: newVal,
			},
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()

		// if we're setting the Apply feature, make sure the Chat feature is set to the same model
		if (featureName === 'Apply') {
			this._onUpdate_syncApplyToChat()
		}
		// if we're setting the SCM feature, make sure the Chat feature is set to the same model
		if (featureName === 'SCM') {
			this._onUpdate_syncSCMToChat()
		}
	}

	setOptionsOfModelSelection = async (featureName: FeatureName, providerName: ProviderName, modelName: string, newVal: Partial<ModelSelectionOptions>) => {
		const currentOptions = this.state.optionsOfModelSelection[featureName] as any
		const modelKey = `${providerName}/${modelName}`

		const newState: PinnacleSettingsState = {
			...this.state,
			optionsOfModelSelection: {
				...this.state.optionsOfModelSelection,
				[featureName]: {
					...currentOptions,
					[modelKey]: {
						...(currentOptions[modelKey] || {}),
						...newVal,
					},
				},
			},
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	setOverridesOfModel = async (providerName: ProviderName, modelName: string, overrides: Partial<ModelOverrides> | undefined) => {
		const newState: PinnacleSettingsState = {
			...this.state,
			overridesOfModel: {
				...this.state.overridesOfModel,
				[providerName]: {
					...this.state.overridesOfModel[providerName],
				},
			},
		}

		// if overrides is undefined, delete the key
		if (overrides === undefined) {
			delete newState.overridesOfModel[providerName][modelName]
		} else {
			newState.overridesOfModel[providerName][modelName] = {
				...newState.overridesOfModel[providerName][modelName],
				...overrides,
			}
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	setAutodetectedModels(providerName: ProviderName, autodetectedModelNames: string[], logging: object) {
		const currentModels = this.state.settingsOfProvider[providerName]?.models ?? []
		const newModels = _modelsWithSwappedInNewModels({ existingModels: currentModels, models: autodetectedModelNames, type: 'autodetected' })

		const newSettingsOfProvider = {
			...this.state.settingsOfProvider,
			[providerName]: {
				...this.state.settingsOfProvider[providerName],
				models: newModels,
			},
		}

		const newState = _validatedModelState({
			...this.state,
			settingsOfProvider: newSettingsOfProvider,
		})

		this.state = newState
		this._storeState()
		this._onDidChangeState.fire()
	}

	toggleModelHidden(providerName: ProviderName, modelName: string) {
		const currentModels = this.state.settingsOfProvider[providerName]?.models ?? []
		const newModels = currentModels.map(m => {
			if (m.modelName === modelName) {
				return { ...m, isHidden: !m.isHidden }
			}
			return m
		})

		const newSettingsOfProvider = {
			...this.state.settingsOfProvider,
			[providerName]: {
				...this.state.settingsOfProvider[providerName],
				models: newModels,
			},
		}

		const newState = _validatedModelState({
			...this.state,
			settingsOfProvider: newSettingsOfProvider,
		})

		this.state = newState
		this._storeState()
		this._onDidChangeState.fire()
	}

	addModel(providerName: ProviderName, modelName: string) {
		const currentModels = this.state.settingsOfProvider[providerName]?.models ?? []
		const newModels = [
			...currentModels,
			{ modelName, type: 'user', isHidden: false },
		]

		const newSettingsOfProvider = {
			...this.state.settingsOfProvider,
			[providerName]: {
				...this.state.settingsOfProvider[providerName],
				models: newModels,
			},
		}

		const newState = _validatedModelState({
			...this.state,
			settingsOfProvider: newSettingsOfProvider,
		})

		this.state = newState
		this._storeState()
		this._onDidChangeState.fire()
	}

	deleteModel(providerName: ProviderName, modelName: string): boolean {
		const currentModels = this.state.settingsOfProvider[providerName]?.models ?? []
		const modelToDelete = currentModels.find(m => m.modelName === modelName)
		if (!modelToDelete) return false
		if (modelToDelete.type !== 'custom') return false

		const newModels = currentModels.filter(m => m.modelName !== modelName)

		const newSettingsOfProvider = {
			...this.state.settingsOfProvider,
			[providerName]: {
				...this.state.settingsOfProvider[providerName],
				models: newModels,
			},
		}

		const newState = _validatedModelState({
			...this.state,
			settingsOfProvider: newSettingsOfProvider,
		})

		this.state = newState
		this._storeState()
		this._onDidChangeState.fire()
		return true
	}

	private _setMCPUserStateOfName = async (newStates: MCPUserStateOfName) => {
		const newState: PinnacleSettingsState = {
			...this.state,
			mcpUserStateOfName: newStates,
		}

		// validate model state
		const validatedState = _validatedModelState(newState)

		// set state
		this.state = validatedState
		await this._storeState()
		this._onDidChangeState.fire()
	}

	addMCPUserStateOfNames = async (newMCPStates: MCPUserStateOfName) => {
		const newStates = {
			...this.state.mcpUserStateOfName,
			...newMCPStates,
		}

		await this._setMCPUserStateOfName(newStates)
	}

	removeMCPUserStateOfNames = async (serverNames: string[]) => {
		const newStates = { ...this.state.mcpUserStateOfName }
		for (const serverName of serverNames) {
			delete newStates[serverName]
		}

		await this._setMCPUserStateOfName(newStates)
	}

	setMCPServerState = async (serverName: string, state: MCPUserState) => {
		const newStates = {
			...this.state.mcpUserStateOfName,
			[serverName]: state,
		}

		await this._setMCPUserStateOfName(newStates)
	}
}

registerSingleton(IPinnacleSettingsService, PinnacleSettingsService, InstantiationType.Eager);
