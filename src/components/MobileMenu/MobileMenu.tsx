import React, { Fragment } from 'react'
import styled, { keyframes } from 'styled-components'

import { NavLink } from 'react-router-dom'
import Container from '../Container'
import Logo from '../Logo'
import AccountButton from '../../components/TopBar/components/AccountButton'

interface MobileMenuProps {
	onDismiss: () => void
	visible?: boolean
}

const MobileMenu: React.FC<MobileMenuProps> = ({ onDismiss, visible }) => {
	if (visible) {
		return (
			<StyledMobileMenuWrapper>
				<StyledMobileMenu>
					<StyledMobileContent>
						<StyledBackdrop onClick={onDismiss}>
							<span>X</span>
						</StyledBackdrop>
						<StyledLink
							exact
							activeClassName="active"
							to="/"
							onClick={onDismiss}
						>
							Home
						</StyledLink>
						<StyledLink
							exact
							activeClassName="active"
							to="/farms"
							onClick={onDismiss}
						>
							Startpool
						</StyledLink>
					</StyledMobileContent>
				</StyledMobileMenu>
			</StyledMobileMenuWrapper>
		)
	}
	return null
}

interface MenuMobileMainProps {
	onDismiss: () => void
	visible?: boolean
	onOpen: () => void
}

const MenuMobileMain: React.FC<MenuMobileMainProps> = ({
	onOpen,
	onDismiss,
	visible,
}) => {
	return (
		<Fragment>
			<StyledTopBar>
				<Container size="lg">
					<StyledTopBarInner>
						<StyledLogoWrapper>
							<Logo isMobile />
						</StyledLogoWrapper>
						<StyledLink
							exact
							activeClassName="active"
							to="/farms"
							onClick={onDismiss}
						>
							Startpool
						</StyledLink>
						{/*<StyledWrapBtnSm>*/}
						{/*	<AccountButton />*/}

						{/*</StyledWrapBtnSm>*/}
						<div
							style={{
								display: 'flex',
							}}
						>
							<StyledWrapBtnMd>
								<AccountButton />
							</StyledWrapBtnMd>
							{/*<StyledBtnMenu*/}
							{/*	onClick={onOpen}*/}
							{/*>*/}
							{/*	<img src="Menu-Icon.svg"/>*/}
							{/*</StyledBtnMenu>*/}
						</div>
					</StyledTopBarInner>
				</Container>
			</StyledTopBar>

			{/*<MobileMenu*/}
			{/*	onDismiss={onDismiss}*/}
			{/*	visible={visible}*/}
			{/*/>*/}
		</Fragment>
	)
}

const StyledWrapBtnMd = styled.span`
	//@media (max-width: 768px) {
	//	display: none;
	//}
`
const StyledWrapBtnSm = styled.span`
	display: none;
	@media (max-width: 768px) {
		display: unset;
	}
`
const StyledTopBar = styled.div`
	display: none;
	@media (max-width: 768px) {
		display: block;
	}
`
const StyledTopBarInner = styled.div`
	align-items: center;
	display: flex;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	max-width: ${(props) => props.theme.siteWidth}px;
	width: 100%;
	height: 75px;
`

const StyledBtnMenu = styled.div`
	margin-left: 0.5rem;
	> img {
		width: 30px;
	}
`

const StyledLogoWrapper = styled.div`
	width: 260px;
	@media (max-width: 768px) {
		width: auto;
	}
`

const StyledMobileContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	padding-top: 3rem;
`

const StyledBackdrop = styled.div`
	background-color: transparent;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	width: 50px;
	height: 50px;
	display: flex;
	justify-content: center;
	align-items: center;

	> span {
		font-size: 25px;
		font-weight: bold;
		color: grey;
	}
`

const StyledMobileMenuWrapper = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1000;
`

const slideIn = keyframes`
  0% {
    transform: translateX(0)
  }
  100% {
    transform: translateX(-100%);
  }
`

const StyledMobileMenu = styled.div`
	animation: ${slideIn} 0.3s forwards ease-out;
	background-color: ${(props) => props.theme.color.white};
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	position: absolute;
	top: 0;
	left: 100%;
	bottom: 0;
	width: calc(100% - 48px);
	max-width: 75vh;
`

const StyledLink = styled(NavLink)`
	box-sizing: border-box;
	color: ${(props) => props.theme.color.grey[400]};
	font-size: 20px;
	font-weight: 700;
	padding: ${(props) => props.theme.spacing[2]}px
		${(props) => props.theme.spacing[3]}px;
	text-align: center;
	text-decoration: none;
	width: 100%;
	&:hover {
		color: ${(props) => props.theme.color.grey[500]};
	}
	&.active {
		color: ${(props) => props.theme.color.primary.main};
	}
`

export default MenuMobileMain
