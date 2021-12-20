import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import useSousHarvest from '../../../hooks/useSousHarvest'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import useSousUnstake from '../../../hooks/useSousUnstake'
import WithdrawModal from './/WithdrawModal'
// import { Accordion } from 'react-bootstrap';
import { Collapse, Modal, Tooltip } from 'antd'
import { QuestionCircleOutlined, CheckOutlined } from '@ant-design/icons'

import 'antd/dist/antd.css'
import DepositModal from './DepositModal'
import { fetchPoolsUserDataAsync } from '../../../store/pools/index'
import useSousStake from '../../../hooks/useSousStake'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import BlockCountdown from './BlockCountdown'
import BlockCountdownUnstake from './BlockCountdownUnstake'
import WalletProviderModal from '../../../components/WalletProviderModal/WalletProviderModal'
import useModal from '../../../hooks/useModal'
import Button from '../../../components/ButtonV2'
import { useDispatch } from 'react-redux'
import { useWallet } from 'use-wallet'
import useSousApprove from '../../../hooks/useSousApprove'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { formatNumber } from '../../../utils/formatBalance'
import CulatingImages from './images/calculating.png'
import InfoImages from './images/info.png'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { useCurrentBlock } from '../../../store/hooks'
import { getPoolBlockUnstake } from '../helpers'
import { BIG_ZERO } from '../../../utils/bigNumber'

