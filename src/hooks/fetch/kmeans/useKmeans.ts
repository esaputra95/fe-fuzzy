import { useState } from "react";
import { 
    downloadFile, processKMeans, processDownload, getCentroid } from './../../models/kmean/kmeanModel'
import { SheetData } from "../../../interfaces/fuzzyInterface";

interface Data {
    header: string[],
    dataBody: number[][]
}
export const useKMeans = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SheetData[]>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [dataCentroid, setDataCentroid] = useState<Data>()
    const [form, setForm] = useState({centroid1:'1', centroid2:'59', centroid3:'168'});
    const handleOnProcessKMeans = async () => {
        setLoading(state=> !state)
        const process = await processKMeans(form);
        handleCentroid()
        setData(process.data)
        setLoading(false)
    }

    const handleDownload = async () => {
        const process = await processDownload()
        if(process==200){
            await downloadFile();
        }
    }

    const handleCentroid = async () => {
        const data = await getCentroid()
        if(data.status){
            let header:string[] = []
            let dataBody:number[][]=[]
            for (let index = 0; index < data.data.length; index++) {
                let tmpDataBody:number[]=[]
                for (const key in data.data[index]) {
                    if(index===1){
                        header = [...header, key]
                    }
                    tmpDataBody=[...tmpDataBody,
                        data.data[index][key]
                    ]
                }
                dataBody=[...dataBody, tmpDataBody]
            }
            console.log({dataBody});
            
            setDataCentroid({header:header, dataBody:dataBody})
        }
    }

    return {
        handleOnProcessKMeans,
        loading,
        data,
        handleDownload,
        dataCentroid,
        form,
        setForm
    }
}