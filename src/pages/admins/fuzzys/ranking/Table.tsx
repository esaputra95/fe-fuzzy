import { FC, Fragment } from "react";
import Skeleton from "../../../../components/ui/Skeleton";
import { RankingData } from "../../../../interfaces/rankingInterface";

type TableProps = {
    isLoading?: boolean,
    data: RankingData[] | undefined
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
                    <Skeleton cols={4} rows={2} /> : null
                }
                
                    {
                        data?.map((value)=>(
                            <Fragment key={Math.random().toString(5)}>
                                <table className="w-full border-gray-800 border border-x border-y text-sm text-left text-gray-900 dark:text-gray-400 mb-12">
                                <thead>
                                    <tr className="bg-deep-purple-100 border-gray-800 border border-x border-y">
                                        <th>
                                            Sub Variabel
                                        </th>
                                        <th>
                                            Faktor
                                        </th>
                                        <th>
                                            Indikator
                                        </th>
                                        <th className="text-right">
                                            Nilai Bobot
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    value.data?.map((value2, index2)=>(
                                        <Fragment key={Math.random().toString(5)}>
                                            {
                                                value2.bobot.map((value3, index3)=>{
                                                    return(
                                                    <tr className="bg-white border-gray-800 border border-x border-y dark:bg-gray-800 dark:border-gray-700">
                                                        {
                                                            index3===0 && index2===0 ? (
                                                            <td className="bg-green-50 w-4/12 p-4" rowSpan={value.subVariable?.total}>
                                                                {value.subVariable?.name}
                                                            </td>) : null
                                                        }
                                                        {
                                                            index3===0? (
                                                            <td className="bg-cyan-50 w-4/12 p-4" 
                                                                rowSpan={value2.bobot?.length}>
                                                                {value2.factor.name}
                                                            </td>) : null
                                                        }
                                                        <td>{value.subVariable?.code+'_'+value2.factor.code+''+value3.label}</td>
                                                        <td className="flex text-right justify-end">
                                                            {value3.value}
                                                        </td>
                                                    </tr>
                                                )})
                                            }
                                        </Fragment>
                                        
                                    ))
                                }
                </table>
                            </Fragment>
                        ))
                    }
            </div>
        </div>
    )
}

export default Table