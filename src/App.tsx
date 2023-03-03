import { Global } from '@emotion/react';
import Pomodoro from 'components/Pomodoro';
import { Provider } from 'react-redux';
import store from 'redux/store';
import global from 'styles/global';
import reset from 'styles/reset';

function App() {
	return (
		<>
			<Global styles={reset} />
			<Global styles={global} />
			<Provider store={store}>
				<Pomodoro />
			</Provider>
		</>
	);
}

export default App;
