import { FC, Fragment, useState } from "react";
import { Content, DataPoint, SheetData } from "../../../../interfaces/fuzzyInterface";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/input";
import ModalForm from "../../../../components/ui/modal/ModalForm";
import { getRecommendation } from "../../../../hooks/models/kmean/kmeanModel";

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
    const [filter, setFilter] = useState<string>()
    const [dataFilter, setDataFilter] = useState<Content[]>()
    const [dataRekom, setDataRekom]= useState<{label: string;
        variabel: string;
        type: 'Rendah' | 'Sedang' | 'Tinggi'; // Jika hanya 3 pilihan, bisa di-restrict
        rekomendasi: string;}[]>([])

    const filterData = (val:string) => {
        const length = data?.length ? data.length-2 : 0
        console.log({val});
        
        setFilter(val)
        const filter = data?.[length].content.filter((d)=> d.cluster===val);
        setDataFilter(filter);
    }

    const showRecommendation = async (filter?:string) => {
        if(filter){
            const response:{status:boolean, data:{label: string;
                variabel: string;
                type: 'Rendah' | 'Sedang' | 'Tinggi'; // Jika hanya 3 pilihan, bisa di-restrict
                rekomendasi: string;}[]} = await getRecommendation(filter) 
            if(response?.status){
                setDataFilter([])
                setDataRekom(response?.data)
            }
        }
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
            <ModalForm pathName={false} onClose={()=>setDataFilter([])} title={`Data Dosen Centroid ${filter}`} visible={Boolean(dataFilter?.length)}>
                <div className="w-full grid grid-cols-5 gap-2">
                    {
                        dataFilter && dataFilter.length > 0 && 
                        dataFilter.map((v)=> (
                            <div>{v.code}</div>
                        ))
                    }
                </div>
                <div className="w-full">
                    <Button onClick={()=>showRecommendation(filter)} variant="success">Lihat Rekomendasi</Button>
                </div>
            </ModalForm>
            <ModalForm pathName={false} onClose={()=>setDataRekom([])} title={`Rekomendasi ${filter}`} visible={Boolean(dataRekom?.length)}>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Variabel</th>
                            <th className="px-6 py-3">Label</th>
                            <th className="px-6 py-3">Rekomendasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataRekom.length>0 && dataRekom?.map(v=>(
                                <tr>
                                    <td className="px-6 py-3">
                                        {v.label}
                                    </td>
                                    <td className="px-6 py-3">
                                        {v.variabel}
                                    </td>
                                    <td className="px-6 py-3">
                                        {v.rekomendasi}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </ModalForm>
            
        </div>
    )
}

export default Table