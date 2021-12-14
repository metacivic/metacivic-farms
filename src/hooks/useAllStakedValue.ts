import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { Contract } from 'web3-eth-contract'

import erc20ABI from '../bao/lib/abi/erc20.json'
import { addressMap } from '../bao/lib/constants'

import {
  getMasterChefContract,
  getWethContract,
  getFarms,
  getTotalLPWbnbValue,
  getWbnbContract,
} from '../bao/utils'
import useBao from './useBao'
import useBlock from './useBlock'
import Web3 from 'web3'

export interface StakedValue {
  tokenAmount: BigNumber
  wBnbAmount: BigNumber
  totalWbnbValue: BigNumber
  tokenPriceInWbnb: BigNumber
  poolWeight: BigNumber
  allocPoint: BigNumber
  balance: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const { account, ethereum }: { account: string; ethereum: provider } =
    useWallet()
  const bao = useBao()
  const farms = getFarms(bao)
  const masterChefContract = getMasterChefContract(bao)
  const wBnbContract = getWbnbContract(bao)
  const block = useBlock()

  const fetchAllStakedValue = useCallback(async () => {
    const web3 = new Web3(ethereum)
    // @ts-ignore
    const busdContract = new web3.eth.Contract(erc20ABI, addressMap.busdAddress)

    const balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
          tokenDecimals,
          quoteTokenSymbol,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
          tokenDecimals: number
          quoteTokenSymbol: string
          busdContract: Contract
        }) =>
          getTotalLPWbnbValue(
            masterChefContract,
            wBnbContract,
            lpContract,
            tokenContract,
            tokenDecimals,
            pid,
            quoteTokenSymbol,
            busdContract,
          ),
      ),
    )

    setBalance(balances)
  }, [account, masterChefContract, bao])

  useEffect(() => {
    if (account && masterChefContract && bao) {
      fetchAllStakedValue()
    }
  }, [account, block, masterChefContract, setBalance, bao])

  return balances
}

export default useAllStakedValue
