import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { allCategories } from "../../../utils/constants";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { editItem } from "../../../services/ownerAPI";


const EditForm = ({btnState,setBtnState,showEditForm,setShowEditForm,editItemDetails}) => {

    const [image,setImage] = useState(null);
    const[editImage,setEditImage] = useState(null);
    const { register: registerEditForm, handleSubmit: handleSubmitEditForm, reset: resetEditForm, formState: { errors: errorsEditForm },setValue: setEditValue } = useForm();
    const inputStyle = "bg-[#31363F] w-[95%] sm:w-[80%] px-2 py-2 rounded-md mt-2";
    const dispatch = useDispatch();

    useEffect(()=>{
        if(editItemDetails){
            resetEditForm(editItemDetails);
            setImage(editItemDetails.imageUrl);
        }
    },[editItemDetails]);

    const handleEditCancel = () =>{
        setShowEditForm(false);
        setBtnState({...btnState,editItem:false});
    }

    const handleEditImageChange = (e)=>{
        setEditImage(e.target.files[0]);
    }

    const handleEditSubmit = async (data) =>{
        const newData = Object.keys(data).map(key => data[key]);
        const oldData = Object.keys(editItemDetails).map(key => editItemDetails[key]);
        const check = JSON.stringify(newData)===JSON.stringify(oldData);
        if(check && !editImage){
            return toast.error("No Changes Made");
        }
        else{
            const formData = new FormData();
            formData.append("itemid", data._id);
            formData.append("shopid", data.shopid);
            formData.append("name", data.name);
            formData.append("category", data.category);
            formData.append("price", data.price);
            formData.append("description", data.description);
            if (editImage) {
                formData.append("imageFile", editImage);
            }
            const result = await editItem(formData,dispatch);
            if(result){
                setBtnState({...btnState,editItem:false});
                setShowEditForm(false);
            }
        }
    }

    return (
        <form onSubmit={handleSubmitEditForm(handleEditSubmit)} className="grid grid-cols-12 mt-5 md:mt-10 text-sm lg:text-base">
            {/* button section */}
            {!btnState.editCanteen && btnState.editItem && !btnState.addItem && showEditForm && <div className="absolute flex right-2 sm:right-5 lg:right-10 top-6 sm:top-8 gap-2 sm:gap-5 text-xs sm:text-sm lg:text-base">
                <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" onClick={handleEditCancel}>Cancel</button>
                <button className="bg-[#76ABAE] w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" type="submit">Save</button>
            </div>}
            <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Enter Item Name" className={`${inputStyle}`}
                {...registerEditForm('name',{required:{value:true,message:"Please Enter Item Name"}})}/>
                {errorsEditForm.name && <p className="mt-1 text-xs text-red-500">{errorsEditForm.name.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                <label htmlFor="category">Category</label>
                <select id="category" name="category" className={`${inputStyle}`} {...registerEditForm('category',{required:{value:true,message:"Please Enter Category"}})} >
                <option value="" selected disabled hidden>Choose here</option>  
                    {allCategories.map(category => <option key={category} value={category}>
                        {category}
                    </option>)}
                </select>
                {errorsEditForm.category && <p className="mt-1 text-xs text-red-500">{errorsEditForm.category.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                <label htmlFor="price">Price</label>
                <input type="text" name="price" id="price" placeholder="Enter Item Price" className={`${inputStyle}`}
                {...registerEditForm('price',{required:{value:true,message:"Please Enter Item Price"}})}/>
                {errorsEditForm.price && <p className="mt-1 text-xs text-red-500">{errorsEditForm.price.message}</p>}
            </div>
            <div className="col-span-full sm:col-span-6 flex flex-col mt-5 sm:mt-8">
                <label htmlFor="description">Description</label>
                <input type="text" name="description" id="description" placeholder="Enter Item Description" className={`${inputStyle}`}
                {...registerEditForm('description',{required:{value:true,message:"Please Enter Item Description"}})}/>
                {errorsEditForm.description && <p className="mt-1 text-xs text-red-500">{errorsEditForm.description.message}</p>}
            </div>
            <div className="col-span-12 flex flex-col items-center mt-5 sm:mt-8 -ml-10">
                <label htmlFor="imageFile" className="">Image</label>
                {<img src={!editImage ? image : URL.createObjectURL(editImage)} className="size-40 object-contain"/>}
                <input type="file" name="imageFile" id="imageFile" className="bg-[#31363F] w-[70%] sm:w-[50%] px-2 py-2 rounded-md mt-2"
                onChange={handleEditImageChange}
                accept="image/png, image/gif, image/jpeg"/>
            </div>
        </form>
    )
}

export default EditForm;
