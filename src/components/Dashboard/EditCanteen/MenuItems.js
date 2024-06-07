import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addItem } from "../../../services/ownerAPI";


const MenuItems = ({editState,setEditState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const menuItems = canteenDetails?.menuitems;
    const totalItems = menuItems?.length;
    const [showForm,setShowForm] = useState(false);
    const [image,setImage] = useState(null);
    const {register,handleSubmit,formState:{errors}} = useForm();

    const handleEdit = () =>{
        setEditState({...editState,menuItem:true});
    }
    const handleEditCancel = () =>{
        setEditState({...editState,menuItem:false});
    }
    const handleAdd = ()=>{
        setShowForm(true);
    }
    const handleAddCancel= ()=>{
        setShowForm(false);
    }
    const handleImageChange = (e)=>{
        setImage(e.target.files[0]);
    }
    const handleOnSubmit = (data)=>{ 
        const formData = {...data,imageFile:image};
        console.log(formData);
        addItem(formData);
    }

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-20 ml-[15%] mt-10 rounded-xl relative">
            <h1 className="text-2xl font-semibold">Menu</h1>
            <div>
                {!editState.canteenDetails && <div className="absolute right-10 top-10 space-x-5">
                    {totalItems ? (!editState.menuItem && <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEdit}>Edit</button>):<></>}
                    {!editState.menuItem && !showForm && <button className="bg-[#76ABAE] w-32 rounded-lg py-2 " onClick={handleAdd}>Add Item</button>}
                    {editState.menuItem && <>
                        <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEditCancel}>Cancel</button>
                        <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                    </>}
                </div>}
                {!showForm ? (totalItems===0 && <h1 className="flex justify-center items-center mt-20 -ml-10 text-lg uppercase tracking-wider"> No Item Found</h1> )
                : <form onSubmit={handleSubmit(handleOnSubmit)} className="grid grid-cols-12 mt-10">
                    {/* button section */}
                    {!editState.canteenDetails && !editState.menuItem && showForm && <div className="absolute right-10 top-10 space-x-5">
                        <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleAddCancel}>Cancel</button>
                        <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                    </div>}
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Item Name" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...register('name',{required:{value:true,message:"Please Enter Item Name"}})}/>
                        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" placeholder="Enter Category" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...register('category',{required:{value:true,message:"Please Enter Category"}})}/>
                        {errors.category && <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" placeholder="Enter Item Price" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...register('price',{required:{value:true,message:"Please Enter Item Price"}})}/>
                        {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" placeholder="Enter Item Description" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...register('description',{required:{value:true,message:"Please Enter Item Description"}})}/>
                        {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                    </div>
                    <div className="col-span-12 flex flex-col items-center mt-8 -ml-10">
                        <label htmlFor="imageFile" className="">Image</label>
                        {image && <img src={URL.createObjectURL(image)} className="size-40 object-contain"/>}
                        <input type="file" name="imageFile" id="imageFile" className="bg-[#31363F] w-[50%] px-2 py-2 rounded-md mt-2"
                        {...register('imageFile',{required:{value:true,message:"Please Enter Item Image"}})} onChange={handleImageChange}
                        accept="image/png, image/gif, image/jpeg"/>
                        {errors.imageFile && <p className="mt-1 text-xs text-red-500">{errors.imageFile.message}</p>}
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default MenuItems
