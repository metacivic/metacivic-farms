import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Drawer, Collapse } from 'antd';
import 'antd/dist/antd.css';
import { AppstoreOutlined, MailOutlined,MenuUnfoldOutlined, SettingOutlined } from '@ant-design/icons';
import Button from '../ButtonV2'
// import MenuNewMobile from './MenuNewMobile';
import { useWallet } from 'use-wallet'
import useModal from '../../hooks/useModal'
import AccountModal from '../../components/TopBar/components/AccountModal'
import WalletProviderModal from '../WalletProviderModal/WalletProviderModal'
// import UnlockButton from '../ConnectWalletButton'

function MenuNewMobile () {
    const [visible, setVisible] = useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };
    const { Panel } = Collapse;

    function callback(key:any) {
        console.log(key);
    }
    const { account } = useWallet()
	const customAccount = useMemo<string>(() => {
		if (account) {
			return `${account.substr(0, 4)}...${account.substr(account.length - 4)}`
		} else {
			return 'Connect'
		}
	}, [account])
	const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
    const [onPresentAccountModal] = useModal(<AccountModal />)
    const trade = (
        <>
            <div className="header-collapse">
                <img src="trade.png" alt="" /> <span>Trade</span>
            </div>
        </>
    )
    const earns = (
        <>
            <div className="header-collapse">
                <img src="coin.png" alt="" /> <span>Earns</span>
            </div>
        </>
    )
    const nft = (
        <>
            <div className="header-collapse">
                <img src="shop.png" alt="" /> <span>NFT</span>
            </div>
        </>
    )
    const docs = (
        <>
            <div className="header-collapse">
                <img src="icon-menu.png" alt="" />
            </div>
        </>
    )
    const menuTrade = (
        <>
            <ul>
                <li>
                    Exchange
                </li>
                <li>
                    Add liquidity
                </li>
            </ul>
        </>
    )
    const menuEarn = (
        <>
            <ul>
                <li>
                    Farms
                </li>
                <li>
                    Start Pools
                </li>
            </ul>
        </>
    )
    const menuNFT = (
        <>
            <ul>
                <li>
                    Mint NFT
                </li>
                <li>
                    Marketplace
                </li>
                <li>
                    My Collections
                </li>
                <li>
                    Stake NFT
                </li>
            </ul>
        </>
    )
    const menuDocs = (
        <>
            <ul>
                <li>
                    Docs
                </li>
                <li>
                    Blogs
                </li>
                <li>
                    Github
                </li>
                <li>
                    Certick Audit
                </li>
            </ul>
        </>
    )
    const contentMenuMoblie = (
        <>
            <Collapse defaultActiveKey={['1']} onChange={callback}>
                <Panel header={trade} key="1">
                    <p>{menuTrade}</p>
                </Panel>
                <Panel header={earns} key="2">
                    <p>{menuEarn}</p>
                </Panel>
                <Panel header={nft} key="3">
                    <p>{menuNFT}</p>
                </Panel>
                <Panel header={docs} key="4">
                    <p>{menuDocs}</p>
                </Panel>
            </Collapse>
            <div className="footer-menu">
                <div className="box-footer-menu">
                    <div className="value-token">   
                        <img src="icon-coin.png" alt="" /> <span>$1.07</span>
                    </div>
                    <div className="socail-footer">
                        <img src="tele.png" alt="" />
                        <img src="twi.png" alt="" />
                        <img src="you.png" alt="" />
                        <img src="medi.png" alt="" />
                    </div>
                    <div className="copy-right-ft">
                        Copyright © 2021 Metacivic.io All Rights Reserved
                    </div>
                </div>
            </div>
        </>
    )
    return (
        <>
            <div className="main-header-mobile">
                <div className="header-l-mobile">
                    <div className="main-menu">
                        <button className="btn-show-menu" type="button"  onClick={showDrawer}>
                            <img src="icon-menu-m.png" alt="" />
                        </button>
                        <Drawer title="Basic Drawer" className="drawer-menu" placement="left" onClose={onClose} visible={visible}>
                            {contentMenuMoblie}
                        </Drawer>  
                    </div>
                    <div className="main-logo">
                        <img src="logo-m.png" alt="" />
                    </div>
                </div>
                <div className="header-r-mobile">
                    <div className="setting">
                        <img src="setting-2.png" alt="" />
                    </div>
                    <div className="button-connect-mobile">
                    {!account ? (
                        <Button
                        primary
                        click={onPresentWalletProviderModal}
                        text={customAccount}
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
        </>
    )
}
export default MenuNewMobile