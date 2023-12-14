import { createContext, useEffect, useReducer } from "react";
import { useLogin } from "../hooks/api/useLogin";
import { useUserInfo } from "../hooks/api/useUserInfo";
import { useLocalStorage } from "../hooks/useLocalStorage";

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

export const AuthProvider = ({ children, loadingElement }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate: login, isLoading: isLoggingIn } = useLogin();

  const [token, setToken] = useLocalStorage("token", undefined);

  const { data, isLoading, fetchData } = useUserInfo();

  function handleLogin({ data, onError, onSuccess }) {
    login(data, {
      onError,
      onSuccess(data) {
        dispatch({
          type: "LOGIN",
          payload: data,
        });
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
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: data.user,
          patentId: data.patentId,
          accessToken: token,
        },
      });
    }
  }, [isLoading, data]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isLoggingIn,
        login: handleLogin,
        logout: handeLogout,
      }}
    >
      {isLoading ? loadingElement : children}
    </AuthContext.Provider>
  );
};
