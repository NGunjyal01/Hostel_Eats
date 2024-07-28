import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createCanteen } from "../../services/ownerAPI";
import { useNavigate } from "react-router-dom";


const Add_CanteenO = () => {

  const user = useSelector(store => store.user);
  const {firstName,lastName,email,phone,token} = user;
  const ownerName = firstName + " " + lastName;
  const {register,handleSubmit,formState:{errors}} = useForm();
  const inputStyle = "bg-[#31363F] w-[95%] md:w-[90%] lg:w-[80%] px-2 py-2 rounded-md mt-2";
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = (data) => {
    const formData = {...data,ownerName:ownerName,ownerEmail:email,ownerContact:phone};
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',  // Set the Content-Type to multipart/form-data
        'Authorization': `Bearer ${token}`   // Set the Authorization header with the token
      }
    };
    createCanteen(formData,navigate,dispatch);
  };

  return (
    <form className="bg-[#222831] w-[80%] lg:w-[70%] h-fit ml-[10%] lg:ml-[15%] px-4 md:px-5 lg:px-10 py-4 sm:py-5 md:py-7 lg:py-10 mt-7 sm:mt-10 rounded-md sm:rounded-lg md:rounded-xl relative" onSubmit={handleSubmit(handleOnSubmit)}>
      <h1 className="absolute -mt-[22%] sm:-mt-[18%] md:-mt-[16%] lg:-mt-[14%] xl:-mt-[12%] -ml-3 md:-ml-4 lg:-ml-9 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Add Canteen</h1>
      <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">Canteen Information</h1>
      <div className="grid grid-cols-12 text-sm lg:text-base">
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <label htmlFor="canteenName">Canteen Name</label>
          <input type="text" name="canteenName" id="canteenName" placeholder="Enter Canteen Name" className={`${inputStyle}`}
          {...register("canteenName",{required:{value:true,message:"Please Enter your Canteen Name"}})}/>
          {errors.canteenName && <p className="mt-1 text-xs text-red-500">{errors.canteenName.message}</p>}
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8 relative">
          <label htmlFor="canteenContact">Canteen Contact Number</label>
          <input type="text" name="canteenContact" id="canteenContact" placeholder="Enter Contact Number" className={`${inputStyle} pl-11`}
          {...register("canteenContact",{required:{value:true,message:"Please Enter your Contact Number"},
          minLength:{value:10,message:"Invalid Contact Number"},maxLength:{value:10,message:"Invalid Contact Number"}})}/>
          <span className="absolute pt-4 left-2">+91</span>
          {errors.canteenContact && <p className="mt-1 text-xs text-red-500">{errors.canteenContact.message}</p>}
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8 flex flex-col">
          <label htmlFor="address">Canteen Address</label>
          <input type="text" name="address" id="address" placeholder="Enter Canteen Address" className={`${inputStyle}`}
          {...register("address",{required:{value:true,message:"Please Enter your Canteen Address"}})}/>
          {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address.message}</p>}
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <h1>Owner Name</h1>
          <h1 className={`${inputStyle}`}>{ownerName}</h1>
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <h1>Owner Contact Number</h1>
          <h1 className={`${inputStyle}`}> +91 {phone}</h1>
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8 flex flex-col">
          <h1>Owner Email</h1>
          <h1 className={`${inputStyle}`}>{email}</h1>
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <label htmlFor="openingTime">Opening Time</label>
          <input type="time" name="openingTime" id="openingTime" placeholder="Enter Opening Time" className={`${inputStyle}`}
          {...register("openingTime",{required:{value:true,message:"Please Enter Opening Time"}})}/>
          {errors.openingTime && <p className="mt-1 text-xs text-red-500">{errors.openingTime.message}</p>}
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <label htmlFor="closingTime">Closing Time</label>
          <input type="time" name="closingTime" id="closingTime" placeholder="Enter Closing Time" className={`${inputStyle}`}
          {...register("closingTime",{required:{value:true,message:"Please Enter Closing Time"}})}/>
          {errors.closingTime && <p className="mt-1 text-xs text-red-500">{errors.closingTime.message}</p>}
        </div>
        <div className="col-span-full md:col-span-6 mt-5 sm:mt-8">
          <label htmlFor="licenseNumber">License Number</label>
          <input type="text" name="licenseNumber" id="licenseNumber" placeholder="Enter License Number" className={`${inputStyle}`}
          {...register("licenseNumber",{required:{value:true,message:"Please Enter your License Number"},
          minLength:{value:14,message:"Invalid License Number"},maxLength:{value:14,message:"Invalid License Number"}})}/>
          {errors.licenseNumber && <p className="mt-1 text-xs text-red-500">{errors.licenseNumber.message}</p>}
        </div>
      </div>
      <button type="submit" className="bg-[#76ABAE] mt-10 w-[95%] md:w-[50%] py-2 rounded-lg md:translate-x-1/2 text-sm sm:text-base">Next</button>
    </form>
  );
}

export default Add_CanteenO