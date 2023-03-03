import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Mode = 'WORK' | 'REST';

export type UserInput = { work: number; rest: number };

interface PomodoState {
	userInput: UserInput;
	isRunning: boolean;
	time: number;
	mode: Mode;
}

const initialState: PomodoState = {
	userInput: { work: 25, rest: 5 },
	isRunning: false,
	time: 1500,
	mode: 'WORK',
};

const pomodoroSlice = createSlice({
	name: 'pomodoro',
	initialState,
	reducers: {
		setUserInput: (state, action: PayloadAction<UserInput>) => {
			state.userInput = action.payload;
		},

		setTime: (state, action: PayloadAction<number>) => {
			state.time = action.payload;
		},

		setIsRunning: (state, action: PayloadAction<boolean>) => {
			state.isRunning = action.payload;
		},

		setMode: (state, action: PayloadAction<Mode>) => {
			state.mode = action.payload;
		},

		countDownOneSec: state => {
			state.time -= 1;
		},
	},
});

export const { setUserInput, setTime, setIsRunning, setMode, countDownOneSec } =
	pomodoroSlice.actions;

export default pomodoroSlice.reducer;
