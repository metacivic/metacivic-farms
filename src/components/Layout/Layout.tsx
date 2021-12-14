import React from 'react'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => {
	return (
		<Container>
			<Wrapper>
				<ContainerHeader>
					<StyledImage src="/images/horse.png" />
					<StyledTitle>BSC Station Finance</StyledTitle>
					<StyledSubTitle>
					A Full-Stack DEFI Yield Staking/Farming On Binance Smart Chain
					</StyledSubTitle>
				</ContainerHeader>
				{children}
			</Wrapper>
		</Container>
	)
}

export const Container = styled.div`
	background-color: #f8f5f5;
	padding: 1rem;
`

export const Wrapper = styled.div`
	background-color: #f8f5f5;
	max-width: 1324px;
	margin: 0 auto;
`

export const ContainerHeader = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`

export const StyledImage = styled.img`
	background-color: #f8f5f5;
	height: 529px;
	max-width: 100%;
	@media (max-width: 576px) {
		height: 200px;
	}
`

export const StyledTitle = styled.h1`
	text-align: center;
	font-size: 64px;
	color: ${(props) => props.theme.color.primary.main};
	margin-top: 0;
	margin-bottom: 0;
`

export const StyledSubTitle = styled.p`
	font-size: 22px;
	margin-top: 0;
	text-align: center;
`

export default Layout
