

const ItemCard = ({item,editBtnState,setShowEditForm,setEditItemDetails}) => {
    
    const { _id,shopid,name,description,price,category,imageUrl } = item;

    const handleOnClick = ()=>{
        setEditItemDetails(item);
        setShowEditForm(true);
    }

    return (
        <div className={`bg-[#31363F]  text-white w-[90%] rounded-xl ${editBtnState ? 'cursor-pointer':''}`} onClick={editBtnState ? handleOnClick : null}>
            <img src={imageUrl} alt={name + " img"} className="w-full h-52 mx-auto rounded-t-xl"/>
            <div className="mx-4 mt-2 pb-5">
                <h1 className="text-lg font-medium">Name - {name}</h1>
                <h1 className="mt-2">Category - {category}</h1>
                <p className="text-sm mt-2">Description -  {description}</p>
                <p className="text-sm mt-2">Price - {price}</p>
            </div>
        </div>
    )
}

export default ItemCard;
