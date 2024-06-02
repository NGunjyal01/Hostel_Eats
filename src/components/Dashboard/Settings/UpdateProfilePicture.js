import { useSelector } from "react-redux"


const UpdateProfilePicture = () => {

    const user = useSelector(store => store.user);

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 mt-10 rounded-xl flex items-center space-x-20 relative">
            <img src={user.imageUrl} className="size-24 rounded-md"/>
            <div className="space-y-7">
                <h1 className="text-">Update Profile Picture</h1>
                <div className="flex space-x-5">
                    <button className="bg-white text-black w-32 py-2 rounded-lg">Select</button>
                    <button className="bg-[#76ABAE] w-32 py-2 rounded-lg">Upload</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfilePicture
