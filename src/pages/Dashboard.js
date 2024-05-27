import { NavLink, Outlet } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";

const Dashboard = () => {
    return (
        <div className="relative flex w-full min-h-screen bg-gradient-to-r from-black to-[#222831] text-white">
            <div className="fixed pt-40 pl-10 w-[15%] min-h-screen flex flex-col space-y-5">
                {/* Content for the left section */}
                <NavLink to='/dashboard/my-profile' className={({isActive})=>`flex items-center
                ${isActive?'bg-[#76ABAE] text-black py-3 rounded-lg shadow-md shadow-[#76ABAE]':'py-3'}`}>
                    <FaUserCircle size={25} className="mx-4"/><span>Profile</span>
                </NavLink>
                <NavLink to='/dashboard/settings' className={({isActive})=>`flex items-center
                ${isActive?'bg-[#76ABAE] py-3 rounded-lg text-black shadow-md shadow-[#76ABAE]':'py-3'}`}>
                   <IoSettingsSharp size={25} className="mx-4"/> <span>Settings</span>
                </NavLink>
            </div>
            {/* <div className="min-h-screen h-fit w-[0.05rem] bg-white absolute left-[15%] rounded-lg"></div> */}
            <div className="pl-[20%] min-h-screen pt-40">
                {/* Content for the right section */}
                <Outlet/>
            </div>
        </div>
    )
}

export default Dashboard
