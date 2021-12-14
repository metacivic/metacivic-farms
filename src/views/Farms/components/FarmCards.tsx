import React, { useCallback, useContext, useState, useMemo } from 'react'
import styled, { keyframes } from 'styled-components'
import { Tabs, Tab } from 'react-bootstrap'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import BigNumber from 'bignumber.js'

import useTokenBalance from '../../../hooks/useTokenBalance'
import useStake from '../../../hooks/useStake'
import useUnstake from '../../../hooks/useUnstake'
import useApprove from '../../../hooks/useApprove'
import useEarnings from '../../../hooks/useEarnings'
import useAllowance from '../../../hooks/useAllowance'
import WalletProviderModal from '../../../components/WalletProviderModal/WalletProviderModal'
import useReward from '../../../hooks/useReward'
import Button from '../../../components/ButtonV2'
import Loader from '../../../components/Loader'
import useFarms from '../../../hooks/useFarms'
import 'react-tabs/style/react-tabs.css'
import './tab-styles.css'
import Grid from '../../../components/Page/Grid'
import useStakedBalance from '../../../hooks/useStakedBalance'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { getContract } from '../../../utils/erc20'
import DepositModal from '../../../components/DepositModal'
import StakeInPoolModal from '../../../components/StakeInPoolModal'
import useModal from '../../../hooks/useModal'
import { ReactComponent as BrandBSCBlack } from '../../../assets/images/brand-bsc-black.svg'
import { ReactComponent as BrandBUSD } from '../../../assets/images/brand-busd.svg'

import './index.less'
const FarmCards: React.FC = () => {
	const [farms] = useFarms()
	return (
		<Tabs defaultActiveKey="live" className="hiden-nav" transition={false} id="noanim-tab-example">
			<Tab className="bsc-nav-tabs" eventKey="live" title="Live">
				<Grid>
					{Array.isArray(farms) &&
						farms
							.filter((x: any) => x.pid !== 1)
							.map((farm, i) => {
								return (
									<React.Fragment key={i}>
										<FarmCard farm={farm} />
									</React.Fragment>
								)
							})}
				</Grid>
			</Tab>
			<Tab eventKey="finished" title="Finished">
				<></>
			</Tab>
		</Tabs>
	)
}

const VerifiedIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16.499"
		height="15.831"
		viewBox="0 0 16.499 15.831"
	>
		<g id="checked-2" transform="translate(0 0)">
			<g id="Group_742" data-name="Group 742" transform="translate(0 0)">
				<g id="Group_741" data-name="Group 741">
					<path
						id="Path_3137"
						data-name="Path 3137"
						d="M15.437,16.678a2.377,2.377,0,0,1-.554-.54,2.492,2.492,0,0,1,.128-.786,2.22,2.22,0,0,0-.083-1.91,2.259,2.259,0,0,0-1.794-.667,2.537,2.537,0,0,1-.784-.123,2.584,2.584,0,0,1-.369-.721c-.241-.6-.515-1.273-1.184-1.488a2.167,2.167,0,0,0-1.809.507,2.43,2.43,0,0,1-.74.374,2.4,2.4,0,0,1-.727-.38,2.174,2.174,0,0,0-1.837-.519,2.253,2.253,0,0,0-1.179,1.491,2.56,2.56,0,0,1-.368.718,2.519,2.519,0,0,1-.8.125,2.183,2.183,0,0,0-1.785.674,2.232,2.232,0,0,0-.063,1.9,2.625,2.625,0,0,1,.131.783,2.528,2.528,0,0,1-.548.535A2.261,2.261,0,0,0,0,18.27a2.233,2.233,0,0,0,1.055,1.608,2.371,2.371,0,0,1,.553.552,2.432,2.432,0,0,1-.13.777,2.192,2.192,0,0,0,.091,1.927,2.3,2.3,0,0,0,1.8.66,2.519,2.519,0,0,1,.784.123,2.6,2.6,0,0,1,.367.72c.241.6.515,1.273,1.184,1.489a1.259,1.259,0,0,0,.4.063,2.8,2.8,0,0,0,1.413-.569,2.417,2.417,0,0,1,.738-.374,2.362,2.362,0,0,1,.725.37,2.167,2.167,0,0,0,1.827.5,2.252,2.252,0,0,0,1.179-1.492,2.569,2.569,0,0,1,.368-.718,2.506,2.506,0,0,1,.794-.125,2.21,2.21,0,0,0,1.782-.664A2.215,2.215,0,0,0,15,21.206a2.6,2.6,0,0,1-.128-.776,2.538,2.538,0,0,1,.547-.535A2.261,2.261,0,0,0,16.5,18.27,2.195,2.195,0,0,0,15.437,16.678Zm-.882,2.165A2.735,2.735,0,0,0,13.582,20a2.761,2.761,0,0,0,.1,1.542,4.492,4.492,0,0,1,.155.757,2.484,2.484,0,0,1-.787.123,2.836,2.836,0,0,0-1.508.386,2.839,2.839,0,0,0-.827,1.306,4.011,4.011,0,0,1-.328.707,2.471,2.471,0,0,1-.679-.355,2.836,2.836,0,0,0-1.458-.583,2.872,2.872,0,0,0-1.468.585,5.507,5.507,0,0,1-.637.372,2.584,2.584,0,0,1-.363-.714,2.82,2.82,0,0,0-.835-1.315,2.794,2.794,0,0,0-1.49-.377,3.384,3.384,0,0,1-.788-.1,2.413,2.413,0,0,1,.13-.779,2.8,2.8,0,0,0,.108-1.54,2.786,2.786,0,0,0-.978-1.181,2.766,2.766,0,0,1-.565-.55c.031-.128.389-.423.581-.581a2.741,2.741,0,0,0,.974-1.156,2.772,2.772,0,0,0-.1-1.554,5.547,5.547,0,0,1-.164-.749,2.578,2.578,0,0,1,.782-.121,2.806,2.806,0,0,0,1.512-.386,2.837,2.837,0,0,0,.827-1.306,4.387,4.387,0,0,1,.324-.706,2.525,2.525,0,0,1,.686.365,2.826,2.826,0,0,0,1.469.6A2.873,2.873,0,0,0,9.717,12.1a5.4,5.4,0,0,1,.637-.372,2.6,2.6,0,0,1,.363.714,2.821,2.821,0,0,0,.835,1.314,2.791,2.791,0,0,0,1.492.378,3.733,3.733,0,0,1,.775.1,2.466,2.466,0,0,1-.128.781,2.83,2.83,0,0,0-.1,1.546,2.73,2.73,0,0,0,.992,1.179,2.614,2.614,0,0,1,.554.535A2.673,2.673,0,0,1,14.556,18.843Z"
						transform="translate(0 -10.358)"
						fill="#fdd284"
					/>
				</g>
			</g>
			<g id="Group_744" data-name="Group 744" transform="translate(4.84 5.184)">
				<g id="Group_743" data-name="Group 743" transform="translate(0 0)">
					<path
						id="Path_3138"
						data-name="Path 3138"
						d="M156.674,171.406a.68.68,0,0,0-.96.085l-3.04,3.635-1.293-1.293a.682.682,0,1,0-.964.964l1.82,1.82a.677.677,0,0,0,.482.2h.029a.679.679,0,0,0,.493-.243l3.518-4.207A.681.681,0,0,0,156.674,171.406Z"
						transform="translate(-150.216 -171.247)"
						fill="#fdd284"
					/>
				</g>
			</g>
		</g>
	</svg>
)

