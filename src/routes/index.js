import React from "react";
import { Route, IndexRoute } from "react-router";

import Login from "../components/login";

export default (
	<Route path={"/"}>
		<IndexRoute component={ Login } />
		<Route path={"login"} component={ Login } />
	</Route>
);