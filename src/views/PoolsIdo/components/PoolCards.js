// import React from 'react'
import React, { useState, useRef } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import PoolCardList from './PoolCardList'
import { usePoolsIDO } from '../../../store/hooks'
import { useWallet } from 'use-wallet'
import Grid from '../../../components/Page/Grid'
import './index.less'
import arrowRight from './images/Chevron_Right.png'

const PoolCards = () => {
	const { account } = useWallet()
	const { pools, userDataLoaded } = usePoolsIDO(account)
	const [checked, setchecked] = useState(false)
	const [defaultChecked, setdefaultChecked] = useState(false)
	function onChange(checked) {
		if (checked === true) {
			setchecked(true)
			setdefaultChecked(true)
		} else {
			setchecked(false)
			setdefaultChecked(false)
		}
	}
	const [searchQuery, setSearchQuery] = useState('')
	const handleChangeSearchQuery = (e) => {
		setSearchQuery(e.target.value)
	}
	const tableWrapperEl = useRef(null)
	const scrollToTop = () => {
		tableWrapperEl.current.scrollIntoView({
			behavior: 'smooth',
		})
	}
	return (
		<>
			<div className="main-pool-card" role="table" ref={tableWrapperEl}>
				<Tabs
					defaultActiveKey="live"
					transition={false}
					// id="noanim-tab-example"
				>
					<Tab className="bsc-nav-tabs" eventKey="live" title="Live">
						<Tabs
							defaultActiveKey="list"
							id="uncontrolled-tab-example"
							className="box-list-grid"
						>
							<Tab eventKey="list">
								<div>
									{defaultChecked === true ? (
										<>
											{pools
												.filter(
													(pool) =>
														pool.userData.stakedBalance > 0 &&
														pool.isFinished === false &&
														(pool.earningToken.symbol
															.toLowerCase()
															.includes(searchQuery.toLowerCase()) ||
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase())),
												)
												.map((pool, index) => (
													<PoolCardList
														key={index}
														pool={pool}
														userDataLoaded={userDataLoaded}
													/>
												))}
										</>
									) : (
										<>
											{pools
												.filter(
													(pool) =>
														pool.isFinished === false &&
														(pool.earningToken.symbol
															.toLowerCase()
															.includes(searchQuery.toLowerCase()) ||
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase())),
												)
												.map((pool, index) => (
													<PoolCardList
														key={index}
														pool={pool}
														userDataLoaded={userDataLoaded}
													/>
												))}
										</>
									)}
								</div>
								<br />
								<div className="back-to-top">
									<button type="button" onClick={scrollToTop}>
										To Top 
									</button>
								</div>
								<br />
							</Tab>
						</Tabs>
					</Tab>
					<Tab className="bsc-nav-tabs" eventKey="finished" title="Finished">
						<>
							<Tabs
								defaultActiveKey="list"
								id="uncontrolled-tab-example"
								className="box-list-grid"
							>
								<Tab eventKey="list">
									<div>
										{defaultChecked === true ? (
											<>
												{pools
													.filter(
														(pool) =>
															pool.userData.stakedBalance > 0 &&
															pool.isFinished === true &&
															(pool.earningToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()) ||
																pool.stakingToken.symbol
																	.toLowerCase()
																	.includes(searchQuery.toLowerCase())),
													)
													.map((pool, index) => (
														<PoolCardList
															key={index}
															pool={pool}
															userDataLoaded={userDataLoaded}
														/>
													))}
											</>
										) : (
											<>
												{pools
													.filter(
														(pool) =>
															pool.isFinished === true &&
															(pool.earningToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()) ||
																pool.stakingToken.symbol
																	.toLowerCase()
																	.includes(searchQuery.toLowerCase())),
													)
													.map((pool, index) => (
														<PoolCardList
															key={index}
															pool={pool}
															userDataLoaded={userDataLoaded}
														/>
													))}
											</>
										)}
									</div>
									<br />
									<div className="back-to-top">
										<button type="button" onClick={scrollToTop}>
											To Top 
										</button>
									</div>
									<br />
								</Tab>
							</Tabs>
						</>
					</Tab>
				</Tabs>
			</div>
		</>
	)
}

export default PoolCards
