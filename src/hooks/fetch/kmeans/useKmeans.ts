import { useState } from "react";
import { downloadFile, processKMeans, processDownload, getCentroid } from './../../models/kmean/kmeanModel'
import { SheetData } from "../../../interfaces/fuzzyInterface";

export const useKMeans = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SheetData[]>();
    const [dataCentroid, setDataCentroid] = useState<{[key:string]:number}[]>()
    const handleOnProcessKMeans = async () => {
        setLoading(state=> !state)
        const process = await processKMeans();
        setData(process.data)
        setLoading(false)
        handleCentroid()
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
            setDataCentroid(data.data)
        }
    }

    return {
        handleOnProcessKMeans,
        loading,
        data,
        handleDownload,
        dataCentroid
    }
}