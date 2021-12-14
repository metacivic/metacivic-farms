import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface LogoProps {
	isMobile?: boolean
}
const Logo: React.FC<LogoProps> = ({ isMobile }) => {
	return (
		<StyledLogo to="/">
			{isMobile ? (
				<img src="/logo2.png" height="64" style={{ marginTop: -4 }} />
			) : (
				<img src="/logo.png" height="64" style={{ marginTop: -4 }} />
			)}
		</StyledLogo>
	)
}

const StyledLogo = styled(Link)`
	align-items: center;
	display: flex;
	justify-content: start;
	margin: 0;
	min-height: 44px;
	min-width: 44px;
	padding: 0;
	text-decoration: none;
`

export default Logo
