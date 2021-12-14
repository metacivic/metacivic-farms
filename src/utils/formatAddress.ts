const formatAddress = (address: string) => {
  return address.slice(0, 6) + '...' + address.slice(-6)
}

export const formatAddressWallet = (address: string) =>
  `${address.substring(0, 4)}...${address.substring(address.length - 4)}`

export default formatAddress
