import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import Page from '../../components/Page'
// import PageHeader from '../../components/PageHeader'
import PageHeaderFarm from 'components/PageHeaderFarm'

import FarmCards from './components/FarmCards'
import PoolCardsLP from '../Pools/components/PoolCardsLP'

const Farms: React.FC = () => {
	const { path } = useRouteMatch()
	return (
		<Switch>
			<Page background="/images/bg-earth.png">
				<Route exact path={path}>
					<PageHeaderFarm
						title="Farms"
						subtitle1="Easily get double rewards by staking your LP tokens in exchange for additional MCV tokens. MetaCivic Farms provides many farming opportunities for you to earn high income from swaps."
					/>
					<PoolCardsLP />
				</Route>
			</Page>
		</Switch>
	)
}

export default Farms
