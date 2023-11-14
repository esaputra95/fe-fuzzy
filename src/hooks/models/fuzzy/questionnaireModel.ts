import { AxiosError } from "axios"
import { api } from "../../../services"
import { QuestionnaireInterface } from "../../../interfaces/questionnaireInterface"

export const getIndicator = async (url:string, ) => {
    try {
        const response = await api.get(url)
        return response.data.data
    } catch (error) {
        const err = error as AxiosError
        return err
    }
}

export const postData = async (url:string, data:QuestionnaireInterface) => {
    try {
        const response = await api.post(url, data);
        return response.data;
    } catch (error) {
        const err = error as AxiosError
        return err
    }
}

export const getData = async (url:string) => {
    try {
        const response = await api.get(url);
        return response.data.data
    } catch (error) {
        return error
    }
}