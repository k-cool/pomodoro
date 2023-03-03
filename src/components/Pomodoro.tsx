/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';

import Timer from './Timer';
import Button from './common/Button';
import TimeInput from './TimeInput';
import { RootState } from 'redux/store';
import { setIsRunning, setMode, setTime } from 'redux/slices/pomodoroSlice';
import { createRandomNumber } from 'util/utilFunc';
import { gray } from 'styles/palette';
import { theme } from 'styles/theme';

export default function Pomodoro() {
	const dispatch = useDispatch();
	const {
		isRunning,
		mode,
		userInput: { work, rest },
	} = useSelector((state: RootState) => state.pomodoro);

	const themeColor = mode === 'WORK' ? theme.work : theme.rest;

	const handleClickStartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!work || !rest)
			return alert('집중 및 휴식 시간은 최소 1분으로 해주세요!');

		new Audio(`sounds/start${createRandomNumber(1, 3)}.mp3`).play();
		dispatch(setIsRunning(true));
	};

	const handleClickResetButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(setIsRunning(false));
		dispatch(setMode('WORK'));
		dispatch(setTime(work * 60));
	};

	return (
		<div css={PomodoroCss}>
			<div css={titleWrapperCss}>
				<img css={logoCss} src="icon/pomodoroLogo.png" alt="logo" />
				<h1 css={titleCss}>POMODORO</h1>
			</div>
			<TimeInput />
			<Timer />
			{isRunning ? (
				<Button
					width="120px"
					height="50px"
					color={themeColor}
					borderColor={themeColor}
					onClick={handleClickResetButton}
				>
					초기화
				</Button>
			) : (
				<Button
					width="120px"
					height="50px"
					color={themeColor}
					borderColor={themeColor}
					onClick={handleClickStartButton}
				>
					시작
				</Button>
			)}
		</div>
	);
}

const PomodoroCss = css`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 25px;
	width: 100vw;
	height: 100vh;
`;

const titleWrapperCss = css`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const logoCss = css`
	width: 90px;
`;

const titleCss = css`
	color: ${gray[500]};
	font-size: 40px;
	font-weight: 500;
	letter-spacing: 2px;
`;
