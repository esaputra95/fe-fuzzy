import { api } from "../../../services";
import { VariableInterface, VariableSearchInterface } from "../../../interfaces/master/variableInterface";
import { AxiosError } from "axios";

interface ParamVariableInterface extends VariableSearchInterface {
  	page?: number,
	limit?: number,
	order?: string
}

const getData = async (url:string, params:ParamVariableInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data.data;
		throw new Error(`Request failed with status ${response.status}`);
	} catch (error) {
		let err = error as AxiosError
		return err;
	}
};

const postData = async (url:string, data:VariableInterface) => {
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
		throw error;
	}
}

const deleteData = async (url:string, id:string) => {
	try {
		const response = await api.delete(`${url}/${id}`)
		if(response.status===204) return true
	} catch (error) {
		return error
	}
}

const getDataById = async (url:string, id:string) => {
	try {
		const response = await api.get(`${url}/${id}`)
		if(response.status===200) return response.data.data.variable
	} catch (error) {
		return error
	}
}

const getDataSelect = async (url:string, params:ParamVariableInterface) => {
	try {
		const response = await api.get(url, { params: { ...params } });
		if (response.status === 200) return response.data.data.variables;
	} catch (error) {
		return error
	}
}

export { getData, postData, deleteData, getDataById, getDataSelect };
