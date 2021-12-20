import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Menu, Modal } from 'antd'
import {
	MailOutlined,
	AppstoreOutlined,
	SettingOutlined,
} from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import { Link } from 'react-router-dom'
import { useWallet } from 'use-wallet'
import Button from '../ButtonV2'
import MenuNewMobile from './MenuNewMobile'
import useModal from '../../hooks/useModal'
import AccountModal from '../../components/TopBar/components/AccountModal'
import WalletProviderModal from '../WalletProviderModal/WalletProviderModal'
import { ReactComponent as VectorIcon } from '../../assets/images/wallets/Vector.svg'
import { ReactComponent as MetamaskIcon } from '../../assets/images/wallets/metamark2.svg'

// import UnlockButton from '../ConnectWalletButton'
import 'antd/dist/antd.css'
import './style.less'

const MenuNew = () => {
	if (isMobile) {
		return <MenuNewMobile />
	}
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
	return (
		<>
			<header>
				<div className="main-header">
					<div className="all">
					<div className="header-left">
						<div className="main-logo">
							<Link to="/">
								<div className="d-flex align-items-center">
									<img src="/logo-MCV-ffff.svg" alt="" />
									{/* <h1 className="h__textLogo">METACIVIC</h1> */}
								</div>
							</Link>
						</div>
						<div className="main-menu">
							<ul className="list-menu h__customListMenu">
								<li>
									<div className="h__customLogoTrade">
										<img src="/trade.png" alt="" />
										<img src="/trade2.png" alt="" />
									</div>
									Trade
									<div className="submenu-nav">
										<ul>
											<li>
												<Link to="/swap">Exchange</Link>
											</li>
											<li>
												<Link to="/pool">Add liquidity</Link>
											</li>
										</ul>
									</div>
								</li>
								<li>
									<div className="h__customLogoTrade">
										<img src="/coin.png" alt="" />
										<img src="/icon-earn.png" alt="" />
									</div>
									Earns
									<div className="submenu-nav">
										<ul>
											<li>
												<Link to="/Farms">Farm</Link>
											</li>
											<li>
												<Link to="/">Start Pools</Link>
											</li>
										</ul>
									</div>
								</li>
								<li>
									<div className="h__customLogoTrade">
										<img src="/shop.png" alt="" />
										<img src="/icon shop.png" alt="" />
									</div>
									NFT
									<div className="submenu-nav">
										<ul>
											<li>
												<Link to="/">Mint NFT</Link>
											</li>
											<li>
												<Link to="/">NFT Markets</Link>
											</li>
											<li>
												<Link to="/">My Collections</Link>
											</li>
											<li>
												<Link to="/">Stake NFT</Link>
											</li>
										</ul>
									</div>
								</li>
								<li>
									<img src="icon-menu.png" alt="" />
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
					<div className="header-right">
						<div className="value-token">
							<img src="logo-mini.svg" alt="" /> <span>$1.07</span>
						</div>
						<div className="connect-wallet">
							{!account ? (
								<Button
									primary
									click={onPresentWalletProviderModal}
									text={customAccount}
									left={<VectorIcon />}
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
