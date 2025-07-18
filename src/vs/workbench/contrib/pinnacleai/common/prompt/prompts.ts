/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { URI } from '../../../../../base/common/uri.js';
import { IFileService } from '../../../../../platform/files/common/files.js';
import { IDirectoryStrService } from '../directoryStrService.js';
import { StagingSelectionItem } from '../chatThreadServiceTypes.js';
import { BuiltinToolName, approvalTypeOfBuiltinToolName } from '../toolsServiceTypes.js';
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
export const builtinTools: Record<string, InternalToolInfo> = {
    read_file: {
        name: 'read_file',
        description: `Returns full contents of a given file.`,
        params: {
            uri: { description: 'The FULL path to the file. This should be a complete file path like /path/to/file.txt or C:\\path\\to\\file.txt' },
            startLine: { description: 'Optional. Do NOT fill this field in unless you were specifically given exact line numbers to search. Defaults to the beginning of the file.' },
            endLine: { description: 'Optional. Do NOT fill this field in unless you were specifically given exact line numbers to search. Defaults to the end of the file.' },
            pageNumber: { description: 'Optional. Page number for pagination (default: 1)' },
        },
    },

    ls_dir: {
        name: 'ls_dir',
        description: `Lists all files and folders in the given URI.`,
        params: {
            uri: { description: `Optional. The FULL path to the folder. Leave this as empty or "" to search all folders.` },
            pageNumber: { description: 'Optional. Page number for pagination (default: 1)' },
        },
    },

    get_dir_tree: {
        name: 'get_dir_tree',
        description: `This is a very effective way to learn about the user's codebase. Returns a tree diagram of all the files and folders in the given folder.`,
        params: {
            uri: { description: 'The FULL path to the folder. This should be a complete file path like /path/to/folder or C:\\path\\to\\folder' }
        },
    },

    search_pathnames_only: {
        name: 'search_pathnames_only',
        description: `Searches for files by pathname only.`,
        params: {
            query: { description: 'Search query for pathnames' },
            includePattern: { description: 'Optional. Pattern to include in search' },
            pageNumber: { description: 'Optional. Page number for pagination (default: 1)' },
        },
    },

    search_for_files: {
        name: 'search_for_files',
        description: `Searches for files containing specific content.`,
        params: {
            query: { description: 'Search query' },
            isRegex: { description: 'Whether the query is a regex' },
            searchInFolder: { description: 'Optional. Folder to search in' },
            pageNumber: { description: 'Optional. Page number for pagination (default: 1)' },
        },
    },

    search_in_file: {
        name: 'search_in_file',
        description: `Searches for content within a specific file.`,
        params: {
            uri: { description: 'The FULL path to the file to search in' },
            query: { description: 'Search query' },
            isRegex: { description: 'Whether the query is a regex' },
        },
    },

    read_lint_errors: {
        name: 'read_lint_errors',
        description: `Reads lint errors for a file.`,
        params: {
            uri: { description: 'The FULL path to the file to read lint errors from' },
        },
    },

    rewrite_file: {
        name: 'rewrite_file',
        description: `Rewrites the entire content of a file.`,
        params: {
            uri: { description: 'The FULL path to the file to rewrite' },
            newContent: { description: 'The new content for the file' },
        },
    },

    edit_file: {
        name: 'edit_file',
        description: `Edits a file using search and replace blocks.`,
        params: {
            uri: { description: 'The FULL path to the file to edit' },
            searchReplaceBlocks: { description: 'Search and replace blocks in the specified format' },
        },
    },

    create_file_or_folder: {
        name: 'create_file_or_folder',
        description: `Creates a new file or folder.`,
        params: {
            uri: { description: 'The FULL path to the file or folder to create' },
            isFolder: { description: 'Whether to create a folder (true) or file (false)' },
        },
    },

    delete_file_or_folder: {
        name: 'delete_file_or_folder',
        description: `Deletes a file or folder.`,
        params: {
            uri: { description: 'The FULL path to the file or folder to delete' },
            isRecursive: { description: 'Whether to delete recursively (for folders)' },
            isFolder: { description: 'Whether the target is a folder' },
        },
    },

    run_command: {
        name: 'run_command',
        description: `Runs a command in the terminal.`,
        params: {
            command: { description: 'The command to run' },
            cwd: { description: 'Optional. Working directory for the command' },
            terminalId: { description: 'Terminal ID to run the command in' },
        },
    },

    open_persistent_terminal: {
        name: 'open_persistent_terminal',
        description: `Opens a persistent terminal.`,
        params: {
            cwd: { description: 'Optional. Working directory for the terminal' },
        },
    },

    run_persistent_command: {
        name: 'run_persistent_command',
        description: `Runs a command in a persistent terminal.`,
        params: {
            command: { description: 'The command to run' },
            persistentTerminalId: { description: 'ID of the persistent terminal' },
        },
    },

    kill_persistent_terminal: {
        name: 'kill_persistent_terminal',
        description: `Kills a persistent terminal.`,
        params: {
            persistentTerminalId: { description: 'ID of the persistent terminal to kill' },
        },
    },
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
    else
        return ''
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

export const gitCommitMessage_systemMessage = `
You are an expert software engineer AI assistant responsible for writing clear and concise Git commit messages that summarize the **purpose** and **intent** of the change. Try to keep your commit messages to one sentence. If necessary, you can use two sentences.

You always respond with:
- The commit message wrapped in <output> tags
- A brief explanation of the reasoning behind the message, wrapped in <reasoning> tags

Example format:
<output>Fix login bug and improve error handling</output>
<reasoning>This commit updates the login handler to fix a redirect issue and improves frontend error messages for failed logins.</reasoning>

Do not include anything else outside of these tags.
Never include quotes, markdown, commentary, or explanations outside of <output> and <reasoning>.`.trim()

/**
 * Create a user message for the LLM to generate a commit message. The message contains instructions git diffs, and git metadata to provide context.
 *
 * @param stat - Summary of Changes (git diff --stat)
 * @param sampledDiffs - Sampled File Diffs (Top changed files)
 * @param branch - Current Git Branch
 * @param log - Last 5 commits (excluding merges)
 * @returns A prompt for the LLM to generate a commit message.
 *
 * @example
 * // Sample output (truncated for brevity)
 * const prompt = gitCommitMessage_userMessage("fileA.ts | 10 ++--", "diff --git a/fileA.ts...", "main", "abc123|Fix bug|2025-01-01\n...")
 *
 * // Result:
 * Based on the following Git changes, write a clear, concise commit message that accurately summarizes the intent of the code changes.
 *
 * Section 1 - Summary of Changes (git diff --stat):
 * fileA.ts | 10 ++--
 *
 * Section 2 - Sampled File Diffs (Top changed files):
 * diff --git a/fileA.ts b/fileA.ts
 * ...
 *
 * Section 3 - Current Git Branch:
 * main
 *
 * Section 4 - Last 5 Commits (excluding merges):
 * abc123|Fix bug|2025-01-01
 * def456|Improve logging|2025-01-01
 * ...
 */
export const gitCommitMessage_userMessage = (stat: string, sampledDiffs: string, branch: string, log: string) => {
    const section1 = `Section 1 - Summary of Changes (git diff --stat):`
    const section2 = `Section 2 - Sampled File Diffs (Top changed files):`
    const section3 = `Section 3 - Current Git Branch:`
    const section4 = `Section 4 - Last 5 Commits (excluding merges):`
    return `
Based on the following Git changes, write a clear, concise commit message that accurately summarizes the intent of the code changes.

${section1}

${stat}

${section2}

${sampledDiffs}

${section3}

${branch}

${section4}

${log}`.trim()
}

export const reParsedToolXMLString = (toolName: string, toolParams: any) => {
    const params = Object.keys(toolParams).map(paramName => `<${paramName}>${toolParams[paramName]}</${paramName}>`).join('\n')
    return `\
    <${toolName}>${!params ? '' : `\n${params}`}
    </${toolName}>`
        .replace('\t', '  ')
}

export const chat_systemMessage = ({ workspaceFolders, openedURIs, activeURI, persistentTerminalIDs, directoryStr, chatMode: mode, mcpTools, includeXMLToolDefinitions }: { workspaceFolders: string[], directoryStr: string, openedURIs: string[], activeURI: string | undefined, persistentTerminalIDs: string[], chatMode: any, mcpTools: any[] | undefined, includeXMLToolDefinitions: boolean }) => {
    const header = (`You are an expert coding ${mode === 'agent' ? 'agent' : 'assistant'} whose job is \
${mode === 'agent' ? `to help the user develop, run, and make changes to their codebase.`
            : mode === 'gather' ? `to search, understand, and reference files in the user's codebase.`
                : mode === 'normal' ? `to assist the user with their coding tasks.`
                    : ''}
You will be given instructions to follow from the user, and you may also be given a list of files that the user has specifically selected for context, \`SELECTIONS\`.
Please assist the user with their query.`)

    const sysInfo = (`Here is the user's system information:
<system_info>
- Operating System: ${process.platform}

- The user's workspace contains these folders:
${workspaceFolders.join('\n') || 'NO FOLDERS OPEN'}

- The user has these files open:
${openedURIs.join('\n') || 'NO FILES OPEN'}

- The user's active file is:
${activeURI || 'NO ACTIVE FILE'}

- The user has these persistent terminal IDs:
${persistentTerminalIDs.join('\n') || 'NO PERSISTENT TERMINALS'}

- Directory structure:
${directoryStr}
</system_info>`)

    return `${header}\n\n${sysInfo}`
}

