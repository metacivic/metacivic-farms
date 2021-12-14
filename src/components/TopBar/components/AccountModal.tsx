import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useBao from '../../../hooks/useBao'
import { getBaoAddress } from '../../../bao/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import Button from '../../Button'
import CardIcon from '../../CardIcon'
import Label from '../../Label'
import Modal, { ModalProps } from '../../Modal'
import ModalActions from '../../ModalActions'
import ModalContent from '../../ModalContent'
import ModalTitle from '../../ModalTitle'
import Spacer from '../../Spacer'
import Value from '../../Value'
import { truncate } from 'fs'

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
	const { account, reset } = useWallet()

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const bao = useBao()
	const baoBalance = useTokenBalance(getBaoAddress(bao))

	return (
		<Modal>
			<ModalTitle text="My Account" />
			<ModalContent>
				<Spacer />
				<div style={{ display: 'flex' }}>
					<StyledBalanceWrapper>
						<CardIcon>
							<img src="/logo2.png" height={50} />
						</CardIcon>
						<StyledBalance>
							<Value value={getBalanceNumber(baoBalance)} />
							<Label text="MCV Balance" />
						</StyledBalance>
					</StyledBalanceWrapper>
				</div>
				<Text className="text-custom" >{account}</Text>
				<Spacer />
				<Button
					href={`https://bscscan.com/address/${account}`}
					text="View on Bscscan"
				/>
				<Spacer />
				<Button onClick={handleSignOutClick} text="Sign out" />
			</ModalContent>
			<ModalActions>
				<Button onClick={onDismiss} text="Cancel" />
			</ModalActions>
		</Modal>
	)
}

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

const Text = styled.div`
	font-size: 20px;
	font-weight: bold;
`

const StyledBalanceWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

export default AccountModal
