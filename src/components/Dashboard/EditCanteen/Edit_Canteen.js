import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCanteenDetails } from "../../../services/ownerAPI";
import CanteenDetails from "./CanteenDetails";
import { useDispatch } from "react-redux";
import MenuItems from "./MenuItems";

const Edit_Canteen = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const [editState,setEditState] = useState({canteenDetails:false,menuItem:false});
  useEffect(()=>{
    getCanteenDetails(id,dispatch);
  },[id]);
  console.log(editState)

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl -translate-x-[23rem]">Edit Canteen</h1>
      <CanteenDetails editState={editState} setEditState={setEditState}/>
      <MenuItems editState={editState} setEditState={setEditState}/>
    </div>
  )
}

export default Edit_Canteen