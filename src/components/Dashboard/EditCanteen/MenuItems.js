import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ItemCardOwner from "./ItemCardOwner";
import EditForm from "./EditForm";
import AddForm from "./AddForm";
import { CiCircleChevLeft,CiCircleChevRight } from "react-icons/ci";

const MenuItems = ({btnState,setBtnState}) => {

    const {canteenDetails} = useSelector(store => store.canteen);
    const menuItems = canteenDetails?.menuitems;
    const totalItems = menuItems?.length;
    const totalItemsGroup = Math.ceil(totalItems/10);
    const numbers = Array.from({ length: totalItemsGroup }, (_, index) => index + 1);
    const [currentItems,setCurrentItems] = useState(menuItems.slice(0,10));
    const [currentPageNo,setCurrentPageNo] = useState(1);
    const [showEditForm,setShowEditForm] = useState(false);
    const [editItemDetails,setEditItemDetails] = useState(null);

    useEffect(()=>{
        if(totalItems===0){
            setBtnState({...btnState,editItem:false});
        }
    },[totalItems]);

    useEffect(()=>{
        const start = currentPageNo*10 - 10;
        const end = currentPageNo===totalItemsGroup ? totalItems : currentPageNo*10;
        setCurrentItems(menuItems?.slice(start,end));
    },[menuItems]);

    const handleEdit = () =>{
        setBtnState({...btnState,editItem:true});
    }

    const handleAdd = ()=>{
        setBtnState({...btnState,addItem:true})
    }

    const handleArrowClick = (side)=>{
        let newPageNo;
        if(side==='left'){
            newPageNo = currentPageNo - 1;
        }
        else{
            newPageNo = currentPageNo + 1;
        }
        setCurrentPageNo(newPageNo);
        const start = newPageNo*10 - 10;
        const end = newPageNo===totalItemsGroup ? totalItems : newPageNo*10;
        console.log("start",start);
        console.log("end",end);
        setCurrentItems(menuItems.slice(start,end));
        const to = document.getElementById('menu-item');
        to.scrollIntoView({behavior:"smooth"})
    }

    const handleNumberClick = (no)=>{
        const newPageNo = no;
        setCurrentPageNo(newPageNo);
        const start = newPageNo*10 - 10;
        const end = newPageNo===totalItemsGroup ? totalItems : newPageNo*10;
        console.log("start",start);
        console.log("end",end);
        setCurrentItems(menuItems.slice(start,end));
        const to = document.getElementById('menu-item');
        to.scrollIntoView({behavior:"smooth"})
    }
    
    return (
        <div id="menu-item" className="bg-[#222831] w-[90%] sm:w-[80%] lg:w-[70%] h-fit ml-[5%] sm:ml-[10%] lg:ml-[15%] pb-12 px-4 md:px-5 lg:px-10 py-5 sm:py-7 lg:py-10 mt-14 rounded-md sm:rounded-lg md:rounded-xl relative">
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
                        <div className="flex gap-2 mt-10">
                            {currentPageNo!==1 && <button type="button" onClick={()=>{handleArrowClick('left')}}>
                                <CiCircleChevLeft size={20}/>
                            </button>}
                            {numbers.map(no => <span key={no} className={`cursor-pointer ${currentPageNo===no? 'text-[#76ABAE]' : ''}`}
                            onClick={()=>{handleNumberClick(no)}}>
                                {no}
                            </span>)}
                            {currentPageNo!==totalItemsGroup && <button type="button" onClick={()=>{handleArrowClick('right')}}>
                                <CiCircleChevRight size={20}/>
                            </button>}
                        </div>
                    </div>) 
                : <AddForm btnState={btnState} setBtnState={setBtnState} shopid={canteenDetails._id}/>}
            </div>
        </div>
    )
}

export default MenuItems;
