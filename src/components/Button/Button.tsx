import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'

import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'

interface ButtonProps {
	id?: string
	children?: React.ReactNode
	disabled?: boolean
	isLoading?: boolean
	href?: string
	onClick?: () => void
	size?: 'sm' | 'md' | 'lg'
	text?: string
	to?: string
	variant?: 'default' | 'secondary' | 'tertiary'
}

const Button: React.FC<ButtonProps> = ({
	id,
	children,
	disabled,
	isLoading,
	href,
	onClick,
	size,
	text,
	to,
	variant,
}) => {
	const { color, spacing } = useContext(ThemeContext)

	let buttonColor: string
	switch (variant) {
		case 'secondary':
			buttonColor = color.grey[500]
			break
		case 'default':
		default:
			buttonColor = '#0dba88'
	}

	let boxShadow: string
	let buttonSize: number
	let buttonPadding: number
	let fontSize: number
	switch (size) {
		case 'sm':
			boxShadow = `4px 4px 8px ${color.grey[300]},
        -8px -8px 16px ${color.grey[100]}FF;`
			buttonPadding = spacing[3]
			buttonSize = 36
			fontSize = 14
			break
		case 'lg':
			boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px ${color.grey[100]}ff;`
			buttonPadding = spacing[4]
			buttonSize = 72
			fontSize = 16
			break
		case 'md':
		default:
			boxShadow = `6px 6px 12px ${color.grey[300]},
        -12px -12px 24px -2px ${color.grey[100]}ff;`
			buttonPadding = spacing[4]
			buttonSize = 48
			fontSize = 16
	}

	const ButtonChild = useMemo(() => {
		if (to != '' && to != null) {
			return <StyledLink to={to}>{text}</StyledLink>
		} else if (href) {
			return (
				<StyledExternalLink href={href} target="__blank">
					{text}
				</StyledExternalLink>
			)
		} else {
			return text
		}
	}, [href, text, to])

	return (
		<StyledButton
			id={id}
			boxShadow={boxShadow}
			color={buttonColor}
			disabled={disabled}
			fontSize={fontSize}
			onClick={onClick}
			padding={buttonPadding}
			size={buttonSize}
		>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{children}
					{ButtonChild}
				</>
			)}
		</StyledButton>
	)
}

interface StyledButtonProps {
	boxShadow: string
	color: string
	disabled?: boolean
	fontSize: number
	padding: number
	size: number
}

const StyledButton = styled.button<StyledButtonProps>`
	align-items: center;
	background-color: #404040;
	box-shadow: rgb(14 14 44 / 40%) 0px -1px 0px 0px inset;
	border: 0;
	border-radius: 16px;
	color: ${(props) => (!props.disabled ? props.color : `${props.color}90`)};
	cursor: pointer;
	display: flex;
	font-size: ${(props) => props.fontSize}px;
	font-weight: 700;
	height: ${(props) => props.size}px;
	justify-content: center;
	outline: none;
	padding-left: ${(props) => props.padding}px;
	padding-right: ${(props) => props.padding}px;
	pointer-events: ${(props) => (!props.disabled ? undefined : 'none')};
	width: 100%;
	line-height: 1.5;
	transition: background-color 0.2s ease 0s;
	letter-spacing: 0.03em;
	white-space: nowrap;
	

	&:hover {
		background-color: rgb(242, 224, 34);
	}
`

const StyledLink = styled(Link)`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;
`

const StyledExternalLink = styled.a`
	align-items: center;
	color: inherit;
	display: flex;
	flex: 1;
	height: 56px;
	justify-content: center;
	margin: 0 ${(props) => -props.theme.spacing[4]}px;
	padding: 0 ${(props) => props.theme.spacing[4]}px;
	text-decoration: none;
`

export default Button
