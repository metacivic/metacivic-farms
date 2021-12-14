import BigNumber from 'bignumber.js'

export interface Apr {
  // dailyAPR: BigNumber
  weeklyAPR: BigNumber
  yearlyAPR: BigNumber
  monthlyAPR: BigNumber
}

export interface Farm {
  price: number
  allocPoint: string
  staked_tvl: number
  staked: BigNumber
  pid: number
  lpToken: string
  t0: {
    symbol: string
  }
  t1: {
    symbol: string
  }
  symbol: string
  apr?: Apr
}

export interface FarmsContext {
  farms: Farm[]
}
