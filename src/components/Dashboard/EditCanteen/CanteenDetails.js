import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";


const CanteenDetails = ({editState,setEditState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const {register,handleSubmit,formState:{errors},reset} = useForm();
    
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

    const handleOnSubmit = (data)=>{
        const newData = Object.keys(data).map(key => data[key]);
        const oldData = Object.keys(canteenDetails).map(key => canteenDetails[key]);
        console.log(JSON.stringify(newData)===JSON.stringify(oldData))
    }
    const handleEdit = ()=>{
        setEditState({...editState,canteenDetails:true});
    }
    const handleCancel = ()=>{
        setEditState({...editState,canteenDetails:false});
        reset(canteenDetails);
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 mt-10 rounded-xl relative">
            <h1 className="text-xl font-semibold">Canteen Details</h1>
            <form className="grid grid-cols-12 mt-5" onSubmit={handleSubmit(handleOnSubmit)}>
                {formInfo.map(info => <div key={info.name} className="col-span-6 mt-8">
                    <label htmlFor={info.name}>{info.label}</label>
                    <input type={info.type} name={info.name} id={info.name} className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2" placeholder={info.placeholder}
                    {...register(info.name,{
                        required:{value:true,message:info.message},
                        ...(info.name==="canteenContact"?{minLength:info.condition}:{}),
                        ...(info.name==="canteenContact"?{maxLength:info.condition}:{})
                    })} defaultValue={canteenDetails[info.name]}
                    disabled={checkInfo.includes(info.name)?true:!editState.canteenDetails}/>
                    {errors[info.name] && <p className="mt-1 text-xs text-red-500">{errors[info.name].message}</p>}
                </div>)}
                {editState.canteenDetails ? <div className="absolute space-x-5 right-10 top-10">
                    <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleCancel}>Cancel</button>
                    <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                </div> 
                :<></> }
                {!editState.menuItem && !editState.canteenDetails && <button className="bg-[#76ABAE] w-32 rounded-lg py-2 absolute right-10 top-10" onClick={handleEdit}>Edit</button>}
            </form>        
        </div>
    )
}

export default CanteenDetails
