import React from 'react'
import { OverlayTrigger } from 'react-bootstrap'
import { HelpCircle } from 'react-feather'
import { BSC_BLOCK_TIME } from '../../../config/index'
import { useCurrentBlock } from '../../../store/hooks'
import { useWallet } from 'use-wallet'
import Countdown, { zeroPad } from 'react-countdown'

const WithdrawalFeeTimer = ({ lastStakingBlock, blockPeriod }) => {
	const currentBlock = useCurrentBlock()

	const timer =
		(lastStakingBlock + blockPeriod - currentBlock) * BSC_BLOCK_TIME * 1000 +
		Date.now()

	const renderCountdown = ({ days, hours, minutes, completed }) => {
		if (completed) return <p className="mb-0">0d-0h-0m</p>

		return (
			<p className="mb-0">
				{zeroPad(days)}d-{zeroPad(hours)}h-{zeroPad(minutes)}m
			</p>
		)
	}
	return <Countdown zeroPadTime={2} date={timer} renderer={renderCountdown} />
}

const UnstakingFeeCountdownRow = ({ fees, lastStakingBlock, blockPeriod }) => {
	const currentBlock = useCurrentBlock()
	const { account } = useWallet()

	const hasUnstakingFee = lastStakingBlock + blockPeriod > currentBlock

	// The user has made a deposit, but has no fee
	const noFeeToPay = lastStakingBlock + blockPeriod < currentBlock
	// Show the timer if a user is connected, has deposited, and has an unstaking fee
	const shouldShowTimer = account && lastStakingBlock && hasUnstakingFee

	const getRowText = () => {
		if (noFeeToPay) {
			return 'Unstaking Fee'
		}
		if (shouldShowTimer) {
			return 'unstaking fee until'
		}
		return 'unstaking fee if withdrawn within 72h'
	}

	return (
		<div
			style={{
				fontSize: 14,
			}}
			className="d-flex justify-content-between text-white mt-2"
		>
			<div className="d-flex align-items-center">
				{noFeeToPay ? fees : fees}% {getRowText()}
				<OverlayTrigger
					placement="bottom"
					overlay={
						<div
							className="bg-white p-2"
							style={{
								borderRadius: 15,
								maxWidth: 350,
							}}
						>
							<p>Unstaking fee: {fees}%</p>
							<p>
								Only applies within 3 days of staking. Unstaking after 3 days
								will not include a fee. Timer resets every time you stake in the
								pool.
							</p>
						</div>
					}
				>
					<HelpCircle className="ml-1" size={14} />
				</OverlayTrigger>
			</div>

			{shouldShowTimer && (
				<WithdrawalFeeTimer
					lastStakingBlock={lastStakingBlock}
					blockPeriod={blockPeriod}
				/>
			)}
		</div>
	)
}

export default UnstakingFeeCountdownRow
