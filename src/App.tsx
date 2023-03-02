import { Global } from '@emotion/react';
import global from 'styles/global';
import reset from 'styles/reset';

function App() {
	return (
		<>
			<Global styles={reset} />
			<Global styles={global} />
			test 안녕하세요
		</>
	);
}

export default App;
