import {createContext, useEffect, useReducer} from "react";
import ReducerAuth from "./ReducerAuth"

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false
};
export const ContextAuth = createContext(INITIAL_STATE);

export const ContextAuthProv = ({children}) => {

const [state, dispatch] = useReducer(ReducerAuth, INITIAL_STATE);
    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))
    },[state.user])
return (
    <ContextAuth.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}

    >
        {children}
    </ContextAuth.Provider>
)}