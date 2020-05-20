import React from 'react'

import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

import {createDevTools} from 'redux-devtools'

const DevTools = createDevTools(
	<DockMonitor toggleVisibilityKey='ctrl-m'
								changePositionKey = 'ctrl-q'>
			<LogMonitor theme='tomorrow' />
	</DockMonitor>
	)

export default DevTools