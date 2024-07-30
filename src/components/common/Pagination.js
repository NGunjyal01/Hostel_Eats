import { useEffect, useState } from "react";
import { CiCircleChevLeft,CiCircleChevRight } from "react-icons/ci";

const Pagination = ({allItems,itemsPerPage,setCurrentItems,scrollTo})=>{

    useEffect(()=>{
        setCurrentItems(allItems.slice(0,itemsPerPage));
    },[allItems]);

    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems/itemsPerPage);
    const numbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    const [currentPageNo,setCurrentPageNo] = useState(1);

    const handleArrowClick = (side)=>{
        let newPageNo;
        if(side==='left'){
            newPageNo = currentPageNo - 1;
        }
        else{
            newPageNo = currentPageNo + 1;
        }
        setCurrentPageNo(newPageNo);
        const start = newPageNo*itemsPerPage - itemsPerPage;
        const end = newPageNo===totalPages ? totalItems : newPageNo*itemsPerPage;
        setCurrentItems(allItems.slice(start,end));
        const to = document.getElementById(scrollTo);
        if(to){
            to.scrollIntoView({behavior:"smooth"});
        }    
    }

    const handleNumberClick = (no)=>{
        const newPageNo = no;
        setCurrentPageNo(newPageNo);
        const start = newPageNo*itemsPerPage - itemsPerPage;
        const end = newPageNo===totalPages ? totalItems : newPageNo*itemsPerPage;
        setCurrentItems(allItems.slice(start,end));
        const to = document.getElementById(scrollTo);
        if(to){
            to.scrollIntoView({behavior:"smooth"});
        }  
    }


    return (                        
    <div className="flex gap-2 mt-10">
        {currentPageNo!==1 && <button type="button" onClick={()=>{handleArrowClick('left')}}>
            <CiCircleChevLeft size={20}/>
        </button>}
        {numbers.map(no => <span key={no} className={`cursor-pointer px-2 py-1 rounded ${currentPageNo === no ? 'bg-[#76ABAE] text-white' : 'bg-gray-700 text-white'}`}
        
        onClick={()=>{handleNumberClick(no)}}>
            {no}
        </span>)}
        {currentPageNo!==totalPages && <button type="button" onClick={()=>{handleArrowClick('right')}} className="p-2">
            <CiCircleChevRight size={20}/>
        </button>}
    </div>);
}

export default Pagination;