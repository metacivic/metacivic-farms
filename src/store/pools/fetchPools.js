import BigNumber from 'bignumber.js'
import { getSousChefContract } from '../../utils/contractHelpers';
import poolsConfig from '../../constants/pools'
import erc20Abi from '../../constants/abi/erc20.json'
import multicall from '../../utils/multicall'
import { BIG_ZERO } from '../../utils/bigNumber'

export const fetchPoolsTotalStaking = async () => {
  const callsNonBnbPools = poolsConfig.map((poolConfig) => {
    return {
      address: poolConfig.stakingToken.address,
      name: 'balanceOf',
      params: [poolConfig.contractAddress],
    }
  })

  const poolsTotalStaked = await multicall(erc20Abi, callsNonBnbPools)

  return [
    ...poolsConfig.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(poolsTotalStaked[index]).toJSON(),
    })),
  ]
}

export const fetchPoolStakingLimit = async (sousId) => {
  try {
    const sousContract = getSousChefContract(sousId)
		const stakingLimit = await sousContract.methods.poolLimitPerUser().call();
    return new BigNumber(stakingLimit.toString())
  } catch (error) {
    return BIG_ZERO
  }
}

export const fetchPoolsStakingLimits = async (
  poolsWithStakingLimit,
) => {
  const validPools = poolsConfig
    .filter((p) => p.stakingToken.symbol !== 'BNB' && !p.isFinished)
    .filter((p) => !poolsWithStakingLimit.includes(p.sousId))

  // Get the staking limit for each valid pool
  // Note: We cannot batch the calls via multicall because V1 pools do not have "poolLimitPerUser" and will throw an error
  const stakingLimitPromises = validPools.map((validPool) => fetchPoolStakingLimit(validPool.sousId))
  const stakingLimits = await Promise.all(stakingLimitPromises)

  return stakingLimits.reduce((accum, stakingLimit, index) => {
    return {
      ...accum,
      [validPools[index].sousId]: stakingLimit,
    }
  }, {})
}