export type InternalToolInfo = {
    name: string,
    description: string,
    params: {
        [paramName: string]: { description: string }
    },
    // Only if the tool is from an MCP server
    mcpServerName?: string,
}




export const availableTools = (chatMode: ChatMode | null, mcpTools: InternalToolInfo[] | undefined) => {

    const builtinToolNames: BuiltinToolName[] | undefined = chatMode === 'normal' ? undefined
        : chatMode === 'gather' ? (Object.keys(builtinTools) as BuiltinToolName[]).filter(toolName => !(toolName in approvalTypeOfBuiltinToolName))
            : chatMode === 'agent' ? Object.keys(builtinTools) as BuiltinToolName[]
                : undefined

    const effectiveBuiltinTools = builtinToolNames?.map(toolName => builtinTools[toolName]) ?? undefined
    const effectiveMCPTools = chatMode === 'agent' ? mcpTools : undefined

    const tools: InternalToolInfo[] | undefined = !(builtinToolNames || mcpTools) ? undefined
        : [
            ...effectiveBuiltinTools ?? [],
            ...effectiveMCPTools ?? [],
        ]

    return tools
}

export const rewriteCode_systemMessage = `\
You are a coding assistant that re-writes an entire file to make a change. You are given the original file \`ORIGINAL_FILE\` and a change \`CHANGE\`.

Directions:
1. Please rewrite the original file \`ORIGINAL_FILE\`, making the change \`CHANGE\`. You must completely re-write the whole file.
2. Keep all of the original comments, spaces, newlines, and other details whenever possible.
3. ONLY output the full new file. Do not add any other explanations or text.
`

