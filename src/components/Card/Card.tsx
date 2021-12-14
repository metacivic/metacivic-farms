import React from 'react'
import styled from 'styled-components'

const Card: React.FC = ({ children }) => <StyledCard>{children}</StyledCard>

const StyledCard = styled.div`
	background: white;
	border-radius: 30px;
	box-shadow: 0 10px 20px rgb(145 120 79 / 10%);
	display: flex;
	flex: 1;
	flex-direction: column;
`

export default Card
