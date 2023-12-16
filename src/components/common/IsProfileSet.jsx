import {useAuth} from "../../hooks/useAuth";
import {Outlet, Navigate} from "react-router-dom";
import {Fragment} from "react";

const IsProfileSet = ({children}) => {
    const {user} = useAuth();

    if (!user.profile)
        return <Navigate to="/app/my-profile/edit"/>;

    return <Fragment>{children}</Fragment>;
};

export default IsProfileSet;
