import axios, { AxiosError, AxiosResponse } from 'axios';

export interface APIResponseBase<T = unknown> {
  status: 'OK' | 'ERROR';
  error?: string | string[];
  data?: T;
}

export type APIResponse<T = unknown> = APIResponseBase<T> | null;

export const client = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})

const handleAPIResponse = (response: AxiosResponse<APIResponseBase>) => {
    const data = response.data;
    if (data.status === 'OK')
        return response;

    return Promise.reject(response); // throw unhandled error
}

const handleAPIError = (error: AxiosError) => { // this will handle client errors, no need to catch anything just check if data is not null
    if (error.response) {
        const data = error.response.data as APIResponseBase<undefined>;
        const errors: string|string[] = data.error ?? [];

        console.warn(error.response.status, errors);
    } else if (error.request) {
        console.warn('No response from server');
    } else {
        console.warn(`Error: ${error.message}`);
    }

    // toast should be added
    return error.response;
}

client.interceptors.response.use(handleAPIResponse, handleAPIError);
