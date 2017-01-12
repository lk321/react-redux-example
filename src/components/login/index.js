import React from 'react';
import { Link } from "react-router";

export default class Login extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="login">
		        <div className="login-screen">
		            <div className="app-title">
		                <h1>Login</h1>
		            </div>
		            <form action="/api/signin" className="login-form" method="POST">
		                <div className="control-group">
		                    <input type="text" className="login-field" placeholder="username" id="username" name="username" required/>
		                    <label className="login-field-icon fui-user" htmlFor="username"></label>
		                </div>
		                <div className="control-group">
		                    <input type="password" className="login-field" placeholder="password" id="password" name="password" required/>
		                    <label className="login-field-icon fui-lock" htmlFor="password"></label>
		                </div>
		                <button className="btn btn-primary btn-large btn-block">login</button>
		            </form>
		        </div>
		    </div>
		);
	}
}
