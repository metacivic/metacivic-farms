import { bscTokens } from '../constants/index'
import axios from 'axios'

const chunk = (arr, n) =>
	arr.length ? [arr.slice(0, n), ...chunk(arr.slice(n), n)] : []

const lookUpPrices = async function (id_array) {
	const prices = {}
	for (const id_chunk of chunk(id_array, 50)) {
		let ids = id_chunk.join('%2C')
		let res = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=' +
				ids +
				'&vs_currencies=usd',
		)

		for (const [key, v] of Object.entries(res.data)) {
			if (v.usd) prices[key] = v
		}
	}
	return prices
}
const lookUpPricesBSCS = async function () {
	const prices = {}
		let res = await axios.get(
			'https://api.coingecko.com/api/v3/simple/price?ids=bsc-station&vs_currencies=usd',
		)
		for (const [key, v] of Object.entries(res.data)) {
			if (v.usd) prices[key] = v
		}
	return prices
}
export async function getBscPrices() {
	const idPrices = await lookUpPrices(bscTokens.map((x) => x.id))

	const prices = {}
	for (const bt of bscTokens)
		if (idPrices[bt.id]) prices[bt.contract] = idPrices[bt.id]
	return prices
}

export async function getPrices() {
	const idPrices = await lookUpPrices(bscTokens.map((x) => x.id))

	const prices = {}
	for (const bt of bscTokens)
		if (idPrices[bt.id]) prices[bt.contract] = idPrices[bt.id].usd
	return prices
}
export async function getPricesBSCS() {
	const idPrices = await lookUpPricesBSCS()
	const prices = {}
	for (const bt of bscTokens)
		if (idPrices[bt.id]) prices.usd = idPrices[bt.id].usd
	return prices
}