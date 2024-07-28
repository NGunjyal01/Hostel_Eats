import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserIcon = ()=>{

    const user = useSelector(store => store.user);
    const navigate = useNavigate();

    const [isOpen,setIsOpen] = useState(false);

    const handleIconClick = ()=>{
        if(!user){
            navigate('/login');
        }    
        else{
            navigate('/dashboard/my-profile');
        }
    }

    return(
        <div className="absolute right-7">
            <button onClick={handleIconClick}>
                <FaUserCircle className="cartLogo"/>
            </button>
        </div>
    );
}

export default UserIcon;