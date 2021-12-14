import BigNumber from 'bignumber.js'
import web3NoAccount from '../../utils/web3'
import masterchefAbi from '../../constants/abi/masterchef.json'
import { bscsAddress, masterChefAddress } from '../../constants/tokenAddresses'
import { poolsDeath } from '../../constants'
import {
	getBscToken,
	getParameterCaseInsensitive,
	getPoolPrices,
} from '../../utils'
import { getBscPrices } from '../../utils/bsc_helpers'

const fetchFarms = async (account, ethereum) => {
	const web3 = web3NoAccount
	const masterChefContract = new web3.eth.Contract(
		masterchefAbi,
		masterChefAddress,
	)

	const poolCount = parseInt(
		await masterChefContract.methods.poolLength().call(),
		10,
	)

	const poolInfosFetch = await Promise.all(
		[...Array(poolCount).keys()]
			.filter((poolIndex) => !poolsDeath.includes(poolIndex))
			.map(async (poolIndex) => {
				const poolInfo = await masterChefContract.methods
					.poolInfo(poolIndex)
					.call()

				const poolToken = await getBscToken(ethereum, poolInfo.lpToken, account)

				return {
					pid: poolIndex,
					...poolInfo,
					...poolToken,
				}
			}),
	)

	// remove pool death
	const poolInfos = poolInfosFetch.filter((pool) =>
		new BigNumber(pool?.allocPoint).isGreaterThan(0),
	)

	const prices = await getBscPrices()

	const tokens = {}

	const tokenAddresses = [].concat.apply(
		[],
		poolInfos.map((p) => p?.tokens),
	)

	await Promise.all(
		tokenAddresses.map(async (address) => {
			tokens[address] = await getBscToken(ethereum, address, account)
		}),
	)

	getPoolPrices(tokens, prices, poolInfos[1], 'bsc')

	const poolPrices = poolInfos.map((poolInfo) => ({
		...getPoolPrices(tokens, prices, poolInfo),
		...poolInfo,
	}))

	const rewardPrice = getParameterCaseInsensitive(prices, bscsAddress)?.usd
	return {
		farms: poolPrices,
		rewardPrice,
	}
}

export default fetchFarms
