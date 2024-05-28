import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const OpenRoute = ({children}) => {

    const user = useSelector(store => store.user);

    if(user===null) {
        console.log("User not loged in");
        return children;
    }
    console.log("user is loged in");
    return <Navigate to='/dashboard/my-profile'/>
}

export default OpenRoute;
