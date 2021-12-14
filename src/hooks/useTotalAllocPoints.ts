import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { masterChefAddress } from '../constants/tokenAddresses'
import { getContract } from '../utils/contractHelpers'
import masterchefApi from '../constants/abi/masterchef.json'

const useTotalAllocPoint = () => {
  const [totalAllocPoint, setTotalAllocPoint] = useState(new BigNumber(0))

  const fetchTotalAllocPoint = useCallback(async () => {
    const contract = getContract(masterchefApi, masterChefAddress)
    const res = await contract.methods.totalAllocPoint().call()

    setTotalAllocPoint(new BigNumber(res))
  }, [])

  useEffect(() => {
    fetchTotalAllocPoint()
  }, [])

  return totalAllocPoint
}

export default useTotalAllocPoint
