import Cookies from 'js-cookie'
import apiClient from './apiClient'
import {
    LoginCredentials,
    LoginResponse,
    RegisterCredentials,
    RegisterResponse,
    RefreshTokenResponse
} from '@/lib/types/auth'

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    console.log('Sending login request with payload:', credentials)
    try {
        console.log('Starting login request...')
        const response = await apiClient.post('/login/', credentials)
        const data: LoginResponse = response.data
        console.log('Login response:', data)
        console.log('Login request completed.')

        Cookies.set('accessToken', data.access, {
            expires: 15 / (24 * 60), // 15 minutes
            secure: true,
            sameSite: 'strict',
        })
        Cookies.set('refreshToken', data.refresh, {
            expires: 7, // 7 days
            secure: true,
            sameSite: 'strict',
        })

        return data
    } catch (error: any) {
        console.error('Login request failed with status:', error.response?.status, 'Error details:', error.response?.data)
        throw new Error(error.response?.data?.detail || 'Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.')
    }
}

export async function register(credentials: RegisterCredentials): Promise<RegisterResponse> {
    console.log('Sending register request with payload:', credentials)
    try {
        console.log('Starting register request...')
        const response = await apiClient.post('/master/user/', credentials)
        const data: RegisterResponse = response.data
        console.log('Register response:', data)
        console.log('Successfully registered email:', credentials.email)
        console.log('Register request completed.')
        return data
    } catch (error: any) {
        console.error('Register request failed with status:', error.response?.status, 'Error details:', error.response?.data)
        throw new Error(error.response?.data?.detail || 'Đăng ký thất bại. Vui lòng kiểm tra thông tin.')
    }
}

export async function refreshToken(): Promise<RefreshTokenResponse> {
    const refreshToken = Cookies.get('refreshToken')
    if (!refreshToken) {
        throw new Error('No refresh token available')
    }

    console.log('Sending refresh token request with payload:', {refresh: refreshToken})
    try {
        console.log('Starting refresh token request...')
        const response = await apiClient.post('/login/get_new_token/', {refresh: refreshToken})
        const data: RefreshTokenResponse = response.data
        console.log('Refresh token response:', data)
        console.log('Refresh token request completed.')
        return data
    } catch (error: any) {
        console.error('Refresh token request failed with status:', error.response?.status, 'Error details:', error.response?.data)
        throw new Error(error.response?.data?.detail || 'Làm mới token thất bại')
    }
}