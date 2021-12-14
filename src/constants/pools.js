import tokens from './tokens'

const poolsConfig = [
	// typePool = 1 --> start pool
	// typePool = 2 --> farm pool
	// typePool = 3 --> IDO pool
	// countdownt= true ---> countdown
	// isDay = true --> day
	// isDay = false --> month

	// typeLP = 1 --> BUSD LP
	// typeLP = 2 --> BNB LP

	{
		sousId: 0,
		stakingToken: tokens.mcv,
		earningToken: tokens.mcv,
		contractAddress: '0x1818233Dcb4C0919cF256De06C007DE2D2563111',
		fees: 0,
		blockPeriod: 86400,
		startBlock: 12781020,
		endBlock: 999243332,
		tokenPerBlock: 771000000000000000,
		isFinished: false,
		stakingLimit: 0,
		Inactive: false,
		disUnstake: true,
		disStake: true,
		disHarvest: false,
		typePool: 1,
	},
	{
		sousId: 1,
		stakingToken: tokens.busd,
		earningToken: tokens.mcv,
		contractAddress: '0x1818233Dcb4C0919cF256De06C007DE2D2563111',
		fees: 0,
		blockPeriod: 86400,
		startBlock: 12781020,
		endBlock: 999243332,
		tokenPerBlock: 771000000000000000,
		isFinished: false,
		stakingLimit: 0,
		Inactive: false,
		disUnstake: true,
		disStake: true,
		disHarvest: false,
		typePool: 1,
	},
	{
		sousId: 2,
		stakingToken: tokens.bnb,
		earningToken: tokens.mcv,
		contractAddress: '0x1818233Dcb4C0919cF256De06C007DE2D2563111',
		fees: 0,
		blockPeriod: 86400,
		startBlock: 12781020,
		endBlock: 999243332,
		tokenPerBlock: 771000000000000000,
		isFinished: false,
		stakingLimit: 0,
		Inactive: false,
		disUnstake: true,
		disStake: true,
		disHarvest: false,
		typePool: 1,
	},
	

	// add farm from >= 500
	// add farm from >= 500
	// add farm from >= 500

	{
		sousId: 29,
		stakingToken: tokens.busdbnblp,
		earningToken: tokens.mcv,
		contractAddress: '0x1818233Dcb4C0919cF256De06C007DE2D2563111',
		fees: 0,
		blockPeriod: 86400,
		startBlock: 12860818,
		endBlock: 16308000648,
		tokenPerBlock: 340000000000000000,
		isFinished: false,
		stakingLimit: 0,
		Inactive: false,
		disUnstake: true,
		disStake: true,
		disHarvest: false,
		typeLP: 1,
		typePool: 2,
	},

]
// sousId lớn nhất : 58
//  ido pool :sousId = 58
//  start pool :sousId = 55
//  farm pool :sousId = 57
// contract test 0x1818233Dcb4C0919cF256De06C007DE2D2563111
export default poolsConfig
