/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { defaultModelsOfProvider, defaultProviderSettings, ModelOverrides } from './modelCapabilities.js';
import { ToolApprovalType } from './toolsServiceTypes.js';
import { PinnacleAISettingsState } from './pinnacleaiSettingsService.js'


type UnionOfKeys<T> = T extends T ? keyof T : never;



export type ProviderName = keyof typeof defaultProviderSettings
export const providerNames = Object.keys(defaultProviderSettings) as ProviderName[]

export const localProviderNames = ['ollama', 'vLLM', 'lmStudio'] satisfies ProviderName[] // all local names
export const nonlocalProviderNames = providerNames.filter((name) => !(localProviderNames as string[]).includes(name)) // all non-local names

type CustomSettingName = UnionOfKeys<typeof defaultProviderSettings[ProviderName]>
type CustomProviderSettings<providerName extends ProviderName> = {
	[k in CustomSettingName]: k extends keyof typeof defaultProviderSettings[providerName] ? string : undefined
}
export const customSettingNamesOfProvider = (providerName: ProviderName) => {
	return Object.keys(defaultProviderSettings[providerName]) as CustomSettingName[]
}



export type PinnacleAIStatefulModelInfo = { // <-- STATEFUL
	modelName: string,
	type: 'default' | 'autodetected' | 'custom';
	isHidden: boolean, // whether or not the user is hiding it (switched off)
}



type CommonProviderSettings = {
	_didFillInProviderSettings: boolean | undefined, // undefined initially, computed when user types in all fields
	models: PinnacleAIStatefulModelInfo[],
}

export type SettingsAtProvider<providerName extends ProviderName> = CustomProviderSettings<providerName> & CommonProviderSettings

// part of state
export type SettingsOfProvider = {
	[providerName in ProviderName]: SettingsAtProvider<providerName>
}


export type SettingName = keyof SettingsAtProvider<ProviderName>

type DisplayInfoForProviderName = {
	title: string,
	desc?: string,
}

export const displayInfoOfProviderName = (providerName: ProviderName): DisplayInfoForProviderName => {
	if (providerName === 'anthropic') {
		return { title: 'Anthropic', }
	}
	else if (providerName === 'openAI') {
		return { title: 'OpenAI', }
	}
	else if (providerName === 'deepseek') {
		return { title: 'DeepSeek', }
	}
	else if (providerName === 'openRouter') {
		return { title: 'OpenRouter', }
	}
	else if (providerName === 'ollama') {
		return { title: 'Ollama', }
	}
	else if (providerName === 'vLLM') {
		return { title: 'vLLM', }
	}
	else if (providerName === 'liteLLM') {
		return { title: 'LiteLLM', }
	}
	else if (providerName === 'lmStudio') {
		return { title: 'LM Studio', }
	}
	else if (providerName === 'openAICompatible') {
		return { title: 'OpenAI-Compatible', }
	}
	else if (providerName === 'gemini') {
		return { title: 'Gemini', }
	}
	else if (providerName === 'groq') {
		return { title: 'Groq', }
	}
	else if (providerName === 'xAI') {
		return { title: 'Grok (xAI)', }
	}
	else if (providerName === 'mistral') {
		return { title: 'Mistral', }
	}
	else if (providerName === 'googleVertex') {
		return { title: 'Google Vertex AI', }
	}
	else if (providerName === 'microsoftAzure') {
		return { title: 'Microsoft Azure OpenAI', }
	}
	else if (providerName === 'awsBedrock') {
		return { title: 'AWS Bedrock', }
	}

	throw new Error(`descOfProviderName: Unknown provider name: "${providerName}"`)
}

