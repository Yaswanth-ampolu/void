#!/usr/bin/env python3

import os
import re
import argparse
from pathlib import Path
import json
from typing import Dict, List, Tuple, Set

"""
PinnacleAI Rebranding Script

This script helps with the mass replacement of "void" to "pinnacleai" in the codebase.
It can be run on specific folders or files and supports different types of replacements.
"""

# Define replacement patterns
CSS_CLASS_REPLACEMENTS = {
    r'@@void-scope': r'@@pinnacleai-scope',
    r'@@void-void-icon': r'@@pinnacleai-pinnacleai-icon',
    r'bg-void-border-(\d+)': r'bg-pinnacleai-border-\1',
    r'border-void-border-(\d+)': r'border-pinnacleai-border-\1',
    r'bg-void-bg-(\d+)': r'bg-pinnacleai-bg-\1',
    r'text-void-fg-(\d+)': r'text-pinnacleai-fg-\1',
    r'void-tooltip(-[a-z]+)?': r'pinnacleai-tooltip\1',
    r'text-void-warning': r'text-pinnacleai-warning',
    r'void-max-w-\[(\d+)px\]': r'pinnacleai-max-w-[\1px]',
    r'--void-bg-(\d+)': r'--pinnacleai-bg-\1',
    r'bg-void-fg-(\d+)': r'bg-pinnacleai-fg-\1',
    r'void-opacity-(\d+)': r'pinnacleai-opacity-\1',
    r'border-void-warning': r'border-pinnacleai-warning',
    r'bg-void-stroke-(\d+)': r'bg-pinnacleai-stroke-\1',
    r'bg-void-stroke': r'bg-pinnacleai-stroke',
}

COMPONENT_NAME_REPLACEMENTS = {
    r'\bVoidSelectionHelperMain\b': r'PinnacleAiSelectionHelperMain',
    r'\bVoidSelectionHelper\b': r'PinnacleAiSelectionHelper',
    r'\bVoidSelectionHelperProps\b': r'PinnacleAiSelectionHelperProps',
    r'\bVoidCommandBarMain\b': r'PinnacleAiCommandBarMain',
    r'\bVoidCommandBar\b': r'PinnacleAiCommandBar',
    r'\bVoidCommandBarProps\b': r'PinnacleAiCommandBarProps',
    r'\bVoidOnboarding\b': r'PinnacleAiOnboarding',
    r'\bVoidIcon\b': r'PinnacleAiIcon',
    r'\bVoidOnboardingContent\b': r'PinnacleAiOnboardingContent',
    r'\bVoidButtonBgDarken\b': r'PinnacleAiButtonBgDarken',
    r'\bVoidCustomDropdownBox\b': r'PinnacleAiCustomDropdownBox',
    r'\bVoidInputBox2\b': r'PinnacleAiInputBox2',
    r'\bVoidSimpleInputBox\b': r'PinnacleAiSimpleInputBox',
    r'\bVoidSwitch\b': r'PinnacleAiSwitch',
    r'\bVoidSelectBox\b': r'PinnacleAiSelectBox',
    r'\bVoidProviderSettings\b': r'PinnacleAiProviderSettings',
    r'\bVoidChatArea\b': r'PinnacleAiChatArea',
    r'\bVoidTooltip\b': r'PinnacleAiTooltip',
    r'\bVoidStatefulModelInfo\b': r'PinnacleAiStatefulModelInfo',
    r'\b_VoidSelectBox\b': r'_PinnacleAiSelectBox',
    r'\bVoidChatAreaProps\b': r'PinnacleAiChatAreaProps',
    r'\bVoidSlider\b': r'PinnacleAiSlider',
    r'\bVoidDiffEditor\b': r'PinnacleAiDiffEditor',
}

ACTION_ID_REPLACEMENTS = {
    r'VOID_([A-Z_]+)_ACTION_ID': r'PINNACLEAI_\1_ACTION_ID',
}

