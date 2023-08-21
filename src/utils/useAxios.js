import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from ".";

const useAxios = async function apiRequest(request){
    const token = await getToken()
    const resp = await axios.request({
        ...request,
        headers: {
            ...request.headers,
            authorization: `Bearer ${token}`,
            mode: "cors",
        },
    });
    
    if (resp.status === 401) {
    }
    return resp;
};
export default useAxios;