export const subTextMdOfProviderName = (providerName: ProviderName): string => {

	if (providerName === 'anthropic') return 'Get your [API Key here](https://console.anthropic.com/settings/keys).'
	if (providerName === 'openAI') return 'Get your [API Key here](https://platform.openai.com/api-keys).'
	if (providerName === 'deepseek') return 'Get your [API Key here](https://platform.deepseek.com/api_keys).'
	if (providerName === 'openRouter') return 'Get your [API Key here](https://openrouter.ai/settings/keys). Read about [rate limits here](https://openrouter.ai/docs/api-reference/limits).'
	if (providerName === 'gemini') return 'Get your [API Key here](https://aistudio.google.com/apikey). Read about [rate limits here](https://ai.google.dev/gemini-api/docs/rate-limits#current-rate-limits).'
	if (providerName === 'groq') return 'Get your [API Key here](https://console.groq.com/keys).'
	if (providerName === 'xAI') return 'Get your [API Key here](https://console.x.ai).'
	if (providerName === 'mistral') return 'Get your [API Key here](https://console.mistral.ai/api-keys).'
	if (providerName === 'openAICompatible') return `Use any provider that's OpenAI-compatible (use this for llama.cpp and more).`
	if (providerName === 'googleVertex') return 'You must authenticate before using Vertex with PinnacleAI. Read more about endpoints [here](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/call-vertex-using-openai-library), and regions [here](https://cloud.google.com/vertex-ai/docs/general/locations#available-regions).'
	if (providerName === 'microsoftAzure') return 'Read more about endpoints [here](https://learn.microsoft.com/en-us/rest/api/aifoundry/model-inference/get-chat-completions/get-chat-completions?view=rest-aifoundry-model-inference-2024-05-01-preview&tabs=HTTP), and get your API key [here](https://learn.microsoft.com/en-us/azure/search/search-security-api-keys?tabs=rest-use%2Cportal-find%2Cportal-query#find-existing-keys).'
	if (providerName === 'awsBedrock') return 'Connect via a LiteLLM proxy or the AWS [Bedrock-Access-Gateway](https://github.com/aws-samples/bedrock-access-gateway). LiteLLM Bedrock setup docs are [here](https://docs.litellm.ai/docs/providers/bedrock).'
	if (providerName === 'ollama') return 'Read more about custom [Endpoints here](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-can-i-expose-ollama-on-my-network).'
	if (providerName === 'vLLM') return 'Read more about custom [Endpoints here](https://docs.vllm.ai/en/latest/getting_started/quickstart.html#openai-compatible-server).'
	if (providerName === 'lmStudio') return 'Read more about custom [Endpoints here](https://lmstudio.ai/docs/app/api/endpoints/openai).'
	if (providerName === 'liteLLM') return 'Read more about endpoints [here](https://docs.litellm.ai/docs/providers/openai_compatible).'

	throw new Error(`subTextMdOfProviderName: Unknown provider name: "${providerName}"`)
}

