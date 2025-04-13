import { FC, Fragment, useState } from "react";
import { Content, DataPoint, SheetData } from "../../../../interfaces/fuzzyInterface";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/input";

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
    const [dataFilter, setDataFilter] = useState<Content[]>()

    const filterData = (val:string) => {
        const length = data?.length ? data.length-2 : 0
        console.log({length});
        
        const filter = data?.[length].content.filter((d)=> d.cluster===val);
        setDataFilter(filter);
        
    }
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
                                            {
                                                (data.length-2) === index ? (
                                                    <div  className="w-full grid grid-cols-3 mb-12">
                                                        <div>
                                                            <Button onClick={()=> filterData('C1')}>C1: {centroid?.[index].c1}</Button>
                                                        </div>
                                                        <div>
                                                            <Button onClick={()=> filterData('C2')}>C2: {centroid?.[index].c2}</Button>
                                                        </div>
                                                        <div>
                                                            <Button onClick={()=> filterData('C3')}>C3: {centroid?.[index].c3}</Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div  className="w-full grid grid-cols-3 mb-12">
                                                        <div>
                                                            <span>C1: {centroid?.[index].c1}</span>
                                                        </div>
                                                        <div>
                                                            <span>C2: {centroid?.[index].c2}</span>
                                                        </div>
                                                        <div>
                                                            <span>C3: {centroid?.[index].c3}</span>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                            </span>
                                            
                                        </div>
                                    </Fragment>
                                ) : null
                            }
                        </Fragment>
                    )
                }) : null
            }
            <div className="w-full">
                <table>
                {
                    dataFilter && dataFilter.length > 0 && 
                    dataFilter.map((v)=> (
                        <tr>
                            <td>{v.cluster}</td>
                        </tr>
                    ))
                }
                </table>
            </div>
        </div>
    )
}

export default Table