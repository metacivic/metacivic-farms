import React from 'react'
import styled, { keyframes } from 'styled-components'

export interface ModalProps {
	onDismiss?: () => void
}

const Modal: React.FC = ({ children }) => {
	return (
		<StyledResponsiveWrapper>
			<StyledModal>{children}</StyledModal>
		</StyledResponsiveWrapper>
	)
}

const mobileKeyframes = keyframes`
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-100%);
  }
`

const StyledResponsiveWrapper = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	position: relative;
	width: auto;
	max-width: 100%;
	@media (max-width: ${(props) => props.theme.breakpoints.mobile}px) {
		flex: 1;
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		max-height: calc(100% - ${(props) => props.theme.spacing[4]}px);
		animation: ${mobileKeyframes} 0.3s forwards ease-out;
	}
`

const StyledModal = styled.div`
	background: rgb(26,30,39);
	box-shadow: rgb(14 14 44 / 10%) 0px 20px 36px -8px,
		rgb(0 0 0 / 5%) 0px 1px 1px;
	border: 1px solid rgba(80, 78, 75, 0);
	border-radius: 18px;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	min-height: 0;
`


export default Modal
