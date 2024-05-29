import { useSelector } from "react-redux";
import userIcon from "../../user-icon.jpg";

const MyProfile = () => {

    const user = useSelector(store => store.user);
    const {firstName,lastName,email,phone} = user;

    return (
        <div className="flex flex-col items-center">
            <h1 className="-translate-x-[24rem] text-3xl font-semibold origin-left">Profile</h1>
            <div className="bg-[#31363F] w-[70%] h-fit p-10 mt-10 rounded-xl flex items-center space-x-20 relative">
                <img src={userIcon} className="size-20 rounded-full"/>
                <div className="space-y-2">
                    <h1 className="text-xl">{firstName + " " + lastName}</h1>
                    <h1 className="">{email}</h1>
                </div>
                <button className="absolute right-10">
                    edit
                </button>
            </div>
            <div className="bg-[#31363F] w-[70%] h-fit p-10 mt-14 rounded-xl relative">
                <h1 className="text-2xl">Personal Details</h1>
                <div className="flex space-x-80 mt-7">
                    <div className="space-y-1">
                        <h1>First Name</h1>
                        <h1>{firstName}</h1>
                        <h1 className="pt-10">Email</h1>
                        <h1>{email}</h1>
                    </div>
                    <div className="space-y-1">
                        <h1>Last Name</h1>
                        <h1>{lastName}</h1>
                        <h1 className="pt-10">Phone Number</h1>
                        <h1>{phone}</h1>
                    </div>
                </div>
                <button className="absolute top-10 right-10">edit</button>
            </div>
        </div>
    )
}

export default MyProfile
