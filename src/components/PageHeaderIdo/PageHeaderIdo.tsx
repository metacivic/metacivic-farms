import React from 'react'
import styled from 'styled-components'
import Container from '../Container'

import BGHeader from '../../assets/images/Banner_Ido.png'

interface PageHeaderProps {
	icon?: any
	subtitle1?: string
	subtitle2?: string
	title?: string
}
const PageHeaderIdo: React.FC<PageHeaderProps> = ({ icon, subtitle1,subtitle2, title }) => {
	return (
		<Container size="md">
			<StyledPageHeader>
				{icon && (
					<StyledIcon>
						<img src={icon} height="125" />
					</StyledIcon>
				)}
				<StyledTitle>{title}</StyledTitle>
				<StyledSubtitle>{subtitle1}</StyledSubtitle>
				<StyledSubtitle>{subtitle2}</StyledSubtitle>
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
	height: 220px;
	border-radius: 15px;
	background-image: url(${BGHeader}), linear-gradient(
		90deg
		,#b18725,#f4c04a);;
	background-repeat: no-repeat;
  background-size: auto;
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
	font-size: 4vh;
	font-weight: 700;
	margin: 0;
	padding: 0;
	color: #FFFFFF;
	font-family: poppins_bold;
	text-align: center;
`

const StyledSubtitle = styled.h3`
	font-size: 1.8vh;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
	color: #FFFFFF;
	font-family: poppins_semibold;
	text-align: center;
`

export default PageHeaderIdo
