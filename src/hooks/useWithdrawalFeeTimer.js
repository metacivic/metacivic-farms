import React, { useEffect, useState } from 'react';
import { BSC_BLOCK_TIME } from '../config/index';

const useWithdrawalFeeTimer = (lastStakingBlock, blockPeriod) => {
	const [secondsRemaining, setSecondsRemaining] = useState(null)
	const [hasUnstakingFee, setHasUnstakingFee] = useState(false)
	const [currentSeconds, setCurrentSeconds] = useState(Date.now())

	useEffect(() => {
		const feeEndTime = (lastStakingBlock + blockPeriod) * BSC_BLOCK_TIME * 1000 + Date.now()

		const secondsRemainingCalc = feeEndTime - currentSeconds

		const doesUnstakingFeeApply = secondsRemainingCalc > 0

		const tick = () => {
			setCurrentSeconds((prevSeconds) => prevSeconds + 1)
		}
		const timerInterval = setInterval(() => tick(), 1000)
		if (doesUnstakingFeeApply) {
			setSecondsRemaining(secondsRemainingCalc)
			setHasUnstakingFee(true)
		} else {
			setHasUnstakingFee(false)
			clearInterval(timerInterval)
		}

		return () => clearInterval(timerInterval)
	}, [lastStakingBlock, blockPeriod, setSecondsRemaining, currentSeconds])

	return { hasUnstakingFee, secondsRemaining }
};

export default useWithdrawalFeeTimer;