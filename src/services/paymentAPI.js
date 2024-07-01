import toast from "react-hot-toast";
import { paymentEndpoints } from "./apis";
import axios from "axios";
import { Razorpay_Key } from "../utils/constants";
import { resetCartItems } from "../slices/cartSlice";

const { ORDER_PAYMENT_API,ORDER_VERIFY_API } = paymentEndpoints;
const config = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

// Load the Razorpay SDK from the CDN
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    })
  }

export async function placeOrder(amount,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const scriptRes = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!scriptRes){
            toast.error("Razorpay SDK failed to load. Check your Internet Connection.");
        }
        else{
            const orderRes = await axios.post(ORDER_PAYMENT_API,{amount},config);
            console.log("PAYMENT ORDER API RESPOSNE..............",orderRes);
            const options = {
                key: Razorpay_Key, // Enter the Key ID generated from the Dashboard
                amount: orderRes.data.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: "INR",
                name: "Hostel Eats", //your business name
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: orderRes.data.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                handler: function (response){
                    verifyPayment(response,navigate,dispatch)
                },
                prefill: { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                    name: userDetails.name , //your customer's name
                    email: userDetails.email,
                    contact: userDetails.contact //Provide the customer's phone number for better conversion rates 
                },
                notes: {
                    address: "Razorpay Corporate Office"
                },
                theme: {
                    color: "#31363F"
                }
            };
            const razor = new window.Razorpay(options);  
            razor.open();  
            
        }
    }
    catch(error){
        console.log("ERROR DURING PLACING ORDER............",error);
        toast.error("Could Not Make Payment");
    }
    toast.dismiss(toastId);
}


export async function verifyPayment(response,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const verifyRes = await axios.post(ORDER_VERIFY_API,response,config);
        console.log("VERIFY PAYEMNT API RESPONSE................",verifyRes);
        toast.success("Order Placed.");
        dispatch(resetCartItems());
        localStorage.removeItem('cart');
    }
    catch(error){
        console.log("PAYMENT VERIFY ERROR............", error);
        toast.error("Could Not Verify Payment.");
    }
    toast.dismiss(toastId);
}