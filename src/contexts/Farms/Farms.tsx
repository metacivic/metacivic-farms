import React, { useEffect, useState } from 'react'

import { useWallet } from 'use-wallet'
import fetchFarms from './fetchFarms'

import Context from './context'
import useTotalAllocPoints from '../../hooks/useTotalAllocPoints'
import { useRewardPerWeek } from '../../hooks/useRewardPerBlock'
import { getPoolApr } from '../../utils/index'

const Farms: React.FC = ({ children }) => {
	const [farms, setFarms] = useState([])
	const [rewardPrice, setRewardPrice] = useState(0)
	const { account, ethereum } = useWallet()
	const totalAllocPoints = useTotalAllocPoints()
	const rewardsPerWeek = useRewardPerWeek()
	
	useEffect(() => {
		const getFarms = async () => {
			const farmsRes = await fetchFarms(account, ethereum)
			setFarms(farmsRes.farms)
			setRewardPrice(farmsRes.rewardPrice)
		}
		getFarms()
	}, [])

	useEffect(() => {
		if (
			farms.length > 0 &&
			totalAllocPoints.isGreaterThan(0) &&
			rewardsPerWeek.isGreaterThan(0) &&
			rewardPrice > 0 &&
			!farms?.[0]?.apr
		) {
			const farmsAprs = farms.map((farm, index) => {
				let staked_tvl = farm.staked_tvl || 0
				if (farm.pid === 27) {
					staked_tvl = farm.staked.toNumber()
				}

				const apr = getPoolApr(
					totalAllocPoints,
					farm.allocPoint,
					rewardsPerWeek,
					rewardPrice,
					staked_tvl,
				)

				return {
					...farms[index],
					apr,
				}
			})

			setFarms(farmsAprs)
		}
	}, [farms, totalAllocPoints, rewardsPerWeek, rewardPrice])

	return (
		<Context.Provider
			value={{
				farms,
			}}
		>
			{children}
		</Context.Provider>
	)
}

export default Farms
