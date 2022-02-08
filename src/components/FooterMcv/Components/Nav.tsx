import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import { isMobilez } from 'react-device-detect'
import FooterMobile from './FooterMobile'
import IconFooter from './IconFooter'

import config from './config'

const Nav = () => {
	const [width, setWidth] = useState<number>(window.innerWidth)

	function handleWindowSizeChange() {
		setWidth(window.innerWidth)
	}
	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange)
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange)
		}
	}, [])

	const isMobilez = width <= 850

	const Wrapper = styled.div`
		align-items: center;
		display: flex;
		justify-content: space-between;
		flex-direction: ${isMobilez ? 'column' : 'row'};
		gap: ${isMobilez ? '30px' : ''};

		color: #fff;
		padding-top: 30px;
		padding-bottom: 30px;

		@media (max-width: 1024px) and (min-width: 850px) {
			gap: 20px;
		}

		ul {
			list-style: none;
			padding: 0px;
			margin-bottom: 0;
		}
		a {
			color: #fff;
			font-size: 12px;
			font-weight: 500;
		}

		button {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			padding: ${isMobilez ? '7px 15px' : '14px 48px'};
			background: linear-gradient(270deg, #cc0000 0%, #f72a2a 100%);
			border-radius: 100px;
			border: none;
			outline: none;

			a {
				font-weight: 600;
				font-size: 18px;

				@media (max-width: 1025px) and (min-width: 850px) {
					font-weight: 500;
					font-size: 16px;
				}
			}
		}
	`

	const FooterLeft = styled.div`
		width: ${isMobilez ? '100%' : ''};

		.rightBox {
			background: rgba(40, 40, 40, 1);
			height: inherit;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: ${isMobilez ? 'column' : 'row'};
			padding: ${isMobilez ? '20px' : '36px 24px 22px'};
			border-radius: 4px;
			gap: ${isMobilez ? '30px' : '50px'};

			@media (max-width: 1024px) and (min-width: 850px) {
				gap: 30px;
			}

			& > * {
				flex-grow: 1;
			}

			.left {
				display: flex;
				flex-direction: ${isMobilez ? 'row' : 'column'};
				justify-content: space-between;
				height: ${isMobilez ? 'auto' : '186px'};
				width: ${isMobilez ? '100%' : '61%'};

				.bottom > button {
					background: rgba(237, 143, 15, 1);
					padding: 6px 14px;
					font-size: 12px;
					font-weight: 600;
				}
			}

			.right {
				height: 100%;
				width: 100%;

				ul li {
					padding-bottom: 16px;
					font-size: 12px;
					display: flex;
					justify-content: space-between;
					align-items: center;
					gap: 8px;
					text-align: left;

					& > span:nth-child(2) {
						font-family: 'Polaris';
						font-weight: 400;
					}
				}
			}

			.top {
				.text {
					padding-left: 8px;

					p {
						font-weight: 600;
					}

					& > span {
						font-family: 'Polaris';
						font-weight: 400;
					}
				}
			}
		}

		p {
			padding: 0;
			padding-bottom: 5px;
			margin: 0;
		}
	`

	return (
		<Wrapper>
			{isMobilez ? (
				<FooterMobile />
			) : (
				<FooterRight>
					<ul className="h__flex">
						{config.map((item) => (
							<li key={item.id}>
								<p>{item.title.toUpperCase()}</p>
								<ul>
									{item.items.map((subItem, i) => (
										<li key={i} className="h__subItem">
											{subItem.href?.includes('https') ? (
												<a href={subItem.href}>{subItem.title}</a>
											) : (
												<Link to={`${subItem.href}`}>{subItem.title}</Link>
											)}
										</li>
									))}
								</ul>
							</li>
						))}
						<li>
							<IconFooter />
						</li>
					</ul>
				</FooterRight>
			)}

			<FooterLeft>
				<div className="rightBox">
					<div className="left">
						<div className="top d-flex align-items-center" style={{ gap: 10 }}>
							<div className="icon">
								<img
									style={{ width: 40, height: 40 }}
									src="logo-mini.svg"
									alt=""
								/>
							</div>
							<div className="text">
								<p>MCV</p>
								<span>$1.03</span>
							</div>
						</div>
						<div
							className="bottom d-flex align-items-center"
							style={{ gap: 10 }}
						>
							<img src="/icon-meta.png" alt="" />

							<button>Buy MCV</button>
						</div>
					</div>
					<div className="right">
						<ul>
							<li>
								<span>Max supply:</span>
								<span>500,000,000</span>
							</li>
							<li>
								<span>Total supply:</span>
								<span>500,000,000</span>
							</li>
							<li>
								<span>Circulating supply:</span>
								<span>500,000,000</span>
							</li>
							<li>
								<span>Total Burned:</span>
								<span>0</span>
							</li>
							<li>
								<span>Market Cap:</span>
								<span>$0</span>
							</li>
						</ul>
					</div>
				</div>
			</FooterLeft>
		</Wrapper>
	)
}

const FooterRight = styled.div`
	flex: 1;

	.h__flex {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;

		& > * {
			flex-grow: 1;
		}

		& > *:last-child {
			flex-basis: 20%;
		}

		p {
			font-size: 16px;
			font-weight: 600;
		}

		.h__subItem:hover a {
			color: #a9a9a9 !important;
		}

		.h__subItem {
			padding-bottom: 10px;
		}
	}
`

export default Nav
