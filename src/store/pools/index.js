import { createSlice } from '@reduxjs/toolkit'
import BigNumber from 'bignumber.js'
import { BIG_TEN } from '../../utils/bigNumber'
import { getPoolApr } from '../../utils/apr'
import {
	fetchPoolsAllowance,
	fetchUserBalances,
	fetchUserPendingRewards,
	fetchUserStakeBalances,
} from './fetchPoolsUser'
import { fetchPoolsTotalStaking } from './fetchPools'
import { getBscPrices } from '../../utils/bsc_helpers'
import { getBalanceNumber } from '../../utils/formatBalance'
import poolsConfig from '../../constants/pools'
import lpAprs from 'config/lpAprs.json'

const initialState = {
	data: poolsConfig,
	userDataLoaded: false,
}

// Thunks
export const fetchPoolsPublicDataAsync =
	(currentBlock) => async (dispatch, getState, farmAddress) => {
		const totalStakings = await fetchPoolsTotalStaking()

		const prices = getState()?.prices?.data || (await getBscPrices())
		const liveData = poolsConfig.map((pool) => {
			const totalStaking = totalStakings.find(
				(entry) => entry.sousId === pool.sousId,
			)
			const isPoolEndBlockExceeded = currentBlock > pool.endBlock
			const isPoolFinished = pool.isFinished || isPoolEndBlockExceeded

			const stakingTokenAddress = pool.stakingToken.address
				? pool.stakingToken.address.toLowerCase()
				: null
			const lpRewardsApr = lpAprs[stakingTokenAddress?.toLocaleLowerCase()] ?? 0
			const stakingTokenPrice = stakingTokenAddress
				? prices[stakingTokenAddress]
				: 0

			const earningTokenAddress = pool.earningToken.address
				? pool.earningToken.address.toLowerCase()
				: null
			const earningTokenPrice = earningTokenAddress
				? prices[earningTokenAddress]
				: 0
			const apr = !isPoolFinished
				? getPoolApr(
						pool.typePool === 2 || pool.idoLP == true
							? lpRewardsApr
							: stakingTokenPrice,
						earningTokenPrice,
						getBalanceNumber(
							new BigNumber(totalStaking.totalStaked),
							pool.stakingToken.decimals,
						),
						pool.tokenPerBlock,
						pool.earningToken.decimals,
				  )
				: 0

			const stakedTvl = new BigNumber(
				new BigNumber(totalStaking.totalStaked).div(
					BIG_TEN.pow(pool.stakingToken.decimals),
				),
			)

				.times(
					new BigNumber(
						pool.typePool === 2 || pool.idoLP == true
							? lpRewardsApr
							: stakingTokenPrice,
					),
				)
				.toJSON()
			return {
				...totalStaking,
				stakedTvl,
				stakingTokenPrice,
				earningTokenPrice,
				apr,
				isFinished: isPoolFinished,
			}
		})

		dispatch(setPoolsPublicData(liveData))
	}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
	const allowances = await fetchPoolsAllowance(account)
	const stakingTokenBalances = await fetchUserBalances(account)
	const balances = await fetchUserStakeBalances(account)
	const pendingRewards = await fetchUserPendingRewards(account)

	const userData = poolsConfig.map((pool) => ({
		sousId: pool.sousId,
		allowance: allowances[pool.sousId],
		stakingTokenBalance: stakingTokenBalances[pool.sousId],
		stakedBalance: balances[pool.sousId].stakedBalance,
		lastStakingBlock: balances[pool.sousId].lastStakingBlock,
		pendingReward: pendingRewards[pool.sousId],
	}))

	dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId, account) => async (dispatch) => {
	const allowances = await fetchPoolsAllowance(account)
	dispatch(
		updatePoolsUserData({
			sousId,
			field: 'allowance',
			value: allowances[sousId],
		}),
	)
}

export const updateUserBalance = (sousId, account) => async (dispatch) => {
	const tokenBalances = await fetchUserBalances(account)
	dispatch(
		updatePoolsUserData({
			sousId,
			field: 'stakingTokenBalance',
			value: tokenBalances[sousId],
		}),
	)
}

export const updateUserStakedBalance =
	(sousId, account) => async (dispatch) => {
		const stakedBalances = await fetchUserStakeBalances(account)
		dispatch(
			updatePoolsUserData({
				sousId,
				field: 'stakedBalance',
				value: stakedBalances[sousId],
			}),
		)
	}

export const updateUserPendingReward =
	(sousId, account) => async (dispatch) => {
		const pendingRewards = await fetchUserPendingRewards(account)
		dispatch(
			updatePoolsUserData({
				sousId,
				field: 'pendingReward',
				value: pendingRewards[sousId],
			}),
		)
	}

export const poolsSlice = createSlice({
	name: 'pools',
	initialState,
	reducers: {
		setPoolsPublicData: (state, action) => {
			const livePoolsData = action.payload
			state.data = state.data.map((pool) => {
				const livePoolData = livePoolsData.find(
					(entry) => entry.sousId === pool.sousId,
				)
				return { ...pool, ...livePoolData }
			})
		},
		setPoolsUserData: (state, action) => {
			const userData = action.payload
			state.data = state.data.map((pool) => {
				const userPoolData = userData.find(
					(entry) => entry.sousId === pool.sousId,
				)
				return { ...pool, userData: userPoolData }
			})
			state.userDataLoaded = true
		},
		updatePoolsUserData: (state, action) => {
			const { field, value, sousId } = action.payload
			const index = state.data.findIndex((p) => p.sousId === sousId)

			if (index >= 0) {
				state.data[index] = {
					...state.data[index],
					userData: { ...state.data[index].userData, [field]: value },
				}
			}
		},
	},
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } =
	poolsSlice.actions
export default poolsSlice.reducer
