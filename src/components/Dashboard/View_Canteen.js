import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../utils/formatTime";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteCanteen, getAllCanteen, getCanteenDetails } from "../../services/ownerAPI";
import { useEffect, useState } from "react";
import ConfirmationalModal from "../common/ConfirmationalModal";
import { IoEye } from "react-icons/io5";
import Spinner from "../common/Spinner";

const View_Canteen = () => {

  const [showComfirmationalModal,setShowConfirmationalModal] = useState(null);
  const canteen = useSelector(store => store.canteen);
  const { allCanteen } = canteen;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    getAllCanteen(dispatch);
  },[]);

  const handleEditClick = (id)=>{
    navigate("/dashboard/edit_canteen/"+id);
  }
  const handleViewClick = (id)=>{
    navigate('/dashboard/canteen/'+id);
  }
  
  const handleDeleteBtn = (id,canteenName)=>{
    const formData = new FormData;
    formData.append('shopid',id);
    setShowConfirmationalModal({text1:"Are You Sure?",text2:`${canteenName} Will Be Permanently Removed`,btn1Text:"Delete",btn2Text:"Cancel",
      btn1Handler:()=>{deleteCanteen(formData,dispatch); setShowConfirmationalModal(null)},
      btn2Handler:()=>{setShowConfirmationalModal(null)}}); 
  }

  return (
    <div className="flex flex-col justify-center items-center relative lg:max-xl:mt-10">
      {!allCanteen ? <div className="mt-[12%] -ml-[15%]"><Spinner/></div>
      :<>
          <table className='lg:w-[85%] xl:w-[70%] mt-10 hidden lg:block'>
          <h1 className="absolute lg:-mt-[7%] xl:-mt-[5%] lg:text-3xl font-semibold">My Canteens</h1>
          <thead className="bg-[#222831] border-b-2 w-full">
            <tr>
              <td className="p-3 pl-5 font-semibold uppercase tracking-wider sm:text-sm lg:text-base w-1/5">Name</td>
              <td className="p-3 font-semibold uppercase tracking-wider sm:text-sm lg:text-base w-1/4">Opening Time</td>
              <td className="p-3 font-semibold uppercase tracking-wider sm:text-sm lg:text-base w-1/4">Closing Time</td>
              <td className="p-3 font-semibold uppercase tracking-wider sm:text-sm lg:text-base w-1/4">Total Earning</td>
              <td className="p-3 font-semibold uppercase tracking-wider sm:text-sm lg:text-base w-1/5">Actions</td>
            </tr>
          </thead>
          <tbody className="relative">
            {allCanteen ? allCanteen.map(({id,canteenName,openingTime,closingTime,totalRevenue},index) => <tr key={id} className={`${index%2?"bg-[#222831]":"bg-[#31363F]"}`}>
              <td className="px-3 py-5 pl-5 w-[20%]">{canteenName}</td>
              <td className="px-3 py-5 pl-[4%] w-[20%]">{formatTime(openingTime)}</td>
              <td className="px-3 py-5 pl-[4%] w-[20%]">{formatTime(closingTime)}</td>
              <td className="px-3 py-5 lg:pl-[9%] xl:pl-[7%] w-[25%]">{totalRevenue}</td>
              <td className="w-[15%]">
                <button className="mr-2 sm:mr-4" onClick={()=>{handleViewClick(id)}}><IoEye size={20}/></button>
                <button className=" mr-2 sm:mr-4" onClick={()=>{handleEditClick(id)}}><MdEdit size={20}/></button>
                <button className="text-red-600" onClick={()=>{handleDeleteBtn(id,canteenName)}}><MdDelete size={20}/></button>
              </td>
            </tr>):
            <tr>
              <td className="flex items-center justify-center w-[100%] absolute mt-10 text-xl uppercase font-bold tracking-widest">No Canteen Found</td>  
            </tr>}
          </tbody>
        </table>
        {showComfirmationalModal && <ConfirmationalModal modalData={showComfirmationalModal}/>}
        <div className="lg:hidden w-[80%] sm:w-[70%] mt-5 sm:mt-10">
          <h1 className="absolute -mt-[12%] sm:-mt-[8%] md:-mt-[7%] text-lg sm:text-xl md:text-2xl font-semibold">My Canteens</h1>
          {allCanteen ? allCanteen.map(({id,canteenName,openingTime,closingTime,totalRevenue},index) => 
            <div key={id} className={`bg-[#222831] h-fit px-3 sm:px-5 py-4 sm:py-5 relative border-b-2 border-x-2 text-sm md:text-base ${index%2?"bg-[#222831]":"bg-[#31363F]"} ${index===0?'border-t-2':''}`}>
              <div className="grid grid-cols-2 gap-4 sm:gap-0">
                <h1 className="col-span-1">Canteen Name</h1>
                <h1 className="col-span-1">{canteenName}</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-0 mt-5">
                <h1 className="col-span-1">Opening Time</h1>
                <h1 className="col-span-1">{formatTime(openingTime)}</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-0 mt-5">
                <h1 className="col-span-1">Closing Time</h1>
                <h1 className="col-span-1">{formatTime(closingTime)}</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-0 mt-5">
                <h1 className="col-span-1">Total Revenue</h1>
                <h1 className="col-span-1">{totalRevenue}</h1>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-0 mt-5">
                <h1 className="col-span-1">Actions</h1>
                <div className="col-span-1">
                  <button className="mr-2 sm:mr-4" onClick={()=>{handleViewClick(id)}}><IoEye size={20}/></button>
                  <button className="mr-2 sm:mr-4" onClick={()=>{handleEditClick(id)}}><MdEdit size={20}/></button>
                  <button className="text-red-600" onClick={()=>{handleDeleteBtn(id,canteenName)}}><MdDelete size={20}/></button>
                </div>
              </div>
          </div>)
          :<div className="mt-10 sm:text-lg md:text-xl uppercase font-bold tracking-widest">
              <h1>No canteen Found</h1>
          </div>}
        </div>
      </>}
    </div>
  )
}

export default View_Canteen;