import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";
import { logout } from "../../services/authAPI";
import { AnimatePresence, motion } from "framer-motion";
import Option from "./Option";

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
            <div className="ml-[25%] space-x-7 flex">
                <Option>
                    <NavLink to='/' className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>Home</NavLink>
                </Option>
                <Option>
                    <NavLink to='/about-us' className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>About Us</NavLink>
                </Option>
                <Option>
                    <NavLink to='/add-canteen' className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>Add Canteen</NavLink>
                </Option>
            </div>
            {!user && <div className="ml-[25%] space-x-7">
                <NavLink to='/login' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>}  
            {user && <><div className=" group absolute right-24 top-7 flex justify-center items-center space-x-1 cursor-pointer transition-transform ease-out" onClick={handleUserIconClick}
            onMouseEnter={()=>{setShowDropDownMenu(true)}} onMouseLeave={()=>{setShowDropDownMenu(false)}}>
                <FaUserCircle  size={40}/>    
                {showDropDownMenu && <>
                <div className="absolute top-10 bg-transparent h-7 w-[10rem] z-10"></div>
                <AnimatePresence>
                    <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}
                    className="absolute z-10 top-16 bg-[#EEEEEE]  text-black w-[10rem] flex flex-col items-center space-y-2 px-2 rounded-md" onClick={(e)=>{e.stopPropagation()}}>
                        <div className="bg-[#EEEEEE] w-4 h-4 rotate-45 absolute -top-2"></div>
                        <NavLink to='/dashboard/my-profile'>Profile</NavLink>
                        <NavLink to='/dashboard/settings'>Settings</NavLink>
                        <button onClick={handleLogOut} className="pb-2">log out</button>
                    </motion.div>
                </AnimatePresence></>}
                <div className="absolute -right-6"><IoMdArrowDropdown size={20} className="group-hover:rotate-180 transition-transform ease-out duration-300"/></div>
            </div>
            
            </>}
        </div>
    )
}

export default Header;
