import { useCallback } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { sousUnstake } from '../utils/callHelpers';
import { getSousChefContract } from '../utils/contractHelpers';
import { useWallet } from 'use-wallet';

 const useSousUnstake = (sousId) => {
	const { account } = useWallet()
	const web3 = useWeb3()

	const handleUnstake = useCallback(
		async (amount, decimals) => {
			const souschefContract = getSousChefContract(sousId, web3)
			const txHash = await sousUnstake(souschefContract, amount, decimals, account)
			console.log(txHash)
		},
		[account, sousId,web3],
	)

	return { onUnstake: handleUnstake }
}

export default useSousUnstake