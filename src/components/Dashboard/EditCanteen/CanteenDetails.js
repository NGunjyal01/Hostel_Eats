import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editCanteenDetails } from "../../../services/ownerAPI";
import toast from "react-hot-toast";


const CanteenDetails = ({btnState,setBtnState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    const dispatch = useDispatch();
    
    useEffect(() => {
        reset(canteenDetails);
    }, [canteenDetails]);

    const formInfo = [{name:'canteenName',label:"Canteen Name",type:'text',placeholder:'Enter Canteen Name',message:"Please Enter Your Canteen Name"},
        {name:'canteenContact',label:"Canteen Contact",type:'text',placeholder:'Enter Canteen Contact',message:"Please Enter Your Canteen Contact",condition:{value:10,message:"Inavlid Contact Number"}},
        {name:'address',label:"Canteen Address",type:'text',placeholder:'Enter Canteen Address',message:"Please Enter Your Canteen Address"},
        {name:'ownerName',label:"Owner Name",type:'',placeholder:'',message:""},
        {name:'ownerEmail',label:"Owner Email",type:'',placeholder:'',message:""},
        {name:'ownerContact',label:"Owner Contact",type:'',placeholder:'',message:""},
        {name:'licenseNumber',label:"License Number",type:'',placeholder:'',message:""},
        {name:'openingTime',label:"Opening Time",type:'time',placeholder:'',message:"Please Enter Opening Time"},
        {name:'closingTime',label:"Closing Time",type:'time',placeholder:'',message:"Please Enter ClosingTime"},
    ];
    const checkInfo = ['ownerName','ownerContact','ownerEmail','licenseNumber'];
    const inputStyle = "bg-[#31363F] w-[95%] md:w-[90%] lg:w-[80%] px-2 py-2 rounded-md mt-2";

    const handleOnSubmit = async (data)=>{
        const newData = Object.keys(data).map(key => data[key]);
        const oldData = Object.keys(canteenDetails).map(key => canteenDetails[key]);
        const check = JSON.stringify(newData)===JSON.stringify(oldData);
        const formData = {shopid:data._id,canteenName:data.canteenName,canteenContact:data.canteenContact,Address:data.address,openingTime:data.openingTime,closingTime:data.closingTime};
        if(!check){
            const result = await editCanteenDetails(formData,dispatch);
            if(result)
            setBtnState({...btnState,editCanteen:false});
        }
        else{
            return toast.error("No Changes Made");
        }
    }
    const handleEdit = ()=>{
        setBtnState({...btnState,editCanteen:true});
    }
    const handleCancel = ()=>{
        setBtnState({...btnState,editCanteen:false});
        reset(canteenDetails);
    }

    return (
        <div className="bg-[#222831] w-[90%] sm:w-[80%] lg:w-[70%] h-fit pb-12 px-4 md:px-5 lg:px-10 py-5 sm:py-7 lg:py-10 mt-14 rounded-md sm:rounded-lg md:rounded-xl relative">
            <h1 className="absolute -mt-[22%] sm:-mt-[17%] md:-mt-[15%] lg:-mt-[17%] xl:-mt-[12%] -ml-4 sm:-ml-3 md:-ml-4 lg:-ml-9 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">Edit Canteen</h1>
            <h1 className="sm:text-lg lg:text-xl font-semibold">Canteen Details</h1>
            <form className="grid grid-cols-12 mt-5 mb-8 sm:mb-16 md:mb-0" onSubmit={handleSubmit(handleOnSubmit)}>
                {formInfo.map(info => <div key={info.name} className="col-span-full md:col-span-6 mt-5 sm:mt-8 text-sm lg:text-base">
                    <label htmlFor={info.name}>{info.label}</label>
                    <input type={info.type} name={info.name} id={info.name} className={`${inputStyle}`} placeholder={info.placeholder}
                    {...register(info.name,{
                        required:{value:true,message:info.message},
                        ...(info.name==="canteenContact"?{minLength:info.condition}:{}),
                        ...(info.name==="canteenContact"?{maxLength:info.condition}:{})
                    })} defaultValue={canteenDetails?.[info?.name]}
                    disabled={checkInfo.includes(info.name)?true:!btnState.editCanteen}/>
                    {errors[info.name] && <p className="mt-1 text-xs text-red-500">{errors[info.name].message}</p>}
                </div>)}
                {btnState.editCanteen ? <div className="absolute space-x-5 right-10 bottom-5 text-xs sm:text-base">
                    <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" onClick={handleCancel}>Cancel</button>
                    <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" type="submit">Save</button>
                </div> 
                :<></> }
                {!btnState.editItem && !btnState.addItem && !btnState.editCanteen && 
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2 absolute right-3 sm:right-5 lg:right-10 top-5 lg:top-8 text-xs sm:text-base" 
                onClick={handleEdit}>
                    Edit
                </button>}
            </form>        
        </div>
    )
}

export default CanteenDetails
