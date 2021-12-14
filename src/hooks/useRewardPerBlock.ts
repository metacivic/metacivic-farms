import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getMasterChefContract } from '../bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'
import { getRewardPerBlock } from '../utils/callHelpers'

const useRewardPerBlock = () => {
  const [reward, setReward] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchRewardPerBlock = useCallback(async () => {
    const res = await getRewardPerBlock(masterChefContract)
    setReward(new BigNumber(res).div(1e18))
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchRewardPerBlock()
    }
  }, [account, block, masterChefContract, bao])

  return reward
}

export const useRewardPerWeek = () => {
  const [reward, setReward] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)
  const block = useBlock()

  const fetchRewardPerWeek = useCallback(async () => {
    const res = await getRewardPerBlock(masterChefContract)
    setReward(new BigNumber(res).div(1e18).times(604800).div(3))
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchRewardPerWeek()
    }
  }, [account, block, masterChefContract, bao])

  return reward
}

export default useRewardPerBlock
