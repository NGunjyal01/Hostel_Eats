import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartItems } from "../../services/customerAPI";

const MyProfile = () => {

    const user = useSelector(store => store.user);
    const cart = useSelector(store => store.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(user?.accountType==="Customer"){
            getCartItems(dispatch);
        }
    },[])

    const {firstName,lastName,email,phone,dob,gender} = user;
    const inputInfo = [{name:"firstName",value:firstName,label:"First Name"},
        {name:"lastName",value:lastName,label:"Last Name"},
        {name:"email",value:email,label:"Email Address"},
        {name:"phone",value:phone,label:"Phone Number"},
        {name:"dob",value:dob,label:"Date of Birth"},
        {name:"gender",value:gender,label:"Gender"}];
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[80%] px-2 py-2 rounded-md mt-2";

    return (
        <div className="flex flex-col items-center mb-28">
            <div className="bg-[#222831] w-[80%] lg:w-[70%] h-fit px-3 sm:px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-10 rounded-md sm:rounded-lg md:rounded-xl flex items-center gap-4 sm:gap-7 md:gap-10 lg:gap-14 xl:gap-20 relative">
                <h1 className="absolute -mt-[57%] sm:-mt-[49%] md:-mt-[40%] lg:-mt-[35%] xl:-mt-[30%] -ml-2 sm:-ml-3 md:-ml-5 lg:-ml-10 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Profile</h1>
                <img src={user.imageUrl} className="size-12 sm:size-16 md:size-20 rounded-lg"/>
                <div className="md:space-y-2 sm:text-sm md:text-base ">
                    <h1 className="sm:text-lg md:text-xl">{firstName + " " + lastName}</h1>
                    <h1>{email}</h1>
                </div>
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 absolute right-3 sm:right-5 lg:right-10 text-xs sm:text-base" onClick={()=>navigate('/dashboard/settings/')}>
                    Edit
                </button>
            </div>
            <div className="bg-[#222831] w-[80%] lg:w-[70%] h-fit pb-12 px-4 md:px-5 lg:px-10 py-5 sm:py-7 lg:py-10 mt-14 rounded-md sm:rounded-lg md:rounded-xl relative">
                <h1 className=" md:text-xl lg:text-2xl">Personal Details</h1>
                <div className="grid sm:grid-cols-2 md:mt-5 sm:text-sm md:text-base">
                    {inputInfo.map(info => <div key={info.name} className="flex flex-col mt-8 col-span-1">
                        <label htmlFor={info.name}>{info.label}</label>
                        <input value={info.value} disabled={true} className={`${inputStyle}`}/>
                    </div>)}
                </div>
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 absolute right-3 sm:right-5 lg:right-10 top-5 sm:top-6 md:top-8 text-xs sm:text-base" onClick={()=>navigate('/dashboard/settings/?scrollToMenu=true',{state:{scrollTo:"Information"}})}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default MyProfile
