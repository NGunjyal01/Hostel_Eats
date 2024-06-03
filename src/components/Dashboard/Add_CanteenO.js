import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";


const Add_CanteenO = () => {

  const user = useSelector(store => store.user);
  const {firstName,lastName,email,phone,token} = user;
  const ownerName = firstName + " " + lastName;

  const {register,handleSubmit,formState:{errors}} = useForm();
  const inputStyle = "bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2";
  
  const handleOnSubmit = () => {

  };

  return (
    <div className="flex flex-col items-center ">
      <h1 className="text-3xl -translate-x-[22.5rem] font-semibold">Add Canteen</h1>
      <form className='bg-[#222831] p-10 w-[70%] rounded-md mt-10 relative' onSubmit={handleSubmit(handleOnSubmit)}>
        <h1 className="text-2xl font-semibold">Canteen Information</h1>
        <div className="grid grid-cols-12">
          <div className="col-span-6 mt-8">
            <label htmlFor="canteenName">Canteen Name</label>
            <input type="text" name="canteenName" id="canteenName" placeholder="Enter Canteen Name" className={`${inputStyle}`}
            {...register("canteenName",{required:{value:true,message:"Please Enter your Canteen Name"}})}/>
            {errors.canteenName && <p className="mt-1 text-xs text-red-500">{errors.canteenName.message}</p>}
          </div>
          <div className="col-span-6 mt-8 relative">
            <label htmlFor="canteenContactNumber">Canteen Contact Number</label>
            <input type="text" name="canteenContactNumber" id="canteenContactNumber" placeholder="Enter Contact Number" className={`${inputStyle} pl-11`}
            {...register("canteenContactNumber",{required:{value:true,message:"Please Enter your Contact Number"},
            minLength:{value:10,message:"Invalid Contact Number"},maxLength:{value:10,message:"Invalid Contact Number"}})}/>
            <span className="absolute pt-4 left-2">+91</span>
            {errors.canteenContactNumber && <p className="mt-1 text-xs text-red-500">{errors.canteenContactNumber.message}</p>}
          </div>
          <div className="col-span-6 mt-8 flex flex-col">
            <label htmlFor="canteenAddress">Canteen Address</label>
            <input type="text" name="canteenAddress" id="canteenAddress" placeholder="Enter Canteen Address" className={`${inputStyle}`}
            {...register("canteenAddress",{required:{value:true,message:"Please Enter your Canteen Address"}})}/>
            {errors.canteenAddress && <p className="mt-1 text-xs text-red-500">{errors.canteenAddress.message}</p>}
          </div>
          <div className="col-span-6 mt-8">
            <h1>Owner Name</h1>
            <h1 className={`${inputStyle}`}>{ownerName}</h1>
          </div>
          <div className="col-span-6 mt-8">
            <h1>Owner Contact Number</h1>
            <h1 className={`${inputStyle}`}> +91 {phone}</h1>
          </div>
          <div className="col-span-6 mt-8 flex flex-col">
            <h1>Owner Email</h1>
            <h1 className={`${inputStyle}`}>{email}</h1>
          </div>
          <div className="col-span-6 mt-8">
            <label htmlFor="licenseNumber">License Number</label>
            <input type="text" name="licenseNumber" id="licenseNumber" placeholder="Enter License Number" className={`${inputStyle}`}
            {...register("licenseNumber",{required:{value:true,message:"Please Enter your License Number"},
            minLength:{value:14,message:"Invalid License Number"},maxLength:{value:14,message:"Invalid License Number"}})}/>
            {errors.licenseNumber && <p className="mt-1 text-xs text-red-500">{errors.licenseNumber.message}</p>}
          </div>
        </div>
        <button type="submit" className="bg-[#76ABAE] mt-10 w-[50%] py-2 rounded-lg translate-x-1/2">Next</button>
      </form>
    </div>
  );
}

export default Add_CanteenO