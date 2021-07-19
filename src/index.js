import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { App, Settings } from './App';
import reportWebVitals from './reportWebVitals';

import './common/icons.js';

ReactDOM.render(
	<React.StrictMode>
		<div id="icon-container"></div>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/settings" component={Settings} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
