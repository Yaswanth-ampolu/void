/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/


import { useAccessor, useActiveURI, useIsDark, useSettingsState } from '../util/services.js';

import '../styles.css';
import { PINNACLEAI_CTRL_K_ACTION_ID, PINNACLEAI_CTRL_L_ACTION_ID } from '../../../actionIDs.js';
import { Circle, MoreVertical } from 'lucide-react';
import { useEffect, useState } from 'react';

import { PinnacleAISelectionHelperProps } from '../../../../../../contrib/pinnacleai/browser/pinnacleaiSelectionHelperWidget.js';

// Define the constant directly
const PINNACLEAI_OPEN_SETTINGS_ACTION_ID = 'workbench.action.openPinnacleAISettings';


export const PinnacleAiSelectionHelperMain = (props: PinnacleAISelectionHelperProps) => {

  const isDark = useIsDark();

  return <div
    className={`pinnacleai-scope ${isDark ? "pinnacleai-dark" : ""}`}>
    
		<PinnacleAiSelectionHelper {...props} />
	</div>;
};



const PinnacleAiSelectionHelper = ({ rerenderKey }: PinnacleAISelectionHelperProps) => {


  const accessor = useAccessor();
  const keybindingService = accessor.get('IKeybindingService');
  const commandService = accessor.get('ICommandService');

  const ctrlLKeybind = keybindingService.lookupKeybinding(PINNACLEAI_CTRL_L_ACTION_ID);
  const ctrlKKeybind = keybindingService.lookupKeybinding(PINNACLEAI_CTRL_K_ACTION_ID);

  const dividerHTML = <div className="pinnacleai-w-[0.5px] pinnacleai-bg-pinnacleai-border-3"></div>;

  const [reactRerenderCount, setReactRerenderKey] = useState(rerenderKey);
  const [clickState, setClickState] = useState<'init' | 'clickedOption' | 'clickedMore'>('init');

  useEffect(() => {
    const disposable = commandService.onWillExecuteCommand((e) => {
      if (e.commandId === PINNACLEAI_CTRL_L_ACTION_ID || e.commandId === PINNACLEAI_CTRL_K_ACTION_ID) {
        setClickState('clickedOption');
      }
    });

    return () => {
      disposable.dispose();
    };
  }, [commandService, setClickState]);


  // rerender when the key changes
  if (reactRerenderCount !== rerenderKey) {
    setReactRerenderKey(rerenderKey);
    setClickState('init');
  }
  // useEffect(() => {
  // }, [rerenderKey, reactRerenderCount, setReactRerenderKey, setClickState])

  // if the user selected an option, close


  if (clickState === 'clickedOption') {
    return null;
  }

  const defaultHTML = <>
		{ctrlLKeybind &&
    <div
      className=" pinnacleai-flex pinnacleai-items-center pinnacleai-px-2 pinnacleai-py-1.5 pinnacleai-cursor-pointer "



      onClick={() => {
        commandService.executeCommand(PINNACLEAI_CTRL_L_ACTION_ID);
        setClickState('clickedOption');
      }}>
      
				<span>Add to Chat</span>
				<span className="pinnacleai-ml-1 pinnacleai-px-1 pinnacleai-rounded pinnacleai-bg-[var(--vscode-keybindingLabel-background)] pinnacleai-text-[var(--vscode-keybindingLabel-foreground)] pinnacleai-border pinnacleai-border-[var(--vscode-keybindingLabel-border)]">
					{ctrlLKeybind.getLabel()}
				</span>
			</div>
    }
		{ctrlLKeybind && ctrlKKeybind &&
    dividerHTML
    }
		{ctrlKKeybind &&
    <div
      className=" pinnacleai-flex pinnacleai-items-center pinnacleai-px-2 pinnacleai-py-1.5 pinnacleai-cursor-pointer "



      onClick={() => {
        commandService.executeCommand(PINNACLEAI_CTRL_K_ACTION_ID);
        setClickState('clickedOption');
      }}>
      
				<span className="pinnacleai-ml-1">Edit Inline</span>
				<span className="pinnacleai-ml-1 pinnacleai-px-1 pinnacleai-rounded pinnacleai-bg-[var(--vscode-keybindingLabel-background)] pinnacleai-text-[var(--vscode-keybindingLabel-foreground)] pinnacleai-border pinnacleai-border-[var(--vscode-keybindingLabel-border)]">
					{ctrlKKeybind.getLabel()}
				</span>
			</div>
    }

		{dividerHTML}

		<div
      className=" pinnacleai-flex pinnacleai-items-center pinnacleai-px-0.5 pinnacleai-cursor-pointer "



      onClick={() => {
        setClickState('clickedMore');
      }}>
      
			<MoreVertical className="pinnacleai-w-4" />
		</div>
	</>;


  const moreOptionsHTML = <>
		<div
      className=" pinnacleai-flex pinnacleai-items-center pinnacleai-px-2 pinnacleai-py-1.5 pinnacleai-cursor-pointer "



      onClick={() => {
        commandService.executeCommand(PINNACLEAI_OPEN_SETTINGS_ACTION_ID);
        setClickState('clickedOption');
      }}>
      
			Disable Suggestions?
		</div>

		{dividerHTML}

		<div
      className=" pinnacleai-flex pinnacleai-items-center pinnacleai-px-0.5 pinnacleai-cursor-pointer "



      onClick={() => {
        setClickState('init');
      }}>
      
			<MoreVertical className="pinnacleai-w-4" />
		</div>
	</>;

  return <div className=" pinnacleai-pointer-events-auto pinnacleai-select-none pinnacleai-z-[1000] pinnacleai-rounded-sm pinnacleai-shadow-md pinnacleai-flex pinnacleai-flex-nowrap pinnacleai-text-nowrap pinnacleai-border pinnacleai-border-pinnacleai-border-3 pinnacleai-bg-pinnacleai-bg-2 pinnacleai-transition-all pinnacleai-duration-200 ">





    
		{clickState === 'init' ? defaultHTML :
    clickState === 'clickedMore' ? moreOptionsHTML :
    <></>
    }
	</div>;
};