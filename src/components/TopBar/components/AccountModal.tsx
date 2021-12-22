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
import './style.less'

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
			<ModalTitle text="Your Wallet Connected with MetaMask" />
			<ModalContent>
				<Spacer />
				{/* <div style={{ display: 'flex' }}>
					<StyledBalanceWrapper>
						<CardIcon>
							<img src="/logo2.png" height={50} />
						</CardIcon>
						<StyledBalance>
							<Value value={getBalanceNumber(baoBalance)} />
							<Label text="MCV Balance" />
						</StyledBalance>
					</StyledBalanceWrapper>
				</div> */}
				<div className="btnViewModal-address">
					<Text className="text">{account} </Text> <div className="icon"><svg viewBox="0 0 24 24" width="20px" className="sc-bdfBwQ cuVBKS coppy-icon" color="primary" xmlns="http://www.w3.org/2000/svg"><path d="M15 1H4C2.9 1 2 1.9 2 3V16C2 16.55 2.45 17 3 17C3.55 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3H15C15.55 3 16 2.55 16 2C16 1.45 15.55 1 15 1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM18 21H9C8.45 21 8 20.55 8 20V8C8 7.45 8.45 7 9 7H18C18.55 7 19 7.45 19 8V20C19 20.55 18.55 21 18 21Z" fill="#F5DE05"></path></svg></div> 
				</div>

				<Spacer />
				<div className="btnViewModal-bscan">
					<Button
						href={`https://bscscan.com/address/${account}`}
						text="View on Bscscan"
					/>
				</div>
				
				<Spacer />
				<div className="btnViewModal">
					<Button onClick={handleSignOutClick} text="Sign out" />
				</div>			
			</ModalContent>
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
