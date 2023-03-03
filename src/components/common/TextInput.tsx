/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { gray } from 'styles/palette';

interface TextInputProps {
	name: string;
	value: string | number;
	placeholder?: string;
	disabled?: boolean;
	width?: string;
	height?: string;
	onChange?: React.ChangeEventHandler;
}

export default function TextInput({
	name,
	value,
	placeholder = '',
	disabled = false,
	width = '',
	height = '',
	onChange,
}: TextInputProps) {
	return (
		<input
			css={TextInputCss(width, height, disabled)}
			type="text"
			name={name}
			value={value}
			disabled={disabled}
			placeholder={placeholder}
			onChange={onChange}
		/>
	);
}

const TextInputCss = (width: string, height: string, disabled: boolean) => css`
	width: ${width};
	height: ${height};
	padding: 10px;
	outline: none;
	border: 1px solid ${gray[300]};
	border-radius: 8px;
	color: ${disabled ? gray[300] : ''};
	font-size: 20px;
`;
