# PinnacleAI Rebranding Tracker

This document tracks the progress of rebranding files from void to pinnacleai.

## Browser Directory

| File | Status | Notes |
|------|--------|-------|
| actionIDs.ts | ✅ | Already rebranded |
| aiRegexService.ts | ✅ | Already rebranded |
| autocompleteService.ts | ✅ | Already rebranded |
| chatThreadService.ts | ✅ | Already rebranded |
| contextGatheringService.ts | ✅ | Already rebranded |
| convertToLLMMessageService.ts | ✅ | Already rebranded |
| convertToLLMMessageWorkbenchContrib.ts | ✅ | Already rebranded |
| editCodeService.ts | ✅ | Already rebranded |
| editCodeServiceInterface.ts | ✅ | Already rebranded |
| extensionTransferService.ts | ✅ | Already rebranded |
| extensionTransferTypes.ts | ✅ | Already rebranded |
| fileService.ts | ✅ | Already rebranded |
| metricsPollService.ts | ✅ | Already rebranded |
| miscWokrbenchContrib.ts | ✅ | Already rebranded |
| pinnacleai.contribution.ts | ✅ | Created from void.contribution.ts |
| pinnacleaiCommandBarService.ts | ✅ | Created from voidCommandBarService.ts |
| pinnacleaiOnboardingService.ts | ✅ | Created from voidOnboardingService.ts |
| pinnacleaiSCMService.ts | ✅ | Created from voidSCMService.ts |
| pinnacleaiSelectionHelperWidget.ts | ✅ | Created from voidSelectionHelperWidget.ts |
| pinnacleaiSettingsPane.ts | ✅ | Created from voidSettingsPane.ts |
| pinnacleaiUpdateActions.ts | ✅ | Created from voidUpdateActions.ts |
| quickEditActions.ts | ✅ | Already rebranded |
| sidebarActions.ts | ✅ | Already rebranded |
| sidebarPane.ts | ✅ | Created from sidebarPane.ts |
| terminalToolService.ts | ✅ | Created from terminalToolService.ts |
| toolsService.ts | ✅ | Created from toolsService.ts |
| tooltipService.ts | ✅ | Created from tooltipService.ts |

### Browser/Helpers Directory

| File | Status | Notes |
|------|--------|-------|
| findDiffs.ts | ✅ | Created from void/browser/helpers/findDiffs.ts |

### Browser/HelperServices Directory

| File | Status | Notes |
|------|--------|-------|
| consistentItemService.ts | ✅ | Created from void/browser/helperServices/consistentItemService.ts |

### Browser/Media Directory

| File | Status | Notes |
|------|--------|-------|
| pinnacleai.css | ✅ | Created from void/browser/media/void.css |

## Common Directory

| File | Status | Notes |
|------|--------|-------|
| chatThreadServiceTypes.ts | ✅ | Created from void/common/chatThreadServiceTypes.ts |
| directoryStrService.ts | ✅ | Created from void/common/directoryStrService.ts |
| directoryStrTypes.ts | ✅ | Created from void/common/directoryStrTypes.ts |
| editCodeServiceTypes.ts | ✅ | Created from void/common/editCodeServiceTypes.ts |
| mcpService.ts | ✅ | Created from void/common/mcpService.ts |
| mcpServiceTypes.ts | ✅ | Created from void/common/mcpServiceTypes.ts |
| metricsService.ts | ✅ | Created from void/common/metricsService.ts |
| modelCapabilities.ts | ✅ | Rebranded from void/common/modelCapabilities.ts - updated type names and references |
| pinnacleaiModelService.ts | ✅ | Created from voidModelService.ts |
| pinnacleaiSCMTypes.ts | ✅ | Created from voidSCMTypes.ts |
| pinnacleaiSettingsService.ts | ✅ | Created from void/common/voidSettingsService.ts - renamed types and references |
| pinnacleaiSettingsTypes.ts | ✅ | Created from voidSettingsTypes.ts |
| pinnacleaiUpdateService.ts | ✅ | Created from voidUpdateService.ts |
| pinnacleaiUpdateServiceTypes.ts | ✅ | Created from voidUpdateServiceTypes.ts |
| refreshModelService.ts | ✅ | Created from void/common/refreshModelService.ts - renamed service references |
| sendLLMMessageService.ts | ✅ | Created from void/common/sendLLMMessageService.ts - updated service references |
| sendLLMMessageTypes.ts | ✅ | Created from void/common/sendLLMMessageTypes.ts - updated import paths |
| storageKeys.ts | ✅ | Created from void/common/storageKeys.ts |
| toolsServiceTypes.ts | ✅ | Created from void/common/toolsServiceTypes.ts |

### Common/Helpers Directory

| File | Status | Notes |
|------|--------|-------|
| colors.ts | ✅ | Created from void/common/helpers/colors.ts - updated color registration names |
| extractCodeFromResult.ts | ✅ | Created from void/common/helpers/extractCodeFromResult.ts - renamed function from voidSubstr to pinnacleSubstr |
| languageHelpers.ts | ✅ | Created from void/common/helpers/languageHelpers.ts |
| systemInfo.ts | ✅ | Created from void/common/helpers/systemInfo.ts |
| util.ts | ✅ | Created from void/common/helpers/util.ts |

### Common/Prompt Directory

| File | Status | Notes |
|------|--------|-------|
| prompts.ts | ✅ | Created from void/common/prompt/prompts.ts - renamed voidPrefixAndSuffix to pinnaclePrefixAndSuffix and updated imports |

## Electron-Main Directory

| File | Status | Notes |
|------|--------|-------|
| mcpChannel.ts | ✅ | Created from void/electron-main/mcpChannel.ts - updated import from voidSettingsTypes.js to pinnacleaiSettingsTypes.js and changed "Void" references |
| metricsMainService.ts | ✅ | Created from void/electron-main/metricsMainService.ts - updated storage keys and references from "void" to "pinnacleai" |
| pinnacleaiSCMMainService.ts | ✅ | Created from voidSCMMainService.ts |
| pinnacleaiUpdateMainService.ts | ✅ | Created from void/electron-main/pinnacleaiUpdateMainService.ts |
| sendLLMMessageChannel.ts | ✅ | Created from void/electron-main/sendLLMMessageChannel.ts - changed "Void" references to "Pinnacle" |

### Electron-Main/LLMMessage Directory

| File | Status | Notes |
|------|--------|-------|
| extractGrammar.ts | ✅ | Created from void/electron-main/llmMessage/extractGrammar.ts - updated import from voidSettingsTypes.js to pinnacleaiSettingsTypes.js |
| sendLLMMessage.impl.ts | ✅ | Created from void/electron-main/llmMessage/sendLLMMessage.impl.ts - updated import from voidSettingsTypes.js to pinnacleaiSettingsTypes.js and changed "Void" references to "Pinnacle" |
| sendLLMMessage.ts | ✅ | Created from void/electron-main/llmMessage/sendLLMMessage.ts - updated import from voidSettingsTypes.js to pinnacleaiSettingsTypes.js |

## Summary

- Total files: 57
- Completed: 57
- Remaining: 0 