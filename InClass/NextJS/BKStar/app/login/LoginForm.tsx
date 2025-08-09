'use client'

import {
    Box,
    Button,
    Checkbox,
    Container,
    FormControlLabel,
    TextField,
    Typography,
    Link,
    InputAdornment,
    IconButton,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Image from 'next/image'
import {useState, useContext} from 'react'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'
import {login} from '@/lib/api/authService'
import {AuthContext} from '@/store/authContext'
import {UserInfo} from '@/lib/types/auth'
import {jwtDecode} from 'jwt-decode'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const router = useRouter()
    const {setUser, logout} = useContext(AuthContext)

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {}
        if (!email.trim()) {
            newErrors.email = 'Email không được để trống'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Email không hợp lệ'
        }
        if (!password) {
            newErrors.password = 'Mật khẩu không được để trống'
        }
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors({})

        if (!validateForm()) {
            Object.values(errors).forEach((error) => {
                toast.error(error)
                console.log('Validation error:', error)
            })
            setIsLoading(false)
            return
        }

        try {
            console.log('Login payload:', {email, password})
            const response = await login({email, password})
            console.log('Login response:', response)

            if (response.access) {
                const decoded: any = jwtDecode(response.access)
                console.log('Decoded user info:', decoded)
                setUser({
                    userId: decoded.id,
                    email: decoded.email || email,
                    role: decoded.role || 'student',
                })
                toast.success('Đăng nhập thành công!')
                console.log('Successful login with email:', email)
                router.push('/class')
            } else {
                throw new Error('Không nhận được access token')
            }
        } catch (error: any) {
            if (error.response?.status === 401 || error.response?.status === 403) {
                logout()
            } else {
                const errorMessage = error.message || 'Đăng nhập thất bại. Vui lòng kiểm tra email hoặc mật khẩu.'
                toast.error(errorMessage)
                console.error('Login error:', errorMessage)
                setIsLoading(false)
            }
        }
    }

    return (
        <Box
            sx={{
                flex: {md: 1},
                width: '100%',
                maxWidth: 450,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: {xs: 2, sm: 2, md: 4},
                py: {xs: 2, md: 3},
                minHeight: {xs: 650, md: 620},
                bgcolor: '#fff',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                borderRadius: 2,
            }}
        >
            <Container maxWidth="xs" sx={{width: '100%', textAlign: 'center'}}>
                <Box sx={{mb: 3}}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1}}>
                        <Image src="/assets/logo.png" alt="Logo" width={50} height={50}/>
                        <Typography variant="h1" fontWeight={700} sx={{fontSize: {xs: '2rem', md: '3.5rem'}}}>
                            <span style={{color: '#2d3748'}}>BK</span>
                            <span style={{color: '#f59e0b'}}>Star</span>
                        </Typography>
                    </Box>
                    <Typography variant="h6" mt={1}>
                        Đăng Nhập
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Cung cấp giải pháp toàn diện cho lớp học thông minh
                    </Typography>
                </Box>

                <Box component="form" noValidate sx={{width: '100%'}} onSubmit={handleSubmit}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        type="email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Nhập mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
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

                    <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0}}>
                        <FormControlLabel
                            control={<Checkbox/>}
                            label="Ghi nhớ tôi"
                            sx={{'& .MuiTypography-root': {fontSize: '0.75rem'}}}
                        />
                        <Link href="#" underline="hover">
                            Quên mật khẩu ?
                        </Link>
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, padding: '10px 0', fontSize: '1rem', fontWeight: 'bold', width: '100%'}}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </Button>

                    <Box mt={2} textAlign="center">
                        <Link href="#" underline="hover">
                            Đăng kí
                        </Link>
                        <span> tài khoản cho học viên </span>
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}