import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="grid grid-cols-12 bg-gradient-to-r from-black to-[#222831] text-white py-10">
            <h1 className="col-span-4 ml-20">Hostel Eats</h1>
            <NavLink to='/' className={({isActive}) => `col-span-1 hover:text-[#76ABAE] ${isActive?"text-[#76ABAE]":""}`}>Home</NavLink>
            <NavLink to='/about-us' className={({isActive}) => `col-span-1 ${isActive?"text-[#76ABAE]":""}`}>About Us</NavLink>
            <NavLink to='/add-canteen' className={({isActive}) => `col-span-4 ${isActive?"text-[#76ABAE]":""}`}>Add Canteen</NavLink>
            <NavLink to='login' className={({isActive}) => `col-span-1 ${isActive?"text-[#76ABAE]":""}`}>LogIn</NavLink>
            <NavLink to='/signup' className={({isActive}) => `col-span-1 ${isActive?"text-[#76ABAE]":""}`}>SignUp</NavLink>
        </div>
    )
}

export default Header;
