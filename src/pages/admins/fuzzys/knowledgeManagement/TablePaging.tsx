import { FC } from "react";
import { PageInterface } from "../../../../interfaces/globalInterface";

type PagingTableInterface = {
    props : PageInterface
}
const TablePaging:FC<PagingTableInterface> = ({props}) => {
    const listPage = [];
    for (let index = 1; index <= props.total; index++) {
        listPage.push(
        <li key={Math.random().toString(5)} onClick={()=> props.handlePage(index)}>
            <span className={`${props.page===index ? 'bg-gray-300' : 'bg-white'} hover:cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-900 border border-gray-300 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`} >
            {index}
            </span>
        </li>)
    }
    return (
        <div className="w-full flex items-center justify-start py-4 space-x-4">
            <div className="flex items-center space-x-4">
                <label className="text-gray-900">Rows Per Page</label>
                <select onChange={(e)=> props.setLimit(parseInt(e.target.value))} className="w-12 h-8 text-gray-900 border rounded-lg">
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={1000}>1000</option>
                </select>    
            </div>
            <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">
                    <li onClick={()=> props.handlePage(-1)}>
                        <span
                            className="flex hover:cursor-pointer items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-900 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                            Previous
                        </span>
                    </li>
                    {
                        listPage
                    }
                    <li onClick={()=> props.handlePage(-2)}>
                        <span
                        className="flex hover:cursor-pointer items-center justify-center px-3 h-8 leading-tight text-gray-900 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                        >
                            Next
                        </span>
                    </li>
                </ul>
            </nav>
        </div>

    )
}

export default TablePaging