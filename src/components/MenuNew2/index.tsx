import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Menu, Modal } from 'antd'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'
// import { isMobile, TabletView, MobileOnlyView, MobileView } from 'react-device-detect'
import { Link } from 'react-router-dom'
import MenuNewMobile from './MenuNewMobile'
// import UnlockButton from '../ConnectWalletButtonHeader'
import ButtonV2 from '../ButtonV2'
// import ArrMenu from './config'

import { ReactComponent as TradeIcon } from '../../assets/h__img/Trade.svg'
import { ReactComponent as EarnIcon } from '../../assets/h__img/Earn.svg'
import { ReactComponent as NftIcon } from '../../assets/h__img/NFT.svg'
import { ReactComponent as WalletIcon } from '../../assets/h__img/Wallet.svg'
// import { ReactComponent as DotIcon } from '../../images/h__img/3dot.svg'

import 'antd/dist/antd.css'
import './style.less'

const MenuNew = () => {
  const { SubMenu } = Menu
  const [current, setCurrent] = useState('trade')
  const [width, setWidth] = useState<number>(window.innerWidth)

  const handleClick = (e: any) => {
    console.log('click ', e)
  }

  function handleWindowSizeChange() {
    setWidth(window.innerWidth)
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const isMobile = width <= 768

  if (isMobile) {
    return <MenuNewMobile />
  }

  return (
    <>
      <header>
        <div className="main-header">
          <div className="all h__flex">
            <div className="header-left">
              <div className="main-logo">
                <Link to="/">
                  <div className="d-flex align-items-center">
                    <img className="McvIcon" src="/images/x.svg" alt="" />
                    <img className="McvIconText" src="/images/lgmini.svg" alt="" style={{ height: 40 }} />
                    <h1 className="h__textLogo">
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </h1>
                  </div>
                </Link>
              </div>
              <div className="main-menu">
                <ul className="list-menu">
                  {/* {ArrMenu.map((num: any) => (
                    <li key={num.id}>
                      <div className="h__customLogoTrade h__fl">{num.icon}</div>
                      {num.label}
                      <div className="submenu-nav">
                        <ul>
                          {num?.items?.map((item: any) => (
                            <li key={item.id}>
                              <Link to={`${item.href}`}>
                                <li>{item.label}</li>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))} */}
                  <li>
                    <div className="h__customLogoTrade h__fl">
                      <TradeIcon />
                    </div>
                    Trade
                    <div className="submenu-nav">
                      <ul>
                        <Link to="/swap">
                          {/* <Link to="/"> */}
                          <li>Exchange </li>
                        </Link>

                        <Link to="/pool">
                          {/* <Link to="/"> */}
                          <li>Add liquidity</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="h__customLogoTrade h__fl">
                      <EarnIcon />
                    </div>
                    Earns
                    <div className="submenu-nav">
                      <ul>
                      <a href="https://farms.metacivic.io/#/"><li>Start Pools</li></a>
                        <a href="https://farms.metacivic.io/#/Farms"><li>Farm</li></a>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="h__customLogoTrade h__fl">
                      <NftIcon />
                    </div>
                    NFT
                    <div className="submenu-nav">
                      <ul>
                        <Link to="/mintNFT">
                          <li>Mint NFT</li>
                        </Link>

                        <Link to="/NFTmarket">
                          <li>NFT Markets</li>
                        </Link>

                        {/* <Link to="/collections">
                          <li>My Collections</li>
                        </Link>

                        <Link to="/stakeNFT">
                          <li>Stake NFT</li>
                        </Link> */}
                      </ul>
                    </div>
                  </li>
                  <li>
                    <div className="h__customLogoTrade h__fl">
                      {/* <GameIcon /> */}hieu
                    </div>
                    <Link to="/Games">Game</Link>
                  </li>
                  <li>
                    {/* <DotIcon /> */}
                    <div className="submenu-nav">
                      <ul>
                        <Link to="/">
                          <li>Docs</li>
                        </Link>
                        <Link to="/">
                          <li>Blogs</li>
                        </Link>
                        <Link to="/">
                          <li>Github</li>
                        </Link>
                        <Link to="/">
                          <li>Certick Audit</li>
                        </Link>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="header-right" style={{ gap: 30 }}>
              <ButtonV2 className="h__customBtnz text-white" primary text="Buy MCV" />
              <div className="value-token">
                <img src="/images/lgmini.svg" alt="" style={{ height: 40 }} /> <span>$0.00</span>
              </div>

              <div className="connect-wallet">
                {/* <UnlockButton /> */}
                hieu
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
export default MenuNew
