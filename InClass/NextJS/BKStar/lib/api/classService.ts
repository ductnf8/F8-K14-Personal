import apiClient from './apiClient'
import {Class} from '../types/auth'

export const getClasses = async (): Promise<Class[]> => {
    try {
        console.log('Fetching classes...')
        const response = await apiClient.get('/master/class/')
        console.log('Classes response:', response.data)
        return response.data
    } catch (error: any) {
        console.error('Failed to fetch classes:', error.response?.status, error.response?.data)
        throw new Error(error.response?.data?.detail || 'Không thể tải danh sách lớp học')
    }
}

export const createClass = async (data: { name: string; code: string; users: number[] }): Promise<Class> => {
    try {
        console.log('Creating class with payload:', data)
        const response = await apiClient.post('/master/class/', data)
        console.log('Create class response:', response.data)
        return response.data
    } catch (error: any) {
        console.error('Failed to create class:', error.response?.status, error.response?.data)
        const errorDetail = error.response?.data?.detail
        let errorMessage = 'Tạo lớp học thất bại'
        if (Array.isArray(errorDetail)) {
            errorMessage = errorDetail.map((err: any) => err.msg || err).join(', ')
        } else if (errorDetail) {
            errorMessage = errorDetail
        }
        throw new Error(errorMessage)
    }
}