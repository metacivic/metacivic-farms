/* eslint-disable no-empty */
import BigNumber from 'bignumber.js'
import erc20 from '../constants/abi/erc20.json'
import UNIV2PairAbi from '../constants/abi/uni_v2_lp.json'
import { masterChefAddress, wbnbAddress } from '../constants/tokenAddresses'
import multicall from '../utils/multicall'

export { default as formatAddress } from './formatAddress'

export const bnToDec = (bn, decimals = 18) => {
	return bn.dividedBy(new BigNumber(10).pow(decimals)).toNumber()
}

export const decToBn = (dec, decimals = 18) => {
	return new BigNumber(dec).multipliedBy(new BigNumber(10).pow(decimals))
}

export function getParameterCaseInsensitive(object, key) {
	return object[
		Object.keys(object).find((k) => k.toLowerCase() === key.toLowerCase())
	]
}

export async function getBscStoredToken(type, provider, lpToken, account) {
	switch (type) {
		case 'uniswap':
			return await getBscUniPool(provider, UNIV2PairAbi, lpToken, account)
		case 'erc20':
			return await getBep20(provider, erc20, lpToken, account)
	}
}

export async function getBscUniPool(provider, abi, lpToken, account) {
	const calls = [
		{
			address: lpToken,
			name: 'getReserves',
		},
		{
			address: lpToken,
			name: 'token0',
		},
		{
			address: lpToken,
			name: 'token1',
		},
		{
			address: lpToken,
			name: 'symbol',
		},
		{
			address: lpToken,
			name: 'decimals',
		},
		{
			address: lpToken,
			name: 'totalSupply',
		},
		// {
		// 	address: lpToken,
		// 	name: 'balanceOf',
		// 	params: [account]
		// },
		{
			address: lpToken,
			name: 'balanceOf',
			params: [masterChefAddress],
		},
	]

	const [
		reserves,
		[token0],
		[token1],
		[symbol],
		[decimals],
		totalSupply,
		// unstaked,
		staked,
	] = await multicall(abi, calls, provider)
	return {
		symbol:
			lpToken.toLowerCase() === wbnbAddress.toLowerCase() ? 'BNB' : symbol,
		tokens: [token0, token1],
		token0,
		token1,
		decimals,
		address: lpToken,
		q0: reserves._reserve0,
		q1: reserves._reserve1,
		totalSupply: new BigNumber(totalSupply).div(
			new BigNumber(10).pow(decimals),
		),
		// unstaked: new BigNumber(unstaked).div(new BigNumber(10).pow(decimals)),
		staked: new BigNumber(staked).div(new BigNumber(10).pow(decimals)),
	}
}

export async function getBep20(provider, abi, lpToken, account) {
	const calls = [
		{
			address: lpToken,
			name: 'totalSupply',
		},
		{
			address: lpToken,
			name: 'symbol',
		},
		{
			address: lpToken,
			name: 'decimals',
		},
		// {
		// 	address: lpToken,
		// 	name: 'balanceOf',
		// 	params: [account]
		// },
		{
			address: lpToken,
			name: 'balanceOf',
			params: [masterChefAddress],
		},
	]

	const [
		totalSupply,
		[symbol],
		[decimals],
		// unstaked,
		staked,
	] = await multicall(abi, calls, provider)

	return {
		decimals,
		symbol:
			lpToken.toLowerCase() === wbnbAddress.toLowerCase() ? 'BNB' : symbol,
		address: lpToken,
		totalSupply: new BigNumber(totalSupply).div(
			new BigNumber(10).pow(decimals),
		),
		// unstaked: new BigNumber(unstaked).div(new BigNumber(10).pow(decimals)),
		staked: new BigNumber(staked).div(new BigNumber(10).pow(decimals)),
		tokens: [lpToken],
	}
}

export async function getBscToken(provider, lpToken, account) {
	const type = window.localStorage.getItem(lpToken)
	if (type) return getBscStoredToken(type, provider, lpToken, account)

	try {
		const uniPool = await getBscUniPool(
			provider,
			UNIV2PairAbi,
			lpToken,
			account,
		)
		window.localStorage.setItem(lpToken, 'uniswap')
		return uniPool
	} catch (e) {}

	try {
		const erc20tok = await getBep20(provider, erc20, lpToken, account)
		window.localStorage.setItem(lpToken, 'erc20')
		return erc20tok
	} catch (e) {}
}

const getUniPrices = (tokens, prices, pool) => {
	var t0 = getParameterCaseInsensitive(tokens, pool.token0)
	var p0 = getParameterCaseInsensitive(prices, pool.token0)?.usd
	var t1 = getParameterCaseInsensitive(tokens, pool.token1)
	var p1 = getParameterCaseInsensitive(prices, pool.token1)?.usd
	if (p0 == null && p1 == null) {
		return undefined
	}
	if (t0?.decimals == null) {
		return undefined
	}
	if (t1?.decimals == null) {
		return undefined
	}

	var q0 = pool.q0 / 10 ** t0.decimals
	var q1 = pool.q1 / 10 ** t1.decimals
	if (p0 == null) {
		p0 = (q1 * p1) / q0
		prices[pool.token0] = { usd: p0 }
	}
	if (p1 == null) {
		p1 = (q0 * p0) / q1
		prices[pool.token1] = { usd: p1 }
	}
	var tvl = q0 * p0 + q1 * p1
	var price = tvl / pool.totalSupply
	prices[pool.address] = { usd: price }
	var staked_tvl = pool.staked * price

	return {
		t0: t0,
		p0: p0,
		q0: q0,
		t1: t1,
		p1: p1,
		q1: q1,
		price: price,
		tvl: tvl,
		staked_tvl: staked_tvl,
	}
}

const getErc20Prices = (prices, pool) => {
	var price = getParameterCaseInsensitive(prices, pool.address)?.usd
	var tvl = (pool.totalSupply * price) / 10 ** pool.decimals
	var staked_tvl = pool.staked * price
	return {
		staked_tvl: staked_tvl,
		price: price,
		stakeTokenTicker: pool.symbol,
		tvl: tvl,
	}
}

export function getPoolPrices(tokens, prices, pool) {
	if (pool.token0 != null) return getUniPrices(tokens, prices, pool)
	return getErc20Prices(prices, pool)
}

export function getPoolApr(
	totalAllocPoints,
	allocPoints,
	rewardsPerWeek,
	rewardPrice,
	staked_tvl,
) {
	const poolRewardsPerWeek = new BigNumber(allocPoints)
		.div(totalAllocPoints)
		.times(rewardsPerWeek)
	const usdPerWeek = poolRewardsPerWeek.times(new BigNumber(rewardPrice))
	const weeklyAPR = usdPerWeek.div(new BigNumber(staked_tvl)).times(100)
	const monthlyAPR = weeklyAPR.times(4)
	// const dailyAPR = weeklyAPR.div(7) ;
	const yearlyAPR = weeklyAPR.times(52)

	return {
		// dailyAPR,
		weeklyAPR,
		yearlyAPR,
		monthlyAPR,
	}
}
