import UpdatePassword from "./UpdatePassword"
import UpdatePersonalInformation from "./UpdatePersonalInformation"
import UpdateProfilePicture from "./UpdateProfilePicture"



const Settings = () => {

    return (
        <div className="flex flex-col items-center relative">
            <h1 className="-translate-x-[23rem] text-3xl font-semibold">Edit Profile</h1>
            <UpdateProfilePicture/>
            <UpdatePersonalInformation/>
            <UpdatePassword/>
        </div>
    )
}

export default Settings
