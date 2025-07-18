#!/usr/bin/env python3

import os
import re
import argparse
from typing import Dict, List, Tuple

"""
PinnacleAI Import Path Fix Script

This script fixes import paths and component names in the React component files
after the rebranding from Void to PinnacleAI.
"""

# Define the import path corrections needed
IMPORT_PATH_CORRECTIONS = {
    # Fix import path for pinnacleaiSettingsTypes.js
    r'from \'\.\.\/common\/pinnacleaiSettingsTypes\.js\'': r'from \'../../../../../../../workbench/contrib/pinnacleai/common/pinnacleaiSettingsTypes.js\'',

    # Fix import path for pinnacleaiSettingsPane.js
    r'from \'\.\.\/pinnacleaiSettingsPane\.js\'': r'from \'../../../../pinnacleaiSettingsPane.js\'',

    # Fix path for PinnacleAiSelectionHelperWidget.js
    r'from \'\.\.\/pinnacleai\/browser\/pinnacleaiSelectionHelperWidget\.js\'': r'from \'../../../../pinnacleaiSelectionHelperWidget.js\'',
}

# Component names that need fixing
COMPONENT_REPLACEMENTS = {
    'PinnacleAiInputBox2': 'PinnacleInputBox2',
    'PinnacleAiCustomDropdownBox': 'PinnacleCustomDropdownBox',
    'PinnacleAiButtonBgDarken': 'PinnacleButtonBgDarken',
    'PinnacleAiSwitch': 'PinnacleSwitch',
    'PinnacleAiSlider': 'PinnacleSlider',
    'PinnacleAiDiffEditor': 'PinnacleDiffEditor',
    'PinnacleAiSimpleInputBox': 'PinnacleSimpleInputBox',
    '_PinnacleAiSelectBox': '_PinnacleSelectBox'
}

def process_file(file_path: str, dry_run: bool = False) -> Tuple[int, List[str]]:
    """Process a single file with the given replacements."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        original_content = content
        changes = []

        # Fix import paths
        for pattern, replacement in IMPORT_PATH_CORRECTIONS.items():
            new_content = re.sub(pattern, replacement, content)
            if new_content != content:
                changes.append(f"Fixed import path: {pattern} → {replacement}")
                content = new_content

        # Fix component names in imports
        for old_name, new_name in COMPONENT_REPLACEMENTS.items():
            # Fix in import statements
            import_pattern = r'import\s+\{([^}]*?)' + re.escape(old_name) + r'([^}]*?)\}'
            new_content = re.sub(import_pattern, lambda m: 'import {' + m.group(1) + new_name + m.group(2) + '}', content)

            if new_content != content:
                changes.append(f"Fixed import component name: {old_name} → {new_name}")
                content = new_content

            # Fix in JSX tags
            tag_pattern = r'<' + re.escape(old_name) + r'(\s|/|>)'
            new_content = re.sub(tag_pattern, '<' + new_name + r'\1', content)

            if new_content != content:
                changes.append(f"Fixed JSX tag: {old_name} → {new_name}")
                content = new_content

            # Fix closing tags
            closing_tag_pattern = r'</' + re.escape(old_name) + r'>'
            new_content = re.sub(closing_tag_pattern, '</' + new_name + '>', content)

            if new_content != content:
                changes.append(f"Fixed closing tag: {old_name} → {new_name}")
                content = new_content

        # Only write if changes were made and not in dry run mode
        if content != original_content and not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)

        return len(changes), changes
    except Exception as e:
        print(f"Error processing {file_path}: {str(e)}")
        return 0, []

def find_react_files(directory: str) -> List[str]:
    """Find all React TSX/JS files in the specified directory."""
    react_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.js'):
                react_files.append(os.path.join(root, file))
    return react_files

def main():
    parser = argparse.ArgumentParser(description='Fix import paths and component names in PinnacleAI React files')
    parser.add_argument('--src', help='Path to src directory', default='./src')
    parser.add_argument('--src2', help='Path to src2 directory', default='./src2')
    parser.add_argument('--dry-run', action='store_true', help='Show changes without making them')
    parser.add_argument('--verbose', action='store_true', help='Show detailed changes')

    args = parser.parse_args()

    # Find React files
    src_files = find_react_files(args.src) if os.path.exists(args.src) else []
    src2_files = find_react_files(args.src2) if os.path.exists(args.src2) else []
    all_files = src_files + src2_files

    print(f"Found {len(all_files)} files to process")

    # Process files
    total_changes = 0
    files_changed = 0

    for file_path in all_files:
        num_changes, changes = process_file(file_path, args.dry_run)
        total_changes += num_changes

        if num_changes > 0:
            files_changed += 1
            print(f"Made {num_changes} changes to {file_path}")
            if args.verbose:
                for change in changes:
                    print(f"  - {change}")

    print(f"\nTotal changes: {total_changes} in {files_changed} files")

    if args.dry_run:
        print("This was a dry run. No files were modified.")

if __name__ == '__main__':
    main()
