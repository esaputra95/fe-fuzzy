import { AxiosError } from "axios"
import { api } from "../../../services"

const getBobot = async () => {
    try {
        const response = await api.get('dashboard/bobot');
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

const getCluster = async () => {
    try {
        const response = await api.get('/dashboard/cluster');
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

const getTotalPerformance = async (univ?:string, gender?:string, faculty?:string) => {
    try {
        const response = await api.get(`/dashboard/total-performance?`+
            `university=${univ}&`+
            `gender=${gender}&`+
            `faculty=${faculty}`);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

const getKmeans = async (univ?:string, gender?:string, faculty?:string, programStudy?:string, code?:string) => {
    try {
        const response = await api.get(`dashboard/kmeans?`+
            `university=${univ}&`+
            `gender=${gender}&`+
            `faculty=${faculty}&programStudy=${programStudy}&code=${code}`);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

const getMaster = async () => {
    try {
        const response = await api.get('dashboard/get-master');
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

export { getBobot, getCluster, getTotalPerformance, getKmeans, getMaster }