type DisplayInfo = {
	title: string;
	placeholder: string;
	isPasswordField?: boolean;
}
export const displayInfoOfSettingName = (providerName: ProviderName, settingName: SettingName): DisplayInfo => {
	if (settingName === 'apiKey') {
		return {
			title: 'API Key',

			// **Please follow this convention**:
			// The word "key..." here is a placeholder for the hash. For example, sk-ant-key... means the key will look like sk-ant-abcdefg123...
			placeholder: providerName === 'anthropic' ? 'sk-ant-key...' : // sk-ant-api03-key
				providerName === 'openAI' ? 'sk-proj-key...' :
					providerName === 'deepseek' ? 'sk-key...' :
						providerName === 'openRouter' ? 'sk-or-key...' : // sk-or-v1-key
							providerName === 'gemini' ? 'AIzaSy...' :
								providerName === 'groq' ? 'gsk_key...' :
									providerName === 'openAICompatible' ? 'sk-key...' :
										providerName === 'xAI' ? 'xai-key...' :
											providerName === 'mistral' ? 'api-key...' :
												providerName === 'googleVertex' ? 'AIzaSy...' :
													providerName === 'microsoftAzure' ? 'key-...' :
														providerName === 'awsBedrock' ? 'key-...' :
															'',

			isPasswordField: true,
		}
	}
	else if (settingName === 'endpoint') {
		return {
			title: providerName === 'ollama' ? 'Endpoint' :
				providerName === 'vLLM' ? 'Endpoint' :
					providerName === 'lmStudio' ? 'Endpoint' :
						providerName === 'openAICompatible' ? 'baseURL' : // (do not include /chat/completions)
							providerName === 'googleVertex' ? 'baseURL' :
								providerName === 'microsoftAzure' ? 'baseURL' :
									providerName === 'liteLLM' ? 'baseURL' :
										providerName === 'awsBedrock' ? 'Endpoint' :
											'(never)',

			placeholder: providerName === 'ollama' ? defaultProviderSettings.ollama.endpoint
				: providerName === 'vLLM' ? defaultProviderSettings.vLLM.endpoint
					: providerName === 'openAICompatible' ? 'https://my-website.com/v1'
						: providerName === 'lmStudio' ? defaultProviderSettings.lmStudio.endpoint
							: providerName === 'liteLLM' ? 'http://localhost:4000'
								: providerName === 'awsBedrock' ? 'http://localhost:4000/v1'
									: '(never)',


		}
	}
	else if (settingName === 'headersJSON') {
		return { title: 'Custom Headers', placeholder: '{ "X-Request-Id": "..." }' }
	}
	else if (settingName === 'region') {
		// vertex only
		return {
			title: 'Region',
			placeholder: providerName === 'googleVertex' ? defaultProviderSettings.googleVertex.region
				: providerName === 'awsBedrock'
					? defaultProviderSettings.awsBedrock.region
					: ''
		}
	}
	else if (settingName === 'azureApiVersion') {
		return { title: 'API Version', placeholder: defaultProviderSettings.microsoftAzure.azureApiVersion }
	}
	else if (settingName === 'azureDeploymentName') {
		return { title: 'Deployment Name', placeholder: defaultProviderSettings.microsoftAzure.azureDeploymentName }
	}
	else if (settingName === 'azureResourceName') {
		return { title: 'Resource Name', placeholder: defaultProviderSettings.microsoftAzure.azureResourceName }
	}
	else if (settingName === 'project') {
		return { title: 'Project', placeholder: defaultProviderSettings.googleVertex.project }
	}
	else if (settingName === 'model') {
		return { title: 'Model', placeholder: defaultProviderSettings.googleVertex.model }
	}
	else if (settingName === 'deploymentId') {
		return { title: 'Deployment ID', placeholder: defaultProviderSettings.awsBedrock.deploymentId }
	}
	else if (settingName === 'accessKeyId') {
		return { title: 'Access Key ID', placeholder: defaultProviderSettings.awsBedrock.accessKeyId }
	}
	else if (settingName === 'secretAccessKey') {
		return { title: 'Secret Access Key', placeholder: defaultProviderSettings.awsBedrock.secretAccessKey, isPasswordField: true }
	}
	else if (settingName === 'sessionToken') {
		return { title: 'Session Token', placeholder: defaultProviderSettings.awsBedrock.sessionToken, isPasswordField: true }
	}
	else if (settingName === 'models') {
		return { title: 'Models', placeholder: 'models' }
	}
	else if (settingName === '_didFillInProviderSettings') {
		return { title: 'Did Fill In Provider Settings', placeholder: 'didFillInProviderSettings' }
	}
	throw new Error(`displayInfoOfSettingName: Unknown setting name: "${settingName}"`)
}


export const featureNames = ['Chat', 'SCM', 'Autocomplete', 'Apply', 'Tools'] as const

const modelInfoOfDefaultModelNames = (defaultModelNames: string[]): { models: PinnacleAIStatefulModelInfo[] } => {
	return {
		models: defaultModelNames.map((modelName) => ({
			modelName,
			type: 'default',
			isHidden: false,
		}))
	}
}

