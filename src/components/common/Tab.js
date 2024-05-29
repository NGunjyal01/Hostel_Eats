import { useState } from 'react';

const Tab = ({children}) => {
    const [isHover,setIsHover] = useState(false);

    return( 
        <div className="relative w-fit" onMouseEnter={()=>{setIsHover(true)}} onMouseLeave={()=>{setIsHover(false)}}>
            {children}
            <span style={{transform: isHover?"ScaleX(1)":"ScaleX(0)"}} 
            className="absolute -bottom-2 -left-0.5 -right-0.5 z-30 h-1 bg-[#76ABAE] rounded-full origin-left transition-transform ease-in-out duration-300"></span>
        </div>
    )
}

export default Tab;
