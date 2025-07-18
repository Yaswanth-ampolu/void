/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { ProxyChannel } from '../../../../base/parts/ipc/common/ipc.js';
import { registerSingleton, InstantiationType } from '../../../../platform/instantiation/common/extensions.js';
import { createDecorator } from '../../../../platform/instantiation/common/instantiation.js';
import { IMainProcessService } from '../../../../platform/ipc/common/mainProcessService.js';
import { PinnacleAICheckUpdateRespose } from './pinnacleaiUpdateServiceTypes.js';



export interface IPinnacleAIUpdateService {
	readonly _serviceBrand: undefined;
	check: (explicit: boolean) => Promise<PinnacleAICheckUpdateRespose>;
}


export const IPinnacleAIUpdateService = createDecorator<IPinnacleAIUpdateService>('PinnacleAIUpdateService');


// implemented by calling channel
export class PinnacleAIUpdateService implements IPinnacleAIUpdateService {

	readonly _serviceBrand: undefined;
	private readonly pinnacleaiUpdateService: IPinnacleAIUpdateService;

	constructor(
		@IMainProcessService mainProcessService: IMainProcessService, // (only usable on client side)
	) {
		// creates an IPC proxy to use metricsMainService.ts
		this.pinnacleaiUpdateService = ProxyChannel.toService<IPinnacleAIUpdateService>(mainProcessService.getChannel('pinnacleai-channel-update'));
	}


	// anything transmitted over a channel must be async even if it looks like it doesn't have to be
	check: IPinnacleAIUpdateService['check'] = async (explicit) => {
		const res = await this.pinnacleaiUpdateService.check(explicit)
		return res
	}
}

registerSingleton(IPinnacleAIUpdateService, PinnacleAIUpdateService, InstantiationType.Eager); 