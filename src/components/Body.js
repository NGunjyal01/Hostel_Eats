import { Outlet } from "react-router-dom"
import Footer from "./common/Footer"
import Header from "./common/Header"

const Body = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}

export default Body
