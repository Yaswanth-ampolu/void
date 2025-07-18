/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import React, { useEffect, useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useSettingsState } from '../util/services.js';
import { errorDetails } from '../../../../common/sendLLMMessageTypes.js';


export const ErrorDisplay = ({
  message: message_,
  fullError,
  onDismiss,
  showDismiss





}: {message: string;fullError: Error | null;onDismiss: (() => void) | null;showDismiss?: boolean;}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const details = errorDetails(fullError);
  const isExpandable = !!details;

  const message = message_ + '';

  return (
    <div className={`pinnacleai-rounded-lg pinnacleai-border pinnacleai-border-red-200 pinnacleai-bg-red-50 pinnacleai-p-4 pinnacleai-overflow-auto`}>
			{/* Header */}
			<div className="pinnacleai-flex pinnacleai-items-start pinnacleai-justify-between">
				<div className="pinnacleai-flex pinnacleai-gap-3">
					<AlertCircle className="pinnacleai-h-5 pinnacleai-w-5 pinnacleai-text-red-600 pinnacleai-mt-0.5" />
					<div className="pinnacleai-flex-1">
						<h3 className="pinnacleai-font-semibold pinnacleai-text-red-800">
							{/* eg Error */}
							Error
						</h3>
						<p className="pinnacleai-text-red-700 pinnacleai-mt-1">
							{/* eg Something went wrong */}
							{message}
						</p>
					</div>
				</div>

				<div className="pinnacleai-flex pinnacleai-gap-2">
					{isExpandable &&
          <button className="pinnacleai-text-red-600 hover:pinnacleai-text-red-800 pinnacleai-p-1 pinnacleai-rounded"
          onClick={() => setIsExpanded(!isExpanded)}>
            
							{isExpanded ?
            <ChevronUp className="pinnacleai-h-5 pinnacleai-w-5" /> :

            <ChevronDown className="pinnacleai-h-5 pinnacleai-w-5" />
            }
						</button>
          }
					{showDismiss && onDismiss &&
          <button className="pinnacleai-text-red-600 hover:pinnacleai-text-red-800 pinnacleai-p-1 pinnacleai-rounded"
          onClick={onDismiss}>
            
							<X className="pinnacleai-h-5 pinnacleai-w-5" />
						</button>
          }
				</div>
			</div>

			{/* Expandable Details */}
			{isExpanded && details &&
      <div className="pinnacleai-mt-4 pinnacleai-space-y-3 pinnacleai-border-t pinnacleai-border-red-200 pinnacleai-pt-3 pinnacleai-overflow-auto">
					<div>
						<span className="pinnacleai-font-semibold pinnacleai-text-red-800">Full Error: </span>
						<pre className="pinnacleai-text-red-700">{details}</pre>
					</div>
				</div>
      }
		</div>);

};