import { createContext, useEffect, useReducer } from "react";
import { useLogin } from "../hooks/api/useLogin";
import { useUserInfo } from "../hooks/api/useUserInfo";
import { useLocalStorage } from "../hooks/useLocalStorage";
import LoadingPage from "../components/common/loading/LoadingPage";

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
    case "REFRESH_USER":
      return {
        ...state,
        user: action.payload,
      };
  }
}

export const AuthProvider = ({
  children,
  loadingElement = <LoadingPage />,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mutate: login, isPending: isLoggingIn } = useLogin();
  const [token, setToken] = useLocalStorage("token", undefined);

  const {
    data,
    isLoading: isLoadingUser,
    fetchData,
    clearState,
  } = useUserInfo();

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

  console.log({ isLoadingUser });

  function handeLogout() {
    setToken(undefined);
    dispatch({
      type: "LOGOUT",
    });
    clearState();
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
        refetchUser: async () => {
          const user = await fetchData(token);
          console.log({ user });
          dispatch({
            type: "REFRESH_USER",
            paylaod: user,
          });
        },
        isLoggingIn,
        login: handleLogin,
        logout: handeLogout,
      }}
    >
      {isLoadingUser ? loadingElement : children}
    </AuthContext.Provider>
  );
};
