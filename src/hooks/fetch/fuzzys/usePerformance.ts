import {  useMutation } from "@tanstack/react-query"
import { getData } from "../../models/fuzzy/performanceModel"
import url from "../../../services/url"
import { useEffect, useState } from "react"
import { DataSelectOptionInterface } from "../../../interfaces/globalInterface"
import { getMaster } from "../../models/dashboard/dashboardModel"

export const usePerformance = () => {
    const [ selectUniversity, setSelectUniversity ] = useState('')
    const [ university, setUniversity ] = useState<DataSelectOptionInterface[]>([{value:'', label:''}]);
    const { Performance } = url;

    useEffect(()=> {
        getDataMaster();
    }, [])
    const { data, mutate, isLoading } = useMutation({
        mutationFn: (university:string) => getData(Performance.get,university) 
    })

    const getDataMaster = async () => {
        const data = await getMaster();
        if(data.status){
            setUniversity(data.data.university)
        }
    }

    const onSearch = async (university: string) => {
        mutate(university)
    }
    
    return {
        data,
        onSearch,
        isLoading,
        university,
        selectUniversity,
        setSelectUniversity
    }
}