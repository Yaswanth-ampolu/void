# PinnacleAI Rebranding Tasks

This document tracks the remaining tasks needed to complete the transition from void to pinnacleai.

## Fixed Issues

- ✅ Fixed compilation errors in chatThreadService.ts
- ✅ Added missing functions to prompts.ts (chat_userMessageContent, isABuiltinToolName)
- ✅ Created CSS styles file with pinnacleai variables
- ✅ Setup React build infrastructure for pinnacleai
- ✅ Added build scripts to package.json for pinnacleai
- ✅ Created React component folder structure for pinnacleai
- ✅ Created utility React components:
  - ✅ helpers.tsx
  - ✅ services.tsx (fixed linter errors)
  - ✅ mountFnGenerator.tsx
  - ✅ useScrollbarStyles.tsx
  - ✅ inputs.tsx (updated CSS class names)
- ✅ Created SidebarChat.tsx with required utility functions
- ✅ Manually copied and renamed React component files from void to pinnacleai
- ✅ Created Python script for mass replacement of identifiers and class names

## Identified Files for Rebranding

### React Component Files
- ✅ PinnacleAiSelectionHelper.tsx (renamed from VoidSelectionHelper.tsx)
- ✅ PinnacleAiCommandBar.tsx (renamed from VoidCommandBar.tsx)
- ✅ PinnacleAiOnboarding.tsx (renamed from VoidOnboarding.tsx)

## Additional Patterns Found in Markdown Folder

- ⬜ Function names:
  - ⬜ `voidOpenFileFn` → `pinnacleaiOpenFileFn`
- ⬜ Import paths:
  - ⬜ `../../../../common/voidSettingsTypes.js` → `../../../../common/pinnacleaiSettingsTypes.js`
- ⬜ Service interfaces:
  - ⬜ `IVoidCommandBarService` → `IPinnacleAiCommandBarService`
- ⬜ Additional CSS classes:
  - ⬜ `border-void-border-1` → `border-pinnacleai-border-1`
  - ⬜ `text-void-fg-3` → `text-pinnacleai-fg-3`
  - ⬜ `bg-orange-50` → Verify if this needs updating
  - ⬜ `void-tooltip-orange` → `pinnacleai-tooltip-orange`
  - ⬜ `void-tooltip-green` → `pinnacleai-tooltip-green`
  - ⬜ `bg-void-bg-1` → `bg-pinnacleai-bg-1`
  - ⬜ `text-void-fg-2` → `text-pinnacleai-fg-2`

## Additional Patterns Found in Editor Widgets and Settings

- ⬜ Mount function names:
  - ⬜ `mountVoidCommandBar` → `mountPinnacleAiCommandBar`
  - ⬜ `mountVoidSelectionHelper` → `mountPinnacleAiSelectionHelper`
  - ⬜ `mountVoidOnboarding` → `mountPinnacleAiOnboarding`
  - ⬜ `mountVoidSettings` → `mountPinnacleAiSettings`
- ⬜ Component names with Void prefix:
  - ⬜ `VoidButtonBgDarken` → `PinnacleAiButtonBgDarken`
  - ⬜ `VoidCustomDropdownBox` → `PinnacleAiCustomDropdownBox`
  - ⬜ `VoidInputBox2` → `PinnacleAiInputBox2`
  - ⬜ `VoidSimpleInputBox` → `PinnacleAiSimpleInputBox`
  - ⬜ `VoidSwitch` → `PinnacleAiSwitch`
  - ⬜ `VoidSelectBox` → `PinnacleAiSelectBox`
  - ⬜ `VoidProviderSettings` → `PinnacleAiProviderSettings`
- ⬜ Import paths in settings files:
  - ⬜ `../../../../../../../workbench/contrib/void/common/voidSettingsTypes.js` → `../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsTypes.js`
  - ⬜ `../../../../../../../workbench/contrib/void/common/pinnacleaiSettingsService.js` → `../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsService.js`
