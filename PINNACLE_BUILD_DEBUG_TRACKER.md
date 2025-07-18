# Pinnacle AI Build Debug Tracker

## Overview
This document tracks all the build errors encountered when running `npm run buildreact-pinnacleai` and provides systematic solutions to fix them.

## Current Build Command
```bash
npm run buildreact-pinnacleai
```

## Root Cause Analysis

### Primary Issues Identified

#### 1. **TypeScript Decorator Configuration Issue**
**Error:**
```
Parameter decorators only work when experimental decorators are enabled
../terminalToolService.ts:75:2: @ITerminalService private readonly terminalService: ITerminalService,
../terminalToolService.ts:76:2: @IWorkspaceContextService private readonly workspaceContextService: IWorkspaceContextService,
```

**Root Cause:**
- The React build process (tsup) is trying to compile `terminalToolService.ts` which uses VSCode's dependency injection decorators
- The React tsconfig.json doesn't have `experimentalDecorators: true`
- The build process is including files outside the React component scope

**Files Affected:**
- `src/vs/workbench/contrib/pinnacleai/browser/terminalToolService.ts`
- `src/vs/workbench/contrib/pinnacleai/browser/react/tsconfig.json`

#### 2. **Missing Export Issues**
**Error:**
```
Module '"../../../../common/toolsServiceTypes.js"' has no exported member 'RawToolCallObj'
```

**Root Cause:**
- `RawToolCallObj` is defined in `sendLLMMessageTypes.ts` but being imported from `toolsServiceTypes.ts`
- The import path is incorrect

**Files Affected:**
- `src/vs/workbench/contrib/pinnacleai/browser/react/src/sidebar-tsx/SidebarChat.tsx`

#### 3. **File Extension Issues**
**Error:**
```
An import path can only end with a '.tsx' extension when 'allowImportingTsExtensions' is enabled
An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled
```

**Root Cause:**
- TypeScript configuration doesn't allow importing .tsx/.ts extensions
- Should use .js extensions for compiled output

**Files Affected:**
- Multiple React component files with .tsx/.ts imports

#### 4. **Missing Module Issues**
**Error:**
```
Cannot find module '../util/components.js' or its corresponding type declarations
Cannot find name 'ScrollType'
```

**Root Cause:**
- Missing components.js file
- Missing ScrollType import from editor common

**Files Affected:**
- `src/vs/workbench/contrib/pinnacleai/browser/react/src/sidebar-tsx/SidebarChat.tsx`

## Detailed File Analysis

### Files with Linter Errors

#### `src/vs/workbench/contrib/pinnacleai/browser/react/src/sidebar-tsx/SidebarChat.tsx`
**Line 11:** `RawToolCallObj` import error - wrong module
**Line 12:** `.tsx` extension not allowed
**Line 13:** Missing `components.js` file
**Line 16:** `.ts` extension not allowed
**Line 23:** `.ts` extension not allowed
**Line 562:** Missing `ScrollType` import

#### `src/vs/workbench/contrib/pinnacleai/browser/react/tsconfig.json`
**Missing:** `experimentalDecorators: true`
**Missing:** `allowImportingTsExtensions: true`

#### `src/vs/workbench/contrib/pinnacleai/browser/react/tsup.config.js`
**Issue:** Including files outside React scope in build process

## Solution Plan

### Phase 1: Fix TypeScript Configuration
1. **Update React tsconfig.json**
   - Add `experimentalDecorators: true`
   - Add `allowImportingTsExtensions: true`
   - Configure proper module resolution

2. **Update tsup.config.js**
   - Exclude non-React files from build
   - Fix external/internal module configuration

### Phase 2: Fix Import Issues
1. **Fix RawToolCallObj import**
   - Change import source from `toolsServiceTypes.js` to `sendLLMMessageTypes.js`

2. **Fix file extensions**
   - Change `.tsx` imports to `.js`
   - Change `.ts` imports to `.js`

3. **Add missing imports**
   - Add `ScrollType` import from editor common
   - Create missing `components.js` file or fix import path

### Phase 3: Fix Missing Files
1. **Create components.js**
   - Add `Separator` component export
   - Or fix import path to correct location

2. **Verify all imports**
   - Check all import paths are correct
   - Ensure all required modules are available

### Phase 4: Build Process Optimization
1. **Scope the build correctly**
   - Only include React components in build
   - Exclude VSCode-specific service files
   - Fix external dependencies configuration

## Implementation Steps

### Step 1: Update tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "exactOptionalPropertyTypes": false,
    "experimentalDecorators": true,
    "allowImportingTsExtensions": true,
    "jsx": "react-jsx",
    "moduleResolution": "NodeNext",
    "module": "NodeNext",
    "esModuleInterop": true,
  },
  "include": [
    "./src/**/*.ts",
    "./src/**/*.tsx"
  ],
  "exclude": [
    "../terminalToolService.ts",
    "../**/*.ts"
  ]
}
```

### Step 2: Fix SidebarChat.tsx imports
```typescript
// Fix line 11
import { BuiltinToolCallParams, BuiltinToolName, ToolApprovalType, approvalTypeOfBuiltinToolName, LintErrorItem, toolApprovalTypes } from '../../../../common/toolsServiceTypes.js';
import { RawToolCallObj } from '../../../../common/sendLLMMessageTypes.js';

// Fix line 12
import { PinnacleButtonBgDarken, PinnacleSwitch, PinnacleSlider, PinnacleCustomDropdownBox, PinnacleInputBox2, PinnacleDiffEditor } from '../util/inputs.js';

// Fix line 13 - either create components.js or fix path
// import { Separator } from '../util/components.js';

// Fix line 16
import { PINNACLEAI_CTRL_L_ACTION_ID, PINNACLEAI_OPEN_SETTINGS_ACTION_ID } from '../../../actionIDs.js';

// Fix line 23
import { persistentTerminalNameOfId } from '../../../terminalToolService.js';

// Add missing import
import { ScrollType } from '../../../../../../../editor/common/editorCommon.js';
```

### Step 3: Update tsup.config.js
```javascript
export default defineConfig({
  // ... existing config
  external: [
    // Exclude VSCode service files
    new RegExp('../../../*.js'),
    new RegExp('../../../**/*.js'),
    // Keep existing external patterns
    new RegExp('../../../*.js'
      .replaceAll('.', '\\.')
      .replaceAll('*', '.*'))
  ],
  // ... rest of config
})
```

## Priority Order
1. **HIGH:** Fix TypeScript configuration (experimentalDecorators)
2. **HIGH:** Fix import paths and missing modules
3. **MEDIUM:** Create missing components file
4. **MEDIUM:** Optimize build configuration
5. **LOW:** Clean up and optimize imports

## Testing Strategy
1. Fix one category of errors at a time
2. Run build after each fix to verify progress
3. Use incremental approach to avoid breaking working parts
4. Test both build and runtime functionality

## Expected Outcome
After implementing these fixes:
- Build should complete without TypeScript errors
- All imports should resolve correctly
- React components should compile and bundle properly
- Runtime functionality should be preserved

## Notes
- The build process is trying to compile VSCode service files that shouldn't be part of the React build
- Need to properly scope what gets included in the React build vs what stays external
- Import paths need to be consistent with the build output expectations (.js extensions)
- Some missing files may need to be created or import paths corrected
