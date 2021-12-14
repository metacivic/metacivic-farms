import multicall from '../../utils/multicall';
import poolsConfig from '../../constants/pools'
import sousChefABI from '../../config/abi/sousChef.json'
import erc20ABI from '../../constants/abi/erc20.json'
import BigNumber from 'bignumber.js'

export const fetchPoolsAllowance = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: p.stakingToken.address,
    name: 'allowance',
    params: [account, p.contractAddress],
  }))

  const allowances = await multicall(erc20ABI, calls)
  return poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(allowances[index]).toJSON() }),
    {},
  )
}

export const fetchUserBalances = async (account) => {
  // Non BNB pools
  const calls = poolsConfig.map((p) => ({
    address: p.stakingToken.address,
    name: 'balanceOf',
    params: [account],
  }))
  const tokenBalancesRaw = await multicall(erc20ABI, calls)
  const tokenBalances = poolsConfig.reduce(
    (acc, pool, index) => ({ ...acc, [pool.sousId]: new BigNumber(tokenBalancesRaw[index]).toJSON() }),
    {},
  )

  return { ...tokenBalances }
}

export const fetchUserStakeBalances = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: p.contractAddress,
    name: 'userInfo',
    params: [account],
  }))
  const userInfo = await multicall(sousChefABI, calls)

	const balances = poolsConfig.reduce(
    (acc, pool, index) => ({
      ...acc,
      [pool.sousId]: {
      	stakedBalance: new BigNumber(userInfo[index].amount._hex).toJSON(),
				lastStakingBlock: new BigNumber(userInfo[index].lastStakingBlock._hex).toJSON(),
			},
    }),
    {},
  )

  return { ...balances }
}

export const fetchUserPendingRewards = async (account) => {
  const calls = poolsConfig.map((p) => ({
    address: p.contractAddress,
    name: 'pendingReward',
    params: [account],
  }))
  const res = await multicall(sousChefABI, calls)
const pendingRewards = poolsConfig.reduce(
  (acc, pool, index) => ({
    ...acc,
    [pool.sousId]: new BigNumber(res[index][0]).toJSON(),
  }),
  {},
)
return { ...pendingRewards }
}