- ⬜ File names in strings:
  - ⬜ `void-chats.json` → `pinnacleai-chats.json`
  - ⬜ `void-settings.json` → `pinnacleai-settings.json`
  - ⬜ `.voidrules` → `.pinnacleairules`
- ⬜ Additional CSS classes:
  - ⬜ `text-void-warning` → `text-pinnacleai-warning`
  - ⬜ `void-max-w-[300px]` → `pinnacleai-max-w-[300px]`
  - ⬜ `void-max-w-[20px]` → `pinnacleai-max-w-[20px]`
- ⬜ Text references to "Void":
  - ⬜ `Void's Settings` → `PinnacleAI's Settings`
  - ⬜ `Void recognizes` → `PinnacleAI recognizes`
  - ⬜ `Void automatically detects` → `PinnacleAI automatically detects`
  - ⬜ `Void can access` → `PinnacleAI can access`
  - ⬜ `Transfer Void's settings` → `Transfer PinnacleAI's settings`

## Additional Patterns Found in Quick-Edit-TSX Folder

- ⬜ Component names:
  - ⬜ `VoidChatArea` → `PinnacleAiChatArea`
  - ⬜ `VoidTooltip` → `PinnacleAiTooltip`
  - ⬜ `VoidStatefulModelInfo` → `PinnacleAiStatefulModelInfo`
  - ⬜ `_VoidSelectBox` → `_PinnacleAiSelectBox`
- ⬜ Mount function names:
  - ⬜ `mountVoidTooltip` → `mountPinnacleAiTooltip`
  - ⬜ `mountCtrlK` → `mountPinnacleAiQuickEdit`
- ⬜ Type names:
  - ⬜ `VoidSettingsState` → `PinnacleAiSettingsState`
- ⬜ CSS variables:
  - ⬜ `--void-bg-1` → `--pinnacleai-bg-1`
  - ⬜ `--void-bg-2` → `--pinnacleai-bg-2`
  - ⬜ `--void-bg-3` → `--pinnacleai-bg-3`
  - ⬜ `--void-bg-4` → `--pinnacleai-bg-4`
- ⬜ Additional import paths:
  - ⬜ `../../../../../../../workbench/contrib/void/common/voidSettingsService.js` → `../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsService.js`
- ⬜ Additional text references:
  - ⬜ `Model not recognized by Void` → `Model not recognized by PinnacleAI`

## Additional Patterns Found in Sidebar-TSX Folder

- ⬜ Component names:
  - ⬜ `VoidChatAreaProps` → `PinnacleAiChatAreaProps`
  - ⬜ `VoidSlider` → `PinnacleAiSlider`
  - ⬜ `VoidDiffEditor` → `PinnacleAiDiffEditor`
- ⬜ Function names:
  - ⬜ `voidModelService` → `pinnacleaiModelService`
- ⬜ Additional CSS classes:
  - ⬜ `bg-void-fg-3` → `bg-pinnacleai-fg-3`
  - ⬜ `void-opacity-60` → `pinnacleai-opacity-60`
  - ⬜ `border-void-warning` → `border-pinnacleai-warning`
  - ⬜ `bg-void-stroke-1` → `bg-pinnacleai-stroke-1`
  - ⬜ `bg-void-stroke` → `bg-pinnacleai-stroke`
- ⬜ Additional text references:
  - ⬜ `Transfer your editor settings into Void` → `Transfer your editor settings into PinnacleAI`
  - ⬜ `When disabled, Void will not include` → `When disabled, PinnacleAI will not include`
  - ⬜ `Settings that control the visibility of Void suggestions` → `Settings that control the visibility of PinnacleAI suggestions`

## Remaining Tasks

### Component-specific Rebranding

