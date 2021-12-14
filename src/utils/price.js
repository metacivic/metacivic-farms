import { BigNumber } from 'bignumber.js'

export const calPrice = async (
	lpContract,
	ethPrice,
	decimal,
	token0 = 'BNB',
) => {
	const reserves = await lpContract?.methods?.getReserves().call()

	const { _reserve0, _reserve1 } = reserves

	if (token0 !== 'BNB') {
		if (18 - decimal === 0) {
			return new BigNumber(_reserve0)
				.div(new BigNumber(_reserve1))
				.times(ethPrice)
		} else {
			return new BigNumber(_reserve0)
				.div(new BigNumber(_reserve1))
				.times(ethPrice)
				.div(new BigNumber(10).pow(18 - decimal))
		}
	} else {
		if (18 - decimal === 0) {
			return new BigNumber(_reserve1)
				.div(new BigNumber(_reserve0))
				.times(ethPrice)
		} else {
			return new BigNumber(_reserve1)
				.div(new BigNumber(_reserve0))
				.times(ethPrice)
				.div(new BigNumber(10).pow(18 - decimal))
		}
	}
}
