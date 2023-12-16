import {Fragment} from "react";
import {Navigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import LoadingPage from "./loading/LoadingPage";

const PublicRoute = ({children, alreadyLoggedInPath = "/app"}) => {
    const {isLoggingIn, user} = useAuth();

    if (isLoggingIn) {
        return <LoadingPage/>;
    } else if (!user) {
        return <Fragment>{children}</Fragment>;
    }
    return <Navigate to={alreadyLoggedInPath}/>;
};
export default PublicRoute;