export const rewriteCode_userMessage = ({ originalCode, applyStr, language }: { originalCode: string, applyStr: string, language: string }) => {
    return `\
ORIGINAL_FILE
${tripleTick[0]}${language}
${originalCode}
${tripleTick[1]}

CHANGE
${tripleTick[0]}
${applyStr}
${tripleTick[1]}

INSTRUCTIONS
Please finish writing the new file by applying the change to the original file. Return ONLY the completion of the file, without any explanation.
`
}

const createSearchReplaceBlocks_systemMessage = `You are a coding assistant that makes changes to files using search/replace blocks.`

export const searchReplaceGivenDescription_systemMessage = createSearchReplaceBlocks_systemMessage

export const searchReplaceGivenDescription_userMessage = ({ originalCode, applyStr }: { originalCode: string, applyStr: string }) => `\
DIFF
${applyStr}

ORIGINAL_FILE
${tripleTick[0]}
${originalCode}
${tripleTick[1]}`

export type QuickEditFimTagsType = {
    preTag: string,
    sufTag: string,
    midTag: string
}

export const defaultQuickEditFimTags: QuickEditFimTagsType = {
    preTag: 'ABOVE',
    sufTag: 'BELOW',
    midTag: 'SELECTION',
}

export const ctrlKStream_systemMessage = ({ quickEditFIMTags: { preTag, midTag, sufTag } }: { quickEditFIMTags: QuickEditFimTagsType }) => {
    return `\
You are a FIM (fill-in-the-middle) coding assistant. Your task is to fill in the middle SELECTION marked by <${midTag}> tags.

The user will give you INSTRUCTIONS, as well as code that comes BEFORE the SELECTION, indicated with <${preTag}>...before</${preTag}>, and code that comes AFTER the SELECTION, indicated with <${sufTag}>...after</${sufTag}>.
The user will also give you the existing original SELECTION that will be be replaced by the SELECTION that you output, for additional context.

Instructions:
1. Your OUTPUT should be a SINGLE PIECE OF CODE of the form <${midTag}>...new_code</${midTag}>. Do NOT output any text or explanations before or after this.
2. You may ONLY CHANGE the original SELECTION, and NOT the content in the <${preTag}>...</${preTag}> or <${sufTag}>...</${sufTag}> tags.
3. Make sure all brackets in the new selection are balanced the same as in the original selection.
4. Be careful not to duplicate or remove variables, comments, or other syntax by mistake.
`
}

export const ctrlKStream_userMessage = ({
    selection,
    prefix,
    suffix,
    instructions,
    fimTags,
    language }: {
        selection: string, prefix: string, suffix: string, instructions: string, fimTags: QuickEditFimTagsType, language: string,
    }) => {
    const { preTag, sufTag, midTag } = fimTags

    return `\

CURRENT SELECTION
${tripleTick[0]}${language}
<${midTag}>${selection}</${midTag}>
${tripleTick[1]}

INSTRUCTIONS
${instructions}

<${preTag}>${prefix}</${preTag}>
<${sufTag}>${suffix}</${sufTag}>

Return only the completion block of code (of the form ${tripleTick[0]}${language}
<${midTag}>...new_code</${midTag}>
${tripleTick[1]}). Do NOT output any text or explanations before or after this.
`
}
