import MaggieImg from "../Maggie.png"

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-black to-[#222831] text-white px-20 py-14">
           {/* Section 1 */}
            <div className="mt-[12%] ml-10">
                <div className="relative font-serif">
                    <h1 className='text-4xl '>Welcome To Hostel Eats</h1>
                    <p className="mt-10">Made for MNNIT Students to order food</p>
                    <button className="bg-[#76ABAE] text-black px-4 py-2 rounded-lg mt-20 transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none">Order Now →</button>
                </div>
                <img src={MaggieImg} alt="Main Logo" className="w-[42%] absolute top-20 right-28"/>
            </div>
            {/* Section 2 */}
            <div className="mt-[25%] ml-10">
                <h1 className="text-4xl">Popular Dishes</h1>
            </div>
        </div>
        
    )
}

export default Home
