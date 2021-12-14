import { useCallback } from 'react';
import { sousStake } from '../utils/callHelpers';
import useWeb3 from '../hooks/useWeb3';
import { getSousChefContract } from '../utils/contractHelpers';
import { useWallet } from 'use-wallet';

const useSousStake = (sousId) => {
	const { account } = useWallet()
	const web3 = useWeb3()

	const handleStake = useCallback(
		async (amount, decimals) => {
			const souschefContract = getSousChefContract(sousId, web3)
			const txHash = await sousStake(souschefContract, amount, decimals, account)
			console.log(txHash)
		},
		[account, sousId, web3],
	)

	return { onStake: handleStake }
}

export default useSousStake