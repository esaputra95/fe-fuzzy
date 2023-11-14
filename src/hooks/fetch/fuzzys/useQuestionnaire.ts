import { useQuery } from "@tanstack/react-query"
import { getData } from "../../models/fuzzy/questionnaireModel"
import url from "../../../services/url"

export const useQuestionnaire = () => {
    const { Questionnaire } = url
    const { data } = useQuery({
        queryKey: ['get-questionnaire'],
        queryFn: async () => await getData(Questionnaire.get)
    })
    return{
        data
    }
}