import { calPrice } from '../utils/price'
import { useWallet } from 'use-wallet'
import useBao from './useBao'
import { useEffect, useState } from 'react'
import { BigNumber } from 'bignumber.js'
import { addressMap } from '../bao/lib/constants'
import Web3 from 'web3'
import UNIV2PairAbi from '../bao/lib/abi/uni_v2_lp.json'

export const usePriceBNB = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbBusd,
			)

			const reserves = await lpContract.methods.getReserves().call()

			const { _reserve0, _reserve1 } = reserves

			setPrice(new BigNumber(_reserve1).div(new BigNumber(_reserve0)))
		}
		if (bao && ethereum) {
			getPrice()
		}
	}, [bao, account, ethereum])

	return price
}

export const usePriceDogen = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [dogenPrice, setDogenPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getDogenPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbDogen,
			)

			const price = await calPrice(lpContract, bnbPrice, 18)

			setDogenPrice(price)
		}
		if (account && bao && ethereum) {
			getDogenPrice()
		}
	}, [account, bao, bnbPrice, ethereum])

	return dogenPrice
}

export const usePriceBSCS = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbBSCS,
			)

			const price = await calPrice(lpContract, bnbPrice, 18, 'BSCS')

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, bnbPrice])

	return price
}

export const usePriceDoge = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbDoge,
			)

			const price = await calPrice(lpContract, bnbPrice, 8)

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, bnbPrice])

	return price
}

export const usePricePoodl = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const dogenPrice = usePriceDogen()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBdogePoodl,
			)

			const price = await calPrice(lpContract, dogenPrice, 9, 'Poodl')

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, dogenPrice])

	return price
}

export const usePriceBPup = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const dogenPrice = usePriceDogen()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBdogebPup,
			)

			const price = await calPrice(lpContract, dogenPrice, 18, 'bPup')

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, dogenPrice])

	return price
}

export const usePriceSafemoon = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbSafemoon,
			)

			const price = await calPrice(lpContract, bnbPrice, 9)

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, bnbPrice])

	return price
}

export const usePriceBnbPancake = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbPancake,
			)

			const price = await calPrice(lpContract, bnbPrice, 18)

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, bnbPrice])

	return price
}

export const usePriceBnbPancakeBulldoge = () => {
	const { account, ethereum } = useWallet()
	const bao = useBao()
	const bnbPrice = usePriceBNB()
	const [price, setPrice] = useState(new BigNumber(0))

	useEffect(() => {
		const getPrice = async () => {
			const web3 = new Web3(ethereum)

			const lpContract = new web3.eth.Contract(
				UNIV2PairAbi,
				addressMap.lpAddressBnbPancakeBulldoge,
			)

			const price = await calPrice(lpContract, bnbPrice, 18)

			setPrice(price)
		}
		if (account && bao) {
			getPrice()
		}
	}, [account, bao, bnbPrice])

	return price
}
