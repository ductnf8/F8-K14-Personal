'use client'

import React, {useState} from 'react'
import {Box, Typography, Button, TextField, Link} from '@mui/material'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'
import DOMPurify from 'dompurify'
import {register} from '@/lib/api/authService'
import {validateRegisterForm} from '@/lib/utils/validation'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const router = useRouter()

    const sanitizeInput = (input: string) => {
        return DOMPurify.sanitize(input).trim()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        // Sanitize inputs
        const sanitizedName = sanitizeInput(name)
        const sanitizedEmail = sanitizeInput(email)
        const sanitizedPassword = sanitizeInput(password)

        // Validate form
        const validationErrors = validateRegisterForm(sanitizedName, sanitizedEmail, sanitizedPassword, confirmPassword)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setIsLoading(false)
            return
        }

        try {
            const payload = {
                name: sanitizedName,
                email: sanitizedEmail,
                role: 'student',
                status: 'confirming',
                password: sanitizedPassword,
            }
            await register(payload)
            toast.success('Đăng ký thành công! Vui lòng đăng nhập.')
            router.push('/login')
        } catch (error: any) {
            console.error('Register error:', error.message)
            toast.error(error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'hidden',
                bgcolor: 'gray.100',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 900,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: {xs: 450, md: 500},
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: {xs: 2, sm: 2, md: 4},
                        py: {xs: 2, md: 3},
                        minHeight: {md: 700},
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <Box sx={{width: '100%', textAlign: 'center'}}>
                        <Box sx={{mb: 4}}>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                                <Image src="/assets/logo.png" alt="Logo" width={40} height={40}/>
                                <Typography
                                    variant="h1"
                                    fontWeight={700}
                                    sx={{fontSize: {xs: '1.5rem', md: '2.5rem'}}}
                                >
                                    <span style={{color: '#2d3748'}}>BK</span>
                                    <span style={{color: '#f59e0b'}}>Star</span>
                                </Typography>
                            </Box>
                            <Typography variant="h6" mt={2}>
                                Đăng Ký
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Tạo tài khoản để bắt đầu sử dụng
                            </Typography>
                        </Box>
                        <Box component="form" noValidate sx={{width: '100%', p: {xs: 2, md: 2}}}
                             onSubmit={handleSubmit}>
                            <Box sx={{textAlign: 'left', mb: 2}}>
                                <Typography variant="body2" color="text.secondary">
                                    Tên của bạn
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="name"
                                    name="name"
                                    placeholder="Nhập tên"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    error={!!errors.name}
                                    helperText={errors.name}
                                    sx={{
                                        mt: 1,
                                        '& .MuiInputBase-root': {
                                            padding: '2px',
                                            height: '48px',
                                            border: '2px solid #00aaff',
                                            borderRadius: '4px',
                                            '&:hover': {borderColor: '#0099ff'},
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: '6px 14px',
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{textAlign: 'left', mb: 2}}>
                                <Typography variant="body2" color="text.secondary">
                                    Email
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    sx={{
                                        mt: 1,
                                        '& .MuiInputBase-root': {
                                            padding: '2px',
                                            height: '48px',
                                            border: '2px solid #00aaff',
                                            borderRadius: '4px',
                                            '&:hover': {borderColor: '#0099ff'},
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: '6px 14px',
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{textAlign: 'left', mb: 2}}>
                                <Typography variant="body2" color="text.secondary">
                                    Mật khẩu
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    sx={{
                                        mt: 1,
                                        '& .MuiInputBase-root': {
                                            padding: '2px',
                                            height: '48px',
                                            border: '2px solid #00aaff',
                                            borderRadius: '4px',
                                            '&:hover': {borderColor: '#0099ff'},
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: '6px 14px',
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{textAlign: 'left', mb: 2}}>
                                <Typography variant="body2" color="text.secondary">
                                    Xác nhận mật khẩu
                                </Typography>
                                <TextField
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Xác nhận mật khẩu"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    sx={{
                                        mt: 1,
                                        '& .MuiInputBase-root': {
                                            padding: '2px',
                                            height: '48px',
                                            border: '2px solid #00aaff',
                                            borderRadius: '4px',
                                            '&:hover': {borderColor: '#0099ff'},
                                        },
                                        '& .MuiInputBase-input': {
                                            padding: '6px 14px',
                                            fontSize: '0.9rem',
                                        },
                                    }}
                                />
                            </Box>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', gap: 2, mt: 3}}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    type="submit"
                                    disabled={isLoading}
                                    sx={{fontWeight: 'bold'}}
                                >
                                    {isLoading ? 'Đang đăng ký...' : 'Đăng Ký'}
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => router.push('/login')}
                                    sx={{fontWeight: 'bold'}}
                                >
                                    Hủy
                                </Button>
                            </Box>
                            <Typography sx={{textAlign: 'center', mt: 2}}>
                                Đã có tài khoản?{' '}
                                <Link href="/login" underline="hover">
                                    Đăng nhập
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default RegisterPage