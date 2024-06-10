import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addItem, editItem } from "../../../services/ownerAPI";
import ItemCardOwner from "./ItemCardOwner";
import toast from "react-hot-toast";


const MenuItems = ({btnState,setBtnState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const menuItems = canteenDetails?.menuitems;
    const totalItems = menuItems?.length;
    const dispatch = useDispatch();
    const [image,setImage] = useState({edit:null,add:null});
    const[editImage,setEditImage] = useState(null);
    const [showEditForm,setShowEditForm] = useState(false);
    const [editItemDetails,setEditItemDetails] = useState(null);
    const { register: registerAddForm, handleSubmit: handleSubmitAddForm, reset: resetAddForm, formState: { errors: errorsAddForm } } = useForm();
    const { register: registerEditForm, handleSubmit: handleSubmitEditForm, reset: resetEditForm, formState: { errors: errorsEditForm },setValue: setEditValue } = useForm();

    useEffect(()=>{
        if(editItemDetails){
            resetEditForm(editItemDetails);
            setImage(prevState => ({
                ...prevState,edit: editItemDetails.imageUrl
            }))
        }
        if(totalItems===0){
            setBtnState({...btnState,editItem:false});
        }
    },[editItemDetails,totalItems])

    const handleEdit = () =>{
        setBtnState({...btnState,editItem:true});
    }
    const handleEditCancel = () =>{
        setShowEditForm(false);
        setBtnState({...btnState,editItem:false});
    }
    const handleAdd = ()=>{
        setBtnState({...btnState,addItem:true})
    }
    const handleAddCancel= ()=>{
        setBtnState({...btnState,addItem:false});
        resetAddForm();
        setImage({...image,add:null});
    }
    const handleAddImageChange = (e)=>{
        setImage(prevState => ({
            ...prevState,add: e.target.files[0]
        }));
    }
    const handleEditImageChange = (e)=>{
        console.log(e.target.files[0])
        setEditImage(e.target.files[0]);
    }
    const handleAddSubmit = async (data)=>{ 
        console.log(image.add)
        const formData = {...data,imageFile:image.add,shopid:canteenDetails._id};
        const result = await addItem(formData,dispatch);
        if(result){
            setBtnState({...btnState,addItem:false});
            resetAddForm();
            setImage({...image,add:null});
        }
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
                console.log(result)
                setBtnState({...btnState,editItem:false});
                setShowEditForm(false);
            }
        }
    }

    console.log(btnState);

    return (
        <div className="bg-[#222831] w-[70%] h-fit p-10 pb-20 ml-[15%] mt-10 rounded-xl relative">
            <h1 className="text-2xl font-semibold">Menu</h1>
            {!showEditForm && btnState.editItem && <div className="absolute w-full text-center -ml-10">
                <h1 className="text-xl font-bold">Select Any Item</h1>
            </div>}
            <div>
                {!btnState.editCanteen && <div className="absolute right-10 top-10 space-x-5">
                    {totalItems!==0 && !btnState.editItem && !btnState.addItem && <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEdit}>Edit</button>}
                    {!btnState.editItem  && !btnState.addItem && <button className="bg-[#76ABAE] w-32 rounded-lg py-2 " onClick={handleAdd}>Add Item</button>}
                </div>}
                {!btnState.addItem ? (totalItems===0 ? <h1 className="flex justify-center items-center mt-20 -ml-10 text-lg uppercase tracking-wider"> No Item Found</h1> 
                : ( showEditForm ? <form onSubmit={handleSubmitEditForm(handleEditSubmit)} className="grid grid-cols-12 mt-10">
                    {/* button section */}
                    {!btnState.editCanteen && btnState.editItem && !btnState.addItem && showEditForm && <div className="absolute right-10 top-10 space-x-5">
                        <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleEditCancel}>Cancel</button>
                        <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                    </div>}
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Item Name" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerEditForm('name',{required:{value:true,message:"Please Enter Item Name"}})}/>
                        {errorsEditForm.name && <p className="mt-1 text-xs text-red-500">{errorsEditForm.name.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" placeholder="Enter Category" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerEditForm('category',{required:{value:true,message:"Please Enter Category"}})}/>
                        {errorsEditForm.category && <p className="mt-1 text-xs text-red-500">{errorsEditForm.category.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" placeholder="Enter Item Price" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerEditForm('price',{required:{value:true,message:"Please Enter Item Price"}})}/>
                        {errorsEditForm.price && <p className="mt-1 text-xs text-red-500">{errorsEditForm.price.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" placeholder="Enter Item Description" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerEditForm('description',{required:{value:true,message:"Please Enter Item Description"}})}/>
                        {errorsEditForm.description && <p className="mt-1 text-xs text-red-500">{errorsEditForm.description.message}</p>}
                    </div>
                    <div className="col-span-12 flex flex-col items-center mt-8 -ml-10">
                        <label htmlFor="imageFile" className="">Image</label>
                        {<img src={!editImage ? image.edit : URL.createObjectURL(editImage)} className="size-40 object-contain"/>}
                        <input type="file" name="imageFile" id="imageFile" className="bg-[#31363F] w-[50%] px-2 py-2 rounded-md mt-2"
                        onChange={handleEditImageChange}
                        accept="image/png, image/gif, image/jpeg"/>
                    </div>
                </form> : <div className="grid grid-cols-12 mt-8">
                    {console.log('canteen',canteenDetails)}
                    {console.log('menuitems',menuItems)}
                    {menuItems?.map(item => <span key={item._id} className="col-span-6 mt-8">
                        <ItemCardOwner item={item} editBtnState={btnState.editItem} setShowEditForm={setShowEditForm} setEditItemDetails={setEditItemDetails}/>
                    </span>)}
                </div>) )
                : // form for add new item
                <form onSubmit={handleSubmitAddForm(handleAddSubmit)} className="grid grid-cols-12 mt-10">
                    {/* button section */}
                    {!btnState.editCanteen && !btnState.editItem && btnState.addItem && <div className="absolute right-10 top-10 space-x-5">
                        <button className="bg-white text-black w-32 rounded-lg py-2" onClick={handleAddCancel}>Cancel</button>
                        <button className="bg-[#76ABAE] w-32 rounded-lg py-2" type="submit">Save</button>
                    </div>}
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Item Name" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerAddForm('name',{required:{value:true,message:"Please Enter Item Name"}})}/>
                        {errorsAddForm.name && <p className="mt-1 text-xs text-red-500">{errorsAddForm.name.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="category">Category</label>
                        <input type="text" name="category" id="category" placeholder="Enter Category" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerAddForm('category',{required:{value:true,message:"Please Enter Category"}})}/>
                        {errorsAddForm.category && <p className="mt-1 text-xs text-red-500">{errorsAddForm.category.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="price">Price</label>
                        <input type="text" name="price" id="price" placeholder="Enter Item Price" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerAddForm('price',{required:{value:true,message:"Please Enter Item Price"}})}/>
                        {errorsAddForm.price && <p className="mt-1 text-xs text-red-500">{errorsAddForm.price.message}</p>}
                    </div>
                    <div className="col-span-6 flex flex-col mt-8">
                        <label htmlFor="description">Description</label>
                        <input type="text" name="description" id="description" placeholder="Enter Item Description" className="bg-[#31363F] w-[80%] px-2 py-2 rounded-md mt-2"
                        {...registerAddForm('description',{required:{value:true,message:"Please Enter Item Description"}})}/>
                        {errorsAddForm.description && <p className="mt-1 text-xs text-red-500">{errorsAddForm.description.message}</p>}
                    </div>
                    <div className="col-span-12 flex flex-col items-center mt-8 -ml-10">
                        <label htmlFor="imageFile" className="">Image</label>
                        {image.add && <img src={URL.createObjectURL(image.add)} className="size-40 object-contain"/>}
                        <input type="file" name="imageFile" id="imageFile" className="bg-[#31363F] w-[50%] px-2 py-2 rounded-md mt-2"
                        {...registerAddForm('imageFile',{required:{value:true,message:"Please Enter Item Image"}})} onChange={handleAddImageChange}
                        accept="image/png, image/gif, image/jpeg"/>
                        {errorsAddForm.imageFile && <p className="mt-1 text-xs text-red-500">{errorsAddForm.imageFile.message}</p>}
                    </div>
                </form>}
            </div>
        </div>
    )
}

export default MenuItems;
