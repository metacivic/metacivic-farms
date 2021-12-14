import React from 'react'
import { Clock, Target } from 'react-feather'
import Value from '../../../components/Value'
import { useCurrentBlock } from '../../../store/hooks'
import { getPoolBlockInfo } from '../helpers'

const BlockCountdownDetail = ({ pool }) => {
	const currentBlock = useCurrentBlock()

	const {
		shouldShowBlockCountdown,
		blocksUntilStart,
		blocksRemaining,
		hasPoolStarted,
		blocksToDisplay,
	} = getPoolBlockInfo(pool, currentBlock)
	return (
		<>
			{shouldShowBlockCountdown && (
				<div className="text-white d-flex justify-content-between flex-wrap align-items-center">
					<p className="mb-0">
						{/* {hasPoolStarted ? 'Rewards end in' : 'Rewards start in'} */}
						Rewards start in
					</p>
					<div className="d-flex align-items-center">
						{(blocksRemaining || blocksUntilStart) && currentBlock ? (
							<>
								{/* <Value size={15} value={blocksToDisplay} decimals={0} /> */}
								<span className="ml-1">0.000 Blocks</span>
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

export default BlockCountdownDetail
