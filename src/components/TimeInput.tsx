/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useDispatch, useSelector } from 'react-redux';
import { setTime, setUserInput } from 'redux/slices/pomodoroSlice';
import { RootState } from 'redux/store';

import TextInput from './common/TextInput';
import useDidMountEffect from 'hooks/useDidMountEffect';
import { gray } from 'styles/palette';

export default function TimeInput() {
	const dispatch = useDispatch();
	const { isRunning, userInput } = useSelector(
		(state: RootState) => state.pomodoro
	);
	const { work, rest } = userInput;

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (isNaN(+value)) return;
		if (value.length > 2 || +value > 60) return alert('최대 60분까지 입니다!');
		dispatch(setUserInput({ ...userInput, [name]: +value }));
	};

	useDidMountEffect(() => {
		dispatch(setTime(work * 60));
	}, [work, dispatch]);

	return (
		<div css={TimeInputCss(isRunning)}>
			<span>1주기</span>
			<TextInput
				name="work"
				value={work}
				width="50px"
				disabled={isRunning}
				onChange={handleChangeInput}
			/>
			<span>분</span>
			<span>집중</span>
			<TextInput
				name="rest"
				value={rest}
				width="50px"
				disabled={isRunning}
				onChange={handleChangeInput}
			/>
			<span>분</span>
			<span>휴식</span>
		</div>
	);
}

const TimeInputCss = (disabled: boolean) => css`
	display: flex;
	align-items: center;
	gap: 10px;

	color: ${disabled ? gray[300] : ''};
`;
