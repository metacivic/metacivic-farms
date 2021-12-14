import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const queryString = window.location.search

const urlParams = new URLSearchParams(queryString)

const refer: any = urlParams.get('ref')

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink exact activeClassName="active" to={{ pathname: '/' }}>
				Home
			</StyledLink>
			{/*<StyledLink*/}
			{/*	exact*/}
			{/*	activeClassName="active"*/}
			{/*	to={{ pathname: '/dashboard' }}*/}
			{/*>*/}
			{/*	Dashboard*/}
			{/*</StyledLink>*/}
			<StyledLink exact activeClassName="active" to={{ pathname: '/farms' }}>
				Startpool
			</StyledLink>
			{/*<StyledAbsoluteLink*/}
			{/*	href="https://snapshot.org/#/dogen.eth"*/}
			{/*	target="_blank"*/}
			{/*>*/}
			{/*	Vote*/}
			{/*</StyledAbsoluteLink>*/}
			{/*<StyledAbsoluteLink*/}
			{/*	href="https://bulldoge.dogen.finance/"*/}
			{/*	target="_blank"*/}
			{/*>*/}
			{/*	Airdrop*/}
			{/*</StyledAbsoluteLink>*/}
			{/*<StyledAbsoluteLink*/}
			{/*	href="https://gov.bao.finance"*/}
			{/*	target="_blank"*/}
			{/*>*/}
			{/*	Forum*/}
			{/*</StyledAbsoluteLink>*/}
			{/*<StyledAbsoluteLink href="https://docs.bao.finance" target="_blank">*/}
			{/*	About*/}
			{/*</StyledAbsoluteLink>*/}
			{/*<StyledAbsoluteLink href="https://docs.bao.finance" target="_blank">*/}
			{/*	FAQ*/}
			{/*</StyledAbsoluteLink>*/}
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
`

const StyledLink = styled(NavLink)`
	color: ${(props) => props.theme.color.primary.main};
	font-weight: 700;
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: rgb(197, 165, 7);
	}
	&.active {
		color: rgb(197, 165, 7);
		border-radius: 50px;
		border: 1px solid rgb(197, 165, 7);
		padding: 5px 20px;
	}
	@media (max-width: 400px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

const StyledAbsoluteLink = styled.a`
	color: ${(props) => props.theme.color.grey[400]};
	font-weight: 700;
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.grey[500]};
	}
	&.active {
		color: ${(props) => props.theme.color.primary.main};
	}
	@media (max-width: 400px) {
		padding-left: ${(props) => props.theme.spacing[2]}px;
		padding-right: ${(props) => props.theme.spacing[2]}px;
	}
`

export default Nav
