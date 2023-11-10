import {  useMutation } from "@tanstack/react-query"
import { RankingData } from "../../../interfaces/rankingInterface"
import { getData } from "../../models/fuzzy/rankingModel"
import url from "../../../services/url"

export const useRanking = () => {
    const { Ranking } = url

    const { data, mutate, isLoading } = useMutation<RankingData[]>({
        mutationKey: ['getRanking'],
        mutationFn: async () => await getData(Ranking.get) 
    })

    const onSearch = async () => {
        console.log('data');
        
        mutate()
    }

console.log({data});
    
    return {
        data,
        onSearch,
        isLoading
    }
}