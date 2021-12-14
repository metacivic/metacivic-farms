import { RefreshContextProvider } from './contexts/RefreshContext';
import { ConnectionRejectedError, UseWalletProvider } from 'use-wallet'
import { Provider } from 'react-redux'
import React from 'react'
import FarmsProvider from './contexts/Farms'
import ModalsProvider from './contexts/Modals'
import TransactionProvider from './contexts/Transactions'
import BaoProvider from './contexts/BaoProvider'
import theme from './theme'
import  { ThemeProvider } from 'styled-components'
import { MAINNET_BSC_URL, MAINNET_CHAIN_ID } from './constants/index'
import store from './store/index'

import {
	BscConnector,
	UserRejectedRequestError,
} from '@binance-chain/bsc-connector'

const Providers = ({ children }) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<UseWalletProvider
					chainId={parseInt(MAINNET_CHAIN_ID, 10)}
					connectors={{
						walletconnect: { rpcUrl: MAINNET_BSC_URL },
						bsc: {
							web3ReactConnector() {
								return new BscConnector({ supportedChainIds: [MAINNET_CHAIN_ID] })
							},
							handleActivationError(err) {
								if (err instanceof UserRejectedRequestError) {
									return new ConnectionRejectedError()
								}
							},
						},
					}}
				>
					<BaoProvider>
						<TransactionProvider>
							<FarmsProvider>
								<RefreshContextProvider>
									<ModalsProvider>{children}</ModalsProvider>
								</RefreshContextProvider>
							</FarmsProvider>
						</TransactionProvider>
					</BaoProvider>
				</UseWalletProvider>
			</ThemeProvider>
		</Provider>
	)
}

export default Providers