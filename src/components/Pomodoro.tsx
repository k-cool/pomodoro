/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRunning, setMode } from 'redux/slices/pomodoroSlice';
import { RootState } from 'redux/store';
import { gray } from 'styles/palette';
import Button from './common/Button';
import TimeInput from './TimeInput';
import Timer from './Timer';

export default function Pomodoro() {
	const dispatch = useDispatch();
	const { isRunning } = useSelector((state: RootState) => state.pomodoro);

	const handleClickStartButton = (e: React.MouseEvent<HTMLButtonElement>) => {
		dispatch(setIsRunning(true));
		dispatch(setMode('REST'));
	};

	return (
		<div css={PomodoroCss}>
			<div>
				<h1 css={titleCss}>POMODORO</h1>
			</div>
			<TimeInput />
			<Timer />
			{isRunning ? null : (
				<Button
					width="120px"
					height="50px"
					color="tomato"
					borderColor="tomato"
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

const titleCss = css`
	color: ${gray[500]};
	font-size: 50px;
	font-weight: 500;
	letter-spacing: 2px;
	margin-bottom: 10px;
`;
