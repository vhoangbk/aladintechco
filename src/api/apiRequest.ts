import axios, { AxiosError } from "axios";
import { Alert } from "react-native";
import {get_AccessKeyStorage} from '../commons/AsyncStorage';

const preRequest = (url: string) => {
}

const handleRequestSuccess = (data: JSON) => {
   
}

const handleRequestError = (error: ApiError) => {
    showMessage(error.message);
};

const getHeader = async () => {
    const token = await get_AccessKeyStorage();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
        };
    } return {};
}

export const getRequest = async (url: string) => {
    console.log('[request]', url);
    preRequest(url);
    try {
        let headers = await getHeader();
        const response = await axios.get(url, {
            headers: headers,
        });
        console.log('[response]', response.data);
        handleRequestSuccess(response.data);
        return response.data;
      } catch (error: AxiosError) {
        console.log('api error', error.message);
        let apiError:  ApiError = {
            status: error.response?.status || 500,
            message: error.message || MessgeError[500],
        };
        handleRequestError(apiError);
        return null;
      }
};

export const postRequest = async (url: string, params: Object = {}) => {
    console.log('[request]', url, 'params', params);
    preRequest(url);
    try {
        let headers = await getHeader();
        const response = await axios.post(url, {
            params: params,
            headers: headers,
        });
        console.log('[response]', response.data);
        handleRequestSuccess(response.data);
        return response.data;
      } catch (error: AxiosError) {
        console.log('api error', error.message);
        let apiError:  ApiError = {
            status: error.response?.status || 500,
            message: error.message || MessgeError[500],
        };
        handleRequestError(apiError);
        return null;
      }
};

const showMessage = (message: string) => {
    Alert.alert('', message, [
        {text: 'Close', onPress: () => {}},
        ]
    );
};

type ApiError = {
    status: number;
    message: string;
}

const MessgeError = {
    500: 'Server error',
    404: 'Not found',
};