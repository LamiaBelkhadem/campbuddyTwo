import axios from "axios";

export const login = async (userCredent, dispatch) => {
    dispatch({type: "LOGIN_START"});
    try {
        const res = await axios.post("http://localhost:8080/api/auth/login", userCredent);
        dispatch({type: "LOGIN_SUCCESS", payload: res.data});
    } catch (err) {
        dispatch({type: "LOGIN_FAIL", payload: err});
    }
}