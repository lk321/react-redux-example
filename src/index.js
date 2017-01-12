import React from "react";
import ReactDom from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from "react-router";
import logger from "redux-logger";
import thunk from "redux-thunk";

import reducers from "./reducers";
import routes from "./routes";

const store = createStore(reducers, applyMiddleware(thunk, logger()));

ReactDom.render(
	<Provider store={store}>
		<Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
	</Provider>
, document.getElementById('app'));
