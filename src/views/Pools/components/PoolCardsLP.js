// import React from 'react'
import React, { useState, useRef } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { Switch, Input, Space, Select } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import { UnorderedListOutlined, TableOutlined } from '@ant-design/icons'
import PoolCardLP from './PoolCardLP'
import PoolCardListLP from './PoolCardListLP'
import { usePoolsLP } from '../../../store/hooks'
import { useWallet } from 'use-wallet'
import Grid from '../../../components/Page/Grid'
import './style.css'
import arrowRight from './images/Chevron_Right.png'

const PoolCardsLP = () => {
	const { account } = useWallet()
	const { pools, userDataLoaded } = usePoolsLP(account)
	const listTitle = (
		<div className="box-img-list">
			<div className="img">
				<UnorderedListOutlined />
			</div>
		</div>
	)
	const gridTitle = (
		<div className="box-img-list">
			<div className="img">
				<TableOutlined />
			</div>
		</div>
	)
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
	// Hieu them
	const { Option } = Select

	function handleChange(value) {
		console.log(`selected ${value}`)
	}

	return (
		<>
			<div
				className="main-pool-card main-arte-custom"
				role="table"
				ref={tableWrapperEl}
			>
				<div className="all stake-rele">
					<div className="stake-only">
						<Switch onChange={onChange} />
						<span className="text-stake-only">Staked only</span>
					</div>
					<div className="box-search-stake">
						<span className="text-search-cus">SEARCH</span>
						<Input
							type="text"
							placeholder="Search token"
							onChange={handleChangeSearchQuery}
						/>
					</div>
					<div className="box-search-stake res">
						{``}
						{/* <span className="text-search-cus">
							SEARCH
						</span>	
						<Input
							type="text"
							placeholder="Search token"
							onChange={handleChangeSearchQuery}
						/> */}
					</div>
				</div>
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
							<Tab eventKey="list" title={listTitle}>
								<div className="all">
									{defaultChecked === true ? (
										<>
											{pools
												.filter(
													(pool) =>
														pool.userData.stakedBalance > 0 &&
														pool.isFinished === false &&
														pool.stakingToken.symbol
															.toLowerCase()
															.includes(searchQuery.toLowerCase()),
												)
												.map((pool, index) => (
													<PoolCardListLP
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
													<PoolCardListLP
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

							<Tab eventKey="grid" title={gridTitle}>
								<div className="all">
									<Grid>
										{defaultChecked === true ? (
											<>
												{pools
													.filter(
														(pool) =>
															pool.userData.stakedBalance > 0 &&
															pool.isFinished === false &&
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()),
													)
													.map((pool, index) => (
														<PoolCardLP
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
														<PoolCardLP
															key={index}
															pool={pool}
															userDataLoaded={userDataLoaded}
														/>
													))}
											</>
										)}
									</Grid>
								</div>
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
								<Tab eventKey="list" title={listTitle}>
									<div className="all">
										{defaultChecked === true ? (
											<>
												{pools
													.filter(
														(pool) =>
															pool.userData.stakedBalance > 0 &&
															pool.isFinished === true &&
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()),
													)
													.map((pool, index) => (
														<PoolCardListLP
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
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()),
													)
													.map((pool, index) => (
														<PoolCardListLP
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
								<Tab eventKey="grid" title={gridTitle}>
									<Grid>
										{defaultChecked === true ? (
											<>
												{pools
													.filter(
														(pool) =>
															pool.userData.stakedBalance > 0 &&
															pool.isFinished === true &&
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()),
													)
													.map((pool, index) => (
														<PoolCardLP
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
															pool.stakingToken.symbol
																.toLowerCase()
																.includes(searchQuery.toLowerCase()),
													)
													.map((pool, index) => (
														<PoolCardLP
															key={index}
															pool={pool}
															userDataLoaded={userDataLoaded}
														/>
													))}
											</>
										)}
									</Grid>
								</Tab>
							</Tabs>
						</>
					</Tab>
				</Tabs>
				{/* jhshahdkjashdjashkdjas */}
			</div>
		</>
	)
}

export default PoolCardsLP
