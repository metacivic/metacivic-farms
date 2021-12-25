import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import useSousHarvest from '../../../hooks/useSousHarvest'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'
import useSousUnstake from '../../../hooks/useSousUnstake'
import { useCurrentBlock } from '../../../store/hooks'
import WithdrawModal from './/WithdrawModal'
// import { Accordion } from 'react-bootstrap';
import { Collapse, Modal } from 'antd'
import 'antd/dist/antd.css'
import DepositModal from './DepositModal'
import { fetchPoolsUserDataAsync } from '../../../store/pools/index'
import useSousStake from '../../../hooks/useSousStake'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import BlockCountdown from './BlockCountdown'
import BlockCountdownDetail from './BlockCountdownDetail'
import WalletProviderModal from '../../../components/WalletProviderModal/WalletProviderModal'
import useModal from '../../../hooks/useModal'
import Button from '../../../components/ButtonV2'
import { useDispatch } from 'react-redux'
import { useWallet } from 'use-wallet'
import useSousApprove from '../../../hooks/useSousApprove'
import { getPoolBlockUnstake } from '../helpers'
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { formatNumber } from '../../../utils/formatBalance'
import CulatingImages from './images/calculating.png'
import InfoImages from './images/info-hihi2.png'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
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
	const handleMigrate = async (amount) => {
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
	const lastStakingBlockCustom = userData.lastStakingBlock
	const blockPeriodCustom = pool.blockPeriod
	const currentBlock = useCurrentBlock()
	const hasHarvest = lastStakingBlockCustom + blockPeriodCustom > currentBlock
	const disHarvestTimer = account && lastStakingBlockCustom && hasHarvest
	const { hasPoolStarted } = getPoolBlockUnstake(pool, currentBlock)
	const contentHeader = (
		<div className="box-header-list">
			
			<div className="item-tow-part d-flex">
				<div className="box-logo">
					<img
						src={`/tokens/${pool.earningToken.symbol.toLowerCase()}.png?v=1`}
						alt=""
						className="logo-big"
					/>
					<img
						src={`/tokens/${pool.stakingToken.symbol.toLowerCase()}.png?v=1`}
						alt=""
						className="logo-small"
					/>
				</div>
			</div>
			<div className="item-tow-part box-text-logo">
				{pool.iodPartnesr ? (
					<>
						<p className="text-big">
							{pool.stakingToken.symbol} - {pool.earningToken.symbol}
						</p>
					</>
				) : (
					<p className="text-big">EARN {pool.earningToken.symbol}</p>
				)}

				<p className="text-small">Stake {pool.stakingToken.symbol}</p>
				<p className="text-small">(Coming soon!)</p>
				{pool.lockup > 0 ? (
					<p className="text-small">Lock-up {pool.lockup} days</p>
				) : (
					''
				)}
			</div>
			<div className="item-tow-part dis-none-500">
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
				</div>
			</div>
			<div className="item-tow-part d-flex">
				<div className="box-apr">
					<p className="text-apr">
						APR
						<button
							type="button"
							onClick={onPresentApyModal}
							className="button-show-modal icon-show-modal"
						>
							<img src={CulatingImages} alt="" />
						</button>
					</p>
					<div className="d-flex f-gap">
						<p className="number-apr">
							{pool.apr ? <>{formatNumber(pool.apr)}%</> : '0%'}
						</p>
					</div>
				</div>
			</div>
			<div className="item-tow-part dis-none">
				<div className="box-total-staked">
					<p className="text-total-staked">Total Raise</p>
					<p className="number-total-staked d-flex">
						<Value
							size={16}
							unit=""
							value={pool.stakedTvl ? +pool.stakedTvl : 0}
						/>
						<span>{pool.stakingToken.symbol}</span>
					</p>
				</div>
			</div>
			<div className="item-tow-part dis-none">
				<div className="box-ends-in">
					<p className="number-ends-in">
						<BlockCountdownDetail pool={pool} />
					</p>
				</div>
			</div>
			<div className="item-tow-part dis-none">
				<Button
					link
					click={() => setIsView(!isView)}
					className="height-80"
					text={isView ? 'Hide' : 'Details'}
					right={
						isView ? (
							// <ChevronUp color="#0DBA88" size={16} />
							<UpOutlined color="#fff" style={{ paddingLeft: '5px' }} />
						) : (
							// <ChevronDown color="#0DBA88" size={16} />
							<DownOutlined color="#fff" style={{ paddingLeft: '5px' }} />
						)
					}
				/>
			</div>
		</div>
	)
	const contentBody = (
		<div className="box-content-body">
			<div className="item-three-part">
				<p className="line-total-staked dis-mobile">
					<span className="text-left">Total staked:</span>
					<span className="text-right">
						<Value
							size={16}
							unit="$"
							value={pool.stakedTvl ? +pool.stakedTvl : 0}
						/>
						{pool.stakingToken.symbol}
					</span>
				</p>
				<p className="text-view-info dis-mobile">
					{pool.isFinished === true ? (
						<UnstakingFeeCountdownRow
							fees={0}
							lastStakingBlock={userData.lastStakingBlock}
							blockPeriod={pool.blockPeriod}
						/>
					) : (
						<UnstakingFeeCountdownRow
							fees={pool.fees}
							lastStakingBlock={userData.lastStakingBlock}
							blockPeriod={pool.blockPeriod}
						/>
					)}
				</p>
				<p className="text-ends-in">
					<BlockCountdown pool={pool} />
				</p>

				<p className="text-view-info hide-mobile">
					{pool.isFinished === true ? (
						<UnstakingFeeCountdownRow
							fees={0}
							lastStakingBlock={userData.lastStakingBlock}
							blockPeriod={pool.blockPeriod}
						/>
					) : (
						<UnstakingFeeCountdownRow
							fees={pool.fees}
							lastStakingBlock={userData.lastStakingBlock}
							blockPeriod={pool.blockPeriod}
						/>
					)}
				</p>
				<p className="text-view-info">
					<a href={`${pool.stakingToken.projectLink}`}>
						View Project Site <img src={InfoImages} alt="" />
					</a>
				</p>
				<p className="text-view-info">
					<a href={`https://bscscan.com`} target="_blank" rel="noreferrer">
						View Contract <img src={InfoImages} alt="" />
					</a>
				</p>
			</div>
			<div className="item-four-part">
				<div className="box-harvest">
					<div className="harvest-left">
						<p className="text-harvest">{pool.earningToken.symbol} Earned</p>
						<p className="total-coin">
							<>
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
							</>
						</p>
					</div>
					<div className="harvest-right cus-btn">
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
					<div className="d-flex mar-t-5" style={{ display: 'none!important' }}>
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

					{account ? (
						<>
							{userDataLoaded ? (
								<>
									{!isApproved && (
										<Button
											disabled
											loading={requestedApproval}
											className="w-full mar-t-10"
											// text="Approve Contract"
											text="Coming soon!"
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
			{pool.iodPartnesr ? (
				<div className="box-list-item">
					<Collapse visible={isCollapseVisible} onChange={callback}>
						<Panel header={contentHeader} key="1">
							{contentBody}
						</Panel>
					</Collapse>
				</div>
			) : (
				<div className="box-list-item ">
					<Collapse visible={isCollapseVisible} onChange={callback}>
						<Panel header={contentHeader} key="1">
							{contentBody}
						</Panel>
					</Collapse>
				</div>
			)}
		</>
	)
}
export default PoolCardList
