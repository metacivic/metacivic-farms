import React from 'react'
import styled from 'styled-components'

import { ReactComponent as XIcon } from '../../assets/images/x-modal.svg'
import Button from '../ButtonV2'

interface ModalTitleProps {
	text?: string
	onDismiss?: any
}

const ModalTitle: React.FC<ModalTitleProps> = ({ text, onDismiss }) => (
	<StyledModalTitle>
		<span>{text}</span>
		<Button
			click={onDismiss}
			right={<XIcon />}
			link
			className='customBtn'
		/>
	</StyledModalTitle>
)

const StyledModalTitle = styled.div`
	align-items: center;
	color: #FFFFFF;
	display: flex;
	font-size: 18px;
	/* border-bottom: 1px solid rgb(233, 234, 235); */
	font-weight: 600;
	height: ${(props) => props.theme.topBarSize}px;
	justify-content: space-between;
	padding: 12px 24px;
	border-bottom: 0.5px solid rgb(87,87,87);

	.customBtn {
		padding: 0;
	}
`

export default ModalTitle
