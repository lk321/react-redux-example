import React from "react";
import { Link } from "react-router";
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import { RenderField } from "./renderField";
import * as actions from '../../actions/login';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleFormSubmit = this.handleFormSubmit.bind(this);
	}

	handleFormSubmit(props) {
		this.props.signinUser(props);
	}

	render() {
		const { handleSubmit } = this.props;

		return (
			<div className="login">
		        <div className="login-screen">
		            <div className="app-title">
		                <h1>Login form</h1>
		            </div>
		            <form onSubmit={handleSubmit(this.handleFormSubmit)} className="login-form">
		            	{/* Server error message */}
						{ this.props.errorMessage && this.props.errorMessage.signin &&
						<div className="error-container signin-error">Oops! { this.props.errorMessage.signin }</div> }
						
						{/* Email */}
						<Field name="email" component={ RenderField } type="text" placeholder="Email" />
						{/* Password */}
						<Field name="password" component={ RenderField } type="password" placeholder="Password" />
		                
		                <button className="btn btn-primary btn-large btn-block">login</button>
		            </form>
		        </div>
		    </div>
		);
	}
}

/**
 * Function para validar los campos del formulario.
 */
const validate = (formProps) => {
	const errors = {};

	if(!formProps.email) {
		errors.email = 'Email is required';
	} else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
		errors.email = "please provide valid email";
	}

	if(!formProps.password) {
		errors.password = 'Password is required';
	}

	return errors;
};

const mapStateToProps = (state) =>  {
	return { errorMessage: state.login.error };
};

Login = reduxForm({ form: 'signin', validate })(Login);

export default connect(mapStateToProps, actions)(Login);
