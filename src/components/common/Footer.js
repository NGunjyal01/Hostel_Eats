import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#31363F] text-white py-8">
      <div className="grid grid-cols-6 px-10">  
        {/* About Section */}
        <div className='w-[90%] col-span-full lg:col-span-2'>
          <h4 className="font-bold mb-2">About Hostel Eats</h4>
          <p className="text-sm">Hostel Eats is your go-to platform for ordering delicious food from your hostel canteens. We make it easy for you to get your favorite meals.</p>
        </div>
        
        {/* Quick Links Section */}
        <div className="w-[90%] col-span-full sm:col-span-3 lg:col-span-1 mt-10 lg:mt-0">
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="list-none p-0 text-sm">
            <li className="my-2"><a href="/" className="text-white hover:text-[#76ABAE]">Home</a></li>
            <li className="my-2"><a href="/about-us" className="text-white hover:text-[#76ABAE]">About Us</a></li>
            <li className="my-2"><a href="/add-canteen" className="text-white hover:text-[#76ABAE]">Add Canteen</a></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div className="w-[90%] col-span-full sm:col-span-3 lg:col-span-2 mt-10 lg:mt-0">
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p className="text-sm my-2">Email: <a href="mailto:hosteleats.team@gmail.com" className="text-white hover:text-[#76ABAE]">hosteleats.team@gmail.com</a></p>
          <p className="text-sm my-2">Phone: <a href="tel:+1234567890" className="text-white hover:text-[#76ABAE] uppercase tracking-widest">xxxxxxxxxx</a></p>
          <p className="text-sm my-2">Address: Hostel Eats, MNNIT, Allahabad, Prayagraj, Uttar Pradesh</p>
        </div>
        
        {/* Social Media Section */}
        <div className="w-[40%] col-span-full lg:col-span-1 space-y-2 mt-10 lg:mt-0">
          <h4 className="font-bold mb-2 whitespace-nowrap">Follow Us</h4>
          <div className="flex flex-row gap-5 lg:grid lg:grid-cols-2">
            <a href="https://github.com/NGunjyal01/hostel_eats" target="_blank" rel="noopener noreferrer" className="lg:col-span-1 mt-3 text-white hover:text-[#76ABAE]"><FaGithub size={25}/></a>
            <a href="" target="_blank" rel="noopener noreferrer" className="lg:col-span-1 mt-3 text-white hover:text-[#76ABAE]"><FaFacebookSquare size={25}/></a>
            <a href="" target="_blank" rel="noopener noreferrer" className="lg:col-span-1 mt-3 text-white hover:text-[#76ABAE]"><FaXTwitter size={25}/></a>
            <a href="" target="_blank" rel="noopener noreferrer" className="lg:col-span-1 mt-3 text-white hover:text-[#76ABAE]"><FaInstagramSquare size={25}/></a>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="text-center mt-10 mb-7">
        <p className="text-sm">&copy; 2024 Hostel Eats. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
