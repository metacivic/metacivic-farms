import React, { useCallback, useRef } from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { useFetchPublicPoolsData, usePollBlockNumber } from './store/hooks'
import Pools from './views/Pools/Pools'
import PoolsIdo from './views/PoolsIdo/PoolsIdo'
import Farms from './views/Farms/Farms'
import styled from 'styled-components'

import MenuNew from './components/MenuNew'
import Header from './components/Header'
import FooterNew from './components/FooterNew'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.less'

const App = () => {
	const refMenu = useRef(null)
	usePollBlockNumber()
	useFetchPublicPoolsData()

	const handleCollapseMenu = useCallback(async () => {
		if (refMenu.current) {
			return await refMenu.current.toggleCollapsed()
		}
	}, [refMenu])
	return (
		<Router>
			<StyledContainer>
				<div className="bsc-farm">
					<div className="bsc-farm-header">
						<MenuNew />
					</div>
					<div className="bsc-farm-content">
						<div className="bsc-farm-content-page">
							<Switch>
								<Route path="/" exact>
									<Pools />
								</Route>
								<Route path="/farms">
									<Farms />
								</Route>
								<Route path="/ido-pools">
									<PoolsIdo />
								</Route>
							</Switch>
							<FooterNew />
						</div>
					</div>
				</div>
			</StyledContainer>
		</Router>
	)
}

export const StyledContainer = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 100vh;
`

export default App