const ArrowDown = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="12.21"
		height="6.723"
		viewBox="0 0 12.21 6.723"
	>
		<g id="back" transform="translate(0 6.723) rotate(-90)">
			<path
				id="Chevron_Right"
				d="M.178,6.541,5.669,12.03a.617.617,0,0,0,.873-.871L1.487,6.105,6.541,1.052A.617.617,0,1,0,5.669.18L.178,5.669A.622.622,0,0,0,.178,6.541Z"
				transform="translate(0 0)"
				fill="#0dba88"
			/>
		</g>
	</svg>
)

const ArrowUp = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16.28"
		height="8.964"
		viewBox="0 0 16.28 8.964"
	>
		<g id="back" transform="translate(16.28) rotate(90)">
			<path
				id="Chevron_Right"
				d="M.238,8.721,7.559,16.04a.822.822,0,1,0,1.164-1.161L1.982,8.14,8.722,1.4A.822.822,0,1,0,7.558.24L.237,7.559A.829.829,0,0,0,.238,8.721Z"
				transform="translate(0 0)"
				fill="#0dba88"
			/>
		</g>
	</svg>
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

interface FarmCardProps {
	farm: any
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
	const [isView, setIsView] = useState(false)
	const { ethereum, account } = useWallet()
	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, farm?.lpToken)
	}, [ethereum, farm?.lpToken])
	const [requestedApproval, setRequestedApproval] = useState(false)
	const tokenBalance = useTokenBalance(lpContract.options.address)
	const stakedBalance = useStakedBalance(farm.pid)
	const stakedBalancePool0 = useStakedBalance(0)
	const lpTokenName = `${farm?.t0?.symbol ? `${farm?.t0?.symbol}-` : ''}${
		farm?.t1?.symbol || ''
	} ${farm?.symbol?.includes('LP') ? 'LP' : farm?.symbol}`
	const { onUnstake } = useUnstake(farm?.pid)
	const { onStake } = useStake(farm?.pid, true)

	const title = `${`${farm?.t0?.symbol ? `${farm?.t0?.symbol}-` : ''}`}${
		farm?.t1?.symbol || ''
	} ${farm?.symbol?.includes('LP') ? '' : farm?.symbol}`

	const [onPresentDepositModal] = useModal(
		<DepositModal
			max={stakedBalance}
			onConfirm={onUnstake}
			tokenName={lpTokenName}
		/>,
	)
	const [onPresentStakeInPoolModal] = useModal(
		<StakeInPoolModal
			max={tokenBalance}
			onConfirm={onStake}
			tokenName={lpTokenName}
		/>,
	)
	const [onPresentWalletProviderModal] = useModal(
		// @ts-ignore
		<WalletProviderModal />,
		'provider',
	)

	const [pendingTx, setPendingTx] = useState(false)
	const { onReward } = useReward(farm.pid)
	const allowance = useAllowance(lpContract)
	const earnings = useEarnings(farm?.pid)
	const { onApprove } = useApprove(lpContract)

	const handleApprove = useCallback(async () => {
		try {
			setRequestedApproval(true)
			const txHash = await onApprove()
			// user rejected tx or didn't go thru
			if (!txHash) {
				setRequestedApproval(false)
			}
		} catch (e) {
			console.log(e)
		}
	}, [onApprove, setRequestedApproval])

	const staked_tvl = farm.staked_tvl || 0

	const mul = farm?.allocPoint / 100

	return (
		<FCard>
			<div className="bsc-farm-item-header">
				<div className="bsc-farm-item-header-left">
					{title.indexOf('BSCS') > -1 && <BrandBSCBlack />}
					{title.indexOf('BUSD') > -1 && <BrandBUSD />}
				</div>
				<div className="bsc-farm-item-header-center">
					<span>{title}
					<br />
						<span>(Inactive)</span>
						</span>
				</div>
				<div className="bsc-farm-item-header-right">
					<span>{mul}X</span>
					<span>
						<VerifiedIcon />
						Core
					</span>
				</div>
			</div>
			<div className="bsc-farm-item-content">
				<div className="bsc-farm-item-content-top">
					<div>
						<span>Earn</span>
						<span className="right">MCV</span>
					</div>
					<div>
						<span>APR:</span>
						<span className="right">
						0%
						</span>
					</div>
				</div>
				<div className="bsc-farm-item-content-mid">
					<span>
					MCV <span> Earned</span>
					</span>
					<div>
						<span>
							<Value value={getBalanceNumber(earnings)} />
						</span>
						{/* <Button
							ghost
							loading={pendingTx}
							disabled={!earnings.toNumber() || pendingTx}
							click={async () => {
								setPendingTx(true)
								await onReward()
								setPendingTx(false)
							}}
							text="Harvest"
						/> */}
					</div>
				</div>
				<div className="bsc-farm-item-content-bottom">
					<span>
						{title} <span> Staked</span>
					</span>
					<div>
						{account ? (
							<>
								{!allowance.toNumber() ? (
									<Button
										loading={requestedApproval}
										className="bsc-farm-item-approve-contract"
										text="Approve Contract"
										click={handleApprove}
										primary
									/>
								) : (
									<>
										<span>
											{farm.pid === 1 ? (
												<Value
													size={20}
													value={getBalanceNumber(
														stakedBalance.plus(stakedBalancePool0),
													)}
												/>
											) : (
												<Value
													size={20}
													value={getBalanceNumber(stakedBalance)}
												/>
											)}
										</span>
										<div>
											<Button
												ghost
												disabled={stakedBalance.eq(new BigNumber(0))}
												text="Unstake"
												click={onPresentDepositModal}
											/>

											{/* <Button
												text="+"
												click={onPresentStakeInPoolModal}
												primary
											/> */}
										</div>
									</>
								)}
							</>
						) : (
							<Button
								className="bsc-farm-item-approve-contract"
								text="Connect Wallet"
								click={onPresentWalletProviderModal}
								primary
							/>
						)}
					</div>
				</div>
			</div>
			{isView && (
				<div className="bsc-farm-item-more">
					<div className="bsc-farm-item-more-top">
						<span>TVL</span>
						<span>${staked_tvl.toLocaleString('en-US')}</span>
					</div>
					<Button
						className="bsc-farm-item-more-mid"
						text={`Get ${title} Token`}
						click={() => {
							window.open(
								``,
								'_blank', // <- This is what makes it open in a new window.
							)
						}}
						link
						right={<OpenLinkIcon />}
					/>
					<Button
						className="bsc-farm-item-more-bottom"
						text="View Contract"
						link
						click={() => {
							window.open(
								`https://bscscan.com/address/${farm.lpToken.toLowerCase()}`,
							)
						}}
						right={<OpenLinkIcon />}
					/>
				</div>
			)}
			<div className="bsc-farm-item-footer">
				<Button
					link
					click={() => setIsView(!isView)}
					text={isView ? 'Hide' : 'Details'}
					right={isView ? <ArrowUp /> : <ArrowDown />}
				/>
			</div>
		</FCard>
	)
}

const FCard = styled.div`
	width: 100%;
	max-width: 360px;
	align-self: baseline;
	background: #262424;
	border-radius: 32px;
	box-shadow: rgb(0 0 0 / 6%) 0px 16px 24px, rgb(0 0 0 / 4%) 0px 2px 6px,
		rgb(0 0 0 / 4%) 0px 0px 1px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	position: relative;
	text-align: center;
`

export default FarmCards
