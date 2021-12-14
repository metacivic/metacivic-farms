import React from 'react'
import styled from 'styled-components'

const Loading: React.FC = () => {
	return <Loader />
}

const Loader = styled.div`
	border: 5px solid #f3f3f3; /* Light grey */
	border-top: 5px solid rgb(56, 242, 188); /* Blue */
	border-radius: 50%;
	width: 16px;
	height: 16px;
	animation: spin 2s linear infinite;
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`

export default Loading
