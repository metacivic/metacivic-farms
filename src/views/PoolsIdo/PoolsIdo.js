import React from 'react'
import PoolCards from './components/PoolCards'
import PageHeaderIdo from '../../components/PageHeaderIdo/PageHeaderIdo'
import Page from '../../components/Page/Page'

const PoolsIdo = () => {
	return (
		<Page background="/images/bg-earth.png">
			<PageHeaderIdo
				title="IDO Pool"
				subtitle1="Staking MCV to join our IDO Guaranteed."p
				subtitle2="Allocation on MetaCivic Launchpad."
			/>
			<PoolCards />
		</Page>
	)
}

export default PoolsIdo
