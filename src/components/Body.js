import { Outlet } from "react-router-dom"
import Header from "./common/Header"

const Body = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    )
}

export default Body
