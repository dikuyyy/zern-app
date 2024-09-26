import axios, {HttpStatusCode} from 'axios';
import type {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {useAuthStore} from "#imports";

interface AxiosOptions {
    isNeedAuthorize?: boolean;
}

interface AxiosRequestOptions {
    method: string;
    url: string;
    data?: any;
}

export default defineNuxtPlugin(() => {
    const HttpMethod: any = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        PATCH: 'PATCH',
        DELETE: 'DELETE',
    }

    const useAxios = ({isNeedAuthorize = true}: AxiosOptions = {}): AxiosInstance => {
        const config = useRuntimeConfig();
        const auth = useAuthStore();
        const instance: AxiosInstance = axios.create({
            baseURL: config.public.apiUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        instance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (isNeedAuthorize) {
                    const token = auth.token;
                    if (token) {
                        config.headers.set('Authorization', `Bearer ${token}`);
                    }
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return instance;
    };

    const axiosRequest = async ({method = HttpMethod.GET, url = "", data = ""}: AxiosRequestOptions) => {
        const auth = useAuthStore();
        try {
            const axiosInstance = useAxios();
            let response;

            switch (method) {
                case HttpMethod.GET:
                    response = await axiosInstance.get(url);
                    break;
                case HttpMethod.POST:
                    response = await axiosInstance.post(url, data);
                    break;
                case HttpMethod.PUT:
                    response = await axiosInstance.put(url, data);
                    break;
                case HttpMethod.DELETE:
                    response = await axiosInstance.delete(url);
                    break;
                default:
                    throw new Error(`Unsupported HTTP method: ${method}`);
            }
            return response.data;
        } catch (error: any) {
            if(error?.response?.data?.error === 'Unauthorized access - please login') {
                auth.logout();
            }
            return Promise.reject(error);
        }
    }

    return {
        provide: {
            axios: axiosRequest,
            httpMethod: HttpMethod,
        }
    }
})


