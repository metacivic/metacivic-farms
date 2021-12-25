import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import useSousHarvest from '../../../hooks/useSousHarvest'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import useSousUnstake from '../../../hooks/useSousUnstake'
import { useCurrentBlock } from '../../../store/hooks'
import WithdrawModal from './/WithdrawModal'
import DepositModal from './DepositModal'
import { fetchPoolsUserDataAsync } from '../../../store/pools/index'
import useSousStake from '../../../hooks/useSousStake'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import BlockCountdown from './BlockCountdown'
import WalletProviderModal from '../../../components/WalletProviderModal/WalletProviderModal'
import useModal from '../../../hooks/useModal'
import Button from '../../../components/ButtonV2'
import { useDispatch } from 'react-redux'
import { useWallet } from 'use-wallet'
import useSousApprove from '../../../hooks/useSousApprove'
import { getPoolBlockUnstake } from '../helpers'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { formatNumber } from '../../../utils/formatBalance'
import InfoImages from './images/info-hihi2.png'
import InfoIn from './images/informa.png'
import { BIG_ZERO } from '../../../utils/bigNumber'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import CulatingImages from './images/calculating.png'

const FCard = styled.div`
	width: 100%;
	max-width: 360px;
	align-self: baseline;
	background: #333333;
	border-radius: 10px;
	box-shadow: rgb(0 0 0 / 6%) 0px 16px 24px, rgb(0 0 0 / 4%) 0px 2px 6px,
		rgb(0 0 0 / 4%) 0px 0px 1px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	position: relative;
	text-align: center;
`
const PoolCard = ({ pool, userDataLoaded }) => {
	const [isView, setIsView] = useState(false)
	const { account } = useWallet()
	const dispatch = useDispatch()
	const [requestedApproval, setRequestedApproval] = useState(false)
	const { userData } = pool
	const { onStake } = useSousStake(pool.sousId)
	const { onUnstake } = useSousUnstake(pool.sousId)
	const { onReward } = useSousHarvest(pool.sousId)
	const [pendingTx, setPendingTx] = useState(false)

	const stakings = userData?.stakedBalance
		? new BigNumber(userData.stakedBalance)
		: BIG_ZERO
	// These will be reassigned later if its Auto CAKE vault
	let stakingTokenBalance = getBalanceNumber(
		stakings,
		pool.stakingToken.decimals,
	)
	let stakingTokenDollarBalance = getBalanceNumber(
		stakings.multipliedBy(pool.stakingTokenPrice),
		pool.stakingToken.decimals,
	)
	const earnings = userData?.pendingReward
		? new BigNumber(userData.pendingReward)
		: BIG_ZERO
	let earningTokenDollarBalance = getBalanceNumber(
		earnings.multipliedBy(pool.earningTokenPrice),
		pool.earningToken.decimals,
	)
	const [onPresentWalletProviderModal] = useModal(
		// @ts-ignore
		<WalletProviderModal />,
		'provider',
	)

	const allowance = userData.allowance
	const { onApprove } = useSousApprove(
		pool.stakingToken.address,
		pool.contractAddress,
	)
	const isApproved = account && allowance && allowance.isGreaterThan(0)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			await onApprove()
			dispatch(fetchPoolsUserDataAsync(account))
			setRequestedApproval(false)
		} catch (e) {
			console.log(e)
			setRequestedApproval(false)
		}
	}, [onApprove, dispatch, account, pool])

	const handleStake = async (amount) => {
		await onStake(amount, pool.stakingToken.decimals)
		dispatch(fetchPoolsUserDataAsync(account))
	}

	const handleUnstake = async (amount) => {
		await onUnstake(amount, pool.stakingToken.decimals)
		dispatch(fetchPoolsUserDataAsync(account))
	}

	const handleReward = useCallback(async () => {
		try {
			setPendingTx(true)
			await onReward()
			dispatch(fetchPoolsUserDataAsync(account))
			setPendingTx(false)
		} catch (e) {
			setPendingTx(false)
			console.error(e)
		}
	}, [account, dispatch, onReward, pool])

	const [onPresentStakeInPoolModal] = useModal(
		<DepositModal
			stakingToken={pool.stakingToken}
			max={userData.stakingTokenBalance}
			onConfirm={handleStake}
		/>,
	)

	const [onPresentWithdrawModal] = useModal(
		<WithdrawModal
			fees={pool.fees}
			lastStakingBlock={userData.lastStakingBlock}
			blockPeriod={pool.blockPeriod}
			stakingToken={pool.stakingToken}
			max={userData.stakedBalance}
			onConfirm={handleUnstake}
		/>,
	)
	const [onPresentApyModal] = useModal(
		<ApyCalculatorModal
			tokenPrice={pool.earningTokenPrice}
			apr={pool.apr}
			earningTokenSymbol={pool.earningToken.symbol}
			performanceFee={pool.fees}
		/>,
	)
	const OpenLinkIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="21.545"
			height="21.526"
			viewBox="0 0 21.545 21.526"
		>
			<g
				id="Group_1924"
				data-name="Group 1924"
				transform="translate(-1995.521 -3234.797)"
			>
				<path
					id="Path_3145"
					data-name="Path 3145"
					d="M2006.277,3256.316c-2.229,0-4.459.013-6.689,0a4.275,4.275,0,0,1-3.9-3.1,4.619,4.619,0,0,1-.16-1.092q-.015-6.625,0-13.25a4.253,4.253,0,0,1,3.115-3.908,4.944,4.944,0,0,1,1.117-.158c1.8-.016,3.6,0,5.4-.01a1.034,1.034,0,0,1,1.02.645,1.054,1.054,0,0,1-.947,1.49c-1.767.01-3.534,0-5.3.005a2.129,2.129,0,0,0-2.121,1.407,2.552,2.552,0,0,0-.151.862q-.014,6.36,0,12.72a2.167,2.167,0,0,0,2.263,2.258q6.361.006,12.721,0a2.171,2.171,0,0,0,2.263-2.258c.006-1.758,0-3.516,0-5.274a1.065,1.065,0,0,1,2.128-.093c.009,1.952.067,3.906-.019,5.854a4.175,4.175,0,0,1-3.258,3.785,5.424,5.424,0,0,1-1.148.119c-2.112.011-4.224.005-6.335.005Z"
					fill="#0dba88"
				/>
				<path
					id="Path_3146"
					data-name="Path 3146"
					d="M2195.075,3236.963h-.339c-1.186,0-2.372,0-3.558,0a1.047,1.047,0,0,1-1.021-.9,1.061,1.061,0,0,1,.776-1.2,1.391,1.391,0,0,1,.35-.032q3.167,0,6.334,0a1.033,1.033,0,0,1,1.13,1.1q.007,3.23,0,6.459a1.067,1.067,0,0,1-2.1.256,1.817,1.817,0,0,1-.035-.45q0-1.691,0-3.381v-.3c-.1.085-.157.133-.212.188q-3.75,3.743-7.5,7.489a1.227,1.227,0,0,1-.937.466,1.028,1.028,0,0,1-.952-.634.964.964,0,0,1,.151-1.106c.3-.338.63-.654.951-.975q3.37-3.375,6.742-6.747C2194.915,3237.135,2194.971,3237.073,2195.075,3236.963Z"
					transform="translate(-181.703 -0.027)"
					fill="#0dba88"
				/>
			</g>
		</svg>
	)
	const lastStakingBlockCustom = userData.lastStakingBlock
	const blockPeriodCustom = pool.blockPeriod
	const currentBlock = useCurrentBlock()
	const hasHarvest = lastStakingBlockCustom + blockPeriodCustom > currentBlock
	const disHarvestTimer = account && lastStakingBlockCustom && hasHarvest
	const { hasPoolStarted } = getPoolBlockUnstake(pool, currentBlock)
	return (
		<FCard>
			<div className="bsc-farm-item-header">
				<div className="position-relative mr-3">
					<img
						style={{
							width: 84,
							height: 84,
							background: 'white',
							borderRadius: '50%',
						}}
						src={`/tokens/${pool.earningToken.symbol.toLowerCase()}.png?v=1`}
					/>
					<img
						className="position-absolute"
						style={{
							width: 34,
							height: 34,
							right: 0,
							bottom: 0,
							borderRadius: '50%',
							background: 'white',
						}}
						src={`/tokens/${pool.stakingToken.symbol.toLowerCase()}.png?v=1`}
					/>
				</div>
				<div className="bsc-farm-item-header-center">
					{pool.iodPartnesr ? (
						<span>
							<>
								{pool.stakingToken.symbol} - {pool.earningToken.symbol}
								<p className="text-small">Marketplace Whitelist</p>
							</>
						</span>
					) : (
						<span>
							{pool.stakingToken.symbol} - {pool.earningToken.symbol}
							<p className="text-small">(Coming soon!)</p>
							{pool.lockup > 0 ? (
								<p className="text-small">Lock-up {pool.lockup} days</p>
							) : (
								''
							)}
						</span>
					)}
				</div>
			</div>

			<div
				style={{ padding: 15 }}
				className={pool.iodPartnesr ? 'card-ido-pool' : ''}
			>
				<div className="text-md d-flex justify-content-between">
					<span className="text-res-l">APR:</span>
					<span className="color-primary h__FontNum">
						{pool.apr ? <>{formatNumber(pool.apr)}%</> : '0%'}
						<button
							type="button"
							onClick={onPresentApyModal}
							className="button-show-modal show-des"
						>
							<img src={CulatingImages} alt="" />
						</button>
					</span>
				</div>
				<div className="text-md d-flex justify-content-between">
					<span className="text-res-l">Earned:</span>
					<span className="text-res-r">{pool.earningToken.symbol}</span>
				</div>

				<div className="text-left mt-2 text-md">
					<p className="mb-0">
						<span className="text-white f-18">{pool.earningToken.symbol}</span>{' '}
						<span className="text-white f-18">Earned</span>
					</p>
					<div className="d-flex justify-content-between align-items-center">
						<span className="row-flex">
							<Value
								size={20}
								value={
									account
										? getBalanceNumber(
												userData.pendingReward,
												pool.earningToken.decimals,
										  )
										: 0
								}
							/>
						</span>
						<Button
							ghost
							disabled={
								!account ||
								pendingTx ||
								userData.pendingReward.eq(new BigNumber(0)) ||
								!isApproved ||
								pool.disHarvest === true ||
								(disHarvestTimer && pool.countdownt === true)
							}
							loading={pendingTx}
							text="Harvest"
							click={handleReward}
						/>
					</div>
				</div>
				<div className="text-left mt-2 text-md">
					<p className="mb-0">
						<span className="text-white f-18">{pool.stakingToken.symbol}</span>{' '}
						<span className="text-white f-18">Staked</span>
					</p>
					<div className="d-flex justify-content-between align-items-center row-flex">
						<span className="row-flex">
							<Value
								size={20}
								value={
									account
										? getBalanceNumber(
												userData.stakedBalance,
												pool.stakingToken.decimals,
										  )
										: 0
								}
							/>
						</span>
						<div className="d-flex">
							<Button
								className="mr-2"
								ghost
								disabled={
									!account ||
									userData.stakedBalance.eq(new BigNumber(0)) ||
									!isApproved ||
									pool.disUnstake === true ||
									hasPoolStarted
								}
								text="Unstake"
								click={onPresentWithdrawModal}
							/>

							<Button
								disabled={
									!account ||
									!isApproved ||
									pool.isFinished === true ||
									pool.disStake === true
								}
								text="+"
								click={onPresentStakeInPoolModal}
								primary
							/>
						</div>
					</div>
				</div>
				<div className="text-left mt-2 text-md">
					<h5 className='text-white f-18'>Start staking</h5>
				</div>
			</div>

			{account ? (
				<>
					{userDataLoaded ? (
						<>
							{!isApproved && (
								<Button
									disabled
									loading={requestedApproval}
									className="w-full my-2 mar-15-btn"
									// text="Approve Contract"
									text="Coming soon!"
									click={handleApprove}
									primary
								/>
							)}
						</>
					) : (
						<Button className="w-full my-2" text="Loading..." />
					)}
				</>
			) : (
				<Button
					className="w-full my-2 mar-15-btn"
					text="Connect Wallet"
					click={onPresentWalletProviderModal}
					primary
				/>
			)}

			<div className="bsc-farm-item-footer">
				<Button
					link
					click={() => setIsView(!isView)}
					text={isView ? 'Hide' : 'Details'}
					right={
						isView ? (
							<ChevronUp color="#fff" size={16} />
						) : (
							<ChevronDown color="#fff" size={16} />
						)
					}
				/>
			</div>
			{isView && (
				<div className="bsc-farm-item-more">
					<BlockCountdown pool={pool} />
					<div className="d-flex justify-content-between align-items-center">
						<span className="text-rest total-raise">Total Raise</span>
						<div className="d-flex justify-content-between align-items-center cuss-color">
							<Value
								size={16}
								unit=""
								value={pool.stakedTvl ? +pool.stakedTvl : 0.0}
							/>
						</div>
					</div>
					<Button
						className="bsc-farm-item-more-bottom pd-top button-info"
						text="View Project Site"
						link
						click={() => {
							window.open(
								`${pool.stakingToken.projectLink}`,
								'_blank', // <- This is what makes it open in a new window.
							)
						}}
						right={<img src={InfoImages} alt="" />}
					/>
					<Button
						className="bsc-farm-item-more-bottom pd-top marr-15 button-info"
						text="View Contract"
						link
						click={() => {
							window.open(
								`https://bscscan.com`,
								'_blank', // <- This is what makes it open in a new window.
							)
						}}
						right={<img src={InfoImages} alt="" />}
					/>
				</div>
			)}
		</FCard>
	)
}

export default PoolCard
