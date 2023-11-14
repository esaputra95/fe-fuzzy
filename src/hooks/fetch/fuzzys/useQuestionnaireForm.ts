import { SubmitHandler, useForm } from "react-hook-form"
import { FormQuestionnaire, QuestionnaireInterface } from "../../../interfaces/questionnaireInterface"
import { yupResolver } from "@hookform/resolvers/yup"
import QuestionnaireSchema from "../../../schema/questionnaireSchema"
import { useMutation, useQuery } from "@tanstack/react-query"
import { getIndicator, postData } from "../../models/fuzzy/questionnaireModel"
import url from "../../../services/url"
import { useNavigate } from "react-router-dom"

export const useQuestionnaireForm = () => {
    const navigate = useNavigate()
    const { Questionnaire } = url
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<QuestionnaireInterface>({
        resolver: yupResolver(QuestionnaireSchema().schema)})
    
    const { data:indicator } = useQuery<FormQuestionnaire[]>({
        queryKey:['questionnaire'],
        queryFn: async () => await getIndicator(Questionnaire.indicator)
    });
    
    const { mutate } = useMutation({
        mutationKey: ['post-questionnaire'],
        mutationFn: async (data:QuestionnaireInterface) => await postData(Questionnaire.post, data),
        onSuccess: () => {
            navigate('/questionnaire-respondent')
        }
    })

    const onSubmit: SubmitHandler<QuestionnaireInterface> = (data) => {
        mutate(data)
    }

    return {
        register,
        handleSubmit,
        errors,
        indicator,
        onSubmit
    }
}