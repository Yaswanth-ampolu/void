# Design Document

## Overview

The PinnacleAI rebranding design focuses on systematically transforming all "void" references to "pinnacleai" throughout the codebase while maintaining architectural integrity and functionality. This design ensures a comprehensive rebrand that covers service classes, interfaces, configuration files, user-facing elements, and build systems.

The approach prioritizes consistency, maintainability, and minimal disruption to existing functionality while establishing clear naming conventions that align with the PinnacleAI brand identity.

## Architecture

### Naming Convention Strategy

The rebranding follows a systematic naming convention transformation:

- **Service Classes**: `VoidXxxService` → `PinnacleAIXxxService`
- **Interface Names**: `IVoidXxxService` → `IPinnacleAIXxxService`
- **Static IDs**: `'void.xxxService'` → `'pinnacleai.xxxService'`
- **Action IDs**: `VOID_XXX_ACTION_ID` → `PINNACLEAI_XXX_ACTION_ID`
- **File Extensions**: `.voidrules` → `.pinnacleairules`
- **URI Schemes**: `void://` → `pinnacleai://`
- **Storage Keys**: `void-xxx` → `pinnacleai-xxx`

### Transformation Scope

The design addresses four primary transformation areas:

1. **Code Structure**: Service classes, interfaces, and dependency injection
2. **Configuration**: Settings files, rules files, and storage keys
3. **User Interface**: Localized strings, tooltips, and display names
4. **Build System**: Package names, output directories, and deployment scripts

## Components and Interfaces

### Service Layer Transformation

**Current State Analysis:**
- Services use mixed naming conventions (some already use PinnacleAI, others still use Void)
- Interface definitions need systematic updating
- Dependency injection decorators require consistent naming

**Target Architecture:**
```typescript
// Service Interface Pattern
interface IPinnacleAIXxxService {
    readonly _serviceBrand: undefined;
    // service methods
}

// Service Implementation Pattern
class PinnacleAIXxxService implements IPinnacleAIXxxService {
    static readonly ID = 'pinnacleai.xxxService';
    _serviceBrand: undefined;
    
    constructor(
        @IPinnacleAIYyyService private readonly yyyService: IPinnacleAIYyyService
    ) {}
}
```

### Configuration System

**Rules Files:**
- Transform `.voidrules` → `.pinnacleairules`
- Update file detection logic in workspace scanning
- Maintain backward compatibility during transition

**Storage Keys:**
- Systematic prefix transformation: `void-` → `pinnacleai-`
- Preserve user data during migration
- Update all storage access points

### Action and Command System

**Action ID Transformation:**
```typescript
// Current: export const VOID_XXX_ACTION_ID = 'void.xxxAction'
// Target:  export const PINNACLEAI_XXX_ACTION_ID = 'pinnacleai.xxxAction'
```

**Menu and Command Registration:**
- Update all command palette entries
- Transform menu contribution IDs
- Maintain keyboard shortcut functionality

## Data Models

### Service Registration Model

```typescript
interface ServiceRegistration {
    serviceId: string;           // 'pinnacleai.xxxService'
    implementationClass: any;    // PinnacleAIXxxService
    interfaceToken: any;         // IPinnacleAIXxxService
    dependencies: string[];      // ['pinnacleai.yyyService', ...]
}
```

### Configuration Migration Model

```typescript
interface ConfigMigration {
    oldKey: string;      // 'void-setting-name'
    newKey: string;      // 'pinnacleai-setting-name'
    valueTransform?: (oldValue: any) => any;
    preserveOld: boolean; // for backward compatibility
}
```

### File Reference Model

```typescript
interface FileReference {
    oldPattern: string;   // '.voidrules'
    newPattern: string;   // '.pinnacleairules'
    locations: string[];  // file paths where references occur
    updateStrategy: 'replace' | 'add-both' | 'migrate';
}
```

## Error Handling

### Migration Error Handling

**Service Registration Conflicts:**
- Detect duplicate service registrations during transformation
- Provide clear error messages for missing dependencies
- Implement rollback mechanism for failed transformations

**Configuration Migration Errors:**
- Handle missing configuration keys gracefully
- Preserve user settings during failed migrations
- Log transformation errors for debugging

**File Reference Errors:**
- Handle missing rule files during workspace scanning
- Provide fallback behavior for legacy file references
- Maintain functionality when both old and new files exist

### Runtime Error Prevention

**Dependency Injection Validation:**
- Verify all service dependencies are properly renamed
- Check for circular dependencies after transformation
- Validate service interface implementations

**Configuration Validation:**
- Ensure all storage keys are consistently transformed
- Validate configuration file format after changes
- Check for orphaned configuration entries

## Testing Strategy

### Unit Testing Approach

**Service Layer Testing:**
- Test service instantiation with new naming
- Verify dependency injection works correctly
- Validate service interface compliance

**Configuration Testing:**
- Test configuration migration logic
- Verify storage key transformations
- Validate rule file detection and parsing

**Action System Testing:**
- Test command registration with new IDs
- Verify keyboard shortcuts still function
- Validate menu contributions work correctly

### Integration Testing

**End-to-End Workflow Testing:**
- Test complete user workflows with rebranded components
- Verify cross-service communication works
- Validate UI elements display correct branding

**Backward Compatibility Testing:**
- Test mixed environments (old and new naming)
- Verify graceful degradation for missing components
- Validate migration paths work correctly

### Regression Testing

**Functionality Preservation:**
- Ensure all existing features work after rebranding
- Verify performance characteristics remain unchanged
- Test error handling and edge cases

**User Experience Testing:**
- Validate all user-facing text is correctly branded
- Test that keyboard shortcuts and commands work
- Ensure settings and preferences are preserved

## Implementation Phases

### Phase 1: Core Services
- Transform primary service classes and interfaces
- Update dependency injection decorators
- Validate service registration and instantiation

### Phase 2: Configuration System
- Transform storage keys and configuration files
- Implement migration logic for existing user data
- Update rule file detection and processing

### Phase 3: User Interface
- Update all localized strings and display text
- Transform action IDs and command registrations
- Update menu contributions and keyboard shortcuts

### Phase 4: Build and Deployment
- Update package.json and build configurations
- Transform output directories and deployment scripts
- Validate build process with new naming

### Phase 5: Testing and Validation
- Execute comprehensive test suite
- Perform integration testing across all components
- Validate backward compatibility and migration paths