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

## Identified Files for Rebranding

### React Component Files
- ✅ PinnacleAiSelectionHelper.tsx (renamed from VoidSelectionHelper.tsx)
- ✅ PinnacleAiCommandBar.tsx (renamed from VoidCommandBar.tsx)
- ✅ PinnacleAiOnboarding.tsx (renamed from VoidOnboarding.tsx)

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

### Integration

- ⬜ Update the pinnacleai.contribution.ts file to properly register all components
- ⬜ Update any remaining references to void in the codebase
- ⬜ Test the build process for pinnacleai React components
- ⬜ Test the functionality of pinnacleai components

### Documentation

- ⬜ Update README.md with information about the pinnacleai components
- ⬜ Document any API changes between void and pinnacleai

## Next Steps

1. Create a script to perform mass replacement of identifiers and class names
2. Update import paths to reflect the new folder structure
3. Update service interfaces and implementations
4. Test the rebranded components
5. Update documentation
