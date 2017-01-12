export default function(state = {}, action) {
    switch (action.type) {
        case "SIGNUP_SUCCESS":
            return { ...state, signup: true, error: {} };
        case "SIGNUP_FAILURE":
            return { ...state, signup: false, error: { signup: action.payload } };
        case "SIGNUP_RESEND_FAILURE":
            return { ...state, signup: true, error: { signupResend: action.payload } };
    }

    return state;
}
