import { api } from "../../../services";
import { IndicatorInterface, IndicatorSearchInterface } from "../../../interfaces/master/IndicatorInterface";
import { AxiosError } from "axios";

interface ParamIndicatorInterface extends IndicatorSearchInterface {
	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamIndicatorInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data.data;
		throw new Error(`Request failed with status ${response.status}`);
	} catch (error) {
		const err = error as AxiosError
		return err;
	}
};

const postData = async (url:string, data:IndicatorInterface) => {
	try {
		if(data.id){
			const response = await api.put(`${url}/${data.id}`, data);
			if(response.status === 200) return response.data
			throw new Error(`Request failed with status ${response.status}`);
		}else{
			const response = await api.post(url, data);
			if(response.status === 200) return response.data
			throw new Error(`Request failed with status ${response.status}`);
		}
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
		if(response.status===200) return response.data.data.indicator
	} catch (error) {
		return error
	}
}

const getDataSelect = async (url:string, params:ParamIndicatorInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data.data.indicators;
	} catch (error) {
		return error
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
