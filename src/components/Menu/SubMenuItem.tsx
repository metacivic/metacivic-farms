import React, { memo, useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap'
import debounce from 'lodash.debounce'

import Tooltip from '../Tooltip'
import MenuItem from './MenuItem'

import { PropsItemMenu } from './index.d'

const ItemMenu = memo<PropsItemMenu>((props: PropsItemMenu) => {
	const [open, setOpen] = useState<boolean>(true)
	useEffect(() => {
		// setOpen(!props.isCollapsed)
		setOpen(props.isCollapsed)
	}, [props.isCollapsed])
	return (
		<>
			<Tooltip
				{...(props.isCollapsed ? {} : { show: props.isCollapsed })}
				text={props.item.label}
				id={props.id}
			>
				<li
					id={props.id}
					aria-controls={`collapse-${props.id}`}
					onClick={debounce(() => setOpen((p) => !p), 100, {
						leading: true,
						trailing: false,
					})}
					className="menu-bsc-sub-menu"
				>
					<div className="menu-bsc-item-wrapper">
						<span className="menu-item-image">
							<props.item.icon />
						</span>
						{!props.isCollapsed && (
							<span className="menu-item-text">{props.item.label}</span>
						)}
					</div>
					{!props.isCollapsed && (
						<img
							src={
								open
									? '/images/menu/collapsed-close.svg'
									: '/images/menu/collapsed-open.svg'
							}
							alt="..."
						/>
					)}
				</li>
			</Tooltip>
			<Collapse in={open}>
				<div className="menu-bsc-collapsed-wrapper" id={`collapse-${props.id}`}>
					{props.item?.items?.map((subItem, subIndex) => {
						return (
							<MenuItem
								textStyle={{ fontSize: '16px' }}
								key={`${subItem.label}-${subIndex}`}
								item={subItem}
								href={subItem.href}
								click={props.click}
								id={`${props.id}-${subIndex}`}
								isCollapsed={props.isCollapsed}
							/>
						)
					})}
				</div>
			</Collapse>
		</>
	)
})

export default ItemMenu
