import React from "react";

/**
 * Stateless Components
 * La diferencia es que este componenete no ocupa states (Actualizar o datos dinamicos).
*/
export const RenderField = ({ input, type, placeholder, meta: { touched, error } }) => {
	return (
		<div className={`control-group ${touched && error ? 'has-error' : ''}`}>
			<input type={type} placeholder={placeholder} {...input} className="login-field"/>
			{ touched && error && <div className="form-error">{error}</div> }
		</div>
	);
};