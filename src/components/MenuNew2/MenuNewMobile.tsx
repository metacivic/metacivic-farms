import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Drawer, Button, Collapse } from 'antd'
import 'antd/dist/antd.css'
// import UnlockButton from '../ConnectWalletButton'
// import { ArrIcon } from './config'

// import { ReactComponent as TradeIcon } from '../../images/h__img/Trade.svg'
// import { ReactComponent as EarnIcon } from '../../images/h__img/Earn.svg'
// import { ReactComponent as NftIcon } from '../../images/h__img/NFT.svg'

import { ReactComponent as TradeIcon } from '../../assets/h__img/Trade.svg'
import { ReactComponent as EarnIcon } from '../../assets/h__img/Earn.svg'
import { ReactComponent as NftIcon } from '../../assets/h__img/NFT.svg'
// import { ReactComponent as WalletIcon } from '../../assets/h__img/Wallet.svg'

function MenuNewMobile() {
  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(!visible)
  }
  const onClose = () => {
    setVisible(false)
  }
  const { Panel } = Collapse

  function callback(key: any) {
    console.log(key)
  }
  const trade = (
    <>
      <div className="header-collapse">
        <TradeIcon /> <span>Trade</span>
      </div>
    </>
  )
  const earns = (
    <>
      <div className="header-collapse">
        <EarnIcon /> <span>Earns</span>
      </div>
    </>
  )
  const nft = (
    <>
      <div className="header-collapse">
        <NftIcon /> <span>NFT</span>
      </div>
    </>
  )
  const docs = (
    <>
      <div className="header-collapse">...</div>
    </>
  )
  const menuTrade = (
    <>
      <ul>
        <li>Exchange</li>
        <li>Add liquidity</li>
      </ul>
    </>
  )
  const menuEarn = (
    <>
      <ul>
        <li>Farms</li>
        <li>Start Pools</li>
      </ul>
    </>
  )
  const menuNFT = (
    <>
      <ul>
        <li>Mint NFT</li>
        <li>Marketplace</li>
        <li>My Collections</li>
        <li>Stake NFT</li>
      </ul>
    </>
  )
  const menuDocs = (
    <>
      <ul>
        <li>Docs</li>
        <li>Blogs</li>
        <li>Github</li>
        <li>Certick Audit</li>
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
            <img src="/images/imagesDashboard/icon-coin.svg" alt="" /> <span>$0.00</span>
          </div>
          <div className="socail-footer h__box">
            {ArrIcon.map((i) => (
              <>
                {i.href?.includes('https') ? (
                  <a href={i.href}>
                    <i className={`${i.icon}`} aria-hidden="true" />
                  </a>
                ) : (
                  <Link to={`${i.href}`}>
                    <i className={`${i.icon}`} aria-hidden="true" />
                  </Link>
                )}
              </>
            ))}
          </div>
          <div className="copy-right-ft">Copyright © 2021 Metacivic.io All Rights Reserved</div>
        </div>
      </div>
    </>
  )
  return (
    <>
      <div className="main-header-mobile">
        <div className="header-l-mobile">
          <div className="main-menu">
            <Button className="btn-show-menu" type="primary" onClick={showDrawer}>
              <IconMenu>
                <StyleLine className={`${visible ? 'active' : ''}`} />
              </IconMenu>
            </Button>
            <Drawer title="Basic Drawer" className="drawer-menu" placement="left" onClose={onClose} visible={visible}>
              {contentMenuMoblie}
            </Drawer>
          </div>
          <div className="main-logo">
            <img src="/images/lgmini.svg" alt="" style={{ height: 40 }} />
          </div>
        </div>
        <div className="header-r-mobile">
          <div className="button-connect-mobile">
            {/* <UnlockButton /> */}
          </div>
        </div>
      </div>
    </>
  )
}

const IconMenu = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  position: relative;
  z-index: 100000000;
`

const StyleLine = styled.div`
   {
    width: 30px;
    height: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: linear-gradient(270deg, #cc0000 0%, #f72a2a 100%);
    -webkit-transition: 0.3s;
    transition: 0.3s ease;
    border-radius: 2px;
  }
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 30px;
    height: 4px;
    background: linear-gradient(270deg, #cc0000 0%, #f72a2a 100%);
    transition: 0.3s ease;
    border-radius: 2px;
  }

  &::before {
    top: -8px;
  }

  &::after {
    top: 8px;
  }

  &.active {
    background: transparent;
  }

  &.active::after {
    top: 0;
    transform: rotate(135deg);
  }

  &.active::before {
    top: 0;
    transform: rotate(45deg);
  }
`

export default MenuNewMobile
