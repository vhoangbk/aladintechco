import axios, { AxiosResponse } from 'axios';
import { Alert } from 'react-native';
import {get_AccessKeyStorage, save_AccessKeyStorage} from '../commons/AsyncStorage';

const handleRequestError = (error: ApiError) => {
    showMessage(error.message);
    if (error.status === 401) {
        save_AccessKeyStorage('');
    }
};

const getHeader = async () => {
    const token = await get_AccessKeyStorage();
    if (token) {
        return {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };
    } return {};
}

export const getRequest = async (url: string) => {
    return await request(url, 'get');
};

const request = async (url: string, method: 'get' | 'post' | 'put', params: Object = {}) => {
    console.log('[request]', url, 'params', params);
    try {
        let headers = await getHeader();
        var response: AxiosResponse | undefined;
        if (method === 'post') {
            response = await axios.post(url, params, {
                headers: headers,
            });
        } else if(method === 'put'){
            response = await axios.put(url, params, {
                headers: headers,
            });
        } else if (method === 'get') {
            response = await axios.get(url, {
                headers: headers,
            });
        }
        console.log('[response]', response?.status, response?.data);
        return response?.data;
      } catch (error: unknown) {
        handleApiException(error);
        return null;
      }
}

export const postRequest = async (url: string, params: Object = {}) => {
    return await request(url, 'post', params);
};

export const putRequest = async (url: string, params: Object = {}) => {
    return await request(url, 'put', params);
};

const handleApiException = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log('api error', error.message);
        let apiError:  ApiError = {
            status: error.response?.status || 500,
            message: error.message || MessgeError[500],
        };
        handleRequestError(apiError);
        return null;
    } else {
        console.log('Unexpected error', error);
        handleRequestError({
            status: 500,
            message: MessgeError[500],
        });
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


