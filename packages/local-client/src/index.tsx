import React from 'react';
import ReactDOM from 'react-dom';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
