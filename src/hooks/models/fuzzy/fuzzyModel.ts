import { api } from "../../../services";
import { FuzzyInterface, FuzzySearchInterface } from "../../../interfaces/fuzzyInterface";
import { AxiosError } from "axios";

interface ParamFuzzyInterface extends FuzzySearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamFuzzyInterface | undefined) => {
	try {
		console.log('ayam');
		
		if(params?.subVariableId && params.factorId){
			const response = await api.get(url, { params: { ...params } });
			if (response.status === 200) return response.data.data;
			throw new Error(`Request failed with status ${response.status}`);
		}
		throw new Error('Parameter not match')
		
	} catch (error) {
		const err = error as AxiosError
		return err;
	}
};

const postData = async (url:string, data:FuzzyInterface) => {
	try {
		const response = await api.post(url, data);
		if(response.status === 200) return response.data
		throw new Error(`Request failed with status ${response.status}`);
	} catch (error) {
		return error;
	}
}

const deleteData = async (url:string, id:number) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		return error
	}
}

const getDataById = async (url:string, id:number) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data.data.Fuzzy
	} catch (error) {
		return error
	}
}

const getDataSelect = async (url:string, params:ParamFuzzyInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data.data;
	} catch (error) {
		return error
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
