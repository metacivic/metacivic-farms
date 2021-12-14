import React from 'react'
import styled from 'styled-components'
import {
	bscsAddress,
	masterChefAddress,
} from '../../../constants/tokenAddresses'

const Nav: React.FC = () => {
	return (
		<StyledNav>
			<StyledLink
				target="_blank"
				href={`https://bscscan.com/address/${masterChefAddress}`}
			>
				MCV Farms Contract
			</StyledLink>
			<StyledLink target="_blank" href="/">
				Telegram
			</StyledLink>
			<StyledLink target="_blank" href="https://twitter.com">
				Twitter
			</StyledLink>
			<StyledLink target="_blank" href="https://medium.com">
				Medium
			</StyledLink>
		</StyledNav>
	)
}

const StyledNav = styled.nav`
	align-items: center;
	display: flex;
`

const StyledLink = styled.a`
	color: ${(props) => props.theme.color.primary.main};
	padding-left: ${(props) => props.theme.spacing[3]}px;
	padding-right: ${(props) => props.theme.spacing[3]}px;
	text-decoration: none;
	&:hover {
		color: ${(props) => props.theme.color.grey[500]};
	}
`

export default Nav
