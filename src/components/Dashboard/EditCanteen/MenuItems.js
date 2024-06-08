import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../../services/ownerAPI";


const MenuItems = ({btnState,setBtnState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const menuItems = canteenDetails?.menuitems;
    const totalItems = menuItems?.length;
    // const [showForm,setShowForm] = useState(false);
    const dispatch = useDispatch();
    const [image,setImage] = useState(null);
    const {register,handleSubmit,formState:{errors},reset} = useForm();

    const handleEdit = () =>{
        setBtnState({...btnState,editItem:true});
    }
    const handleEditCancel = () =>{
        setBtnState({...btnState,editItem:false});
    }
    const handleAdd = ()=>{
        setBtnState({...btnState,addItem:true})
        // setShowForm(true);
    }
    const handleAddCancel= ()=>{
        setBtnState({...btnState,addItem:false});
        // setShowForm(false);
        reset();
        setImage(null);
    }
    const handleImageChange = (e)=>{
        setImage(e.target.files[0]);
    }
    const handleOnSubmit = async (data)=>{ 
        const formData = {...data,imageFile:image,shopid:canteenDetails._id};
        const result = await addItem(formData,dispatch);
        if(result){
            setBtnState({...btnState,addItem:false});
            reset();
            setImage(null);
        }
    }
    console.log(image);
    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-20 ml-[15%] mt-10 rounded-xl relative">
            <h1 className="text-2xl font-semibold">Menu</h1>
            <div>
                {!btnState.editCanteen && <div className="absolute right-10 top-10 space-x-5">
                    {totalItems!==0 && !btnState.editItem && !btnState.addItem && <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEdit}>Edit</button>}
                    {!btnState.editItem  && !btnState.addItem && <button className="bg-[#76ABAE] w-32 rounded-lg py-2 " onClick={handleAdd}>Add Item</button>}
                    {btnState.editItem && !btnState.addItem && <>
                        <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEditCancel}>Cancel</button>
                        <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                    </>}
                </div>}
                {!btnState.addItem ? (totalItems===0 ? <h1 className="flex justify-center items-center mt-20 -ml-10 text-lg uppercase tracking-wider"> No Item Found</h1> 
                : <div> 
                    {menuItems.map(item => <div>
                        <h1>{item.name}</h1>
                    </div>)}
                </div> )
                : <form onSubmit={handleSubmit(handleOnSubmit)} className="grid grid-cols-12 mt-10">
                    {/* button section */}
                    {!btnState.editCanteen && !btnState.editItem && btnState.addItem && <div className="absolute right-10 top-10 space-x-5">
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
