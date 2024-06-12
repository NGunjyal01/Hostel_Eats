import { useLocation } from "react-router-dom";
import UpdatePersonalInformation from "./UpdatePersonalInformation";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useEffect } from "react";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";



const Settings = () => {

    const location = useLocation();

    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        if (params.get('scrollToMenu') === 'true') {
            const scrollTo = document.getElementById(location.state.scrollTo);
            scrollTo.scrollIntoView({ behavior: 'smooth' });
        }
    },[location])

    return (
        <div className="flex flex-col items-center relative">
            <h1 className="-translate-x-[23rem] text-3xl font-semibold">Edit Profile</h1>
            <UpdateProfilePicture/>
            <div id="Information" className="w-full"><UpdatePersonalInformation/></div>
            <UpdateEmail/>
            <UpdatePassword/>
        </div>
    )
}

export default Settings
