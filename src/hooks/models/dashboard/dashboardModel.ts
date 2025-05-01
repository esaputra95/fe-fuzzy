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

const getMaster = async ({university, faculty, programStudy}:{university?: string; faculty?: string; programStudy?: string}) => {
    try {
        const response = await api.get(`dashboard/get-master?university=${university}&faculty=${faculty}&programStudty=${programStudy}`);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
} 

const getMasterSelect = async ({url, university, faculty, programStudy}:{url:string; university?: string; faculty?: string; programStudy?: string}) => {
    try {
        const params = new URLSearchParams();
        if (university) params.append('university', university);
        if (faculty) params.append('faculty', faculty);
        if (programStudy) params.append('programStudy', programStudy);
        const response =  await api.get(`${url}?${params.toString()}`);
        return response.data
    } catch (error) {
        return error as AxiosError
    }
}


export { getBobot, getCluster, getTotalPerformance, getKmeans, getMaster, getMasterSelect }