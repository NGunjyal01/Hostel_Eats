import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4">
        
        {/* About Section */}
        <div>
          <h4 className="font-bold mb-2">About Hostel Eats</h4>
          <p className="text-sm">Hostel Eats is your go-to platform for ordering delicious food from your hostel canteens. We make it easy for you to get your favorite meals.</p>
        </div>
        
        {/* Quick Links Section */}
        <div>
          <h4 className="font-bold mb-2">Quick Links</h4>
          <ul className="list-none p-0 text-sm">
            <li className="mb-1"><a href="/" className="text-white hover:underline">Home</a></li>
            <li className="mb-1"><a href="/about-us" className="text-white hover:underline">About Us</a></li>
          </ul>
        </div>
        
        {/* Contact Section */}
        <div>
          <h4 className="font-bold mb-2">Contact Us</h4>
          <p className="text-sm">Email: <a href="mailto:support@hosteleats.com" className="text-white hover:underline">support@hosteleats.com</a></p>
          <p className="text-sm">Phone: <a href="tel:+1234567890" className="text-white hover:underline">+123 456 7890</a></p>
          <p className="text-sm">Address: Hostel Eats, MNNIT, Allahabad, Prayagraj, Uttar Pradesh</p>
        </div>
        
        {/* Social Media Section */}
        <div>
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Facebook</a>
            <a href="" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Twitter</a>
            <a href="" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">Instagram</a>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className="text-center py-4 bg-gray-800">
        <p className="text-sm">&copy; 2024 Hostel Eats. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
