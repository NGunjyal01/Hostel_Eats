import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { IoBag } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { setCurrTab,setPrevTab } from "../slices/tabSlice";
import { IoRestaurantSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import ConfirmationalModal from "../components/common/ConfirmationalModal";
import { logout } from "../services/authAPI";

const Dashboard = () => {

    const user = useSelector(store => store.user);
    const [confirmationalModal,setConfirmationalModal] = useState(null);
    const { prevTab,currTab } = useSelector(store => store.tabInfo);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const linkVariants = {
        hidden: { opacity: 0, y: (currTab-prevTab>=0)?-20:20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: (currTab-prevTab>=0)?20:-20 },
    }; 

    const sideTabs =[{name:"Profile",icon:<FaUserCircle className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/my-profile'}];
    if(user.accountType==="Customer"){
        sideTabs.push({name:"Orders",icon:<IoBag className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/orders'});
        sideTabs.push({name:"Cart",icon:<FaCartShopping className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/cart'});
        sideTabs.push({name:"Favourites",icon:<FaHeart className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/favourites'});
    }
    else if(user.accountType==="Owner"){
        sideTabs.push({name:"Add Canteen",icon:<IoRestaurantSharp className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/Add_CanteenO'});
        sideTabs.push({name:"View Canteen",icon:<FaEye className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/View_Canteen'});
    }
    sideTabs.push({name:"Settings",icon:<IoSettingsSharp className="dashboardLogo mx-4 relative z-10"/>,to:'/dashboard/settings'});
    const handleSideTabClick = (index)=>{
        localStorage.setItem("prevTab",JSON.stringify(currTab));
        dispatch(setPrevTab(currTab));
        localStorage.setItem("currTab",JSON.stringify(index));
        dispatch(setCurrTab(index));
    }
    const handleLogOut = () =>{
        setConfirmationalModal({text1:"Are You Sure ?",text2:"You will be logged out.",btn1Text:"Logout",btn2Text:"Cancel",
            btn1Handler: () => {logout(navigate,dispatch); setConfirmationalModal(null)},
            btn2Handler: () => setConfirmationalModal(null)
        })
    };

    return (
        <div className="relative flex w-full min-h-screen bg-gradient-to-r from-black to-[#222831] text-white pb-20">
            <div className="hidden sm:flex flex-col space-y-5 sm:pt-[25%] md:pt-[20%] lg:pt-[17%] xl:pt-[12%] pl-10 sm:w-[35%] md:w-[27%] lg:w-[22%] xl:w-[17%] min-h-screen">
                {/* Content for the left section */}
                {sideTabs.map((tab,index)=> <motion.div className="relative" key={tab.name} initial="hidden" animate="visible" exit="exit" variants={linkVariants} onClick={()=>{handleSideTabClick(index)}}>
                    <NavLink to={tab.to} className={({isActive})=>`flex items-center hover:scale-105 transition-transform ease-out sm:text-sm lg:text-base
                    py-3 ${isActive?'text-black':''}`}>
                        {({isActive})=><>
                        {isActive && <motion.div initial="hidden" animate="visible" exit="exit" variants={linkVariants} className="absolute inset-0 bg-[#76ABAE] rounded-lg z-0 transot" transition={{ duration: 0.1 }}/>}
                        {tab.icon}<span className="relative z-10">{tab.name}</span>
                        </>}
                    </NavLink>
                </motion.div>)}
                <button className="flex items-center hover:scale-105 transition-transform ease-out py-3" onClick={handleLogOut}>
                   <IoIosLogOut className="dashboardLogo mx-4"/> <span>Logout</span>
                </button>
            </div>
            <div className="min-h-screen pt-[40%] sm:pt-[20%] md:pt-[17%] lg:pt-[13%] xl:pt-[10%] w-full">
                {/* Content for the right section */}
                <Outlet/>
            </div>
            {confirmationalModal && <ConfirmationalModal modalData={confirmationalModal}/>}
        </div>
    )
}

export default Dashboard
