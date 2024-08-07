import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoMdArrowDropdown } from "react-icons/io";
import { useEffect, useState } from "react";
import { logout } from "../../services/authAPI";
import { AnimatePresence, motion } from "framer-motion";
import Tab from "./Tab";
import { setCurrTab, setPrevTab } from "../../slices/tabSlice";
import ConfirmationalModal from "./ConfirmationalModal";
import { FaCartShopping } from "react-icons/fa6";
import { MdNotifications, MdNotificationsActive } from "react-icons/md";
import AnimatedHamburgerButton from "./AnimatedHamburgerButton";
import UserIcon from "./UserIcon";
import { io } from "socket.io-client";
import { addOrder, setOrderStatus } from "../../slices/orderHistorySlice";
import { getLiveOrders } from "../../services/ownerAPI";
import { formatDate } from "../../utils/formatDate";
import { formatTime } from "../../utils/formatTime";
import { addLiveOrder } from "../../slices/notificationSlice";
import { setPagination } from "../../slices/paginationSlice";

const BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;
const socket = io.connect(BASE_URL);

const Header = () => {

    const user = useSelector(store => store.user);
    const cart = useSelector(store => store.cart);
    const orderHistory = useSelector(store => store.orderHistory);
    const liveOrders = useSelector(store => store.liveOrders);
    const [confirmationalModal,setConfirmationalModal] = useState(null);
    const {currTab} = useSelector(store => store.tabInfo);
    const paginationData = useSelector(store => store.pagination);
    const { allItems,itemsPerPage,currentPageNo } = paginationData;
    const [showDropDownMenu,setShowDropDownMenu] = useState(false);
    const [showNotification,setShowNotification] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let tabs = [{name:'Home',to:'/'},{name:'About Us',to:'/about-us'},{name:'Explore',to:'/explore'}
    ,{name:'Add Canteen',to:'/add-canteen'}]
    
    useEffect(()=>{
        if(user){
            if(user.accountType==='Owner'){
                getLiveOrders(dispatch);
            }
            socket.emit('joinRoom',user._id);
            const handleNewOrder = (order)=>{
                //for owner
                dispatch(addOrder(order));
                dispatch(addLiveOrder(order));
                // console.log([order,...orderHistory]);
                const paginationData = {allItems:[order,...orderHistory], currentItems:[order,...orderHistory].slice(0,10), 
                itemsPerPage: 10, currentPageNo: 1, scrollTo: 'orderHistory'};
                dispatch(setPagination(paginationData));
                localStorage.setItem('pagination',JSON.stringify(paginationData));
            }
            const handleOrderStatusUpdate = (orderStatus)=>{
                //for user
                console.log('sokect customer status==============================',orderStatus)
                dispatch(setOrderStatus(orderStatus));
                const updatedOrderHistory = orderHistory.map((order) => order._id===orderStatus.orderid ? {...order,status:orderStatus.status}: order);
                console.log(updatedOrderHistory);
                const totalItems = allItems.length;
                const totalPages = Math.ceil(totalItems/itemsPerPage);
                const start = currentPageNo*itemsPerPage - itemsPerPage;
                const end = currentPageNo===totalPages ? totalItems : currentPageNo*itemsPerPage;
                const paginationData = {allItems:updatedOrderHistory, currentItems:updatedOrderHistory.slice(start,end), 
                itemsPerPage: 10, currentPageNo: currentPageNo, scrollTo: 'orderHistory'};
                dispatch(setPagination(paginationData));
            }
            socket.on("newOrder", handleNewOrder);
            socket.on("orderStatusUpdate", handleOrderStatusUpdate);
            return ()=>{
                socket.off("newOrder", handleNewOrder);
                socket.off("orderStatusUpdate", handleOrderStatusUpdate);
            }
        }
    },[user,orderHistory]);
    
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
    const handleToggleNotification = ()=>{
        setShowNotification(!showNotification);
    }

    return (
        <div className="fixed w-full z-40 flex bg-gradient-to-r from-black to-[#222831] text-white pt-10 pb-4">
            <h1 className={`${user?'ml-[34%]':'ml-[38%]'} sm:ml-[8%] md:ml-[10%] text-xl sm:text-xl lg:text-3xl`} onClick={()=>navigate('/')}>Hostel Eats</h1>
            <div className={`hidden sm:flex  sm:gap-4 lg:gap-7 sm:text-sm lg:text-base mt-1 ${user ? "sm:ml-[18%] md:ml-[20%] lg:ml-[22%] xl:ml-[24%]":'sm:ml-[10%] md:ml-[14%] lg:ml-[18%]'}`}>
                {tabs.map(tab => <span key={tab.name}><Tab><NavLink to={tab.to} className={({isActive}) => ` ${isActive?"text-[#76ABAE]":""}`}>{tab.name}</NavLink></Tab></span>)}
            </div>
            {!user && <div className="hidden absolute sm:flex sm:gap-2 lg:gap-4 sm:right-4 lg:right-6 xl:right-20 sm:-mt-1 lg:-mt-2 sm:text-sm lg:text-base">
                <NavLink to='/login' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `bg-[#31363F] rounded-lg px-4 py-2 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>}  
            {user && <><div className={`group hidden sm:flex justify-center items-center absolute top-9 cursor-pointer
            sm:right-[15%] md:right-[14%] lg:right-[13%] xl:right-[12%]`} 
            onClick={handleUserIconClick}
            onMouseEnter={()=>{setShowDropDownMenu(true)}} onMouseLeave={()=>{setShowDropDownMenu(false)}}>
                <img src={user.imageUrl} className="border-2 sm:size-8 lg:size-10 rounded-md"/>  
                <AnimatePresence>
                    {showDropDownMenu && <>
                    <div className="absolute top-10 bg-transparent h-7 w-[10rem] z-10"></div>
                        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}
                        className="absolute z-10 top-16 bg-gray-100  text-black w-[10rem] flex flex-col items-center rounded-md" onClick={(e)=>{e.stopPropagation()}}>
                            <div className="bg-gray-100 w-4 h-4 rotate-45 absolute -top-2"></div>
                            <div className="flex flex-col z-10 w-full">
                                {sideTabs.map((tab,index) => 
                                <NavLink key={tab.to} to={tab.to} onClick={()=>{handleSideTabClick(index)}} className={`py-1 hover:bg-gray-300 ${index===0 ?'hover:rounded-t-lg' :''}`}>
                                    <h1 className="px-12 whitespace-nowrap">{tab.name}</h1>
                                </NavLink>)}
                                <h1 onClick={handleLogOut} className="py-1 px-12 hover:bg-gray-300 hover:rounded-b-lg">Logout</h1>
                            </div>
                        </motion.div>
                    </>}
                </AnimatePresence> 
                <div className="absolute sm:-right-4 lg:-right-6"><IoMdArrowDropdown className="arrowLogo group-hover:rotate-180 transition-transform ease-out duration-200"/></div>
            </div></>}
            {user && user?.accountType==="Customer" && <span className="absolute sm:-mt-1 right-5 sm:right-[7%] cursor-pointer" onClick={()=>{navigate('/dashboard/cart')}}>
                <FaCartShopping className="cartLogo"/>
                <span className="absolute text-black top-0.5 md:top-1 lg:top-0 left-[0.8rem] sm:left-3.5 md:left-4 lg:left-[1.1rem] font-semibold text-xs lg:text-base">{!Object.keys(cart).length ? 0 : cart.totalQuantity}</span>
            </span>}
            {user && user?.accountType==="Owner" && <div className="absolute sm:-mt-1 right-5 sm:right-[7%] cursor-pointer" onClick={handleToggleNotification}>
                {liveOrders.length 
                ? <span>
                    <MdNotificationsActive className={`cartLogo ${showNotification?'':'animate-shake'}`}/>
                    <span className="text-black absolute top-2 left-[0.6rem] sm:left-2 md:left-2.5 lg:left-3 text-[0.65rem] sm:text-xs lg:text-sm font-semibold lg:font-bold">{liveOrders.length}</span>
                </span> 
                :<MdNotifications className="cartLogo"/>}
                <AnimatePresence>
                    {showNotification && <div className="fixed z-20 inset-0">
                        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}>
                            <div className="bg-gray-100 w-4 h-4 rotate-45 absolute top-[5.5rem] right-7 md:right-20 lg:right-[5.5rem] xl:right-[7.5rem]"></div>
                        </motion.div>
                        <motion.div initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:15}}
                        className="absolute z-10 right-3 md:right-10 lg:right-14 xl:right-20 top-24 bg-gray-100  text-black w-[85%] sm:w-[24rem] py-2 rounded-md h-96 overflow-y-visible overflow-scroll scrollbar-hide" onClick={(e)=>{e.stopPropagation()}}> 
                            <h1 className="text-lg font-bold mx-4">Notification</h1>
                            <div className="w-full h-[0.05rem] bg-black mt-2"/>
                            <div>
                                {liveOrders.length ? liveOrders.map((order) => {
                                    const date = order.createdAt ? formatDate(order.createdAt.split('T')[0]) : '';
                                    const time = order.createdAt ? formatTime(order.createdAt?.split('T')[1].split(':')[0]+":"+order.createdAt.split('T')[1].split(':')[1]) : '';

                                    return(
                                    <div key={order._id} className="py-5 px-4 grid grid-cols-3 hover:bg-gray-300" onClick={()=>{setShowNotification(false); navigate('/dashboard/canteen/'+order.shopid);}}>
                                        <div className="col-span-2">
                                            <p className="text-[.65rem] sm:text-xs break-words">{"ORDER#"+order._id}</p>
                                            <h1 className="sm:text-lg">{order.canteenName}</h1>
                                            <p className="text-xs">{date + ", "  + time}</p>
                                            <p className="text-xs sm:text-sm">{"status: " + order.status}</p>
                                            <h1></h1>
                                        </div>
                                        <img src={order.imageUrl} alt="image" className="col-span-1 w-full rounded-lg"/>
                                    </div>);
                                })
                                :<div>
                                    <h1 className="text-lg sm:text-xl font-semibold uppercase tracking-wider text-center mt-[40%] sm:mt-[30%]">No Live Orders</h1>    
                                </div>}
                            </div>
                        </motion.div>
                    </div>}
                </AnimatePresence> 
            </div>}
            {confirmationalModal && <ConfirmationalModal modalData={confirmationalModal}/>}
            <div className="sm:hidden flex absolute w-full">
                <AnimatedHamburgerButton />
                <UserIcon/>
            </div>
        </div>
    )
}

export default Header;