import MaggieImg from "../Maggie.png"

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-black to-[#222831] text-white py-14">
           {/* Section 1 */}
            <div className="mt-[25%] sm:mt-[18%] md:mt-[15%] lg:mt-[12%] ml-[8%] sm:ml-[8%] md:ml-[10%]">
                <div className="relative font-serif">
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl'>Welcome To Hostel Eats</h1>
                    <p className="mt-5 md:mt-10 text-xs sm:text-xs md:text-sm lg:text-base">Made for MNNIT Students to order food</p>
                    <button className="bg-[#76ABAE] text-black text-sm md:text-base px-4 py-2 rounded-lg mt-10 md:mt-20 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Order Now →</button>
                </div>
                <img src={MaggieImg} alt="Main Logo" className="hidden sm:flex relative sm:w-[45%] md:w-[50%] lg:w-[45%] sm:ml-[53%] md:ml-[47%] lg:ml-[47%] sm:-mt-[36%] md:-mt-[37%] lg:-mt-[27%]"/>
            </div>
            {/* Section 2 */}
            <div className="mt-[15%] sm:mt-[18%] md:mt-[15%] lg:mt-[12%] ml-[8%] sm:ml-[8%] md:ml-[10%]">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl">Popular Dishes</h1>
            </div>
        </div>
        
    )
}

export default Home
