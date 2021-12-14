import { useCallback } from 'react'

import useBao from './useBao'
import { useWallet } from 'use-wallet'
import axios from 'axios'

import { stake, getMasterChefContract } from '../bao/utils'
import BigNumber from 'bignumber.js'

const useStake = (pid: number, enabledGetlog?: boolean) => {
  const { account } = useWallet()
  const bao = useBao()

  const handleStake = useCallback(
    async (amount: string) => {
      try {
        const txHash = await stake(
          getMasterChefContract(bao),
          pid,
          amount,
          account,
        )
        console.log(txHash)
        if (enabledGetlog) {
          await axios.post(`${process.env.REACT_APP_BASE_API}/deposits`, {
            amount: new BigNumber(amount)
              .times(new BigNumber(10).pow(18))
              .toFixed(),
            pid,
            user: account,
          })
        }
      } catch (e) {
        return false
      }
    },
    [account, pid, bao, enabledGetlog],
  )

  return { onStake: handleStake }
}

export default useStake
