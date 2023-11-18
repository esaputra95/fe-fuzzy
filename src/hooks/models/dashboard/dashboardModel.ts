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

const getTotalPerformance = async () => {
    try {
        const response = await api.get('/dashboard/total-performance');
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

const getKmeans = async () => {
    try {
        const response = await api.get('dashboard/kmeans');
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}

export { getBobot, getCluster, getTotalPerformance, getKmeans }