SERVICE_INTERFACE_REPLACEMENTS = {
    r'IVoidCommandBarService': r'IPinnacleAiCommandBarService',
    r'IVoidModelService': r'IPinnacleAiModelService',
    r'IVoidSettingsService': r'IPinnacleAiSettingsService',
}

TYPE_REPLACEMENTS = {
    r'\bVoidSettingsState\b': r'PinnacleAiSettingsState',
}

FUNCTION_NAME_REPLACEMENTS = {
    r'\bvoidOpenFileFn\b': r'pinnacleaiOpenFileFn',
    r'\bvoidSettingsService\b': r'pinnacleaiSettingsService',
    r'\bvoidMetricsService\b': r'pinnacleaiMetricsService',
    r'\bvoidSettingsState\b': r'pinnacleaiSettingsState',
    r'\bvoidCommandBarService\b': r'pinnacleaiCommandBarService',
    r'\bvoidModelService\b': r'pinnacleaiModelService',
    r'\bmountVoidCommandBar\b': r'mountPinnacleAiCommandBar',
    r'\bmountVoidSelectionHelper\b': r'mountPinnacleAiSelectionHelper',
    r'\bmountVoidOnboarding\b': r'mountPinnacleAiOnboarding',
    r'\bmountVoidSettings\b': r'mountPinnacleAiSettings',
    r'\bmountVoidTooltip\b': r'mountPinnacleAiTooltip',
    r'\bmountCtrlK\b': r'mountPinnacleAiQuickEdit',
}

IMPORT_PATH_REPLACEMENTS = {
    r'(\.\.\/)+void\/': r'\1pinnacleai/',
    r'(\.\.\/)+common\/voidSettingsTypes\.js': r'\1common/pinnacleaiSettingsTypes.js',
    r'(\.\.\/)+voidSettingsPane\.js': r'\1pinnacleaiSettingsPane.js',
    r'(\.\.\/)+voidCommandBarService\.js': r'\1pinnacleaiCommandBarService.js',
    r'\.\.\/void-settings-tsx\/': r'../pinnacleai-settings-tsx/',
    r'\.\.\/pinnacleai\/browser\/voidSelectionHelperWidget\.js': r'../pinnacleai/browser/pinnacleaiSelectionHelperWidget.js',
    r'\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/workbench\/contrib\/void\/common\/voidSettingsTypes\.js': r'../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsTypes.js',
    r'\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/workbench\/contrib\/void\/common\/pinnacleaiSettingsService\.js': r'../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsService.js',
    r'\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/\.\.\/workbench\/contrib\/void\/common\/voidSettingsService\.js': r'../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsService.js',
    r'import \{ VoidTooltip \} from \'\.\/PinnacleAiTooltip\.js\'': r'import { PinnacleAiTooltip } from \'./PinnacleAiTooltip.js\'',
}

STRING_REPLACEMENTS = {
    r'void-chats\.json': r'pinnacleai-chats.json',
    r'void-settings\.json': r'pinnacleai-settings.json',
    r'\.voidrules': r'.pinnacleairules',
    r'Void\'s Settings': r'PinnacleAI\'s Settings',
    r'Void recognizes': r'PinnacleAI recognizes',
    r'Void automatically detects': r'PinnacleAI automatically detects',
    r'Void can access': r'PinnacleAI can access',
    r'Transfer Void\'s settings': r'Transfer PinnacleAI\'s settings',
    r'Enter the Void': r'Enter PinnacleAI',
    r'Welcome to Void': r'Welcome to PinnacleAI',
    r'Model not recognized by Void': r'Model not recognized by PinnacleAI',
    r'Transfer your editor settings into Void': r'Transfer your editor settings into PinnacleAI',
    r'When disabled, Void will not include': r'When disabled, PinnacleAI will not include',
    r'Settings that control the visibility of Void suggestions': r'Settings that control the visibility of PinnacleAI suggestions',
}

