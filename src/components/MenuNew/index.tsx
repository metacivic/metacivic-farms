import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu, Modal } from 'antd'
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import Button from '../ButtonV2'
import MenuNewMobile from './MenuNewMobile'
import useModal from '../../hooks/useModal'
import AccountModal from '../../components/TopBar/components/AccountModal'
import WalletProviderModal from '../WalletProviderModal/WalletProviderModal'

import { ReactComponent as TradeIcon } from '../../assets/h__img/Trade.svg'
import { ReactComponent as EarnIcon } from '../../assets/h__img/Earn.svg'
import { ReactComponent as NftIcon } from '../../assets/h__img/NFT.svg'
import { ReactComponent as GameIcon } from '../../assets/h__img/Game.svg'
import { ReactComponent as DotIcon } from '../../assets/h__img/3dot.svg'

import { ReactComponent as WalletIcon } from '../../assets/h__img/Wallet.svg'
// import { ReactComponent as LogoIcon } from '../../assets/h__img/logo-MCV-fff.svg'

// import UnlockButton from '../ConnectWalletButton'
import 'antd/dist/antd.css'
import './style.less'

const MenuNew = () => {
	const [width, setWidth] = useState<number>(window.innerWidth)

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const { account } = useWallet()
	const customAccount = useMemo<string>(() => {
		if (account) {
			return `${account.substr(0, 4)}...${account.substr(account.length - 4)}`
		} else {
			return `Connect Wallet`
		}
	}, [account])
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
	const [onPresentAccountModal] = useModal(<AccountModal />)

	const isMobilez = width <= 769

	if (isMobilez) {
		return <MenuNewMobile />
	}

	return (
		<>
			<header>
				<div className="main-header">
					<div className="all mcv_cus">
						<div className="header-left">
							<div className="main-logo">
								<Link to="/">
									<div className="d-flex align-items-center h__Logo">
										<img
											className="Mcv__iconBig"
											src="/logo-MCV-ffff.svg"
											alt="big"
										/>
										<img
											className="Mcv__iconMini"
											src="/images/lgmini.svg"
											alt="mini"
											style={{ height: 40 }}
										/>
									</div>
								</Link>
							</div>
							<div className="main-menu">
								<ul className="list-menu h__customListMenu">
									<li>
										<div className="h__customLogoTrade">
											<TradeIcon />
										</div>
										Trade
										<div className="submenu-nav">
											<ul>
												<li>
													<a href="https://metacivic.io/#/swap">Exchange</a>
												</li>
												<li>
													<a href="https://metacivic.io/#/pool">Liquidity</a>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div className="h__customLogoTrade">
											<EarnIcon />
										</div>
										Earns
										<div className="submenu-nav">
											<ul>
												<li>
													<Link to="/">Start Pools</Link>
												</li>
												<li>
													<Link to="/Farms">Farm</Link>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div className="h__customLogoTrade">
											<NftIcon />
										</div>
										NFT
										<div className="submenu-nav">
											<ul>
												<li>
													<a href="https://metacivic.io/#/mintNFT">Mint NFT</a>
												</li>
												<li>
													<a href="https://metacivic.io/#/NFTmarket">
														NFT Markets
													</a>
												</li>
											</ul>
										</div>
									</li>
									<li>
										<div className="h__customLogoTrade">
											<GameIcon />
										</div>

										<a
											style={{ color: '#b8bdb9' }}
											href="https://metacivic.io/#/Games"
										>
											Games
										</a>
									</li>

									<li>
										{/* <img src="icon-menu.png" alt="" /> */}
										<span>
											<DotIcon />
										</span>
										<div className="submenu-nav">
											<ul>
												<li>
													<Link to="/">Docs</Link>
												</li>
												<li>
													<Link to="/">Blogs</Link>
												</li>
												<li>
													<Link to="/">Github</Link>
												</li>
												<li>
													<Link to="/">Certick Audit</Link>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
							{/* fagsjdha  */}
						</div>
						<div className="header-right gap">
							<div className="btnMcv-cus">
								<Button
									primary
									// click={onPresentWalletProviderModal}
									text="Buy MCV"
									className="h__btn"
								/>
							</div>
							<div className="value-token ">
								<img src="logo-mini.svg" alt="" />{' '}
								<span className="h__FontNum">$0.00</span>
							</div>
							<div className="connect-wallet">
								{!account ? (
									<Button
										primary
										click={onPresentWalletProviderModal}
										text={customAccount}
										left={<WalletIcon />}
										className="customBtnHd"
									/>
								) : (
									<Button
										primary
										click={onPresentAccountModal}
										text={customAccount}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</header>
		</>
	)
}
export default MenuNew
