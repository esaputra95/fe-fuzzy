import { useState } from "react";
import { downloadFile, processKMeans } from './../../models/kmean/kmeanModel'

export const useKMeans = () => {
    const [loading, setLoading] = useState(false)
    const handleOnProcessKMeans = async () => {
        setLoading(state=> !state)
        const process = await processKMeans();
        console.log({process});
        
        if(process===200){
            await handleDownload()
        }
    }

    const handleDownload = async () => {
        const download = await downloadFile();
        
        if(download){
            setLoading(state=> !state)
        }
    }

    return {
        handleOnProcessKMeans,
        loading
    }
}