import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authAPI";
import { useDispatch } from "react-redux";
import { setEmail,setCanProceed } from "../slices/emailSlice";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch=useDispatch();
    const navigate = useNavigate();

    const handleNext = (data) => {
        dispatch(setEmail(data.email));
        dispatch(setCanProceed(true));
        forgotPassword(data.email, navigate);
    }

    return (
        <div className="bg-gradient-to-r from-black to-[#222831] h-screen text-white pt-[50%] sm:pt-[15%] w-full">
            <form onSubmit={handleSubmit(handleNext)} className="w-full pl-[10%] sm:pl-[15%] md:pl-[20%] lg:pl-[30%] xl:pl-[35%] text-sm md:text-base">
                <h1 className="text-2xl md:text-4xl">Forgot Password</h1>
                <div className="w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] relative pb-6 flex flex-col mt-10">
                    <label htmlFor="email">Email Address</label>
                    <input type="text" id="email" name="email" placeholder="Enter Email Address" className="bg-[#31363F] w-full px-3 py-4 rounded-lg mt-2" 
                    {...register('email', { required: { value: true, message: "Please Enter Email Address" } })}/>
                    {errors.email && (<span className="absolute text-xs text-red-500 bottom-0 left-1">
                        {errors.email.message}
                    </span>)}
                </div>
                <button className="bg-[#76ABAE] w-[80%] sm:w-[60%] md:w-[55%] xl:w-[45%] py-3 rounded-lg mt-12" type="submit">Next</button>
            </form>
        </div>
    )
}

export default ForgotPassword;
