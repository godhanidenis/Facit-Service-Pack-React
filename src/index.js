import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import App from './App/App';
import reportWebVitals from './reportWebVitals';
import { ThemeContextProvider } from './contexts/themeContext';
import './i18n';
import store from './redux/store';

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<ThemeContextProvider>
				<Provider store={store}>
					<App />
				</Provider>
			</ThemeContextProvider>
		</React.StrictMode>
	</Router>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
