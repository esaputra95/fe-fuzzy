import { LoginInterface } from "../../../interfaces/loginInterface";
import { api } from "../../../services";

export const login = async (url:string, data:LoginInterface) => {
    try {
        const response = await api.post(url, data);
        return response.data
    } catch (error) {
        return error
    }
}