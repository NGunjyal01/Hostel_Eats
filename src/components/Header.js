import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import { logout } from "../services/authAPI";

const Header = () => {

    const user = useSelector(store => store.user);
    const [showDropDownMenu,setShowDropDownMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleUserIconClick = ()=>{
        navigate('/dashboard/my-profile');
    }
    const handleLogOut = ()=>{
        logout(navigate,dispatch);
    }

    return (
        <div className="fixed w-full z-10 flex bg-gradient-to-r from-black to-[#222831] text-white pt-10 pb-4">
            <h1 className="ml-[10%]">Hostel Eats</h1>
            <div className="ml-[25%] space-x-7">
                <NavLink to='/' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>Home</NavLink>
                <NavLink to='/about-us' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>About Us</NavLink>
                <NavLink to='/add-canteen' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>Add Canteen</NavLink>
            </div>
            {!user && <div className="ml-[25%] space-x-7">
                <NavLink to='/login' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>}
                       
            {user && <><div className="absolute right-24 top-7 flex justify-center items-center space-x-1 cursor-pointer transition-transform ease-out" onClick={handleUserIconClick}
            onMouseEnter={()=>{setShowDropDownMenu(true)}} onMouseLeave={()=>{setShowDropDownMenu(false)}}>
                <FaUserCircle  size={40}/>    
                {showDropDownMenu && <>
                <div className="absolute top-10 bg-transparent h-7 w-[10rem] z-10"></div>
                <div className="bg-[#EEEEEE] w-4 h-4 rotate-45 absolute top-14"></div>
                <div className="absolute z-10 top-16 bg-[#EEEEEE]  text-black w-[10rem] flex flex-col items-center space-y-2 px-2 rounded-md" onClick={(e)=>{e.stopPropagation()}}>
                    <NavLink to='/dashboard/my-profile'>Profile</NavLink>
                    <NavLink to='/dashboard/settings'>Settings</NavLink>
                    <button onClick={handleLogOut} className="pb-2">log out</button>
                </div></>}
            </div>
            <div className="absolute right-[4.5rem]">{!showDropDownMenu?<IoMdArrowDropdown  size={20}/>:<IoMdArrowDropup size={20}/>}</div>
            </>}


        </div>
    )
}

export default Header;
