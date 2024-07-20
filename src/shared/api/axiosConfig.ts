import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

const api = (): AxiosInstance => {
    const baseURL = import.meta.env.VITE_BASE_URL as string
    const apiKey = import.meta.env.VITE_API_KEY as string

    const config: AxiosRequestConfig = {
        baseURL,
        headers: {
            'Content-Type': 'application/json',
            'accept': 'application/json',
            'X-API-KEY': apiKey,
        },
    }

    return axios.create(config)
}

export default api