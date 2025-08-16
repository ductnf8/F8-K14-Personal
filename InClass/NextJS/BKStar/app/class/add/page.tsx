'use client'

import {useState} from 'react'
import {useRouter} from 'next/navigation'
import {Button, TextField} from '@mui/material'
import {toast} from 'react-toastify'
import {createClass} from '@/lib/api/classService'

export default function AddClassPage() {
    const [className, setClassName] = useState('')
    const [secretCode, setSecretCode] = useState('')
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const router = useRouter()

    const validateClassName = (value: string) => {
        if (!value.trim()) {
            return 'Tên lớp học không được để trống'
        }
        if (value.length < 3) {
            return 'Tên lớp học phải có ít nhất 3 ký tự'
        }
        return ''
    }

    const validateSecretCode = (value: string) => {
        if (!value.trim()) {
            return 'Mã bảo vệ không được để trống'
        }
        if (value.length < 6) {
            return 'Mã bảo vệ phải có ít nhất 6 ký tự'
        }
        return ''
    }

    const handleClassNameBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const error = validateClassName(e.target.value)
        setErrors((prev) => ({...prev, className: error}))
    }

    const handleSecretCodeBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const error = validateSecretCode(e.target.value)
        setErrors((prev) => ({...prev, secretCode: error}))
    }

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        const classNameError = validateClassName(className)
        if (classNameError) {
            newErrors.className = classNameError
        }
        const secretCodeError = validateSecretCode(secretCode)
        if (secretCodeError) {
            newErrors.secretCode = secretCodeError
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) {
            Object.values(errors).forEach((error) => error && toast.error(error))
            return
        }

        try {
            const response = await createClass({name: className, code: secretCode, users: [0]})
            console.log('Created class:', response) // Log chi tiết response
            toast.success('Tạo lớp học thành công')
            router.push('/class?refresh=true') // Thêm query param refresh
        } catch (error: any) {
            toast.error(error.message || 'Tạo lớp học thất bại')
        }
    }

    return (
        <div className="min-h-screen flex flex-col px-4 md:px-6 pt-12 bg-gray-50">
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-8 px-2">
                Thêm lớp học mới
            </h1>

            <div className="flex-1 flex justify-center items-center w-full">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full md:max-w-lg space-y-6"
                >
                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Tên lớp học <span className="text-red-500">*</span>
                        </label>
                        <TextField
                            type="text"
                            required
                            fullWidth
                            value={className}
                            onChange={(e) => {
                                setClassName(e.target.value)
                                const error = validateClassName(e.target.value)
                                setErrors((prev) => ({...prev, className: error}))
                            }}
                            onBlur={handleClassNameBlur}
                            error={!!errors.className}
                            helperText={errors.className}
                            placeholder="Nhập tên lớp học"
                            sx={{
                                '& .MuiInputBase-root': {
                                    border: '1px solid #3b82f6',
                                    borderRadius: '4px',
                                    '&:hover': {borderColor: '#2563eb'},
                                },
                                '& .MuiInputBase-input': {
                                    padding: '12px 16px',
                                    fontSize: '1rem',
                                },
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-base font-medium text-gray-700 mb-2">
                            Mã bảo vệ <span className="text-red-500">*</span>
                        </label>
                        <TextField
                            type="text"
                            required
                            fullWidth
                            value={secretCode}
                            onChange={(e) => {
                                setSecretCode(e.target.value)
                                const error = validateSecretCode(e.target.value)
                                setErrors((prev) => ({...prev, secretCode: error}))
                            }}
                            onBlur={handleSecretCodeBlur}
                            error={!!errors.secretCode}
                            helperText={errors.secretCode}
                            placeholder="Nhập mã bảo vệ"
                            sx={{
                                '& .MuiInputBase-root': {
                                    border: '1px solid #3b82f6',
                                    borderRadius: '4px',
                                    '&:hover': {borderColor: '#2563eb'},
                                },
                                '& .MuiInputBase-input': {
                                    padding: '12px 16px',
                                    fontSize: '1rem',
                                },
                            }}
                        />
                    </div>

                    <div className="flex justify-center gap-6">
                        <Button
                            variant="outlined"
                            onClick={() => router.push('/class')}
                            sx={{
                                padding: '8px 20px',
                            }}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                padding: '8px 20px',
                            }}
                        >
                            Tạo mới
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}