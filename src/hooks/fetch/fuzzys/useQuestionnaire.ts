import { useForm } from "react-hook-form"
import { QuestionnaireInterface } from "../../../interfaces/questionnaireInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import QuestionnaireSchema from "../../../schema/questionnaireSchema"
import { useQuery } from "@tanstack/react-query"
import { getIndicator } from "../../models/fuzzy/questionnaireModel"
import url from "../../../services/url"
import { IndicatorInterface } from "../../../interfaces/master/IndicatorInterface"

export const useQuestionnaire = () => {
    const { Questionnaire } = url
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuestionnaireInterface>({
        resolver: yupResolver(QuestionnaireSchema().schema)})
    
    const { data:indicator } = useQuery<IndicatorInterface[]>({
        queryKey:['questionnaire'],
        queryFn: async () => await getIndicator(Questionnaire.indicator)
    })

    return {
        register,
        handleSubmit,
        errors,
        indicator
    }
}