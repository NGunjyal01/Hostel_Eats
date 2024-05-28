import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({children}) => {

    const user = useSelector(store => store.user);

    if(user)
        return children
    return <Navigate to='/login'/>
}

export default PrivateRoute;
