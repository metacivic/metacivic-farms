import React from 'react'
import styled from 'styled-components'
import Nav from './Components/Nav'

const Footer = () => {
	return (
		<footer className="all">
			<StyledFooterInner>
				<Nav />
				<div className="copy-right">
					Copyright © 2021 Metacivic.io All Rights Reserved
				</div>
			</StyledFooterInner>
		</footer>
	)
}

const StyledFooterInner = styled.section`
	width: 100%;
	height: 100%;

	.copy-right {
		padding: 25px 0;
		text-align: center;
		font-weight: normal;
		font-size: 14px;
		line-height: 17px;
		text-align: center;
		letter-spacing: 0.025em;
		color: #676f69;
		border-top: 0.5px solid #575757;
	}
`

export default Footer
