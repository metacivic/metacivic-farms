import React from 'react'
import styled from 'styled-components'
import Button from '../../ButtonV2'

import './WalletCard.less'

interface WalletCardProps {
	icon: React.ReactNode
	onConnect: () => void
	title: string
}

const WalletCard: React.FC<WalletCardProps> = ({ icon, onConnect, title }) => (
	<Container
		className='bsc-wallet-connection'
	>
		<Button 
			left={icon}
			text={title}
			click={onConnect}
			link
		/>
	</Container>
)

const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;

	&:nth-child(1) {
		opacity: 1;
		cursor: pointer;
	}
`

export default WalletCard
