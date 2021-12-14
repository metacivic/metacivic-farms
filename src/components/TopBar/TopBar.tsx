import React from 'react'
import styled from 'styled-components'

import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'

interface TopBarProps {
	onPresentMobileMenu: () => void
}

const TopBar: React.FC<TopBarProps> = ({ onPresentMobileMenu }) => {
	return (
		<StyledTopBar>
			<Container>
				<StyledTopBarInner>
					<Logo />
					<Nav />
					<StyledAccountButtonWrapper>
						<AccountButton />
					</StyledAccountButtonWrapper>
				</StyledTopBarInner>
			</Container>
		</StyledTopBar>
	)
}

const StyledTopBar = styled.div`
	@media (max-width: 768px) {
		display: none;
	}
`

const Container = styled.div`
	max-width: 1324px;
	margin: 0 auto;
	padding: 0 24px;
	width: 100%;
`

const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	width: 100%;
`

const StyledAccountButtonWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: flex-end;
	@media (max-width: 400px) {
		justify-content: center;
		width: auto;
	}
`

export default TopBar
