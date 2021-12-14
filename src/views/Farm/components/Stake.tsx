import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useAllowance from '../../../hooks/useAllowance'
import useApprove from '../../../hooks/useApprove'
import useModal from '../../../hooks/useModal'
import useStake from '../../../hooks/useStake'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import EnableReward from '../../../components/EnableReward/EnableReward'
import IconButton from '../../../components/IconButton'
import { Plus } from 'react-feather'

interface StakeProps {
	lpContract: Contract
	pid: number
	tokenName: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {
	const [requestedApproval, setRequestedApproval] = useState(false)

	const allowance = useAllowance(lpContract)
	const { onApprove } = useApprove(lpContract)

	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(pid)
	const stakedBalancePool0 = useStakedBalance(0)

	const { onStake } = useStake(pid, true)
	const { onUnstake } = useUnstake(pid)

	const [onPresentDeposit] = useModal(
		<DepositModal
			max={tokenBalance}
			onConfirm={onStake}
			tokenName={tokenName}
		/>,
	)

	const [onPresentWithdraw] = useModal(
		<WithdrawModal
			max={stakedBalance}
			onConfirm={onUnstake}
			tokenName={tokenName}
		/>,
	)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	return (
		<Card>
			<CardContent>
				<StyledCardContentInner>
					<StyledCardHeader>
						<CardIcon>
							<img src="/logo2.png" width={50} height={50} />
						</CardIcon>
						<Value
							value={getBalanceNumber(stakedBalance.plus(stakedBalancePool0))}
						/>
						<Label text={`${tokenName} Tokens Staked`} />
					</StyledCardHeader>
					{pid === 1 && stakedBalancePool0.isGreaterThan(0) && <EnableReward />}
					<StyledCardActions>
						{!allowance.toNumber() ? (
							<Button
								isLoading={requestedApproval}
								disabled={requestedApproval}
								onClick={handleApprove}
								text="Approve"
							/>
						) : (
							<>
								<Button
									disabled={stakedBalance.eq(new BigNumber(0))}
									text="Unstake"
									onClick={onPresentWithdraw}
								/>
								<StyledActionSpacer />
								<IconButton onClick={onPresentDeposit}>
									<Plus />
								</IconButton>
							</>
						)}
					</StyledCardActions>
				</StyledCardContentInner>
			</CardContent>
		</Card>
	)
}

const StyledCardHeader = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
`
const StyledCardActions = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: ${(props) => props.theme.spacing[5]}px;
	width: 100%;

	button {
		margin-top: 10px;
	}
`

const StyledActionSpacer = styled.div`
	height: ${(props) => props.theme.spacing[4]}px;
	width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: space-between;
`

export default Stake
