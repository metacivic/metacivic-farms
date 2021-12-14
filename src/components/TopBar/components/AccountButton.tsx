import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useModal from '../../../hooks/useModal'
import Button from '../../Button'
import WalletProviderModal from '../../WalletProviderModal/WalletProviderModal'
import AccountModal from './AccountModal'

import { formatAddressWallet } from '../../../utils/formatAddress'

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
	const [onPresentAccountModal] = useModal(<AccountModal />)
	const [onPresentWalletProviderModal] = useModal(
		// @ts-ignore
		<WalletProviderModal />,
		'provider',
	)

	const { account } = useWallet()
	const handleUnlockClick = useCallback(() => {
		onPresentWalletProviderModal()
	}, [onPresentWalletProviderModal])

	return (
		<StyledAccountButton>
			{!account ? (
				<Button onClick={handleUnlockClick} size="sm" text="Connect Wallet" />
			) : (
				<Button
					onClick={onPresentAccountModal}
					size="sm"
					text={formatAddressWallet(account)}
					
					
				/>
				
			)}
			
		</StyledAccountButton>
		
		
	)
}

const StyledAccountButton = styled.div`
	margin-right: 0.5rem;
	> button {
		background-color: transparent;
		border: 1px solid ${(props) => props.theme.color.primary.main};
		color: ${(props) => props.theme.color.primary.main};
		height: 36px;
		box-shadow: none;
		border-radius: 8px;
		&:hover {
			background-color: transparent;
		}
	}
`

export default AccountButton
