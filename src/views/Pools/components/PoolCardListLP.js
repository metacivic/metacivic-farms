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
import styled from 'styled-components'
import { ChevronDown, ChevronUp } from 'react-feather'
import { formatNumber } from '../../../utils/formatBalance'
import CulatingImages from './images/calculating.png'
import InfoImages from './images/export.png'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { BIG_ZERO } from '../../../utils/bigNumber'

const PoolCardListLP = ({ pool, userDataLoaded }) => {
	const [isView, setIsView] = useState(false)
	const { account } = useWallet()
	const dispatch = useDispatch()
	const [requestedApproval, setRequestedApproval] = useState(false)
	const { userData } = pool
	const { onStake } = useSousStake(pool.sousId)
	const { onUnstake } = useSousUnstake(pool.sousId)
	const { onReward } = useSousHarvest(pool.sousId)
	const [pendingTx, setPendingTx] = useState(false)

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
	const earnings = userData?.pendingReward
		? new BigNumber(userData.pendingReward)
		: BIG_ZERO
	let earningTokenDollarBalance = getBalanceNumber(
		earnings.multipliedBy(pool.earningTokenPrice),
		pool.earningToken.decimals,
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
	const liquidityUrlPathParts = getLiquidityUrlPathParts({
		quoteTokenAddress: pool.stakingToken.address,
		tokenAddress: pool.earningToken.address,
	})
	const [isCollapseVisible, setIsCollapseVisible] = useState(true)
	const lastStakingBlockCustom = userData.lastStakingBlock
	const blockPeriodCustom = pool.blockPeriod
	const currentBlock = useCurrentBlock()
	const hasHarvest = lastStakingBlockCustom + blockPeriodCustom > currentBlock
	const disHarvestTimer = account && lastStakingBlockCustom && hasHarvest
	const contentHeader = (
		<div className="box-header-list">
			<div className="item-tow-part farm-lp d-flex">
				<div className="box-logo lp">
					<img
						src={`/tokens/${pool.earningToken.symbol.toLowerCase()}.png?v=126`}
						alt=""
						className="logo-big lp"
						style={{ display: 'none' }}
						//  theo layout figma
					/>
					<img
						src={`/tokens/${pool.stakingToken.symbol.toLowerCase()}.png?v=126`}
						alt=""
						className="h__customLogo logo-small lp "
						style={{ position: 'unset' }}
					/>
				</div>

				{/* <div className="box-text-logo">
					<p className="text-big">EARN {pool.earningToken.symbol}</p>
					<p className="text-small"> {pool.stakingToken.symbol}</p>
					<p className="text-small">(Coming soon!)</p>
				</div> */}
			</div>
			<div className="item-tow-part box-text-logo farm-lp">
				<p className="text-big">EARN {pool.earningToken.symbol}</p>
				<p className="text-small"> {pool.stakingToken.symbol}</p>
				<p className="text-small">(Coming soon!)</p>
			</div>
			<div className="item-tow-part farm-lp dis-none-500">
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
			<div className="item-tow-part farm-lp d-flex">
				<div className="box-apr">
					<p className="text-apr">APR</p>
					<p className="number-apr">
						{pool.apr ? <>{formatNumber(pool.apr)}%</> : '0%'}
					</p>
				</div>
			</div>
			<div className="item-tow-part farm-lp dis-none">
				<div className="box-total-staked">
					<p className="text-total-staked">Total Liquidity</p>
					<p className="number-total-staked d-flex">
						<Value
							size={16}
							unit="$"
							value={pool.stakedTvl ? +pool.stakedTvl : 0}
						/>
						{pool.stakingToken.symbol}
					</p>
				</div>
			</div>
			<div className="item-tow-part farm-lp dis-none">
				<div className="box-ends-in">
					<p className="number-ends-in">
						<BlockCountdownDetail pool={pool} />
					</p>
				</div>
			</div>
			<div className="item-tow-part farm-lp dis-none">
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
					<a href={`https://bscscan.com`} target="_blank" rel="noreferrer">
						View Pool <img src={InfoImages} alt="" />
					</a>
				</p>
				<p className="text-view-info">
					<a href={`https://bscscan.com`} target="_blank" rel="noreferrer">
						View Contract <img src={InfoImages} alt="" />
					</a>
				</p>
				<p className="text-view-info">
					<>
						{pool.typeLP === 1 ? (
							<a href={`#`}>
								Get {pool.stakingToken.symbol} <img src={InfoImages} alt="" />
							</a>
						) : (
							<a href={`#`}>
								Get {pool.stakingToken.symbol} <img src={InfoImages} alt="" />
							</a>
						)}
					</>
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
							</span>
						</p>
					</div>
					<div className="harvest-right">
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
					<div className="d-flex mar-t-5">
						<Button
							className="mr-2"
							ghost
							disabled={
								!account ||
								userData.stakedBalance.eq(new BigNumber(0)) ||
								!isApproved ||
								pool.disUnstake === true
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
export default PoolCardListLP
