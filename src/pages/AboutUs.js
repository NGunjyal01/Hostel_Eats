import React from 'react';

const AboutUs = () => {
    return (
        <div className="bg-gradient-to-r from-black to-[#222831] min-h-screen text-white p-4">
            <div className="flex flex-col px-[8%] items-center text-center mt-[15%] sm:mt-0">
                <h1 className="pt-[10%] text-2xl md:text-2xl lg:text-4xl font-bold underline ">About Us</h1>
                <p className="pt-[2%] text-xl md:text-2xl lg:text-3xl">
                    Welcome to <span className="text-red-500 font-bold">Hostel Eats</span>!
                </p>
                <p className="pt-[2%] text-lg md:text-xl lg:text-2xl max-w-3xl text-gray-300">
                    At Hostel Eats, we believe that good food should be accessible and enjoyable for all students, right from the comfort of their hostel rooms. We are dedicated to bridging the gap between you and your favorite hostel canteens, ensuring that delicious meals are just a few clicks away.
                </p>
                <h1 className="pt-[12%] sm:pt-[5%] text-2xl md:text-2xl lg:text-4xl font-bold underline">Our Mission</h1>
                <p className="pt-[2%] text-lg md:text-xl lg:text-2xl max-w-3xl text-gray-300">
                    Our mission is simple: to provide a seamless and convenient platform for students to order food from their preferred hostel canteens. We aim to enhance the dining experience by offering:
                </p>
                <ul className="pt-[2%] text-lg md:text-xl lg:text-2xl max-w-3xl list-disc list-inside text-gray-300 mb-20">
                    <li><strong>Easy Access</strong>: Connecting students with their hostel canteens through a user-friendly app.</li>
                    <li><strong>Variety</strong>: Offering a wide range of menu options to cater to diverse tastes and dietary needs.</li>
                    <li><strong>Convenience</strong>: Simplifying the ordering process with quick and reliable delivery.</li>
                </ul>
            </div>
        </div>
    );
};

export default AboutUs;
