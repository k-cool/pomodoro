/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React from 'react';
import { gray, pallete, purple } from 'styles/palette';

interface ButtonProps {
	width?: string;
	height?: string;
	bacgroundColor?: string;
	borderColor?: string;
	color?: string;
	children?: React.ReactNode;
	onClick?: React.MouseEventHandler;
}

export default function Button({
	width = '',
	height = '',
	bacgroundColor = pallete.white,
	borderColor = purple[30],
	color = purple[30],
	children,
	onClick,
}: ButtonProps) {
	return (
		<button css={ButtonCss(width, height, bacgroundColor, borderColor, color)} onClick={onClick}>
			{children}
		</button>
	);
}

const ButtonCss = (
	width: string,
	height: string,
	bacgroundColor: string,
	borderColor: string,
	color: string
) => css`
	width: ${width};
	height: ${height};
	padding: 10px 20px;
	background-color: ${bacgroundColor};
	border: 1px solid ${borderColor};
	border-radius: 8px;
	color: ${color};
	font-size: 20px;
	letter-spacing: 1px;
	cursor: pointer;

	&:hover {
		background-color: ${gray[200]};
	}
`;
