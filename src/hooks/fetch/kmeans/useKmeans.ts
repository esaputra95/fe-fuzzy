import { useState } from "react";
import { downloadFile, processKMeans, processDownload } from './../../models/kmean/kmeanModel'
import { SheetData } from "../../../interfaces/fuzzyInterface";

export const useKMeans = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<SheetData[]>();
    const handleOnProcessKMeans = async () => {
        setLoading(state=> !state)
        const process = await processKMeans();
        setData(process.data)
        setLoading(false)
    }

    const handleDownload = async () => {
        const process = await processDownload()
        if(process==200){
            await downloadFile();
        }
    }

    return {
        handleOnProcessKMeans,
        loading,
        data,
        handleDownload
    }
}