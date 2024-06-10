import { MdDelete } from "react-icons/md";
import { deleteItem } from "../../../services/ownerAPI";
import { useDispatch } from "react-redux";

const ItemCard = ({item,editBtnState,setShowEditForm,setEditItemDetails}) => {
    
    const { _id,shopid,name,description,price,category,imageUrl } = item;
    const dispatch = useDispatch();

    const handleOnClick = ()=>{
        setEditItemDetails(item);
        setShowEditForm(true);
    }

    const handleDeleteBtn = (e)=>{
        e.stopPropagation();
        const formData = new FormData;
        formData.append('itemid',_id);
        formData.append('shopid',shopid);
        deleteItem(formData,dispatch);
    }

    return (
        <div className={`bg-[#31363F] relative  text-white w-[90%] rounded-xl ${editBtnState ? 'cursor-pointer':''}`} onClick={editBtnState ? handleOnClick : null}>
            <img src={imageUrl} alt={name + " img"} className="w-full h-52 mx-auto rounded-t-xl"/>
            <div className="mx-4 mt-2 pb-5">
                <h1 className="text-lg font-medium">Name - {name}</h1>
                <h1 className="mt-2">Category - {category}</h1>
                <p className="text-sm mt-2">Description -  {description}</p>
                <p className="text-sm mt-2">Price - {price}</p>
            </div>
            {editBtnState && <button className="text-red-600 absolute top-[62%] right-5"><MdDelete size={35} onClick={handleDeleteBtn}/></button>}
        </div>
    )
}

export default ItemCard;
