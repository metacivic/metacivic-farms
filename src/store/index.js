import { configureStore } from '@reduxjs/toolkit'

import blockReducer from './block'
import poolsReducer from './pools'
import pricesReducer from './prices'

const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  reducer: {
    block: blockReducer,
    prices: pricesReducer,
    pools: poolsReducer
  },
})

export default store
