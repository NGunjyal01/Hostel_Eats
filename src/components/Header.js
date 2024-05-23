import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="absolute w-full z-50 flex bg-gradient-to-r from-black to-[#222831] text-white pt-10">
            <h1 className="ml-[10%]">Hostel Eats</h1>
            <div className="ml-[25%] space-x-7">
                <NavLink to='/' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>Home</NavLink>
                <NavLink to='/about-us' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>About Us</NavLink>
                <NavLink to='/add-canteen' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>Add Canteen</NavLink>
            </div>
            <div className="ml-[25%] space-x-7">
                <NavLink to='/login' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
                <NavLink to='/signup' className={({isActive}) => `hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
            </div>
        </div>
    )
}

export default Header;
