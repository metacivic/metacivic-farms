import BigNumber from 'bignumber.js'
import { BLOCKS_PER_YEAR } from '../config/index'
import {BIG_TEN} from '../utils/bigNumber'
/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
  decimalTokenEarning: number
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice)
      .times(new BigNumber(tokenPerBlock).div(BIG_TEN.pow(decimalTokenEarning)))
      .times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

