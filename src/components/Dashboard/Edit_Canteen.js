import { useSelector } from "react-redux";

const Edit_Canteen = () => {

  const canteen = useSelector(store => store.canteen);
  const { allCanteen } = canteen;

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl -translate-x-[23rem]">Edit Canteen</h1>
    </div>
  )
}

export default Edit_Canteen