import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { CopyToClipboard } from 'react-copy-to-clipboard'
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
	const [copied, setCopied] = useState(false)

	const IconCoppy = () => (
		<svg
			viewBox="0 0 24 24"
			width="20px"
			className="sc-bdfBwQ cuVBKS coppy-icon"
			color="primary"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M15 1H4C2.9 1 2 1.9 2 3V16C2 16.55 2.45 17 3 17C3.55 17 4 16.55 4 16V4C4 3.45 4.45 3 5 3H15C15.55 3 16 2.55 16 2C16 1.45 15.55 1 15 1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM18 21H9C8.45 21 8 20.55 8 20V8C8 7.45 8.45 7 9 7H18C18.55 7 19 7.45 19 8V20C19 20.55 18.55 21 18 21Z"
				fill="#777E90"
			></path>
		</svg>
	)

	const handleSignOutClick = useCallback(() => {
		onDismiss!()
		reset()
	}, [onDismiss, reset])

	const bao = useBao()
	const baoBalance = useTokenBalance(getBaoAddress(bao))

	return (
		<Modal>
			<ModalTitle onDismiss={onDismiss} text="Your Wallet" />
			<ModalContent>
				{/* <Spacer /> */}
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
				{/* <div className="btnViewModal-address">
					<Text className="text">
						{`${account.substr(0, 4)}...${account.substr(account.length - 17)}`}{' '}
					</Text>{' '}
					<CopyToClipboard text={account} onCopy={() => setCopied(true)}>
						<button className="h__btnCopy">
							<IconCoppy />
						</button>
					</CopyToClipboard>
				</div> */}

				<Text className="text-custom">
					{account.substr(0, 10)}...{account.substr(account.length - 17)}
					<CopyToClipboard text={account} onCopy={() => setCopied(true)}>
						<button className="h__btnCopy">
							<IconCoppy />
						</button>
					</CopyToClipboard>
				</Text>

				<ButtonCusTom>
					<a
						href={`https://bscscan.com/address/${account}`}
						target="_blank"
						rel="noreferrer"
					>
						View on Bscscan &nbsp;
						<svg
							viewBox="0 0 24 24"
							color="primary"
							width="20px"
							xmlns="http://www.w3.org/2000/svg"
							className="sc-bdfBwQ tqmjO"
						>
							<path
								d="M18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H11C11.55 5 12 4.55 12 4C12 3.45 11.55 3 11 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13C21 12.45 20.55 12 20 12C19.45 12 19 12.45 19 13V18C19 18.55 18.55 19 18 19ZM14 4C14 4.55 14.45 5 15 5H17.59L8.46 14.13C8.07 14.52 8.07 15.15 8.46 15.54C8.85 15.93 9.48 15.93 9.87 15.54L19 6.41V9C19 9.55 19.45 10 20 10C20.55 10 21 9.55 21 9V4C21 3.45 20.55 3 20 3H15C14.45 3 14 3.45 14 4Z"
								fill="#ED8F0F"
							></path>
						</svg>
					</a>
				</ButtonCusTom>

				<Spacer />
				<ButtonCusTomx>
					<button type="button" onClick={handleSignOutClick}>
						Disconnect Wallet
					</button>
				</ButtonCusTomx>
			</ModalContent>
		</Modal>
	)
}

const StyledBalance = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`

// const Text = styled.div`
// 	font-size: 20px;
// 	font-weight: bold;
// `

const StyledBalanceWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	margin-bottom: ${(props) => props.theme.spacing[4]}px;
`

const ButtonCusTom = styled.button`
	width: 100%;
	text-align: left;
	background: transparent;
	border: none;
	outline: none;
	a {
		font-size: 14px;
		font-weight: 600;
		line-height: 1.5;
		color: #ed8f0f !important;
		/* color: #f5de05 !important; */
		padding-right: 8px;
	}
`
const Text = styled.div`
	font-weight: 600;
	line-height: 1.5;
	font-size: 16px;
	background: #272c35;
	color: #777e90 !important;
	padding: 8px;
	border-radius: 8px;
	display: flex;
	gap: 14px;
	cursor: pointer;
	margin-bottom: 20px;
	padding-right: 10px;
	padding-left: 10px;

	.h__btnCopy {
		border: none;
		outline: none;
		background: transparent;
	}
`

const ButtonCusTomx = styled.button`
	background: transparent;
	border: none;
	outline: none;

	button {
		background: transparent;
		border: 1px solid #f42727;
		border-radius: 8px;
		font-weight: 500;
		height: 40px;
		padding: 0 20px;
		color: #f42727;
		cursor: pointer;
		display: inline-flex;
		font-family: inherit;
		font-size: 16px;
		font-weight: 600;
		justify-content: center;
		align-items: center;
		letter-spacing: 0.03em;
		opacity: 1;
		outline: 0px;
		transition: background-color 0.2s ease 0s;
	}
`

export default AccountModal
