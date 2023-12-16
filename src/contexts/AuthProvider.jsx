import {createContext, useEffect, useReducer} from "react";
import {useLogin} from "../hooks/api/useLogin";
import {useUserInfo} from "../hooks/api/useUserInfo";
import {useLocalStorage} from "../hooks/useLocalStorage";

const initialState = {};
// LOGIN = "LOGIN",
// LOGOUT = "LOGOUT",

export const AuthContext = createContext({});

function reducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload.user,
                accessToken: action.payload.accessToken,
            };
        case "LOGOUT":
            return initialState;
    }
}

export const AuthProvider = ({children, loadingElement}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {mutate: login, isPending: isLoggingIn} = useLogin();

    const [token, setToken] = useLocalStorage("token", undefined);

    const {
        data, isLoading: isLoadingUser, fetchData
    }
        = useUserInfo();

    function handleLogin({data, onError, onSuccess}) {
        login(data, {
            onError,
            onSuccess(data) {
                dispatch({
                    type: "LOGIN",
                    payload: data,
                });
                console.log("Token is set");
                setToken(data.accessToken);
                if (onSuccess) onSuccess();
            },
        });
    }

    function handeLogout() {
        dispatch({
            type: "LOGOUT",
        });
        // TODO: manage setting and unsetting token in the LOGOUT reducer
        setToken(undefined);
    }

    useEffect(() => {
        fetchData(token);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <AuthContext.Provider
            value={{
                user: data?.user ?? state.user,
                accessToken: token,
                isLoggingIn,
                login: handleLogin,
                logout: handeLogout,
            }}
        >
            {isLoadingUser ? loadingElement : children}
        </AuthContext.Provider>
    );
};
