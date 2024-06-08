import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getCanteenDetails } from "../../../services/ownerAPI";
import CanteenDetails from "./CanteenDetails";
import { useDispatch } from "react-redux";
import MenuItems from "./MenuItems";

const Edit_Canteen = () => {

  const {id} = useParams();
  const location = useLocation();
  console.log(location)
  const dispatch = useDispatch();
  //This is it know which btn is working currently meaning if editItem is true then currently we are editing menu item and no other btn will work
  const [btnState,setBtnState] = useState({editCanteen:false,editItem:false,addItem:false});
  useEffect(()=>{
    getCanteenDetails(id,dispatch);
  },[id]);

  useEffect(()=>{
    const params = new URLSearchParams(location.search);
    console.log(params)
    if (params.get('scrollToMenu') === 'true') {
      const menuItemsElement = document.getElementById('menu-items-section');
      if (menuItemsElement) {
        menuItemsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  },[location])

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl -translate-x-[23rem]">Edit Canteen</h1>
      <CanteenDetails btnState={btnState} setBtnState={setBtnState}/>
      <div id="menu-items-section" className="w-full">
        <MenuItems btnState={btnState} setBtnState={setBtnState}/>
      </div>
    </div>
  )
}

export default Edit_Canteen