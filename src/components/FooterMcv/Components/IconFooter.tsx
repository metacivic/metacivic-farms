import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import styled from 'styled-components'

const IconArr = [
	{
		title: 'COMMUNITY',
		sub: 'SUPPORT 24/7',
		btn: 'Contact us',
		items: [
			{
				href: '#!',
				icon: 'fa fa-paper-plane',
			},
			{
				href: '#!',
				icon: 'fab fa-twitter',
			},
			{
				href: '#!',
				icon: 'fab fa-youtube',
			},
			{
				href: '#!',
				icon: 'fab fa-medium-m',
			},
		],
	},
]

const IconFooter = () => {
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
		width: 100%;
		@media (max-width: 820px) {
			margin-top: 30px;
		}

		li {
			margin: 0 !important;
			padding: 0 !important;
		}

		p {
			margin: 0;
			padding: 0;
		}

		.h__box {
			align-items: center;
			gap: ${isMobilez ? '8px' : '16px'};
			padding-top: 24px;

			@media (max-width: 1025px) {
				gap: 4px;
			}

			& > * {
				height: 36px;
				width: 36px;
				border-radius: 100px;
				background-color: #ffffff;

				display: inline-flex;
				align-items: center;
				justify-content: center;
				padding-right: 1px;

				&:hover a {
					color: blue !important;
				}

				a {
					color: #000;
					font-size: 18px;

					&:hover {
						color: blue !important;
					}
				}
			}
		}

		.mcv__ftBtn {
			@media (max-width: 1024px) {
				font-size: 12px;
			}
		}
	`

	return (
		<Wrapper>
			{IconArr.map((item, i) => (
				<div key={i}>
					{isMobilez ? (
						<CustomMobile>
							<div className="h__flex">
								<p style={{ fontSize: 16, fontWeight: 600 }}>{item.title}</p>
								<p style={{ fontSize: 16, fontWeight: 600 }}>{item.sub}</p>
							</div>

							<div className="h__flex">
								<ul className="d-flex h__box">
									{item.items.map((icons, iIcon) => (
										<li className="h__subIcon" key={iIcon}>
											{icons.href?.includes('https') ? (
												<a href={icons.href}>
													<i className={`${icons.icon}`} aria-hidden="true" />
												</a>
											) : (
												<Link to={`${icons.href}`}>
													<i className={`${icons.icon}`} aria-hidden="true" />
												</Link>
											)}
										</li>
									))}
								</ul>
								{/* <button style={{ marginTop: 22 }}>
									<a href="!#">{item.btn}</a>
								</button> */}
							</div>
						</CustomMobile>
					) : (
						<>
							<p>{item.title}</p>
							<ul className="d-flex h__box">
								{item.items.map((icons, iIcon) => (
									<li className="h__subIcon" key={iIcon}>
										{icons.href?.includes('https') ? (
											<a href={icons.href}>
												<i className={`${icons.icon}`} aria-hidden="true" />
											</a>
										) : (
											<Link to={`${icons.href}`}>
												<i className={`${icons.icon}`} aria-hidden="true" />
											</Link>
										)}
									</li>
								))}
							</ul>
							<p style={{ paddingTop: 30 }}>{item.sub}</p>
							{/* <button style={{ marginTop: 22 }}>
								<a className="mcv__ftBtn" href="!#">
									{item.btn}
								</a>
							</button> */}
						</>
					)}
				</div>
			))}
		</Wrapper>
	)
}

const CustomMobile = styled.div`
	width: 100%;
	padding: 12px 16px;

	p {
		padding: 0;
	}

	.h__flex {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`

export default IconFooter
