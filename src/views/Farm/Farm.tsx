import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'
import useFarms from '../../hooks/useFarms'
import Loader from '../../components/Loader'

const Farm: React.FC = () => {
	const [farms] = useFarms()
	const params = useParams<any>()
	const farm = useFarm(params?.farmId)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [])

	const { ethereum } = useWallet()

	const lpContract = useMemo(() => {
		return getContract(ethereum as provider, farm?.lpToken)
	}, [ethereum, farm?.lpToken])

	const lpTokenName = `${farm?.t0?.symbol ? `${farm?.t0?.symbol}-` : ''}${
		farm?.t1?.symbol || ''
	} ${farm?.symbol?.includes('LP') ? 'LP' : farm?.symbol}`

	return (
		<>
			<PageHeader
				icon="/logo2.png"
				title={`Stake ${lpTokenName} token to earn MCV`}
			/>
			<StyledFarm>
				<StyledCardsWrapper>
					{farms.length > 0 ? (
						farm ? (
							<>
								<StyledCardWrapper>
									<Harvest pid={farm.pid} />
								</StyledCardWrapper>
								<Spacer />
								<StyledCardWrapper>
									<Stake
										lpContract={lpContract}
										pid={farm.pid}
										tokenName={lpTokenName}
									/>
								</StyledCardWrapper>
							</>
						) : (
							<StyledNotFound>Not found</StyledNotFound>
						)
					) : (
						<StyledLoadingWrapper>
							<Loader text="..." />
						</StyledLoadingWrapper>
					)}
				</StyledCardsWrapper>
				<Spacer size="lg" />
				<StyledInfo>
					⭐️ Every time you stake and unstake LP tokens, the contract will
					automatically harvest MCV rewards for you!
				</StyledInfo>
				<Spacer size="lg" />
			</StyledFarm>
		</>
	)
}
const StyledLoadingWrapper = styled.div`
	align-items: center;
	display: flex;
	flex: 1;
	justify-content: center;
`

const StyledNotFound = styled.div`
	color: ${(props) => props.theme.color.primary.main};
	margin: 0 auto;
	font-size: 30px;
`

const StyledFarm = styled.div`
	align-items: center;
	display: flex;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 100%;
	}
`

const StyledCardsWrapper = styled.div`
	display: flex;
	width: 600px;
	@media (max-width: 768px) {
		width: 100%;
		flex-flow: column nowrap;
		align-items: center;
	}
`

const StyledCardWrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	@media (max-width: 768px) {
		width: 80%;
	}
`

const StyledInfo = styled.h3`
	color: ${(props) => props.theme.color.primary.main};
	font-size: 16px;
	font-weight: 400;
	margin: 0;
	padding: 0;
	text-align: center;
`

export default Farm