const PoolCardList = ({ pool, userDataLoaded }) => {
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
	console.log('pool.stakingTokenPrice', pool)

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
	const { Panel } = Collapse

	function callback(key) {
		console.log(key)
	}
	const [isCollapseVisible, setIsCollapseVisible] = useState(true)
	const currentBlock = useCurrentBlock()
	const { hasPoolStarted } = getPoolBlockUnstake(pool, currentBlock)
	const textTooltip = (
		<div>
			<div className="text-tooltip">
				<span className="icon">
					<CheckOutlined />
				</span>
				<span className="text">Calculated based on current rates.</span>
			</div>
			<div className="text-tooltip">
				<span className="icon">
					<CheckOutlined />
				</span>
				<span className="text">
					All APR are estimation and by it does not represent guaranteed
					returns.
				</span>
			</div>
		</div>
	)
	const contentHeader = (
		<div className="box-header-list">
			<div className="item-tow-part d-flex w-3-12">
				{pool.idoLP === true ? (
					<div className="box-logo lp">
						<img
							src={`/tokens/${pool.earningToken.symbol.toLowerCase()}.png?v=125`}
							alt=""
							className="logo-big lp"
						/>
						<img
							src={`/tokens/${pool.stakingToken.symbol.toLowerCase()}.png?v=125`}
							alt=""
							className="logo-small lp"
						/>
					</div>
				) : (
					<div className="box-logo">
						<img
							src={`/tokens/${pool.earningToken.symbol.toLowerCase()}.png`}
							alt=""
							className="logo-big"
						/>
						<img
							src={`/tokens/${pool.stakingToken.symbol.toLowerCase()}.png`}
							alt=""
							className="logo-small"
						/>
					</div>
				)}

				<div className="box-text-logo">
					<div className="token-name d-flex-ido">
						<p className="text-big">
							{pool.stakingToken.symbol} - {pool.earningToken.symbol}
						</p>
					</div>
					<div className="fixible-earn">
						<p className="text-small">{pool.lockup / 30} Months</p>
					</div>
				</div>
			</div>
			<div className="item-tow-part">
				<div className="box-earned">
					<p className="text-earned">{pool.earningToken.symbol} Earned</p>
					<p className="total-coin">
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
					</p>

					<p className="total-usd">
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
						{pool.stakingToken.symbol} <span className="show-des"></span>
					</p>
					{pool.idoLP === false ? (
						<p className="total-usd">
							~
							{userData.stakedBalance > 0 ? (
								<>
									<Value size={16} value={stakingTokenDollarBalance} />
								</>
							) : (
								'0'
							)}
							<span className="show-des">USD</span>
						</p>
					) : (
						''
					)}
				</div>
			</div>
			<div className="item-tow-part d-flex">
				<div className="box-apr cus">
					<Tooltip title={textTooltip}>
						<p className="text-apr icon">
							APR <QuestionCircleOutlined />
						</p>
					</Tooltip>
					<p className="number-apr">
						{pool.apr ? <>{formatNumber(pool.apr)}%</> : '0%'}
					</p>
				</div>
			</div>

			<div className="item-tow-part dis-none">
				<div className="box-total-staked">
					<p className="text-total-staked">Lock-up term</p>
					<p className="number-total-staked d-flex">{pool.lockup} days</p>
				</div>
			</div>
			<div className="item-tow-part dis-none">
				<div className="box-total-staked">
					<p className="number-total-staked d-flex">
						<BlockCountdownUnstake pool={pool} />
					</p>
				</div>
			</div>
			<div className="item-tow-part dis-none w-1-12">
				<Button
					link
					click={() => setIsView(!isView)}
					className="height-80"
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
		</div>
	)
	const contentBody = (
		<div className="box-content-body">
			<div className="item-three-part">
				<p className="text-ends-in">
					<BlockCountdown pool={pool} />
				</p>
				<p className="text-ends-in">
					<BlockCountdownUnstake pool={pool} />
				</p>
				<p className="text-view-info">
					<a
						href={`${pool.stakingToken.projectLink}`}
						target="_blank"
						rel="noreferrer"
					>
						View Project Site <img src={InfoImages} alt="" />
					</a>
				</p>
				<p className="text-view-info">
					{pool.idoLP ? (
						<a
							href={`https://bscscan.com`}
							target="_blank"
							rel="noreferrer"
						>
							View Contract <img src={InfoImages} alt="" />
						</a>
					) : (
						<a
							href={`https://bscscan.com`}
							target="_blank"
							rel="noreferrer"
						>
							View Contract <img src={InfoImages} alt="" />
						</a>
					)}
				</p>
			</div>
			<div className="item-four-part">
				<div className="box-harvest">
					<div className="harvest-left">
						<p className="text-harvest">{pool.earningToken.symbol} Earned</p>
						<p className="total-coin">
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
							<span className="mgl-5 card-details">
								~
								{userData.stakedBalance > 0 ? (
									<>
										<Value size={16} value={earningTokenDollarBalance} />
									</>
								) : (
									'0'
								)}
								<span className="mgl-5">USD</span>
							</span>
							</span>
						</p>
						<p className="total-usd">
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
							{pool.stakingToken.symbol} Stake
						</p>
					</div>
					<div className="harvest-right">
						<Button
							ghost
							disabled={
								!account ||
								pendingTx ||
								userData.pendingReward.eq(new BigNumber(0)) ||
								!isApproved
							}
							loading={pendingTx}
							text="Harvest"
							click={handleReward}
						/>
					</div>
				</div>
			</div>
			<div className="item-four-part">
				<div className="box-start-staking">
					<p className="text-start-staking">Start staking</p>
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
					<div className="d-flex mar-t-5">
						<Button
							className="mr-2"
							ghost
							disabled={
								!account ||
								userData.stakedBalance.eq(new BigNumber(0)) ||
								!isApproved ||
								hasPoolStarted
							}
							text="Unstake"
							click={onPresentWithdrawModal}
						/>
						<Button
							disabled={!account || !isApproved}
							text="+"
							click={onPresentStakeInPoolModal}
							primary
						/>
					</div>
					{account ? (
						<>
							{userDataLoaded ? (
								<>
									{!isApproved && (
										<Button
											loading={requestedApproval}
											className="w-full mar-t-10"
											text="Approve Contract"
											click={handleApprove}
											primary
										/>
									)}
								</>
							) : (
								<Button className="w-full" text="Loading..." />
							)}
						</>
					) : (
						<Button
							className="w-full mar-t-10"
							text="Connect Wallet"
							click={onPresentWalletProviderModal}
							primary
						/>
					)}
				</div>
			</div>
		</div>
	)
	return (
		<>
			<div className="box-list-item">
				<Collapse visible={isCollapseVisible} onChange={callback}>
					<Panel header={contentHeader} key="1">
						{contentBody}
					</Panel>
				</Collapse>
			</div>
		</>
	)
}
export default PoolCardList
