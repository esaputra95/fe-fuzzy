import { FC, Fragment } from "react";
import Skeleton from "../../../../components/ui/Skeleton";
import { Performance } from "../../../../interfaces/performanceInterface";

type TableProps = {
    isLoading?: boolean,
    data: Performance[][] | undefined
}

const Table: FC<TableProps> = (props) => {
    const { 
        isLoading,
        data
    } = props;
    return (
        <div className="w-full pt-8">
            <div className="relative w-full overflow-x-auto max-h-100">
                {
                    isLoading ? 
                    <Skeleton cols={4} rows={4} /> : null
                }
                <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400">
                    <thead>
                        <tr>
                            {
                                data?.[0]?.map((value, index)=>(
                                    <td className={`p-2 ${(index%2===0?'bg-green-200': 'bg-cyan-100')}`}>
                                        {value.label}
                                    </td>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data && data.length > 0 ? data?.map((value)=> (
                            <Fragment>
                                <tr>
                                {
                                    value.map((value2, index)=>(
                                        <td className={`p-2 ${(index%2===0?'bg-green-100': 'bg-cyan-50')}`}>
                                            {
                                                value2.value
                                            }
                                        </td>
                                    ))
                                }
                                </tr>
                            </Fragment>
                        )) : null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table