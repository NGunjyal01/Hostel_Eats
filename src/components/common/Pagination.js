import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { setPagination } from "../../slices/paginationSlice";

const Pagination = () => {
    const paginationData = useSelector(store => store.pagination);
    const { allItems, itemsPerPage, currentPageNo, scrollTo } = paginationData;
    const dispatch = useDispatch();

    const totalItems = allItems.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const getPaginationNumbers = () => {
        const pageNumbers = [];
        const maxPageNumbersToShow = 5; // Maximum number of page numbers to show
        const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);

        if (totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPageNo <= halfMaxPageNumbersToShow) {
                for (let i = 1; i <= maxPageNumbersToShow - 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPageNo > totalPages - halfMaxPageNumbersToShow) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - (maxPageNumbersToShow - 2); i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPageNo - 1; i <= currentPageNo + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        return pageNumbers;
    };

    const handleArrowClick = (side) => {
        let newPageNo;
        if (side === 'left') {
            newPageNo = currentPageNo - 1;
        } else {
            newPageNo = currentPageNo + 1;
        }
        updatePagination(newPageNo);
    };

    const handleNumberClick = (no) => {
        if (no !== '...') {
            updatePagination(no);
        }
    };

    const updatePagination = (newPageNo) => {
        const start = newPageNo * itemsPerPage - itemsPerPage;
        const end = newPageNo === totalPages ? totalItems : newPageNo * itemsPerPage;
        const updatedPaginationData = {
            allItems: allItems,
            currentItems: allItems.slice(start, end),
            currentPageNo: newPageNo,
            itemsPerPage: itemsPerPage,
            scrollTo: scrollTo,
        };
        dispatch(setPagination(updatedPaginationData));
        localStorage.setItem('pagination', JSON.stringify(updatedPaginationData));
        const to = document.getElementById(scrollTo);
        if (to) {
            to.scrollIntoView({ behavior: "smooth" });
        }
    };

    const paginationNumbers = getPaginationNumbers();

    return (
        <div className="flex gap-2 mt-10">
            {currentPageNo !== 1 && (
                <button type="button" onClick={() => handleArrowClick('left')}>
                    <CiCircleChevLeft size={20} />
                </button>
            )}
            {paginationNumbers.map((no, index) => (
                <span
                    key={index}
                    className={`cursor-pointer px-2 py-1 rounded ${currentPageNo === no ? 'bg-[#76ABAE] text-white' : 'bg-gray-700 text-white'}`}
                    onClick={() => handleNumberClick(no)}
                >
                    {no}
                </span>
            ))}
            {currentPageNo !== totalPages && (
                <button type="button" onClick={() => handleArrowClick('right')} className="">
                    <CiCircleChevRight size={20} />
                </button>
            )}
        </div>
    );
};

export default Pagination;
