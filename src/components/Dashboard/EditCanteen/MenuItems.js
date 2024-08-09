import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemCardOwner from "./ItemCardOwner";
import EditForm from "./EditForm";
import AddForm from "./AddForm";

import Pagination from "../../common/Pagination";
import { resetPagination, setPagination } from "../../../slices/paginationSlice";

const MenuItems = ({btnState,setBtnState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const menuItems = canteenDetails.menuitems;
    const totalItems = menuItems.length;
    const [showEditForm,setShowEditForm] = useState(false);
    const [editItemDetails,setEditItemDetails] = useState(null);
    const paginationData = useSelector(store => store.pagination);
    const { allItems,currentItems,itemsPerPage,currentPageNo } = paginationData;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(totalItems===0){
            setBtnState({...btnState,editItem:false});
        }
    },[totalItems]);

    useEffect(()=>{
        const totalPages = Math.ceil(totalItems/itemsPerPage);
        const pageNo = currentPageNo ? currentPageNo : 1;
        console.log('curr',currentPageNo);
        console.log(pageNo);
        const start = pageNo*itemsPerPage - itemsPerPage;
        const end = pageNo===totalPages ? totalItems : pageNo*itemsPerPage;
        const paginationData = {allItems:menuItems, currentItems:menuItems.slice(start,end), 
        itemsPerPage: 10, currentPageNo: currentPageNo ? currentPageNo : 1, scrollTo: "menu-item"};
        dispatch(setPagination(paginationData));
        localStorage.setItem('pagination',JSON.stringify(paginationData));
    },[menuItems]);

    const handleEdit = () =>{
        setBtnState({...btnState,editItem:true});
    }

    const handleAdd = ()=>{
        setBtnState({...btnState,addItem:true})
    }

    return (
        <div id="menu-item" className="bg-[#222831] w-[85%] sm:w-[80%] lg:w-[70%] h-fit ml-[8%] sm:ml-[10%] lg:ml-[15%] pb-12 px-4 md:px-5 lg:px-10 py-5 sm:py-7 lg:py-10 mt-14 rounded-md sm:rounded-lg md:rounded-xl relative">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">Menu</h1>
            {!showEditForm && btnState.editItem && <div className="absolute w-full text-center mt-2 sm:mt-0 -ml-5 sm:-ml-10">
                <h1 className="lg:text-xl font-bold">Select Any Item</h1>
            </div>}
            <div>
                {!btnState.editCanteen && <div className="absolute flex right-2 sm:right-5 lg:right-10 top-6 sm:top-8 gap-2 sm:gap-5 text-xs sm:text-sm lg:text-base">
                    {totalItems!==0 && !btnState.editItem && !btnState.addItem && <button className="bg-white text-black w-14 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" onClick={handleEdit}>Edit</button>}
                    {!btnState.editItem  && !btnState.addItem && <button className="bg-[#76ABAE] w-16 sm:w-20 md:w-24 lg:w-32 rounded-md sm:rounded-lg py-1 md:py-2" onClick={handleAdd}>Add Item</button>}
                </div>}
                {!btnState.addItem ? totalItems===0 ? <h1 className="flex justify-center items-center mt-20 -ml-10 text-lg uppercase tracking-wider"> No Item Found</h1> 
                : ( showEditForm ? <EditForm btnState={btnState} setBtnState={setBtnState} showEditForm={showEditForm} setShowEditForm={setShowEditForm} editItemDetails={editItemDetails}/> 
                    : <div className="flex flex-col items-center">
                        <div className="grid grid-cols-12 mt-8 w-full">
                            {currentItems?.map((item,index) => <span key={item._id} className={`col-span-full md:col-span-6 mt-5 md:mt-8 relative ${index%2?'md:ml-5 lg:ml-10':''} ml-3 sm:ml-5 md:ml-0  w-full`}>
                                <ItemCardOwner item={item} editBtnState={btnState.editItem} setShowEditForm={setShowEditForm} setEditItemDetails={setEditItemDetails}/>
                            </span>)}
                        </div>
                        <Pagination/>
                    </div>) 
                : <AddForm btnState={btnState} setBtnState={setBtnState} shopid={canteenDetails._id}/>}
            </div>
        </div>
    )
}

export default MenuItems;
