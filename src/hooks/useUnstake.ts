import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'

import { unstake, getMasterChefContract, getRefUrl } from '../bao/utils'

const useUnstake = (pid: number) => {
  const { account } = useWallet()
  const bao = useBao()
  const masterChefContract = getMasterChefContract(bao)

  const handleUnstake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await unstake(masterChefContract, pid, amount, account)
        return txHash
      } catch (e) {
        return false
      }
    },
    [account, pid, bao],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