#### PinnacleAiSelectionHelper.tsx
- ⬜ Replace component names:
  - ⬜ `VoidSelectionHelperMain` → `PinnacleAiSelectionHelperMain`
  - ⬜ `VoidSelectionHelper` → `PinnacleAiSelectionHelper`
  - ⬜ `VoidSelectionHelperProps` → `PinnacleAiSelectionHelperProps`
- ⬜ Replace import paths:
  - ⬜ Update `../../../../../void/browser/voidSelectionHelperWidget.js` to correct pinnacleai path
- ⬜ Replace action IDs:
  - ⬜ `VOID_CTRL_K_ACTION_ID` → `PINNACLEAI_CTRL_K_ACTION_ID`
  - ⬜ `VOID_CTRL_L_ACTION_ID` → `PINNACLEAI_CTRL_L_ACTION_ID`
  - ⬜ `VOID_OPEN_SETTINGS_ACTION_ID` → `PINNACLEAI_OPEN_SETTINGS_ACTION_ID`
- ⬜ Replace CSS classes:
  - ⬜ `@@void-scope` → `@@pinnacleai-scope`
  - ⬜ `bg-void-border-3` → `bg-pinnacleai-border-3`
  - ⬜ `border-void-border-3` → `border-pinnacleai-border-3`
  - ⬜ `bg-void-bg-2` → `bg-pinnacleai-bg-2`

#### PinnacleAiCommandBar.tsx
- ⬜ Replace component names:
  - ⬜ `VoidCommandBarMain` → `PinnacleAiCommandBarMain`
  - ⬜ `VoidCommandBar` → `PinnacleAiCommandBar`
  - ⬜ `VoidCommandBarProps` → `PinnacleAiCommandBarProps`
- ⬜ Replace import paths:
  - ⬜ Update `../../../voidCommandBarService.js` to correct pinnacleai path
- ⬜ Replace action IDs:
  - ⬜ `VOID_GOTO_NEXT_DIFF_ACTION_ID` → `PINNACLEAI_GOTO_NEXT_DIFF_ACTION_ID`
  - ⬜ `VOID_GOTO_PREV_DIFF_ACTION_ID` → `PINNACLEAI_GOTO_PREV_DIFF_ACTION_ID`
  - ⬜ `VOID_GOTO_NEXT_URI_ACTION_ID` → `PINNACLEAI_GOTO_NEXT_URI_ACTION_ID`
  - ⬜ `VOID_GOTO_PREV_URI_ACTION_ID` → `PINNACLEAI_GOTO_PREV_URI_ACTION_ID`
  - ⬜ `VOID_ACCEPT_FILE_ACTION_ID` → `PINNACLEAI_ACCEPT_FILE_ACTION_ID`
  - ⬜ `VOID_REJECT_FILE_ACTION_ID` → `PINNACLEAI_REJECT_FILE_ACTION_ID`
  - ⬜ `VOID_ACCEPT_ALL_DIFFS_ACTION_ID` → `PINNACLEAI_ACCEPT_ALL_DIFFS_ACTION_ID`
  - ⬜ `VOID_REJECT_ALL_DIFFS_ACTION_ID` → `PINNACLEAI_REJECT_ALL_DIFFS_ACTION_ID`
- ⬜ Replace CSS classes:
  - ⬜ `@@void-scope` → `@@pinnacleai-scope`
  - ⬜ `bg-void-bg-2` → `bg-pinnacleai-bg-2`
  - ⬜ `border-void-border-2` → `border-pinnacleai-border-2`
  - ⬜ `void-tooltip` → `pinnacleai-tooltip`

#### PinnacleAiOnboarding.tsx
- ⬜ Replace component names:
  - ⬜ `VoidOnboarding` → `PinnacleAiOnboarding`
  - ⬜ `VoidIcon` → `PinnacleAiIcon`
  - ⬜ `VoidOnboardingContent` → `PinnacleAiOnboardingContent`
