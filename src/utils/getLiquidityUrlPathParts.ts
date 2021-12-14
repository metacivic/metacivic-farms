// Constructing the two forward-slash-separated parts of the 'Add Liquidity' URL
// Each part of the url represents a different side of the LP pair.

import { wbnbAddress } from '../constants/tokenAddresses'

const getLiquidityUrlPathParts = ({
  quoteTokenAddress,
  tokenAddress,
}: {
  quoteTokenAddress: string
  tokenAddress: string
}) => {
  const wBNBAddressString = wbnbAddress
  const quoteTokenAddressString: string = quoteTokenAddress
    ? quoteTokenAddress
    : null
  const tokenAddressString: string = tokenAddress ? tokenAddress : null
  const firstPart =
    !quoteTokenAddressString ||
    quoteTokenAddressString.toLowerCase() === wBNBAddressString.toLowerCase()
      ? 'BNB'
      : quoteTokenAddressString
  const secondPart =
    !tokenAddressString ||
    tokenAddressString.toLowerCase() === wBNBAddressString.toLowerCase()
      ? 'BNB'
      : tokenAddressString
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
