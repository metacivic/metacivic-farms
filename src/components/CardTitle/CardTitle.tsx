import React from 'react'
import styled from 'styled-components'

interface CardTitleProps {
	text?: string
}

const CardTitle: React.FC<CardTitleProps> = ({ text }) => (
	<StyledCardTitle>{text}</StyledCardTitle>
)

const StyledCardTitle = styled.div`
	color: ${(props) => props.theme.color.primary.main};
	font-size: 18px;
	font-weight: 700;
	margin: 20px 0;
	text-align: center;
`

export default CardTitle