- ⬜ Replace service references:
  - ⬜ `voidSettingsService` → `pinnacleaiSettingsService`
  - ⬜ `voidMetricsService` → `pinnacleaiMetricsService`
  - ⬜ `voidSettingsState` → `pinnacleaiSettingsState`
- ⬜ Replace CSS classes:
  - ⬜ `@@void-scope` → `@@pinnacleai-scope`
  - ⬜ `bg-void-bg-3` → `bg-pinnacleai-bg-3`
  - ⬜ `@@void-void-icon` → `@@pinnacleai-pinnacleai-icon`
  - ⬜ `text-void-fg-3` → `text-pinnacleai-fg-3`
  - ⬜ `bg-void-bg-2` → `bg-pinnacleai-bg-2`
  - ⬜ `border-void-border-4` → `border-pinnacleai-border-4`
  - ⬜ `border-void-border-2` → `border-pinnacleai-border-2`
  - ⬜ `text-void-fg-1` → `text-pinnacleai-fg-1`
  - ⬜ `text-void-fg-2` → `text-pinnacleai-fg-2`
  - ⬜ `void-tooltip` → `pinnacleai-tooltip`
  - ⬜ `void-tooltip-provider-info` → `pinnacleai-tooltip-provider-info`

#### QuickEditChat.tsx
- ⬜ Replace component imports:
  - ⬜ `VoidInputBox2` → `PinnacleAiInputBox2`
  - ⬜ `VoidChatArea` → `PinnacleAiChatArea`
- ⬜ Replace action IDs:
  - ⬜ `VOID_CTRL_K_ACTION_ID` → `PINNACLEAI_CTRL_K_ACTION_ID`
- ⬜ Replace import paths:
  - ⬜ `../../../../../../../workbench/contrib/void/common/voidSettingsTypes.js` → `../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsTypes.js`
- ⬜ Replace CSS classes:
  - ⬜ `@@codicon` → Verify if this needs updating

### Service Rebranding

- ⬜ Update service interfaces:
  - ⬜ `IVoidCommandBarService` → `IPinnacleAiCommandBarService`
  - ⬜ `IVoidModelService` → `IPinnacleAiModelService`
  - ⬜ `IVoidSettingsService` → `IPinnacleAiSettingsService`
  - ⬜ `IEditCodeService` → Verify if this needs renaming
  - ⬜ `IMetricsService` → Verify if this needs renaming

### Import Path Updates

- ⬜ Update all import paths:
  - ⬜ `../../../actionIDs.js` - Create pinnacleai version with updated action IDs
  - ⬜ `../../../../../void/browser/voidSelectionHelperWidget.js` → Update to pinnacleai path
  - ⬜ `../../../voidSettingsPane.js` → Update to pinnacleai path
  - ⬜ `../../../voidCommandBarService.js` → Update to pinnacleai path
  - ⬜ `../../../../common/voidSettingsTypes.js` → Update to pinnacleai path
  - ⬜ `../markdown/ChatMarkdownRender.js` - Verify if this needs updating
  - ⬜ `../void-settings-tsx/Settings.js` → Update to `../pinnacleai-settings-tsx/Settings.js`
  - ⬜ `../sidebar-tsx/ErrorBoundary.js` - Verify if this needs updating

### CSS Classes Rebranding

