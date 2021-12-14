import { useCallback } from 'react';
import useWeb3 from '../hooks/useWeb3';
import { getERC20Contract } from '../utils/contractHelpers';
import { useWallet } from 'use-wallet';
import { approveSousChef } from '../utils/callHelpers';

const useSousApprove = (tokenAddress, poolAddress) => {
	const {account} = useWallet();
	const web3 = useWeb3();

	const handleApprove = useCallback(async () => {
		const contract = getERC20Contract(tokenAddress, web3);
		const txHash = await approveSousChef(contract, poolAddress, account);
		return txHash;
	}, [account, poolAddress, tokenAddress, web3]);

	return {onApprove: handleApprove};
};

export default useSousApprove;