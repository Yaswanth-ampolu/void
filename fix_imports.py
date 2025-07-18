#!/usr/bin/env python3
import os
import re
import glob
import argparse

def fix_imports(file_path, dry_run=False, verbose=False):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix invalid escape characters
    content = re.sub(r"from \\'(.+?)\\'", r"from '\1'", content)

    # Fix service names
    content = re.sub(r"accessor\.get\('IPinnacleAiSettingsService'\)", r"accessor.get('IPinnacleSettingsService')", content)
    content = re.sub(r"accessor\.get\('IPinnacleAISettingsService'\)", r"accessor.get('IPinnacleSettingsService')", content)
    content = re.sub(r"accessor\.get\('IPinnacleAiModelService'\)", r"accessor.get('IPinnacleAIModelService')", content)

    # Fix component names
    content = re.sub(r"PinnacleAiSelectionHelperProps", r"PinnacleAISelectionHelperProps", content)
    content = re.sub(r"PinnacleAiStatefulModelInfo", r"PinnacleAIStatefulModelInfo", content)

    # Fix feature names
    content = re.sub(r"'Ctrl\+K'", r"'Apply'", content)

    # Fix import paths
    content = re.sub(r"import \{ PINNACLEAI_OPEN_SETTINGS_ACTION_ID \} from '\.\.\/\.\.\/\.\.\/\.\.\/pinnacleaiSettingsPane\.(?:js|ts)';",
                    r"import { PINNACLEAI_OPEN_SETTINGS_ACTION_ID } from '../../../actionIDs.js';", content)

    # Fix method calls
    content = re.sub(r"await editCodeService\.callBeforeApplyOrEdit\(opts\)",
                    r"await editCodeService.callBeforeApplyOrEdit('current')", content)

    if content != original_content:
        if not dry_run:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            if verbose:
                print(f"Fixed imports in {file_path}")
            return 1
        else:
            if verbose:
                print(f"Would fix imports in {file_path}")
            return 1
    return 0

def main():
    parser = argparse.ArgumentParser(description='Fix imports in React files')
    parser.add_argument('--dry-run', action='store_true', help='Do not modify files, just print what would be done')
    parser.add_argument('--verbose', action='store_true', help='Print verbose output')
    args = parser.parse_args()

    # Find all TypeScript and JavaScript files in the React directory
    react_dir = os.path.join('src', 'vs', 'workbench', 'contrib', 'pinnacleai', 'browser', 'react')
    ts_files = glob.glob(os.path.join(react_dir, 'src', '**', '*.tsx'), recursive=True)
    ts_files.extend(glob.glob(os.path.join(react_dir, 'src', '**', '*.ts'), recursive=True))
    ts_files.extend(glob.glob(os.path.join(react_dir, 'src', '**', '*.jsx'), recursive=True))
    ts_files.extend(glob.glob(os.path.join(react_dir, 'src', '**', '*.js'), recursive=True))

    print(f"Found {len(ts_files)} files to process")

    total_files_changed = 0
    total_changes = 0

    for file_path in ts_files:
        changes = fix_imports(file_path, args.dry_run, args.verbose)
        if changes > 0:
            total_files_changed += 1
            total_changes += changes

    print(f"\nTotal changes: {total_changes} in {total_files_changed} files")
    if args.dry_run:
        print("This was a dry run. No files were modified.")

if __name__ == "__main__":
    main()
