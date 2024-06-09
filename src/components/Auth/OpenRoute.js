import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const OpenRoute = ({children}) => {

    const user = useSelector(store => store.user);

    if(user===null) {
        //  When is User not loged in
        return children;
    }
    // When user is loged in
    return <Navigate to='/dashboard/my-profile'/>
}

export default OpenRoute;
