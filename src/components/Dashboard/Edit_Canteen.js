import { useSelector } from "react-redux"


const Edit_Canteen = () => {

  const canteen = useSelector(store => store.canteen)

  return (
    <div>Edit_Canteen</div>
  )
}

export default Edit_Canteen