import { api } from "../../../services";
import { AxiosError } from "axios";

const processKMeans = async () => {
	try {
		const response = await api.get('fuzzy/process-kmeans');
		return response.data
	} catch (error) {
		const err = error as AxiosError
		return err
	}
}

const downloadFile = async () => {
	try {
		const response = await api.get('fuzzy/download', {
			responseType: 'blob'
		})
		const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'download/DataIterasi.xlsx'; // Replace with the desired file name
        a.click();
        window.URL.revokeObjectURL(url);
		return response
	} catch (error) {
		return error as AxiosError
	}
}

const processDownload = async () => {
	try {
		const response = await api.post('fuzzy/compile-excel')
		return response.status
	} catch (error) {
		return error as AxiosError
	}
}

const getCentroid = async () => {
	try {
		const response = await api.get('fuzzy/centroid');
		return response.data
	} catch (error) {
		return error as AxiosError
	}
}

export { processKMeans, downloadFile, processDownload, getCentroid };
