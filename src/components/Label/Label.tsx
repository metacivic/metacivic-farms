import React from 'react'
import styled from 'styled-components'

interface LabelProps {
	text?: string
}

const Label: React.FC<LabelProps> = ({ text }) => (
	<StyledLabel>{text}</StyledLabel>
)

const StyledLabel = styled.div`
	font-size: 14px;
	color: ${(props) => props.theme.color.primary.main};
`

export default Label
