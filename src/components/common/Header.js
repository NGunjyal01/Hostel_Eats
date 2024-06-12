import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { logout } from "../../services/authAPI";
import { AnimatePresence, motion } from "framer-motion";
import Tab from "./Tab";
import { setCurrTab, setPrevTab } from "../../slices/tabSlice";
import ConfirmationalModal from "./ConfirmationalModal";
import { FaCartShopping } from "react-icons/fa6";

const Header = () => {

    const user = useSelector(store => store.user);
    const [confirmationalModal,setConfirmationalModal] = useState(null);
    const {currTab} = useSelector(store => store.tabInfo);
    const [showDropDownMenu,setShowDropDownMenu] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let tabs = [{name:'Home',to:'/'},{name:'About Us',to:'/about-us'},{name:'Explore',to:'/explore'},{name:'Add Canteen',to:'/add-canteen'}]
    const handleUserIconClick = ()=>{
        navigate('/dashboard/my-profile');
    }
    const handleLogOut = () =>{
        setConfirmationalModal({text1:"Are You Sure ?",text2:"You will be logged out.",btn1Text:"Logout",btn2Text:"Cancel",
            btn1Handler: () => {logout(navigate,dispatch); setConfirmationalModal(null)},
            btn2Handler: () => setConfirmationalModal(null)
        })
    };
    const sideTabs = [{name:'Profile',to:'/dashboard/my-profile'}];
    if(user?.accountType==="Customer"){
        sideTabs.push({name:"Orders",to:'/dashboard/orders'});
        sideTabs.push({name:"Cart",to:'/dashboard/cart'});
        sideTabs.push({name:"Favourites",to:'/dashboard/favourites'});
        tabs = tabs.filter(tab => tab.name!=="Add Canteen");
    }
    else if(user?.accountType==="Owner"){
        sideTabs.push({name:"Add Canteen",to:'/dashboard/add_canteeno'});
        sideTabs.push({name:"View Canteen",to:'/dashboard/view_canteen'});
        tabs = tabs.filter(tab => tab.name!=="Explore");
    }
    sideTabs.push({name:"Settings",to:'/dashboard/settings'});
    const handleSideTabClick = (index)=>{
        localStorage.setItem("prevTab",JSON.stringify(currTab));
        dispatch(setPrevTab(currTab));
        localStorage.setItem("currTab",JSON.stringify(index));
        dispatch(setCurrTab(index));
    }

    return (
        <div className="fixed w-full z-40 flex bg-gradient-to-r from-black to-[#222831] text-white pt-10 pb-4">
            <h1 className="ml-[10%]">Hostel Eats</h1>
            <div className={`gap-7 flex ${user ? 'ml-[28%]':'ml-[24%]'}`}>
                {tabs.map(tab => <span key={tab.name}><Tab><NavLink to={tab.to} className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>{tab.name}</NavLink></Tab></span>)}
            </div>
            {!user && <div className="absolute flex gap-4 right-24 -mt-2">
                <NavLink to='/login' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>}  
            {user && <><div className="group absolute right-[12%] top-9 flex justify-center items-center gap-1 cursor-pointer transition-transform ease-out" onClick={handleUserIconClick}
            onMouseEnter={()=>{setShowDropDownMenu(true)}} onMouseLeave={()=>{setShowDropDownMenu(false)}}>
                <img src={user.imageUrl} className="size-10 rounded-md"/>  
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
                <div className="absolute -right-6"><IoMdArrowDropdown size={20} className="group-hover:rotate-180 transition-transform ease-out duration-200"/></div>
            </div></>}
            {user?.accountType==="Customer" && <span className="absolute -mt-1 right-[7%] cursor-pointer" onClick={()=>{navigate('/dashboard/cart')}}><FaCartShopping size={40}/><span className="absolute text-black top-0 left-[1.1rem] font-semibold">0</span></span>}
            {confirmationalModal && <ConfirmationalModal modalData={confirmationalModal}/>}
        </div>
    )
}

export default Header;
