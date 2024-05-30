import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { logout } from "../../services/authAPI";
import { AnimatePresence, motion } from "framer-motion";
import Tab from "./Tab";
import { setCurrTab, setPrevTab } from "../../slices/tabSlice";

const Header = () => {

    const user = useSelector(store => store.user);
    const {currTab} = useSelector(store => store.tabInfo);
    const [showDropDownMenu,setShowDropDownMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tabs = [{name:'Home',to:'/'},{name:'About Us',to:'/about-us'},{name:'Add Canteen',to:'/add-canteen'}]
    const handleUserIconClick = ()=>{
        navigate('/dashboard/my-profile');
    }
    const handleLogOut = ()=>{
        logout(navigate,dispatch);
    }
    const sideTabs = [{name:'Profile',to:'/dashboard/my-profile'}];
    if(user?.accountType==="Customer"){
        sideTabs.push({name:"Orders",to:'/dashboard/orders'});
        sideTabs.push({name:"Cart",to:'/dashboard/cart'});
        sideTabs.push({name:"Favourites",to:'/dashboard/favourites'});
        sideTabs.push({name:"Settings",to:'/dashboard/settings'});
    }
    else if(user?.accountType==="Owner"){
        sideTabs.push({name:"Add Canteen",to:'/dashboard/add_canteeno'});
        sideTabs.push({name:"View Canteen",to:'/dashboard/view_canteen'});
        sideTabs.push({name:"Edit Canteen",to:'/dashboard/edit_canteen'});
    }
    const handleSideTabClick = (index)=>{
        localStorage.setItem("prevTab",JSON.stringify(currTab));
        dispatch(setPrevTab(currTab));
        localStorage.setItem("currTab",JSON.stringify(index));
        dispatch(setCurrTab(index));
    }

    return (
        <div className="fixed w-full z-10 flex bg-gradient-to-r from-black to-[#222831] text-white pt-10 pb-4">
            <h1 className="ml-[10%]">Hostel Eats</h1>
            <div className="ml-[25%] space-x-7 flex">
                {tabs.map(tab => <Tab><NavLink to={tab.to} className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>{tab.name}</NavLink></Tab>)}
            </div>
            {!user && <div className="ml-[25%] space-x-4">
                <NavLink to='/login' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>}  
            {user && <><div className="group absolute right-24 top-7 flex justify-center items-center space-x-1 cursor-pointer transition-transform ease-out" onClick={handleUserIconClick}
            onMouseEnter={()=>{setShowDropDownMenu(true)}} onMouseLeave={()=>{setShowDropDownMenu(false)}}>
                <FaUserCircle  size={40}/>   
                <AnimatePresence>
                    {showDropDownMenu && <>
                    <div className="absolute top-10 bg-transparent h-7 w-[10rem] z-10"></div>
                        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}
                        className="absolute z-10 top-16 bg-[#EEEEEE]  text-black w-[10rem] flex flex-col items-center space-y-2 px-2 rounded-md" onClick={(e)=>{e.stopPropagation()}}>
                            <div className="bg-[#EEEEEE] w-4 h-4 rotate-45 absolute -top-2"></div>
                            {sideTabs.map((tab,index) => <NavLink to={tab.to} onClick={()=>{handleSideTabClick(index)}}>{tab.name}</NavLink>)}
                            <button onClick={handleLogOut} className="pb-2">log out</button>
                        </motion.div>
                    </>}
                </AnimatePresence> 
                <div className="absolute -right-6"><IoMdArrowDropdown size={20} className="group-hover:rotate-180 transition-transform ease-out duration-300"/></div>
            </div></>}
        </div>
    )
}

export default Header;