Create a script to replace all CSS classes with the void prefix:
- ⬜ `@@void-scope` → `@@pinnacleai-scope`
- ⬜ `bg-void-border-3` → `bg-pinnacleai-border-3`
- ⬜ `border-void-border-3` → `border-pinnacleai-border-3`
- ⬜ `bg-void-bg-2` → `bg-pinnacleai-bg-2`
- ⬜ `border-void-border-2` → `border-pinnacleai-border-2`
- ⬜ `text-void-fg-3` → `text-pinnacleai-fg-3`
- ⬜ `bg-void-bg-3` → `bg-pinnacleai-bg-3`
- ⬜ `border-void-border-4` → `border-pinnacleai-border-4`
- ⬜ `text-void-fg-1` → `text-pinnacleai-fg-1`
- ⬜ `text-void-fg-2` → `text-pinnacleai-fg-2`
- ⬜ `void-tooltip` → `pinnacleai-tooltip`
- ⬜ `void-tooltip-provider-info` → `pinnacleai-tooltip-provider-info`
- ⬜ `@@void-void-icon` → `@@pinnacleai-pinnacleai-icon`
- ⬜ `border-void-border-1` → `border-pinnacleai-border-1`
- ⬜ `bg-void-bg-1` → `bg-pinnacleai-bg-1`
- ⬜ `void-tooltip-orange` → `pinnacleai-tooltip-orange`
- ⬜ `void-tooltip-green` → `pinnacleai-tooltip-green`
- ⬜ `text-void-warning` → `text-pinnacleai-warning`
- ⬜ `void-max-w-[300px]` → `pinnacleai-max-w-[300px]`
- ⬜ `void-max-w-[20px]` → `pinnacleai-max-w-[20px]`
- ⬜ `--void-bg-1` → `--pinnacleai-bg-1`
- ⬜ `--void-bg-2` → `--pinnacleai-bg-2`
- ⬜ `--void-bg-3` → `--pinnacleai-bg-3`
- ⬜ `--void-bg-4` → `--pinnacleai-bg-4`
- ⬜ `bg-void-fg-3` → `bg-pinnacleai-fg-3`
- ⬜ `void-opacity-60` → `pinnacleai-opacity-60`
- ⬜ `border-void-warning` → `border-pinnacleai-warning`
- ⬜ `bg-void-stroke-1` → `bg-pinnacleai-stroke-1`
- ⬜ `bg-void-stroke` → `bg-pinnacleai-stroke`

### Action IDs Rebranding

Create a script to replace all action IDs:
- ⬜ `VOID_CTRL_K_ACTION_ID` → `PINNACLEAI_CTRL_K_ACTION_ID`
- ⬜ `VOID_CTRL_L_ACTION_ID` → `PINNACLEAI_CTRL_L_ACTION_ID`
- ⬜ `VOID_OPEN_SETTINGS_ACTION_ID` → `PINNACLEAI_OPEN_SETTINGS_ACTION_ID`
- ⬜ `VOID_GOTO_NEXT_DIFF_ACTION_ID` → `PINNACLEAI_GOTO_NEXT_DIFF_ACTION_ID`
- ⬜ `VOID_GOTO_PREV_DIFF_ACTION_ID` → `PINNACLEAI_GOTO_PREV_DIFF_ACTION_ID`
- ⬜ `VOID_GOTO_NEXT_URI_ACTION_ID` → `PINNACLEAI_GOTO_NEXT_URI_ACTION_ID`
- ⬜ `VOID_GOTO_PREV_URI_ACTION_ID` → `PINNACLEAI_GOTO_PREV_URI_ACTION_ID`
- ⬜ `VOID_ACCEPT_FILE_ACTION_ID` → `PINNACLEAI_ACCEPT_FILE_ACTION_ID`
- ⬜ `VOID_REJECT_FILE_ACTION_ID` → `PINNACLEAI_REJECT_FILE_ACTION_ID`
- ⬜ `VOID_ACCEPT_ALL_DIFFS_ACTION_ID` → `PINNACLEAI_ACCEPT_ALL_DIFFS_ACTION_ID`
- ⬜ `VOID_REJECT_ALL_DIFFS_ACTION_ID` → `PINNACLEAI_REJECT_ALL_DIFFS_ACTION_ID`

### Function Names Rebranding
- ⬜ `voidOpenFileFn` → `pinnacleaiOpenFileFn`
- ⬜ `voidModelService` → `pinnacleaiModelService`
- ⬜ Other function names with 'void' prefix or in name

