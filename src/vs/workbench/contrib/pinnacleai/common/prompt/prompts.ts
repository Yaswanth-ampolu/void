/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { URI } from '../../../../../base/common/uri.js';
import { IFileService } from '../../../../../platform/files/common/files.js';
import { IDirectoryStrService } from '../directoryStrService.js';
import { StagingSelectionItem } from '../chatThreadServiceTypes.js';
import { os } from '../helpers/systemInfo.js';
import { RawToolParamsObj } from '../sendLLMMessageTypes.js';
import { approvalTypeOfBuiltinToolName, BuiltinToolCallParams, BuiltinToolName, BuiltinToolResultType, ToolName } from '../toolsServiceTypes.js';
import { ChatMode } from '../pinnacleaiSettingsTypes.js';

// Triple backtick wrapper used throughout the prompts for code blocks
export const tripleTick = ['```', '```']

// Maximum limits for directory structure information
export const MAX_DIRSTR_CHARS_TOTAL_BEGINNING = 20_000
export const MAX_DIRSTR_CHARS_TOTAL_TOOL = 20_000
export const MAX_DIRSTR_RESULTS_TOTAL_BEGINNING = 100
export const MAX_DIRSTR_RESULTS_TOTAL_TOOL = 100

// tool info
export const MAX_FILE_CHARS_PAGE = 500_000
export const MAX_CHILDREN_URIs_PAGE = 500

// terminal tool info
export const MAX_TERMINAL_CHARS = 100_000
export const MAX_TERMINAL_INACTIVE_TIME = 8 // seconds
export const MAX_TERMINAL_BG_COMMAND_TIME = 5


// Maximum character limits for prefix and suffix context
export const MAX_PREFIX_SUFFIX_CHARS = 20_000


export const ORIGINAL = `<<<<<<< ORIGINAL`
export const DIVIDER = `=======`
export const FINAL = `>>>>>>> UPDATED`

// Define the builtinTools object
export const builtinTools: Record<string, any> = {
    read_file: { name: 'read_file' },
    ls_dir: { name: 'ls_dir' },
    search_pathnames_only: { name: 'search_pathnames_only' },
    edit_file: { name: 'edit_file' }
    // ... other built-in tools would be defined here
};

// Define the builtinToolNames array
export const builtinToolNames = Object.keys(builtinTools) as BuiltinToolName[];

// Add the isABuiltinToolName function
const toolNamesSet = new Set<string>(builtinToolNames);
export const isABuiltinToolName = (toolName: string): toolName is BuiltinToolName => {
    const isAToolName = toolNamesSet.has(toolName);
    return isAToolName;
}

// Note: This file is too large to include in full
// The following function has been renamed from voidPrefixAndSuffix to pinnaclePrefixAndSuffix
export const pinnaclePrefixAndSuffix = ({ fullFileStr, startLine, endLine }: { fullFileStr: string, startLine: number, endLine: number }) => {
    const lines = fullFileStr.split(/\r?\n/)

    // Get prefix
    let prefix = ''
    const prefixLines = lines.slice(0, startLine)
    if (prefixLines.length > 0) {
        // Take up to MAX_PREFIX_SUFFIX_CHARS characters from the end of the prefix
        prefix = prefixLines.join('\n')
        if (prefix.length > MAX_PREFIX_SUFFIX_CHARS) {
            prefix = prefix.substring(prefix.length - MAX_PREFIX_SUFFIX_CHARS)
            // Make sure we start at a newline
            const firstNewline = prefix.indexOf('\n')
            if (firstNewline !== -1) {
                prefix = prefix.substring(firstNewline + 1)
            }
        }
    }

    // Get suffix
    let suffix = ''
    const suffixLines = lines.slice(endLine)
    if (suffixLines.length > 0) {
        // Take up to MAX_PREFIX_SUFFIX_CHARS characters from the beginning of the suffix
        suffix = suffixLines.join('\n')
        if (suffix.length > MAX_PREFIX_SUFFIX_CHARS) {
            suffix = suffix.substring(0, MAX_PREFIX_SUFFIX_CHARS)
            // Make sure we end at a newline
            const lastNewline = suffix.lastIndexOf('\n')
            if (lastNewline !== -1) {
                suffix = suffix.substring(0, lastNewline)
            }
        }
    }

    return { prefix, suffix }
}

// Function to read a file's contents
export const readFile = async (fileService: IFileService, uri: URI, fileSizeLimit: number): Promise<{
    val: string,
    truncated: boolean,
    fullFileLen: number,
} | {
    val: null,
    truncated?: undefined
    fullFileLen?: undefined,
}> => {
    try {
        const content = await fileService.readFile(uri)
        const contentStr = content.value.toString()
        const truncated = contentStr.length > fileSizeLimit
        return {
            val: truncated ? contentStr.slice(0, fileSizeLimit) : contentStr,
            truncated,
            fullFileLen: contentStr.length
        }
    } catch (e) {
        return { val: null }
    }
}

// Function to generate a message for a selection
export const messageOfSelection = async (
    s: StagingSelectionItem,
    opts: {
        directoryStrService: IDirectoryStrService,
        fileService: IFileService,
        folderOpts: {
            maxChildren: number,
            maxCharsPerFile: number,
        }
    }
) => {
    const lineNumAddition = (range: [number, number]) => ` (lines ${range[0]}:${range[1]})`

    if (s.type === 'File') {
        const readResult = await readFile(opts.fileService, s.uri, opts.folderOpts.maxCharsPerFile)
        if (!readResult.val) return `[Attempted to access file but failed (likely a permissions issue): ${s.uri.toString()}]`
        const { val, truncated, fullFileLen } = readResult

        const truncationMessage = truncated ? `\n[Note: file was truncated at ${opts.folderOpts.maxCharsPerFile} chars (full length: ${fullFileLen} chars)]` : ''
        return `${s.uri.fsPath}\n\`\`\`\n${val}${truncationMessage}\n\`\`\``
    } else if (s.type === 'CodeSelection') {
        const readResult = await readFile(opts.fileService, s.uri, opts.folderOpts.maxCharsPerFile)
        if (!readResult.val) return `[Attempted to access file but failed (likely a permissions issue): ${s.uri.toString()}]`

        const lines = readResult.val.split('\n')
        const [startLine, endLine] = s.range
        const selectedText = lines.slice(startLine - 1, endLine).join('\n')

        return `${s.uri.fsPath}${lineNumAddition(s.range)}\n\`\`\`\n${selectedText}\n\`\`\``
    } else if (s.type === 'Folder') {
        const dirStr = await opts.directoryStrService.getDirectoryStrTool(s.uri)

        return `${s.uri.fsPath}\n${dirStr}`
    }

    return `Unknown selection type: ${s.type}`
}

// Add the chat_userMessageContent function
export const chat_userMessageContent = async (
    instructions: string,
    currSelns: StagingSelectionItem[] | null,
    opts: {
        directoryStrService: IDirectoryStrService,
        fileService: IFileService
    },
) => {
    if (!currSelns || currSelns.length === 0) {
        return instructions
    }

    // build selection messages
    const selectionMessages = await Promise.all(
        currSelns.map(s => messageOfSelection(s, {
            directoryStrService: opts.directoryStrService,
            fileService: opts.fileService,
            folderOpts: {
                maxChildren: MAX_CHILDREN_URIs_PAGE,
                maxCharsPerFile: MAX_FILE_CHARS_PAGE,
            }
        }))
    )

    // Format the user message to include the selection message
    const selectionMessagesStr = `SELECTIONS:\n${selectionMessages.join('\n\n')}`

    return `${selectionMessagesStr}\n\n${instructions}`
}