export const defaultSettingsOfProvider: SettingsOfProvider = {
	anthropic: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.anthropic),
	},
	openAI: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.openAI),
	},
	deepseek: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.deepseek),
	},
	openRouter: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.openRouter),
	},
	gemini: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.gemini),
	},
	groq: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.groq),
	},
	ollama: {
		endpoint: defaultProviderSettings.ollama.endpoint,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames([]),
	},
	vLLM: {
		endpoint: defaultProviderSettings.vLLM.endpoint,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames([]),
	},
	liteLLM: {
		apiKey: '',
		endpoint: defaultProviderSettings.liteLLM.endpoint,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames([]),
	},
	lmStudio: {
		endpoint: defaultProviderSettings.lmStudio.endpoint,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames([]),
	},
	openAICompatible: {
		apiKey: '',
		endpoint: defaultProviderSettings.openAICompatible.endpoint,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames([]),
	},
	xAI: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.xAI),
	},
	mistral: {
		apiKey: '',
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.mistral),
	},
	googleVertex: {
		apiKey: '',
		endpoint: defaultProviderSettings.googleVertex.endpoint,
		region: defaultProviderSettings.googleVertex.region,
		project: defaultProviderSettings.googleVertex.project,
		model: defaultProviderSettings.googleVertex.model,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.googleVertex),
	},
	microsoftAzure: {
		apiKey: '',
		endpoint: defaultProviderSettings.microsoftAzure.endpoint,
		azureApiVersion: defaultProviderSettings.microsoftAzure.azureApiVersion,
		azureDeploymentName: defaultProviderSettings.microsoftAzure.azureDeploymentName,
		azureResourceName: defaultProviderSettings.microsoftAzure.azureResourceName,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.microsoftAzure),
	},
	awsBedrock: {
		apiKey: '',
		endpoint: defaultProviderSettings.awsBedrock.endpoint,
		region: defaultProviderSettings.awsBedrock.region,
		deploymentId: defaultProviderSettings.awsBedrock.deploymentId,
		accessKeyId: defaultProviderSettings.awsBedrock.accessKeyId,
		secretAccessKey: defaultProviderSettings.awsBedrock.secretAccessKey,
		sessionToken: defaultProviderSettings.awsBedrock.sessionToken,
		_didFillInProviderSettings: undefined,
		...modelInfoOfDefaultModelNames(defaultModelsOfProvider.awsBedrock),
	},
}


export type ModelSelection = { providerName: ProviderName, modelName: string }

export const modelSelectionsEqual = (m1: ModelSelection, m2: ModelSelection) => {
	return m1.providerName === m2.providerName && m1.modelName === m2.modelName
}


export type ModelSelectionOfFeature = Record<(typeof featureNames)[number], ModelSelection | null>
export type FeatureName = keyof ModelSelectionOfFeature

export const displayInfoOfFeatureName = (featureName: FeatureName) => {
	if (featureName === 'Chat') {
		return {
			title: 'Chat',
			desc: 'Used for chat (Ctrl+L)',
		}
	}
	else if (featureName === 'SCM') {
		return {
			title: 'SCM',
			desc: 'Used for generating commit messages',
		}
	}
	else if (featureName === 'Autocomplete') {
		return {
			title: 'Autocomplete',
			desc: 'Used for inline code completion',
		}
	}
	else if (featureName === 'Apply') {
		return {
			title: 'Apply',
			desc: 'Used for applying code edits (Ctrl+K)',
		}
	}
	else if (featureName === 'Tools') {
		return {
			title: 'Tools',
			desc: 'Used for tools',
		}
	}
	throw new Error(`displayInfoOfFeatureName: Unknown feature name: "${featureName}"`)
}

export const refreshableProviderNames = ['ollama', 'vLLM', 'lmStudio', 'openAICompatible', 'liteLLM'] as const

export type RefreshableProviderName = typeof refreshableProviderNames[number]

