/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'

import Button from '../ButtonV2'
import Modal from '../Modal'
import ModalActions from '../ModalActions'
import ModalContent from '../ModalContent'
import ModalTitle from '../ModalTitle'
import Spacer from '../Spacer'
import { ReactComponent as MetamaskIcon } from '../../assets/images/wallets/metamark2.svg'
import { ReactComponent as BinanceChainIcon } from '../../assets/images/wallets/binance_chain.svg'
import { ReactComponent as SafePallIcon } from '../../assets/images/wallets/question.svg'
import { ReactComponent as TrustIcon } from '../../assets/images/wallets/trust.svg'
import { ReactComponent as WalletConnectIcon } from '../../assets/images/wallets/walletconnect.svg'

import WalletCard from './components/WalletCard'
import { MAINNET_BSC_URL, MAINNET_CHAIN_ID } from '../../constants'

const WalletProviderModal = (props) => {
	const { onDismiss } = props
	const { account, connect, error } = useWallet()
	const handleLogin = () => {
		connect('injected')
	}

	const connectTrustWallet = () => {
		connect('injected')
	}

	const connectWalletConnect = () => {
		connect('walletconnect')
	}

	const connectBinance = () => {
		connect('bsc')
	}

	useEffect(() => {
		if (account) {
			onDismiss()
		}
	}, [account, onDismiss])

	useEffect(() => {
		const setupNetwork = async () => {
			// @ts-ignore
			const provider = window?.ethereum

			if (provider) {
				try {
					// @ts-ignore
					await provider?.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainId: `0x${MAINNET_CHAIN_ID.toString(16)}`,
								chainName: 'Binance Smart Chain Mainnet',
								nativeCurrency: {
									name: 'BNB',
									symbol: 'bnb',
									decimals: 18,
								},
								rpcUrls: [MAINNET_BSC_URL],
								blockExplorerUrls: ['https://bscscan.com/'],
							},
						],
					})
					return true
				} catch (error) {
					console.error(error)
					return false
				}
			} else {
				console.error(
					"Can't setup the BSC network on metamask because window.ethereum is undefined",
				)
				return false
			}
		}

		if (error?.name === 'ChainUnsupportedError') {
			setupNetwork()
		}
	}, [error])
	return (
		<Modal>
			<ModalTitle onDismiss={onDismiss} text="Connect to a wallet" />
			<ModalContent>
				<StyledWalletsWrapper>
					<WalletCard
						icon={<MetamaskIcon />}
						onConnect={handleLogin}
						title="Meta Mask"
					/>
					<WalletCard
						icon={<WalletConnectIcon />}
						onConnect={connectWalletConnect}
						title="WalletConnect"
					/>
					<WalletCard
						icon={<SafePallIcon />}
						onConnect={connectBinance}
						title="SafePal Wallet"
					/>
					<WalletCard
						icon={<BinanceChainIcon />}
						onConnect={connectBinance}
						title="Binance Chain Wallet"
					/>
					<WalletCard
						icon={<TrustIcon />}
						onConnect={connectTrustWallet}
						title="TrustWallet"
					/>

					<Spacer size="sm" />
				</StyledWalletsWrapper>
			</ModalContent>
			<ModalActions>
				<a
					className="customConnect"
					rel="noopener noreferrer"
					href="/"
					target="_blank"
					style={{ fontSize: '13px', fontWeight: '400' }}
				>
					<i
						className="fa fa-question-circle-o"
						aria-hidden="true"
						style={{ paddingRight: '8px' }}
					/>
					<span>Learn how to connect</span>
				</a>
			</ModalActions>
		</Modal>
	)
}

const StyledWalletsWrapper = styled.div`
	display: flex;
	flex-direction: column;
`

export default WalletProviderModal
