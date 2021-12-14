import { useEffect, useState } from 'react'
import { getPricesBSCS } from '../utils/bsc_helpers'

type ApiResponse = {
  prices: {
    [key: string]: string
  }
  update_at: string
}

/**
 * Due to Cors the api was forked and a proxy was created
 * @see https://github.com/pancakeswap/gatsby-pancake-api/commit/e811b67a43ccc41edd4a0fa1ee704b2f510aa0ba
 */

const useGetPriceData = () => {
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prices = await getPricesBSCS()
        setData(prices)
      } catch (error) {
        console.error('Unable to fetch price data:', error)
      }
    }

    fetchData()
  }, [setData])

  return data
}

export default useGetPriceData
