import { AxiosError } from "axios"
import { api } from "../../../services"

export const getIndicator = async (url:string, ) => {
    try {
        const response = await api.get(url)
        return response.data.data
    } catch (error) {
        const err = error as AxiosError
        return err
    }
}