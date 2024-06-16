import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { allCategories } from "../../../utils/constants";
import { addItem } from "../../../services/ownerAPI";


const AddForm = ({btnState,setBtnState,shopid}) => {

    const [image,setImage] = useState(null);
    const { register: registerAddForm, handleSubmit: handleSubmitAddForm, reset: resetAddForm, formState: { errors: errorsAddForm } } = useForm();
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[80%] px-2 py-2 rounded-md mt-2";
    const dispatch = useDispatch();

    const handleAddCancel= ()=>{
        setBtnState({...btnState,addItem:false});
        resetAddForm();
        setImage(null);
    }
    const handleAddImageChange = (e)=>{
        setImage(e.target.files[0]);
    }

    const handleAddSubmit = async (data)=>{ 
        const formData = {...data,imageFile:image,shopid:shopid};
        const result = await addItem(formData,dispatch);
        if(result){
            setBtnState({...btnState,addItem:false});
            resetAddForm();
            setImage(null);
        }
    }

    return (
        <form onSubmit={handleSubmitAddForm(handleAddSubmit)} className="grid grid-cols-12 mt-5 md:mt-10 text-sm lg:text-base">
            {/* button section */}
            {!btnState.editCanteen && !btnState.editItem && btnState.addItem && <div className="absolute flex right-2 sm:right-5 lg:right-10 top-6 lg:top-8 gap-2 sm:gap-5 text-xs sm:text-sm lg:text-base">
                <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" onClick={handleAddCancel}>Cancel</button>
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" type="submit">Save</button>
            </div>}
            <div className="col-span-full sm:col-span-6 flex flex-col mt-8">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Item Name" className={`${inputStyle}`}
                {...registerAddForm('name',{required:{value:true,message:"Please Enter Item Name"}})}/>
                {errorsAddForm.name && <p className="mt-1 text-xs text-red-500">{errorsAddForm.name.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-8">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" className={`${inputStyle}`} {...registerAddForm('category',{required:{value:true,message:"Please Select Category"}})} >
                <option value="" selected disabled hidden>Choose here</option>  
                    {allCategories.map(category => <option key={category} value={category}>
                        {category}
                    </option>)}
                </select>
                {errorsAddForm.category && <p className="mt-1 text-xs text-red-500">{errorsAddForm.category.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-8">
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" placeholder="Enter Item Price" className={`${inputStyle}`}
                {...registerAddForm('price',{required:{value:true,message:"Please Enter Item Price"}})}/>
                {errorsAddForm.price && <p className="mt-1 text-xs text-red-500">{errorsAddForm.price.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-8">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" placeholder="Enter Item Description" className={`${inputStyle}`}
                {...registerAddForm('description',{required:{value:true,message:"Please Enter Item Description"}})}/>
                {errorsAddForm.description && <p className="mt-1 text-xs text-red-500">{errorsAddForm.description.message}</p>}
            </div>
            <div className="col-span-12 flex flex-col items-center mt-8 -ml-10">
                <label htmlFor="imageFile" className="">Image</label>
                {image && <img src={URL.createObjectURL(image)} className="size-40 object-contain"/>}
                <input type="file" name="imageFile" id="imageFile" className="bg-[#31363F] w-[70%] sm:w-[50%] px-2 py-2 rounded-md mt-2"
                {...registerAddForm('imageFile',{required:{value:true,message:"Please Enter Item Image"}})} onChange={handleAddImageChange}
                accept="image/png, image/gif, image/jpeg"/>
                {errorsAddForm.imageFile && <p className="mt-1 text-xs text-red-500">{errorsAddForm.imageFile.message}</p>}
            </div>
        </form>
    )
}

export default AddForm;
