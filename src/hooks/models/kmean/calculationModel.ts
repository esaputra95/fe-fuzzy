import { api } from "../../../services";
import { AxiosError } from "axios";

const processCalculations = async () => {
	try {
		const response = await api.get('fuzzy/calculation-centroid');
		return response.data
	} catch (error) {
		const err = error as AxiosError
		return err
	}
}

export { processCalculations };
