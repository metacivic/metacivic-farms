import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { BIG_TEN } from './bigNumber';

export const approve = async (lpContract, masterChefContract, account) => {
	return lpContract.methods
		.approve(masterChefContract.options.address, ethers.constants.MaxUint256)
		.send({ from: account })
}

export const approveSousChef = async (contract, poolAddress, account) => {
	return contract.methods
		.approve(poolAddress, ethers.constants.MaxUint256)
		.send({ from: account })
}

export const stake = async (masterChefContract, pid, amount, account, ref) => {
	return masterChefContract.methods
		.deposit(pid, ethers.utils.parseUnits(amount, 18))
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const sousStake = async (souschefContract, amount, decimals, account) => {
	return souschefContract.methods
		.deposit(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const unstake = async (masterChefContract, pid, amount, account) => {
	return masterChefContract.methods
		.withdraw(pid, ethers.utils.parseUnits(amount, 18))
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const sousUnstake = async (souschefContract, amount, decimals, account) => {
	return souschefContract.methods
		.withdraw(new BigNumber(amount).times(BIG_TEN.pow(decimals)).toFixed())
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const harvest = async (masterChefContract, pid, account) => {
	return masterChefContract.methods
		.deposit(pid, '0')
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const soushHarvest = async (souschefContract, account) => {
	return souschefContract.methods
		.withdraw('0')
		.send({ from: account })
		.on('transactionHash', (tx) => {
			console.log(tx)
			return tx.transactionHash
		})
}

export const getEarned = async (masterChefContract, pid, account) => {
	return masterChefContract.methods.pendingRewards(pid, account).call()
	
}


export const getRewardPerBlock = async (masterChefContract) => {
	return masterChefContract.methods.rewardPerBlock().call()
}

export const getStaked = async (masterChefContract, pid, account) => {
	try {
		const { amount } = await masterChefContract.methods
			.userInfo(pid, account)
			.call()
		return new BigNumber(amount)
	} catch {
		return new BigNumber(0)
	}
}
