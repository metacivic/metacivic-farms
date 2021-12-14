import BigNumber from 'bignumber.js'
import { BIG_ZERO } from '../../utils/bigNumber';

export const transformPool = (pool) => {
  const { totalStaked, stakingLimit, userData, ...rest } = pool

  return {
    ...rest,
		userData: transformUserData(userData),
		totalStaked: new BigNumber(totalStaked),
    stakingLimit: new BigNumber(stakingLimit),
  }
}

export const transformUserData = (userData) => {
	return {
		allowance: userData ? new BigNumber(userData.allowance) : BIG_ZERO,
		stakingTokenBalance: userData ? new BigNumber(userData.stakingTokenBalance) : BIG_ZERO,
		stakedBalance: userData ? new BigNumber(userData.stakedBalance) : BIG_ZERO,
		pendingReward: userData ? new BigNumber(userData.pendingReward) : BIG_ZERO,
		lastStakingBlock: userData ? +userData.lastStakingBlock : 0,
	}
}