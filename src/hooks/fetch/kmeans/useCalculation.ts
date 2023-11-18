import { useState } from "react";
import { processCalculations } from '../../models/kmean/calculationModel'

export const useCalculations = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string>()
    
    const handleOnProcessCalculations = async () => {
        setLoading(state=> !state)
        await processCalculations();
        setMessage('Proses kalkulasi data yang akan ditampilan didashboard sudah selesai')
        setLoading(false)
    }

    return {
        handleOnProcessCalculations,
        loading,
        message
    }
}