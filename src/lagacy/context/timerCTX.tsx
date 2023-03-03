import { createContext, ReactNode, useReducer } from 'react';

export type TimerDispatch = React.Dispatch<TimeAction> | null | undefined;

export interface ITimer {
	isRunning: boolean;
	min: string;
	sec: string;
	timerDispatch?: TimerDispatch;
}

export type TimerActionType =
	| 'SET_MIN'
	| 'SET_SEC'
	| 'SET_IS_RUNNING'
	| 'SET_TIME'
	| 'START_WORK'
	| 'START_REST'
	| 'RESET';

interface TimeAction {
	type: TimerActionType;
	value: any;
}

export const timerInitialState: ITimer = {
	isRunning: false,
	min: '16',
	sec: '04',
};

const reducer = (state: ITimer, action: TimeAction): ITimer => {
	switch (action.type) {
		case 'SET_MIN':
			return { ...state, min: action.value };

		case 'SET_SEC':
			return { ...state, sec: action.value };

		case 'SET_IS_RUNNING':
			return { ...state, isRunning: action.value };

		case 'SET_TIME':
			console.log('settime');
			return { ...state, min: action.value.min, sec: action.value.sec };

		case 'START_WORK':
			return { ...state, isRunning: true, min: action.value, sec: '00' };

		// case 'RESET':
		// 	return { ...state };

		default:
			throw new Error();
	}
};

export const TimerContext = createContext(timerInitialState);

interface ProvidorProps {
	children: ReactNode;
}

export const TimerProvider = ({ children }: ProvidorProps) => {
	const [state, timerDispatch] = useReducer(reducer, timerInitialState);

	return (
		<TimerContext.Provider
			value={{ isRunning: state.isRunning, min: state.min, sec: state.sec, timerDispatch }}
		>
			{children}
		</TimerContext.Provider>
	);
};
