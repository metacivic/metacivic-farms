/* eslint-disable react/no-children-prop, react/destructuring-assignment */

import React, { memo } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

import { PropsTooltipBSC } from './index.d'

const TooltipBSC = memo(({ children, text, id, show }: PropsTooltipBSC) => {
	return (
		<OverlayTrigger
			show={show}
			placement="auto"
			overlay={(props) => (
				<Tooltip id={`tooltip-${id}`} {...props}>
					{text}
				</Tooltip>
			)}
		>
			{children}
		</OverlayTrigger>
	)
})

export default TooltipBSC
