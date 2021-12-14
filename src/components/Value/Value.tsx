import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'

import styled from 'styled-components'

interface ValueProps {
	value: string | number
	decimals?: number
	unit?: string
	size?: number
}

const Value: React.FC<ValueProps> = ({ value, decimals, unit, size }) => {
	const [start, updateStart] = useState(0)
	const [end, updateEnd] = useState(0)
	useEffect(() => {
		if (typeof value === 'number') {
			updateStart(end)
			updateEnd(value)
		}
	}, [value])

	return (
		<StyledValue size={size}>
			{typeof value == 'string' ? (
				value
			) : (
				<>
					{unit}
					<CountUp
						start={start}
						end={end}
						decimals={
							decimals !== undefined
								? decimals
								: end < 0
								? 4
								: end > 1e5
								? 0
								: 2
						}
						duration={1}
						separator=","
					/>
				</>
			)}
		</StyledValue>
	)
}

interface StyledValueProps {
	size?: number
}

const StyledValue = styled.div<StyledValueProps>`
	font-size: ${(props) => (props.size ? `${props.size}px` : '36px')};
	font-weight: 700;
	color: #fdd284;
`

export default Value
