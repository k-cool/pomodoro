/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

import { calcMin, calcSec, createRandomNumber } from 'util/utilFunc';
import { gray } from 'styles/palette';
import {
	countDownOneSec,
	Mode,
	setIsRunning,
	setMode,
	setTime,
} from 'redux/slices/pomodoroSlice';
import { theme } from 'styles/theme';
import useDidMountEffect from 'hooks/useDidMountEffect';

export default function Timer() {
	const dispatch = useDispatch();
	const {
		mode,
		time,
		isRunning,
		userInput: { work, rest },
	} = useSelector((state: RootState) => state.pomodoro);

	const ratio = useMemo(() => {
		const result = mode === 'WORK' ? time / (work * 60) : time / (rest * 60);
		return isNaN(result) || result === Infinity ? 0 : result;
	}, [mode, work, rest, time]);

	const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
		null
	);

	useDidMountEffect(() => {
		if (isRunning) {
			if (timer) return;
			setTimer(
				setInterval(() => {
					dispatch(countDownOneSec());
				}, 1000)
			);
		} else {
			if (!timer) return;

			clearInterval(timer);
			setTimer(null);
		}
	}, [isRunning]);

	useEffect(() => {
		if (time || !isRunning) return;

		if (mode === 'WORK') {
			dispatch(setIsRunning(false));
			dispatch(setMode('REST'));
			dispatch(setTime(rest * 60));
			dispatch(setIsRunning(true));
			new Audio(`sounds/stop${createRandomNumber(1, 3)}.mp3`).play();
		}

		if (mode === 'REST') {
			dispatch(setIsRunning(false));
			dispatch(setMode('WORK'));
			dispatch(setTime(work * 60));
			new Audio(`sounds/ready${createRandomNumber(1, 3)}.mp3`).play();
		}
	}, [isRunning, time, rest, work, mode, dispatch]);

	return (
		<div css={TimerCss}>
			<div css={chartCss}>
				<div
					css={outerCss(ratio, mode)}
					style={{
						background: `conic-gradient(${
							mode === 'WORK' ? theme.work : theme.rest
						} ${360 * ratio}deg, ${gray[300]} ${360 * ratio}deg 360deg)`,
					}}
				></div>
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
		${mode === 'WORK' ? theme.work : theme.rest} ${360 * ratio}deg,
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
