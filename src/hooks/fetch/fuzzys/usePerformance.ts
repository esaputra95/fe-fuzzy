import {  useMutation } from "@tanstack/react-query"
import { Performance } from "../../../interfaces/performanceInterface"
import { getData } from "../../models/fuzzy/performanceModel"
import url from "../../../services/url"

export const usePerformance = () => {
    const { Performance } = url

    const { data, mutate, isLoading } = useMutation<Performance[][]>({
        mutationKey: ['getPerformance'],
        mutationFn: async () => await getData(Performance.get) 
    })

    const onSearch = async () => {
        mutate()
    }
    
    return {
        data,
        onSearch,
        isLoading
    }
}