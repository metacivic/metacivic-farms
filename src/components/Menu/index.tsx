/* eslint-disable @typescript-eslint/no-inferrable-types */
import React, {
	forwardRef,
	memo,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from 'react'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router'

import useGetPriceData from '../../hooks/useGetPriceData'
import ItemMenu from './MenuItem'
import SubMenuItem from './SubMenuItem'
import config from './config'
import { formatNumberPrice } from '../../utils/formatBalance'
import './index.less'

const MenuBSC = memo(
	forwardRef<any, any>(({ style }: any, ref: any) => {
		const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
		const [itemSelected, setItemSelected] = useState<string>('')
		const history = useHistory()
		const priceData: any = useGetPriceData()
		const cakePriceUsd = priceData ? Number(priceData.usd) : '0.00'
		const priceBSCS = formatNumberPrice(cakePriceUsd)
		useImperativeHandle(
			ref,
			() => {
				return {
					toggleCollapsed: () =>
						new Promise((res) => {
							setIsCollapsed((prev) => {
								res(!prev)
								return !prev
							})
						}),
					isCollapsed,
				}
			},
			[isCollapsed],
		)

		const handleClick = (itemKey: string, href: string = '/') => {
			setItemSelected(itemKey)
			if (href.indexOf('https') > -1 || href.indexOf('http') > -1) {
				window.location.href = href
			} else {
				history.push(href)
			}
		}

		useEffect(() => {
			setIsCollapsed(isMobile)
		}, [isMobile])

		useEffect(() => {
			if (itemSelected) {
				const selecteds = document.getElementsByClassName(
					'menu-bsc-item-selected',
				)
				for (let i = 0; i < selecteds.length; i++) {
					const ele = selecteds[i]
					ele.classList.remove('menu-bsc-item-selected')
				}
				document
					.getElementById(itemSelected)
					?.classList.add('menu-bsc-item-selected')
			}
		}, [itemSelected])

		return (
			<div
				className={`menu-bsc ${isCollapsed ? 'menu-bsc-collapsed' : ''} ${
					isMobile
						? isCollapsed
							? 'menu-bsc-mobile'
							: 'menu-bsc-mobile menu-bsc-mobile-collapsed'
						: ''
				}`}
			>
				{/* <div
        className='menu-bsc-header'
      >
        ccc
      </div> */}
				<ul className="menu-bsc-body hiden-scrollbar">
					{config.map((mainItem, mainIndex) => {
						return mainItem.items && mainItem.items.length > 0 ? (
							<SubMenuItem
								key={`${mainItem.label}-${mainIndex}`}
								id={`menu-bsc-sub-menu-${mainIndex}`}
								item={mainItem}
								click={handleClick}
								onOpen={() => setIsCollapsed((prev) => !prev)}
								isCollapsed={isCollapsed}
							/>
						) : (
							<ItemMenu
								key={`${mainItem.label}-${mainIndex}`}
								id={`menu-bsc-item-${mainIndex}`}
								item={mainItem}
								href={mainItem.href}
								click={handleClick}
								isCollapsed={isCollapsed}
							/>
						)
					})}
				</ul>
				<div className="menu-bsc-bottom">
					<div className="menu-bsc-bottom-top flex-center-bsc menu-bsc-bottom-divider">
						{isCollapsed ? (
							<img src="/images/brand-bsc-black.svg" alt="..." />
						) : (
							<>
								<img src="/images/brand-bsc-black.svg" alt="..." />
								<span>${priceBSCS}</span>
							</>
						)}
					</div>
					<div className="menu-bsc-bottom-bottom flex-center-bsc menu-bsc-bottom-divider">
						{isCollapsed ? (
							<img src="/images/social-network/share-3.svg" alt="telegram" />
						) : (
							<>
								<a
									href="/"
									target="_blank"
									rel="noreferrer"
								>
									<img
										src="/images/social-network/telegram.svg"
										alt="telegram"
									/>
								</a>
								<a
									href="https://twitter.com/"
									target="_blank"
									rel="noreferrer"
								>
									<img src="/images/social-network/twitter.svg" alt="twitter" />
								</a>
								<a
									href="https://.medim.com/"
									target="_blank"
									rel="noreferrer"
								>
									<img src="/images/social-network/medium.svg" alt="medium" />
								</a>
							</>
						)}
					</div>
				</div>
			</div>
		)
	}),
)

export default MenuBSC
/* eslint-enable react/no-array-index-key */
