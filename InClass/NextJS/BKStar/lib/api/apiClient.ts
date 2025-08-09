import axios, {AxiosInstance, InternalAxiosRequestConfig, AxiosResponse} from 'axios'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import {toast} from 'react-toastify'
import {refreshToken} from './authService'

const apiClient: AxiosInstance = axios.create({
    baseURL: 'https://b1u9y178ok.execute-api.ap-southeast-1.amazonaws.com',
    headers: {
        'Content-Type': 'application/json',
    },
})

let isRefreshing = false
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason: any) => void }> = []

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })
    failedQueue = []
}

apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            try {
                const decoded: any = jwtDecode(accessToken)
                const currentTime = Math.floor(Date.now() / 1000)
                const timeLeft = decoded.exp - currentTime

                if (timeLeft < 300) {
                    // Token còn dưới 5 phút
                    if (!isRefreshing) {
                        isRefreshing = true
                        try {
                            const newTokens = await refreshToken()
                            Cookies.set('accessToken', newTokens.access, {
                                expires: 15 / (24 * 60),
                                secure: true,
                                sameSite: 'strict',
                            })
                            Cookies.set('refreshToken', newTokens.refresh, {
                                expires: 7,
                                secure: true,
                                sameSite: 'strict',
                            })
                            processQueue(null, newTokens.access)
                        } catch (error: any) {
                            processQueue(error, null)
                            Cookies.remove('accessToken')
                            Cookies.remove('refreshToken')
                            toast.error('Phiên đã hết hạn')
                            window.location.href = '/login'
                            return Promise.reject(error)
                        } finally {
                            isRefreshing = false
                        }
                    }

                    return new Promise((resolve, reject) => {
                        failedQueue.push({
                            resolve: (token: string) => {
                                config.headers = config.headers || {}
                                config.headers.Authorization = `Bearer ${token}`
                                resolve(config)
                            },
                            reject,
                        })
                    })
                } else {
                    config.headers = config.headers || {}
                    config.headers.Authorization = `Bearer ${accessToken}`
                }
            } catch (error) {
                console.error('Failed to decode accessToken:', error)
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                toast.error('Phiên đã hết hạn')
                window.location.href = '/login'
                return Promise.reject(error)
            }
        }
        return config
    },
    (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            toast.error('Phiên đã hết hạn')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default apiClient