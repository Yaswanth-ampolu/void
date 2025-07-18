/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

const gulp = require('gulp');
const task = require('./lib/task');
const { execSync } = require('child_process');
const path = require('path');

// PinnacleAI React build task
const buildPinnacleAIReactTask = task.define('build-pinnacleai-react', async () => {
	console.log('🚀 Building PinnacleAI React components...');
	try {
		execSync('cd ./src/vs/workbench/contrib/pinnacleai/browser/react/ && node build.js', {
			stdio: 'inherit',
			cwd: process.cwd()
		});
		console.log('✅ PinnacleAI React build completed successfully');
	} catch (error) {
		console.error('❌ PinnacleAI React build failed:', error.message);
		throw error;
	}
});

// PinnacleAI React watch task
const watchPinnacleAIReactTask = task.define('watch-pinnacleai-react', async () => {
	console.log('🔄 Starting PinnacleAI React watch mode...');
	try {
		execSync('cd ./src/vs/workbench/contrib/pinnacleai/browser/react/ && node build.js --watch', {
			stdio: 'inherit',
			cwd: process.cwd()
		});
	} catch (error) {
		console.error('❌ PinnacleAI React watch failed:', error.message);
		throw error;
	}
});

// Export tasks for use in main gulpfile
gulp.task(buildPinnacleAIReactTask);
gulp.task(watchPinnacleAIReactTask);

// Integrate with main compile task
const compilePinnacleAITask = task.define('compile-pinnacleai', task.series(
	buildPinnacleAIReactTask
));

gulp.task(compilePinnacleAITask);

// Export for use in main gulpfile
exports.buildPinnacleAIReactTask = buildPinnacleAIReactTask;
exports.watchPinnacleAIReactTask = watchPinnacleAIReactTask;
exports.compilePinnacleAITask = compilePinnacleAITask;
