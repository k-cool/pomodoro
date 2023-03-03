/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { calcMin, calcSec } from 'util/timeFunc';
import { gray, green } from 'styles/palette';
import { Mode } from 'redux/slices/pomodoroSlice';

interface TimerProps {}

export default function Timer({}: TimerProps) {
	const {
		mode,
		time,
		userInput: { work, rest },
	} = useSelector((state: RootState) => state.pomodoro);

	const ratio = useMemo(() => {
		const result = mode === 'WORK' ? (work * 60) / time : (rest * 60) / time;
		return isNaN(result) || result === Infinity ? 0 : result;
	}, [mode, work, rest, time]);

	return (
		<div css={TimerCss}>
			<div css={chartCss}>
				<div css={outerCss(ratio, mode)}></div>
				<div css={holeCss}></div>
				<div css={timeCss}>{`${calcMin(time)}:${calcSec(time)}`}</div>
			</div>
		</div>
	);
}

const TimerCss = css``;

const chartCss = css`
	position: relative;
	width: 300px;
	height: 300px;
`;

const outerCss = (ratio: number, mode: Mode) => css`
	width: 100%;
	height: 100%;
	background: conic-gradient(
		${mode === 'WORK' ? 'tomato' : '#1cdc72'} ${360 * ratio}deg,
		${gray[300]} ${360 * ratio}deg 360deg
	);
	border-radius: 50%;
	transition: all 1s ease;
`;

const holeCss = css`
	position: absolute;
	top: 50%;
	left: 50%;
	width: 270px;
	height: 270px;
	background-color: white;
	border-radius: 50%;
	transform: translate(-50%, -50%);
`;

const timeCss = css`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: ${gray[600]};
	font-size: 60px;
`;
