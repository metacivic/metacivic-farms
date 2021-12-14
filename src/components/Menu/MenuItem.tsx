import React, { memo } from 'react'
import debounce from 'lodash.debounce'

import { PropsItemMenu } from './index.d'

import Tooltip from '../Tooltip'

const MenuItem = memo<PropsItemMenu>((props: PropsItemMenu) => {
	return (
		<Tooltip
			{...(props.isCollapsed ? {} : { show: props.isCollapsed })}
			text={props.item.label}
			id={props.id}
		>
			<li
				id={props.id}
				onClick={debounce(() => props.click(props.id, props.href), 200, {
					leading: true,
					trailing: false,
				})}
				className="menu-bsc-item"
			>
				<div className="menu-bsc-item-wrapper">
					<span className="menu-item-image">
						{props.item.icon && (<props.item.icon />)}
					</span>
					{!props.isCollapsed && (
						<span style={props.textStyle} className="menu-item-text">
							{props.item.label}
						</span>
					)}
				</div>
			</li>
		</Tooltip>
	)
})

export default MenuItem
