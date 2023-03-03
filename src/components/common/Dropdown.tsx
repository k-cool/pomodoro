/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import React, { useMemo, useRef, useState } from 'react';
import { gray, pallete, purple } from 'styles/palette';

interface DropdownProps {
	list: DropdownLists;
	width?: string;
	height?: string;
	onClickList: React.MouseEventHandler;
}

interface IDropdownList {
	id: number | string;
	name: string;
	value: string;
	selected: boolean;
}

export type DropdownLists = IDropdownList[];

export default function Dropdown({ list, width = '', height = '', onClickList }: DropdownProps) {
	const [isOpen, setIsOpen] = useState(false);
	const btnRef = useRef<HTMLButtonElement>(null);

	const handleClickDropdownButton = () => {
		setIsOpen(prev => !prev);
	};

	const selected = useMemo(() => {
		console.log('dropdown memo');
		return list.find(li => li.selected);
	}, [list]);

	return (
		<div css={DropdownCss}>
			<button css={buttonCss(width, height)} type="button" ref={btnRef} onClick={handleClickDropdownButton}>
				{`${selected?.name} ▾`}
			</button>
			{isOpen && (
				<ul css={ulCss(btnRef.current?.clientWidth)}>
					{list.map(li => (
						<li
							css={liCss}
							key={li.id}
							data-id={li.id}
							onClick={e => {
								onClickList(e);
								setIsOpen(prev => !prev);
							}}
						>
							{li.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

const DropdownCss = css`
	position: relative;
`;

const buttonCss = (width: string, height: string) => css`
	width: ${width};
	height: ${height};
	padding: 10px 20px;
	background-color: ${purple[30]};
	color: ${pallete.white};
	font-size: 20px;
	border: none;
	border-radius: 8px;
	letter-spacing: 1px;
	cursor: pointer;
`;

const ulCss = (btnWidth: number | undefined) => css`
	position: absolute;
	top: 48px;
	width: fit-content;
	min-width: ${btnWidth}px;
	height: fit-content;
	background-color: ${gray[100]};
	border: 1px solid ${gray[300]};
	border-radius: 8px;
	z-index: 1000;
`;

const liCss = css`
	width: 100%;
	padding: 10px 12px;

	color: ${gray[700]};
	white-space: nowrap;
	word-break: keep-all;
	cursor: pointer;

	&:hover {
		background-color: ${gray[300]};
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid ${gray[300]};
	}
`;
