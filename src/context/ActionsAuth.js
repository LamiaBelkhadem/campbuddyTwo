export const StartLogin = (userCredent) => ({
    type: "LOGIN_START",
});
export const SuccessLogin = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});
export const FailLogin = (error) => ({
    type: "LOGIN_FAIL",
    payload:error
});

e