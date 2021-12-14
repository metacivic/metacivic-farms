import React, { useCallback } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { soushHarvest } from '../utils/callHelpers';
import { getSousChefContract } from '../utils/contractHelpers';
import { useWallet } from 'use-wallet';

const useSousHarvest = (sousId) => {
	const { account } = useWallet()
	const web3 = useWeb3()

	const handleReward = useCallback(async () => {
		const souschefContract = getSousChefContract(sousId, web3)
		const txHash = await soushHarvest(souschefContract, account)
	}, [account, web3])
	return { onReward: handleReward }
};

export default useSousHarvest;