import styled from 'styled-components'

// TODO: Use UI Kit
const Grid = styled.div`
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;

	//align-items: start;
	//display: grid;
	//grid-gap: 16px;

	//@media (min-width: 576px) {
	//  grid-template-columns: repeat(8, 1fr);
	//  grid-gap: 24px;
	//}
	//
	//@media (min-width: 852px) {
	//  grid-template-columns: repeat(12, 1fr);
	//  grid-gap: 24px;
	//}
	//
	//@media (min-width: 968px) {
	//  grid-template-columns: repeat(12, 1fr);
	//  grid-gap: 32px;
	//}

	& > div {
		margin: 16px 0;

		@media (max-width: 768px) {
			min-width: 340px;
			margin: 15px auto;
		}
	}
`

export default Grid
