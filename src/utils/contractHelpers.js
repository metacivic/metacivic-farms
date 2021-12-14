import poolsConfig from '../constants/pools';
import web3NoAccount from './web3'
import sousChefAbi from '../config/abi/sousChef.json'
import erc20Abi from '../constants/abi/erc20.json';

export const getContract = (abi, address, web3) => {
	const _web3 = web3 ?? web3NoAccount
	return new _web3.eth.Contract(abi, address)
}

export const getSousChefContract = (id, web3) => {
	const pool = poolsConfig.find((pool) => pool.sousId === id)
	return getContract(sousChefAbi, pool.contractAddress, web3)
}

export const getERC20Contract = (address, web3) => {
	return getContract(erc20Abi, address, web3);
};