import { useEffect } from "react";
import { io } from "socket.io-client";

const BASE_URL = process.env.REACT_APP_BASE_URL_LOCAL;

const socket = io.connect(BASE_URL);

const Orders = () => {

    useEffect(()=>{
        socket.emit('send',{message:"Hello"});
    },[]);

    return (
        <div>
            
        </div>
    )
}

export default Orders
