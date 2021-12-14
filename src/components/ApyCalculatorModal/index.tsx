import React, { useState } from 'react'
import styled from 'styled-components'
// import { Modal } from 'antd'
import Modal from '../../components/Modal/index'
import Button from '../../components/ButtonV2/index'
import {
	CloseOutlined
  } from '@ant-design/icons';

import {
	tokenEarnedPerThousandDollarsCompounding,
	getRoi,
} from 'utils/compoundApyHelpers'

const ApyCalculatorModal = (props: any) => {
	const {
		onDismiss,
		tokenPrice,
		apr,
		earningTokenSymbol,
		roundingDecimals = 2,
		compoundFrequency = 1,
		performanceFee,
	} = props
	const oneThousandDollarsWorthOfToken = 1000 / tokenPrice
	const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
		numberOfDays: 1,
		farmApr: apr,
		tokenPrice,
		roundingDecimals,
		compoundFrequency,
		performanceFee,
	})
	const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
		numberOfDays: 7,
		farmApr: apr,
		tokenPrice,
		roundingDecimals,
		compoundFrequency,
		performanceFee,
	})
	const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
		numberOfDays: 30,
		farmApr: apr,
		tokenPrice,
		roundingDecimals,
		compoundFrequency,
		performanceFee,
	})
	const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
		numberOfDays: 365,
		farmApr: apr,
		tokenPrice,
		roundingDecimals,
		compoundFrequency,
		performanceFee,
	  })
	return (
		<Modal>
			<Button text="x" ghost click={onDismiss} className="button-hide-modal"/>
			<div className="modal-roi-stake">
				<div className="modal-roi-stake-title">
					<span>ROI</span>
          	<hr/>
				</div>
				<div className="box-conent-modal">
					<div className="table-modal">
						<table>
							<tr>
								<th>TIMEFRAME</th>
								<th>ROI</th>
								<th>{earningTokenSymbol} PER $1,000</th>
							</tr>
							<tr>
								<td>1d</td>
								<td>
									{getRoi({
										amountEarned: tokenEarnedPerThousand1D,
										amountInvested: oneThousandDollarsWorthOfToken,
									}).toFixed(roundingDecimals)}
									%
								</td>
								<td>{tokenEarnedPerThousand1D}</td>
							</tr>
							<tr>
								<td>7d</td>
								<td>
									{getRoi({
										amountEarned: tokenEarnedPerThousand7D,
										amountInvested: oneThousandDollarsWorthOfToken,
									}).toFixed(roundingDecimals)}
									%
								</td>
								<td>{tokenEarnedPerThousand7D}</td>
							</tr>
							<tr>
								<td>30d</td>
								<td>
									{getRoi({
										amountEarned: tokenEarnedPerThousand30D,
										amountInvested: oneThousandDollarsWorthOfToken,
									}).toFixed(roundingDecimals)}
									%
								</td>
								<td>{tokenEarnedPerThousand30D}</td>
							</tr>
							<tr>
								<td>365d (APY)</td>
								<td>
									{getRoi({
										amountEarned: tokenEarnedPerThousand365D,
										amountInvested: oneThousandDollarsWorthOfToken,
									}).toFixed(roundingDecimals)}
									%
								</td>
								<td>{tokenEarnedPerThousand365D}</td>
							</tr>
						</table>
					</div>
					<ul className="list-desciption">
						<li>Unstake within 72hrs will be charged {performanceFee}% fee. Timer reset after Unstake and Stake cycles</li>
					</ul>
				</div>
			</div>
		</Modal>
	)
}

export default ApyCalculatorModal
