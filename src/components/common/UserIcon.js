import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserIcon = ()=>{

    const user = useSelector(store => store.user);
    const navigate = useNavigate();

    const handleIconClick = ()=>{
        if(!user){
            navigate('/login');
        }    
        else{
            navigate('/dashboard/my-profile');
        }
    }

    return(
        <div className={`absolute ${user?'right-16':'right-7'}`}>
            {!user ? <button onClick={handleIconClick}>
                <FaUserCircle className="cartLogo"/>
            </button>
            :<img src={user.imageUrl} className="size-8 rounded-md border-[1px]" onClick={handleIconClick}/>}
        </div>
    );
}

export default UserIcon;