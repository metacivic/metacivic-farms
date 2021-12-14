import React from 'react'
import { Clock, Target } from 'react-feather'
import Value from '../../../components/Value'
import { useCurrentBlock } from '../../../store/hooks'
import { getPoolBlockInfo } from '../helpers'
import Countdown from 'react-countdown';

const BlockCountdown = ({ pool }) => {
	const currentBlock = useCurrentBlock()

	const {
		shouldShowBlockCountdown,
		blocksUntilStart,
		blocksRemaining,
		hasPoolStarted,
		blocksToDisplay,
	} = getPoolBlockInfo(pool, currentBlock)

	var timeS = blocksToDisplay * 3
	const renderer = ({ days , hours, minutes, seconds, completed }) => {
		if (completed) {
			return;
		} else {
			return (
			<span>
				{days}d : {hours} : {minutes} : {seconds}
			</span>
			);
		}
	};
	return (
		<>
			{shouldShowBlockCountdown && (
				<div className="text-white d-flex justify-content-between flex-wrap align-items-center">
					<p className="mb-0">
						{hasPoolStarted ? 'Rewards end in' : 'Rewards start in'}
					</p>
					<div className="d-flex align-items-center">
						{(blocksRemaining || blocksUntilStart) && currentBlock ? (
							<>
								<Countdown date={Date.now() + timeS * 1000} renderer={renderer} />
							</>
						) : (
							'...'
						)}
					</div>
				</div>
			)}
		</>
	)
}

export default BlockCountdown
