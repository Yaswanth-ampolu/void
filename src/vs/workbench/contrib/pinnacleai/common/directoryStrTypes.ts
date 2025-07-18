import { URI } from '../../../../base/common/uri.js';

export type PinnacleAIDirectoryItem = {
	uri: URI;
	name: string;
	isSymbolicLink: boolean;
	children: PinnacleAIDirectoryItem[] | null;
	isDirectory: boolean;
	isGitIgnoredDirectory: false | { numChildren: number }; // if directory is gitignored, we ignore children
} 