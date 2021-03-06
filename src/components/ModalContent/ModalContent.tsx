import React from 'react'
import styled from 'styled-components'

const ModalContent: React.FC = ({ children }) => {
	return <StyledModalContent>{children}</StyledModalContent>
}

const StyledModalContent = styled.div`
	padding: ${(props) => props.theme.spacing[4]}px;
	color: ${(props) => props.theme.color.grey[600]};
	font-size: 12px;
	font-weight: 10;
	padding: ${(props) => props.theme.spacing[4]}px;
	text-align: center;
`

export default ModalContent
