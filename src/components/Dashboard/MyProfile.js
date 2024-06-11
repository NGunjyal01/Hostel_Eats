import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {

    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const {firstName,lastName,email,phone,dob,gender} = user;
    const inputInfo = [{name:"firstName",value:firstName,label:"First Name"},
        {name:"lastName",value:lastName,label:"Last Name"},
        {name:"email",value:email,label:"Email Address"},
        {name:"phone",value:phone,label:"Phone Number"},
        {name:"dob",value:dob,label:"Date of Birth"},
        {name:"gender",value:gender,label:"Gender"}];
    const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";

    return (
        <div className="flex flex-col items-center mb-28">
            <h1 className="-translate-x-[25rem] text-3xl font-semibold">Profile</h1>
            <div className="bg-[#222831] w-[70%] h-fit p-10 mt-10 rounded-xl flex items-center space-x-20 relative">
                <img src={user.imageUrl} className="size-20 rounded-full"/>
                <div className="space-y-2">
                    <h1 className="text-xl">{firstName + " " + lastName}</h1>
                    <h1 className="">{email}</h1>
                </div>
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2 absolute right-10" onClick={()=>navigate('/dashboard/settings/')}>
                    Edit
                </button>
            </div>
            <div className="bg-[#222831] w-[70%] h-fit p-10 mt-14 rounded-xl relative">
                <h1 className="text-2xl">Personal Details</h1>
                <div className="grid grid-cols-2 mt-5">
                    {inputInfo.map(info => <div key={info.name} className="flex flex-col mt-8 col-span-1">
                        <label htmlFor={info.name}>{info.label}</label>
                        <input value={info.value} disabled={true} className={`${inputStyle}`}/>
                    </div>)}
                </div>
                <button className="bg-[#76ABAE] w-32 rounded-lg py-2 absolute right-10 top-8" onClick={()=>navigate('/dashboard/settings/?scrollToMenu=true',{state:{scrollTo:"Information"}})}>
                    Edit
                </button>
            </div>
        </div>
    )
}

export default MyProfile