### Mount Function Names Rebranding
- ⬜ `mountVoidCommandBar` → `mountPinnacleAiCommandBar`
- ⬜ `mountVoidSelectionHelper` → `mountPinnacleAiSelectionHelper`
- ⬜ `mountVoidOnboarding` → `mountPinnacleAiOnboarding`
- ⬜ `mountVoidSettings` → `mountPinnacleAiSettings`
- ⬜ `mountVoidTooltip` → `mountPinnacleAiTooltip`
- ⬜ `mountCtrlK` → `mountPinnacleAiQuickEdit`

### Component Names Rebranding
- ⬜ `VoidButtonBgDarken` → `PinnacleAiButtonBgDarken`
- ⬜ `VoidCustomDropdownBox` → `PinnacleAiCustomDropdownBox`
- ⬜ `VoidInputBox2` → `PinnacleAiInputBox2`
- ⬜ `VoidSimpleInputBox` → `PinnacleAiSimpleInputBox`
- ⬜ `VoidSwitch` → `PinnacleAiSwitch`
- ⬜ `VoidSelectBox` → `PinnacleAiSelectBox`
- ⬜ `VoidProviderSettings` → `PinnacleAiProviderSettings`
- ⬜ `VoidChatArea` → `PinnacleAiChatArea`
- ⬜ `VoidTooltip` → `PinnacleAiTooltip`
- ⬜ `VoidStatefulModelInfo` → `PinnacleAiStatefulModelInfo`
- ⬜ `_VoidSelectBox` → `_PinnacleAiSelectBox`
- ⬜ `VoidChatAreaProps` → `PinnacleAiChatAreaProps`
- ⬜ `VoidSlider` → `PinnacleAiSlider`
- ⬜ `VoidDiffEditor` → `PinnacleAiDiffEditor`

### Type Names Rebranding
- ⬜ `VoidSettingsState` → `PinnacleAiSettingsState`

### File Name References in Strings
- ⬜ `void-chats.json` → `pinnacleai-chats.json`
- ⬜ `void-settings.json` → `pinnacleai-settings.json`
- ⬜ `.voidrules` → `.pinnacleairules`

### Text References to "Void"
- ⬜ `Void's Settings` → `PinnacleAI's Settings`
- ⬜ `Void recognizes` → `PinnacleAI recognizes`
- ⬜ `Void automatically detects` → `PinnacleAI automatically detects`
- ⬜ `Void can access` → `PinnacleAI can access`
- ⬜ `Transfer Void's settings` → `Transfer PinnacleAI's settings`
- ⬜ `Model not recognized by Void` → `Model not recognized by PinnacleAI`
- ⬜ `Transfer your editor settings into Void` → `Transfer your editor settings into PinnacleAI`
- ⬜ `When disabled, Void will not include` → `When disabled, PinnacleAI will not include`
- ⬜ `Settings that control the visibility of Void suggestions` → `Settings that control the visibility of PinnacleAI suggestions`

### Integration

- ⬜ Update the pinnacleai.contribution.ts file to properly register all components
- ⬜ Update any remaining references to void in the codebase
- ⬜ Test the build process for pinnacleai React components
- ⬜ Test the functionality of pinnacleai components

### Rebranding Script Creation

- ✅ Create a Python script for mass replacement:
  - ✅ Process files folder by folder
  - ✅ Support different replacement patterns (CSS, component names, function names, etc.)
  - ✅ Preserve syntax and formatting
  - ✅ Generate reports of changes made
  - ✅ Allow for dry-run mode to preview changes
- ⬜ Enhance script with additional patterns found during testing

### Documentation

- ⬜ Update README.md with information about the pinnacleai components
- ⬜ Document any API changes between void and pinnacleai

## Next Steps

1. Update the rebranding script with the newly identified patterns
2. Run the script on each folder, one by one, with dry-run first to verify changes
3. After verifying, run the script without dry-run to apply changes
4. Update import paths to reflect the new folder structure
5. Update service interfaces and implementations
6. Test the rebranded components
7. Update documentation
