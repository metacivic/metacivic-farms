import web3NoAccount from '../utils/web3';
import useRefresh from '../hooks/useRefresh';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBlock } from '../store/block/index';
import { transformPool } from '../store/pools/helpers';
import {
	fetchPoolsPublicDataAsync,
	fetchPoolsUserDataAsync
} from '../store/pools/index';
import { fetchPricesDataAsync } from '../store/prices/index';

export const usePollBlockNumber = () => {
	const dispatch = useDispatch();
	const {slowRefresh} = useRefresh();

	const fetchBlock = async () => {
		const web3 = web3NoAccount;
		const blockNumber = await web3.eth.getBlockNumber();
		dispatch(setBlock(blockNumber));
	};

	useEffect(() => {
		fetchBlock();
	}, []);

	useEffect(() => {
		const interval = setInterval(async () => {
			fetchBlock();
		}, 5000);

		dispatch(fetchPricesDataAsync());

		return () => clearInterval(interval);
	}, [dispatch, slowRefresh]);
};

// Block
export const useBlock = () => {
	return useSelector((state) => state.block);
};

export const useCurrentBlock = () => {
	return useSelector((state) => state.block.currentBlock);
};

// pools
export const useFetchPublicPoolsData = () => {
	const dispatch = useDispatch();
	const {slowRefresh} = useRefresh();

	useEffect(() => {
		const fetchPoolsPublicData = async () => {
			const web3 = web3NoAccount;
			const blockNumber = await web3.eth.getBlockNumber();
			dispatch(fetchPoolsPublicDataAsync(blockNumber));
		};

		fetchPoolsPublicData();
	}, [dispatch, slowRefresh]);
};

export const usePools = (account) => {
	const {fastRefresh} = useRefresh();
	const dispatch = useDispatch();

	useEffect(() => {
		if (account) {
			dispatch(fetchPoolsUserDataAsync(account));
		}
	}, [account, dispatch, fastRefresh]);

	const {pools, userDataLoaded} = useSelector((state) => ({
		pools: state.pools.data.filter((x) => x.typePool === 1),
		userDataLoaded: state.pools.userDataLoaded
		
	}));
	return {pools: pools.map(transformPool), userDataLoaded};
};

export const usePoolsLP = (account) => {
	const {fastRefresh} = useRefresh();
	const dispatch = useDispatch();

	useEffect(() => {
		if (account) {
			dispatch(fetchPoolsUserDataAsync(account));
		}
	}, [account, dispatch, fastRefresh]);

	const {pools, userDataLoaded} = useSelector((state) => ({
		 pools: state.pools.data.filter((x) => x.typePool === 2),
		userDataLoaded: state.pools.userDataLoaded
		
		
	}));
	return {pools: pools.map(transformPool), userDataLoaded};
};

export const usePoolsIDO = (account) => {
	const {fastRefresh} = useRefresh();
	const dispatch = useDispatch();

	useEffect(() => {
		if (account) {
			dispatch(fetchPoolsUserDataAsync(account));
		}
	}, [account, dispatch, fastRefresh]);

	const {pools, userDataLoaded} = useSelector((state) => ({
		pools: state.pools.data.filter((x) => x.typePool === 3),
		userDataLoaded: state.pools.userDataLoaded
		
	}));
	return {pools: pools.map(transformPool), userDataLoaded};
};

// prices

export const usePrices = () => {
	
	const prices = useSelector((state) => state.prices.data);
	return prices;
};