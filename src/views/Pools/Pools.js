import React from 'react'
import PoolCards from './components/PoolCards'
import PageHeader from '../../components/PageHeader/PageHeader'
import Page from '../../components/Page/Page'
import FarmCards from '../../views/Farms/components/FarmCards'
import BackToTop from './BackToTop'
import './style.less'

const Pools = () => {
	return (
		<Page background="/images/bg-earth.png">
			<PageHeader
				title="Start Pools"
				subtitle1="Easily get double rewards by staking your LP tokens in exchange for additional MCV tokens. Metacivic Farms provides many farming opportunities for you to earn high income from swaps."
			/>

			<PoolCards />
		</Page>
	)
}

export default Pools
