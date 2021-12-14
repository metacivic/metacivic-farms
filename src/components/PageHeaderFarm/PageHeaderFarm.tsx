import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

import BGHeaderFarm from '../../assets/images/FarmNew.svg'

interface PageHeaderProps {
	icon?: any
	subtitle1?: string
	subtitle2?: string
	title?: string
}
const PageHeaderFarm: React.FC<PageHeaderProps> = ({
	icon,
	subtitle1,
	subtitle2,
	title,
}) => {
	return (
		<Container size="lg">
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
							More details...
						</button>
					</div>
				</div>
			</StyledPageHeader>
		</Container>
	)
}

const StyledPageHeader = styled.div`
	padding-left: 20px;
	justify-content: center;
	align-items: flex-start;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	background-image: linear-gradient(
			199.07deg,
			rgba(13, 14, 17, 0.26) -30.81%,
			rgba(13, 14, 17, 0.35) -30.77%,
			#5ff985 342.39%
		),
		url(${BGHeaderFarm});

	background-position: right top;
	background-repeat: no-repeat;
	background-size: auto;
	margin-left: auto;
	margin-left: auto;

	@media (max-width: 576px) {
		background-position: left center;
		opacity: 0.8;
	}
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
`

const StyledSubtitle = styled.h3`
	font-size: 14px;
	width: 400px;
	margin: 0;
	padding: 0;
	text-align: center;
	color: #808982;
	text-align: left;
	line-height: 1.6;
	margin-bottom: 10px;
	/* @media (max-width: 576px) {
		filter: contrast(40.5);
	} */
`

export default PageHeaderFarm
