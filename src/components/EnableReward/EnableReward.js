import React, { useCallback, useState } from 'react'
import Button from '../../components/Button/Button'
import useStake from '../../hooks/useStake'
import useStakedBalance from '../../hooks/useStakedBalance'
import useUnstake from '../../hooks/useUnstake'
import { getFullDisplayBalance } from '../../utils/formatBalance'

const EnableReward = () => {
	const [requestedEnableReward, setRequestedEnableReward] = useState(false)
	const { onStake } = useStake(1, false)
	const { onUnstake } = useUnstake(0)
	const stakedBalancePool0 = useStakedBalance(0)

	const handleEnableReward = useCallback(async () => {
		try {
			setRequestedEnableReward(true)
			const txhash = await onUnstake(getFullDisplayBalance(stakedBalancePool0))
			if (txhash) {
				await onStake(getFullDisplayBalance(stakedBalancePool0))
			}
			setRequestedEnableReward(false)
		} catch (e) {
			console.log(e)
		}
	}, [setRequestedEnableReward, stakedBalancePool0])

	return (
		<Button
			isLoading={requestedEnableReward}
			disabled={requestedEnableReward}
			onClick={handleEnableReward}
			text={`Enable reward`}
		/>
	)
}

export default EnableReward
