import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Collapse } from 'antd'
import IconFooter from './IconFooter'

import config from './config'

const FooterMobile = () => {
	const { Panel } = Collapse

	function callback() {
		console.log('error')
	}

	return (
		<Wrapper>
			<Collapse defaultActiveKey={['1']} onChange={callback}>
				{config.map((item) => (
					<Panel className="h__Panel" header={item.title} key={`${item.id}`}>
						{item?.items?.map((subItem, subI) => (
							<li key={subI} className="h__Title">
								{subItem.href?.includes('https') ? (
									<a href={subItem.href}>{subItem.title}</a>
								) : (
									<Link to={`${subItem.href}`}>{subItem.title}</Link>
								)}
							</li>
						))}
					</Panel>
				))}
			</Collapse>

			<IconFooter />
		</Wrapper>
	)
}

const Wrapper = styled.div`
	width: 100%;

	.h__Panel > div {
		background-color: transparent !important;
		color: #fff !important;
		font-size: 16px !important;
		font-weight: 600 !important;

		& > span {
			background-color: transparent !important;
		}

		.ant-collapse-arrow svg {
			transform: rotate(90deg) !important;
		}
	}

	.ant-collapse-item-active.h__Panel > div:first-child {
		background: #272c35 !important;
		border-radius: 4px;
	}

	.ant-collapse-item-active.h__Panel > div {
		.ant-collapse-arrow svg {
			transform: rotate(-90deg) !important;
		}
	}

	.h__Title {
		list-style-type: none;
		font-weight: normal;
		font-size: 14px;
		line-height: 17px;
		letter-spacing: 0.01em;
		padding-bottom: 8px;
		color: #676f69;
		transition: 0.3s ease;
	}

	li {
		list-style-type: none;
		font-weight: normal;
		font-size: 14px;
		line-height: 17px;
		letter-spacing: 0.01em;
		padding-bottom: 8px;
		color: #676f69;
		transition: 0.3s ease;
	}

	.title {
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		letter-spacing: 0.01em;
		color: #ffffff;
		margin-bottom: 15px;
	}
	.h__dflex1,
	.h__dflex {
		display: flex;
		align-items: center;
		justify-content: space-between;

		& > li:first-child {
			flex: 1;
		}
	}

	.h__start {
		justify-content: start;

		& > * {
			flex: 1;
		}

		& > h3:last-child {
			padding-left: 16px;
		}
	}

	.h__pd {
		padding: 12px 16px;
	}

	.gap {
		gap: 20px;
	}

	@media (min-width: 416px) {
		.h__dflex {
			display: flex;
			align-items: center;
			justify-content: space-between;

			& > * {
				flex: 1;
			}
		}

		.h__dflex1 {
			justify-content: start;
			gap: 20px;
		}
	}

  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    float: right;
  }
`

export default FooterMobile
