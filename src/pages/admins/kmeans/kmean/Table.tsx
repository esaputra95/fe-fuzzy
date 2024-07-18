import { FC, Fragment } from "react";
import { DataPoint, SheetData } from "../../../../interfaces/fuzzyInterface";
import { useTranslation } from "react-i18next";

type tableProps = {
    data?: SheetData[];
    centroid?: DataPoint[];
}

const header = [
    { 
        label: 'No',
        align: 'left',
        width: 'w-4'
    },
    { label: 'JC1' },
    { label: 'JC2' },
    { label: 'JC3' },
    { label: 'Nilai Min' },
    { label: 'Cluster' },
] 

const Table: FC<tableProps> = (props) => {
    const { data, centroid } = props;
    const { t } = useTranslation()
    return (
        <div className="w-full">
            {
                data && data.length > 0 ? data.map((value, index)=>{
                    return(
                        <Fragment key={Math.random().toFixed(4)}>
                            {
                                (data.length-1)>index ? (
                                    <Fragment>
                                        <div className="w-full my-4">
                                            <label className="text-lg font-semibold">
                                                {
                                                    value.sheet
                                                }
                                            </label>
                                        </div>
                                        <table className="w-full text-sm text-left text-gray-900 dark:text-gray-400 mb-16">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    {
                                                        header.map((value)=>(
                                                            <th key={Math.random()} scope="col" className={`px-6 py-3 ${value.width ?? ''}`}>
                                                                {t(value.label)}
                                                            </th>
                                                        ))
                                                    }
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                value.content.map((value2, index2)=> (
                                                    <tr key={Math.random().toFixed(4)} className="overflow-auto bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                            {(index2+1)}
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {value2.JC1}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value2.JC2}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value2.JC3}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value2.min}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {value2.cluster}
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                            </tbody>
                                        </table>
                                        <div>
                                            <span>
                                            {
                                                (data.length-2) === index ? 'Iterasi berakhir pada iterasi ke '+(index+1) : ''
                                            }
                                            </span>
                                            <div  className="w-full grid grid-cols-3 mb-12">
                                                <span className="font-semibold">C1: {centroid?.[index].c1}</span>
                                                <span className="font-semibold">C2: {centroid?.[index].c2}</span>
                                                <span className="font-semibold">C3: {centroid?.[index].c3}</span>
                                            </div>
                                        </div>
                                    </Fragment>
                                ) : null
                            }
                            
                            
        
                        </Fragment>
                    )
                }) : null
            }
        </div>
    )
}

export default Table