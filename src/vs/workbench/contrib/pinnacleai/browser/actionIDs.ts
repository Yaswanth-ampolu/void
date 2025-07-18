// Normally you'd want to put these exports in the files that register them, but if you do that you'll get an import order error if you import them in certain cases.
// (importing them runs the whole file to get the ID, causing an import error). I guess it's best practice to separate out IDs, pretty annoying...

export const PINNACLEAI_CTRL_L_ACTION_ID = 'pinnacleai.ctrlLAction'

export const PINNACLEAI_CTRL_K_ACTION_ID = 'pinnacleai.ctrlKAction'

export const PINNACLEAI_ACCEPT_DIFF_ACTION_ID = 'pinnacleai.acceptDiff'

export const PINNACLEAI_REJECT_DIFF_ACTION_ID = 'pinnacleai.rejectDiff'

export const PINNACLEAI_GOTO_NEXT_DIFF_ACTION_ID = 'pinnacleai.goToNextDiff'

export const PINNACLEAI_GOTO_PREV_DIFF_ACTION_ID = 'pinnacleai.goToPrevDiff'

export const PINNACLEAI_GOTO_NEXT_URI_ACTION_ID = 'pinnacleai.goToNextUri'

export const PINNACLEAI_GOTO_PREV_URI_ACTION_ID = 'pinnacleai.goToPrevUri'

export const PINNACLEAI_ACCEPT_FILE_ACTION_ID = 'pinnacleai.acceptFile'

export const PINNACLEAI_REJECT_FILE_ACTION_ID = 'pinnacleai.rejectFile'

export const PINNACLEAI_ACCEPT_ALL_DIFFS_ACTION_ID = 'pinnacleai.acceptAllDiffs'

export const PINNACLEAI_REJECT_ALL_DIFFS_ACTION_ID = 'pinnacleai.rejectAllDiffs'
