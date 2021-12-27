import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

import BGHeader from '../../assets/images/BannerPools.png'

interface PageHeaderProps {
	icon?: any
	subtitle1?: string
	subtitle2?: string
	title?: string
}
const PageHeader: React.FC<PageHeaderProps> = ({
	icon,
	subtitle1,
	subtitle2,
	title,
}) => {
	return (
		<Container size="md">
			<StyledPageHeader>
				<div className="all">
					<div className="box-page-header">
						{icon && (
							<StyledIcon>
								<img src={icon} height="125" />
							</StyledIcon>
						)}
						<StyledTitle>{title}</StyledTitle>
						<StyledSubtitle>
							<span className="desc-header">{subtitle1}</span>
						</StyledSubtitle>
						<button type="button" className="btn-more-details">
							More details
						</button>
						{/* <div className="box-img">
							<img src="../images/Illustration.png" alt="" />
						</div> */}
					</div>
				</div>
			</StyledPageHeader>
		</Container>
	)
}

const StyledPageHeader = styled.div`
	height: 350px;
	padding-left: 20px;
	justify-content: center;
	align-items: flex-start;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	background-image:url(./images/mcvBgPools.png);
	background-position: top center;
	background-repeat: no-repeat;
	background-size: cover;
	margin-left: auto;
	margin-left: auto;
`
const StyledIcon = styled.div`
	font-size: 120px;
	height: 120px;
	line-height: 120px;
	text-align: center;
	margin-bottom: 24px;
`

const StyledTitle = styled.h1`
	font-size: 40px;
	font-weight: bold;
	margin: 0;
	margin-bottom: 5px;
	padding: 0;
	color: #ffffff;
	font-family: poppins_bold;
	text-align: left;
	font-family: 'Polaris' !important;

`

const StyledSubtitle = styled.h3`
	font-size: 14px;
	width: 400px;
	margin: 0;
	padding: 0;
	text-align: center;
	color: #fff;
	text-align: left;
	line-height: 1.6;
	margin-bottom: 10px;
	font-weight: 500;
`

export default PageHeader
