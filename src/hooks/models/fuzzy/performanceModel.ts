import { api } from "../../../services";
import { AxiosError } from "axios";

const getData = async (url:string, university:string) => {
	try {
		const response = await api.get(`${url}?university=${university}`);
		console.log({response})
		if (response.status === 200) return response.data.data;
		throw new Error('Parameter not match')
		
	} catch (error) {
		const err = error as AxiosError
		return err;
	}
};


export { getData};
