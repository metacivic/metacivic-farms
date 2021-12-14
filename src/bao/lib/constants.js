import BigNumber from 'bignumber.js/bignumber'

export const SUBTRACT_GAS_LIMIT = 100000

const ONE_MINUTE_IN_SECONDS = new BigNumber(60)
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60)
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24)
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365)

export const INTEGERS = {
	ONE_MINUTE_IN_SECONDS,
	ONE_HOUR_IN_SECONDS,
	ONE_DAY_IN_SECONDS,
	ONE_YEAR_IN_SECONDS,
	ZERO: new BigNumber(0),
	ONE: new BigNumber(1),
	ONES_31: new BigNumber('4294967295'), // 2**32-1
	ONES_127: new BigNumber('340282366920938463463374607431768211455'), // 2**128-1
	ONES_255: new BigNumber(
		'115792089237316195423570985008687907853269984665640564039457584007913129639935',
	), // 2**256-1
	INTEREST_RATE_BASE: new BigNumber('1e18'),
}

export const addressMap = {
	lpAddressBnbBusd: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
	lpAddressBnbBSCS: '0xbcB983258088e4513870FE1a87026f92008863f4',
	lpAddressBSCSBusd: '0x835034B58F51A84e3272f29F805a6FF0314078e1',
	busdAddress: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
}

export const contractAddresses = {
	bao: {
		97: '0xc2d1d41777ef16E4D258f71eB8ef48e44AE82130',
		56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
	},
	masterChef: {
		97: '0x92e11A264e04F15cE6d4D455eC9105622BEf6e1A',
		56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
	},
	weth: {
		97: '0xf670e09e0221a4100fbc83f4f49eda6e7bc923b0',
		56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
	},
	wBnb: {
		56: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
		97: '0x2b8ff854c5e16cf35b9a792390cc3a2a60ec9ba2',
	},
	wethPrice: {
		97: '0x678AC35ACbcE272651874E782DB5343F9B8a7D66',
	},
	baoPrice: {
		97: '0x678AC35ACbcE272651874E782DB5343F9B8a7D66',
		56: '0x07064dcb0cc4F28f139FF86df0ae5656A0daD45A',
	},
}
//
/*
BAO Address on mainnet for reference
==========================================
0  USDT 0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852
1  USDC 0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc
2  DAI  0xa478c2975ab1ea89e8196811f51a7b7ade33eb11
3  sUSD 0xf80758ab42c3b07da84053fd88804bcb6baa4b5c
4  COMP 0xcffdded873554f362ac02f8fb1f02e5ada10516f
5  LEND 0xab3f9bf1d81ddb224a2014e98b238638824bcf20
6  SNX  0x43ae24960e5534731fc831386c07755a2dc33d47
7  UMA  0x88d97d199b9ed37c29d846d00d443de980832a22
8  LINK 0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974
9  BAND 0xf421c3f2e695c2d4c0765379ccace8ade4a480d9
10 AMPL 0xc5be99a02c6857f9eac67bbce58df5572498f40c
11 YFI  0x2fdbadf3c4d5a8666bc06645b8358ab803996e28
12 SUSHI 0xce84867c3c02b05dc570d0135103d3fb9cc19433
*/

export const supportedPools = [
	
	{
		pid: 1,
		lpAddresses: {
			56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
			97: '0x380cA225cdB5D141d8b538135DB1363F29a648dC',
		},
		tokenAddresses: {
			56: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
			97: '0x380cA225cdB5D141d8b538135DB1363F29a648dC',
		},
		tokenDecimals: 18,
		symbol: 'BSCS',
		tokenSymbol: 'BSCS',
		icon: '/tokens/bscs.png',
		quoteTokenSymbol: 'BSCS',
	},
	
]
