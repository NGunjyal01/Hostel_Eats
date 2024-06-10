import { useDispatch, useSelector } from "react-redux";
import { formatTime } from "../../utils/formatTime";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deleteCanteen } from "../../services/ownerAPI";

const View_Canteen = () => {

  const canteen = useSelector(store => store.canteen);
  const { allCanteen } = canteen;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEditClick = (id)=>{
    navigate("/dashboard/edit_canteen/"+id);
  }
  
  const handleDeleteBtn = (id)=>{
    const formData = new FormData;
    formData.append('shopid',id);
    deleteCanteen(formData,dispatch);
  }

  return (
    <div className="flex flex-col justify-center items-center relative">
      <h1 className="text-3xl -translate-x-[23rem]">My Canteens</h1>
      <table className='w-[70%] mt-10'>
        <thead className="bg-[#222831] border-b-2">
          <tr>
            <td className="p-3 font-semibold uppercase tracking-wider">Name</td>
            <td className="p-3 font-semibold uppercase tracking-wider">Opening Time</td>
            <td className="p-3 font-semibold uppercase tracking-wider">Closing Time</td>
            <td className="p-3 font-semibold uppercase tracking-wider">Total Earning</td>
            <td className="p-3 font-semibold uppercase tracking-wider">Actions</td>
          </tr>
        </thead>
        <tbody className="relative">
          {allCanteen ? allCanteen.map(({id,canteenName,openingTime,closingTime,totalRevenue},index) => <tr key={id} className={`${index%2?"bg-[#222831]":"bg-[#31363F]"}`}>
            <td className="px-3 py-5">{canteenName}</td>
            <td className="px-3 py-5">{formatTime(openingTime)}</td>
            <td className="px-3 py-5">{formatTime(closingTime)}</td>
            <td className="px-3 py-5">{totalRevenue}</td>
            <td><button className="px-3" onClick={()=>{handleEditClick(id)}}><MdEdit size={20}/></button>
            <button className="text-red-600" onClick={()=>{handleDeleteBtn(id)}}><MdDelete size={20}/></button></td>
          </tr>):
          <tr>
            <td className="flex items-center justify-center w-[100%] absolute mt-10 text-xl uppercase font-bold tracking-widest">No Canteen Found</td>  
          </tr>}
        </tbody>
      </table>
    </div>
  )
}

export default View_Canteen;