export const isRefreshableProviderName = (providerName: ProviderName): providerName is RefreshableProviderName => {
	return refreshableProviderNames.includes(providerName as RefreshableProviderName)
}


export const isProviderNameDisabled = (providerName: ProviderName, settingsState: PinnacleAISettingsState) => {
	const settings = settingsState.settingsOfProvider[providerName]
	if (!settings) return true

	// disabled if no models
	return settings.models.filter(m => !m.isHidden).length === 0
}

export const isFeatureNameDisabled = (featureName: FeatureName, settingsState: PinnacleAISettingsState) => {
	const modelSelection = settingsState.modelSelectionOfFeature[featureName]
	if (!modelSelection) return true

	const { providerName, modelName } = modelSelection

	// disabled if provider is disabled
	if (isProviderNameDisabled(providerName, settingsState)) return true

	// disabled if model is hidden
	const settings = settingsState.settingsOfProvider[providerName]
	if (!settings) return true

	const model = settings.models.find(m => m.modelName === modelName)
	if (!model) return true

	return model.isHidden
}


export type ChatMode = 'agent' | 'gather' | 'normal'


export type GlobalSettings = {
	autoRefreshModels: boolean;
	aiInstructions: string;
	enableAutocomplete: boolean;
	syncApplyToChat: boolean;
	syncSCMToChat: boolean;
	enableFastApply: boolean;
	chatMode: ChatMode;
	autoApprove: { [approvalType in ToolApprovalType]?: boolean };
	showInlineSuggestions: boolean;
	includeToolLintErrors: boolean;
	isOnboardingComplete: boolean;
	disableSystemMessage: boolean;
	autoAcceptLLMChanges: boolean;
}

export const defaultGlobalSettings: GlobalSettings = {
	autoRefreshModels: true,
	aiInstructions: '',
	enableAutocomplete: true,
	syncApplyToChat: true,
	syncSCMToChat: true,
	enableFastApply: false,
	chatMode: 'agent',
	autoApprove: {},
	showInlineSuggestions: true,
	includeToolLintErrors: false,
	isOnboardingComplete: false,
	disableSystemMessage: false,
	autoAcceptLLMChanges: false,
}

export type GlobalSettingName = keyof GlobalSettings

export const displayInfoOfGlobalSettingName = (settingName: GlobalSettingName) => {
	if (settingName === 'aiInstructions') {
		return {
			title: 'AI Instructions',
			desc: 'Custom instructions to add to every chat',
		}
	}
	throw new Error(`displayInfoOfGlobalSettingName: Unknown setting name: "${settingName}"`)
}

export type ModelSelectionOptions = {
	reasoningEnabled?: boolean;
	reasoningBudget?: number;
	reasoningEffort?: string;
}

export const defaultModelSelectionOptions: ModelSelectionOptions = {}

export type OptionsOfModelSelection = {
	[featureName in FeatureName]: Partial<{
		[providerName in ProviderName]: {
			[modelName: string]: ModelSelectionOptions | undefined
		}
	}>
}

export const defaultOptionsOfModelSelection: OptionsOfModelSelection = {
	Chat: {},
	SCM: {},
	Autocomplete: {},
	Apply: {},
	Tools: {},
}

export type OverridesOfModel = {
	[providerName in ProviderName]: {
		[modelName: string]: Partial<ModelOverrides> | undefined
	}
}

export const defaultOverridesOfModel: OverridesOfModel = {
	anthropic: {},
	openAI: {},
	deepseek: {},
	openRouter: {},
	gemini: {},
	groq: {},
	ollama: {},
	vLLM: {},
	liteLLM: {},
	lmStudio: {},
	openAICompatible: {},
	xAI: {},
	mistral: {},
	googleVertex: {},
	microsoftAzure: {},
	awsBedrock: {},
}

export interface MCPUserStateOfName {
	[serverName: string]: MCPUserState | undefined;
}

export interface MCPUserState {
	isOn: boolean;
} 