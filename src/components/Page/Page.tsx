import React from 'react'
import styled from 'styled-components'
import Container from './Container'

interface PageProps {
	background: string
	children: any
}
const Page: React.FC<PageProps> = ({ children, background }) => (
	<Layout background={background}>
		<PageContainer>{children}</PageContainer>
	</Layout>
)

interface LayoutProps {
	background: string
}

export const Layout = styled.div<LayoutProps>`
	flex: 1;
	display: flex;
	width: 100%;
	flex-direction: row;
	background-size: contain;
	background-repeat: no-repeat;
	background-attachment: fixed;
`

const PageContainer = styled(Container)`
	width: 100%;
	max-width: 100%;
	 /* background-image: url('/images/archh-light.svg'),
		url('/images/left-image.svg'), url('/images/right-image.svg'); */
	background-repeat: no-repeat;
	background-position: center 0px, 0px 90%, 100% 90%;
	background-size: contain, 266px, 266px;
	@media (max-width: 576px) {
		background: none;
	}
`
export default Page
