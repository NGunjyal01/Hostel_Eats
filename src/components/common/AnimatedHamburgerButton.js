import { AnimatePresence,motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/authAPI";
import ConfirmationalModal from "./ConfirmationalModal";
import { FaFacebookSquare, FaGithub, FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const AnimatedHamburgerButton = () => {

  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [confirmationalModal,setConfirmationalModal] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  let options = [{name:'Home',to:'/'},{name:'About Us',to:'/about-us'},{name:'Explore',to:'/explore'},{name:'Add Canteen',to:'/add-canteen'}];
  if(user?.accountType==="Customer"){
    options = options.filter(tab => tab.name!=="Add Canteen");
  }
  else if(user?.accountType==="Owner"){
    options = options.filter(tab => tab.name!=="Explore");
  }
  

  useEffect(() => {
    // Prevent scrolling
    if(isOpen){
      document.body.style.overflow = 'hidden';
    }
    else{
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  
  const handleNavigation = (to)=>{
    navigate(to);
    setIsOpen(false);
  }

  const handleLogOut = () =>{
    setConfirmationalModal({text1:"Are You Sure ?",text2:"You will be logged out.",btn1Text:"Logout",btn2Text:"Cancel",
        btn1Handler: () => {logout(navigate,dispatch); setConfirmationalModal(null); setIsOpen(false)},
        btn2Handler: () => setConfirmationalModal(null)
    });
  };

  return (
    <div className="fixed w-full -mt-10 z-10">
      <button onClick={handleToggle} className="absolute left-8 top-10 z-50 ">
        <RxHamburgerMenu size={30} className={`absolute transition-transform duration-300 ease-in-out ${
          isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}/>
        <RxCross1 size={30} className={`absolute transition-transform duration-300 ease-in-out ${
          isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}/>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed top-0 left-0 right-0 bottom-0 bg-[#31363F] my-4 mx-2 rounded-xl"
            initial={{ opacity: 0, scale: 0, transformOrigin: "top left"}}
            animate={{opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } }}
            exit={{ opacity: 0, scale: 0, transition: { duration: 0.3, ease: "easeIn" } }}>
              <div className="mt-[22%] ml-[20%] flex flex-col space-y-5">
                {options.map(option => <button key={option.name} className="text-left" onClick={()=>handleNavigation(option.to)}>{option.name}</button>)}
                {user && <button className="text-left" onClick={handleLogOut}>Logout</button>}
              </div>
              <div className="mt-14 ml-[20%]">
                <h1>Contact Us</h1>
                <p className="text-sm my-2">Email: 
                  <a href="mailto:hosteleatstrio@gmail.com" className="ml-2 text-white hover:text-[#76ABAE]">hosteleatstrio@gmail.com</a>
                </p>
                <p className="text-sm my-2">Phone: 
                  <a href="tel:+1234567890" className="ml-2 text-white hover:text-[#76ABAE] uppercase tracking-widest">xxxxxxxxxx</a>
                </p>
                <h1 className="mt-10">Follow Us</h1>
                <div className="flex flex-row gap-5">
                  <a href="https://github.com/NGunjyal01/hostel_eats" target="_blank" rel="noopener noreferrer" className="mt-3 text-white hover:text-[#76ABAE]"><FaGithub size={25}/></a>
                  <a href="" target="_blank" rel="noopener noreferrer" className="mt-3 text-white hover:text-[#76ABAE]"><FaFacebookSquare size={25}/></a>
                  <a href="" target="_blank" rel="noopener noreferrer" className="mt-3 text-white hover:text-[#76ABAE]"><FaXTwitter size={25}/></a>
                  <a href="" target="_blank" rel="noopener noreferrer" className="mt-3 text-white hover:text-[#76ABAE]"><FaInstagramSquare size={25}/></a>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
      {confirmationalModal && <ConfirmationalModal modalData={confirmationalModal}/>}
    </div>
  );
};

export default AnimatedHamburgerButton;