# Combined replacements for all-in-one mode
ALL_REPLACEMENTS = {
    **CSS_CLASS_REPLACEMENTS,
    **COMPONENT_NAME_REPLACEMENTS,
    **ACTION_ID_REPLACEMENTS,
    **SERVICE_INTERFACE_REPLACEMENTS,
    **TYPE_REPLACEMENTS,
    **FUNCTION_NAME_REPLACEMENTS,
    **IMPORT_PATH_REPLACEMENTS,
    **STRING_REPLACEMENTS,
}

# File extensions to process
EXTENSIONS_TO_PROCESS = {'.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.md', '.html'}

def get_files_to_process(path: str, extensions: Set[str]) -> List[str]:
    """Get all files with specified extensions in the given path."""
    files = []
    for root, _, filenames in os.walk(path):
        for filename in filenames:
            if any(filename.endswith(ext) for ext in extensions):
                files.append(os.path.join(root, filename))
    return files

def process_file(file_path: str, replacements: Dict[str, str], dry_run: bool = False) -> Tuple[int, List[str]]:
    """Process a single file with the given replacements."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes = []

        # Apply all replacements
        for pattern, replacement in replacements.items():
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                # Count occurrences
                matches = re.finditer(pattern, content)
                for match in matches:
                    changes.append(f"{pattern} → {replacement} at position {match.start()}")
                content = new_content

        # Only write if changes were made and not in dry run mode
        if content != original_content and not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

        return len(changes), changes
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return 0, []

def main():
    parser = argparse.ArgumentParser(description='Rename void to pinnacleai in codebase')
    parser.add_argument('path', help='Path to process (file or directory)')
    parser.add_argument('--type', choices=['css', 'component', 'action', 'service', 'function', 'import', 'string', 'types', 'all'],
                        default='all', help='Type of replacements to perform')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without making them')
    parser.add_argument('--report', help='Path to save JSON report of changes')
    parser.add_argument('--extensions', default=','.join(EXTENSIONS_TO_PROCESS),
                        help='Comma-separated list of file extensions to process')

    args = parser.parse_args()

    # Select the appropriate replacements based on type
    if args.type == 'css':
        replacements = CSS_CLASS_REPLACEMENTS
    elif args.type == 'component':
        replacements = COMPONENT_NAME_REPLACEMENTS
    elif args.type == 'action':
        replacements = ACTION_ID_REPLACEMENTS
    elif args.type == 'service':
        replacements = SERVICE_INTERFACE_REPLACEMENTS
    elif args.type == 'function':
        replacements = FUNCTION_NAME_REPLACEMENTS
    elif args.type == 'import':
        replacements = IMPORT_PATH_REPLACEMENTS
    elif args.type == 'string':
        replacements = STRING_REPLACEMENTS
    elif args.type == 'types':
        replacements = TYPE_REPLACEMENTS
    else:  # 'all'
        replacements = ALL_REPLACEMENTS

    # Parse extensions
    extensions = set(args.extensions.split(','))

    # Get files to process
    if os.path.isfile(args.path):
        files = [args.path]
    else:
        files = get_files_to_process(args.path, extensions)

    print(f"Found {len(files)} files to process")

    # Process files
    total_changes = 0
    report = {}

    for file_path in files:
        print(f"Processing {file_path}...")
        num_changes, changes = process_file(file_path, replacements, args.dry_run)
        total_changes += num_changes

        if num_changes > 0:
            print(f"  Made {num_changes} changes")
            report[file_path] = changes

    print(f"\nTotal changes: {total_changes}")

    if args.dry_run:
        print("This was a dry run. No files were modified.")

    # Save report if requested
    if args.report:
        with open(args.report, 'w', encoding='utf-8') as f:
            json.dump(report, f, indent=2)
        print(f"Report saved to {args.report}")

if __name__ == '__main__':
    main()
