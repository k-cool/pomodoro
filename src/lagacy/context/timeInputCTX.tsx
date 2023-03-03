import { createContext, ReactNode, useReducer } from 'react';

export interface IUserInput {
	concentration: string;
	rest: string;
	timeInputDispatch?: React.Dispatch<TimeInputAction> | null;
}

export type TimeInputActionType = 'CONCENTRATION' | 'REST';

interface TimeInputAction {
	type: TimeInputActionType;
	value: any;
}

const timeInputInitialState: IUserInput = {
	concentration: '25',
	rest: '5',
	timeInputDispatch: null,
};

const reducer = (state: IUserInput, action: TimeInputAction): IUserInput => {
	switch (action.type) {
		case 'CONCENTRATION':
			return { ...state, concentration: action.value };

		case 'REST':
			return { ...state, rest: action.value };

		default:
			throw new Error();
	}
};

export const TimeInputContext = createContext(timeInputInitialState);

interface ProvidorProps {
	children: ReactNode;
}

export const TimeInputProvider = ({ children }: ProvidorProps) => {
	const [state, timeInputDispatch] = useReducer(reducer, timeInputInitialState);

	return (
		<TimeInputContext.Provider
			value={{ concentration: state.concentration, rest: state.rest, timeInputDispatch }}
		>
			{children}
		</TimeInputContext.Provider>
	);
};
