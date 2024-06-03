import { useEffect } from "react"
import { getAllCanteenAPI } from "../../services/ownerAPI";


const View_Canteen = () => {

  useEffect(()=>{
    getAllCanteenAPI();
  },[]);

  return (
  <div>View_Canteen</div>
  )
}

export default View_Canteen;