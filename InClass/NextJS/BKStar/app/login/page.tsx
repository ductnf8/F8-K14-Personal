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
    IconButton
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Image from 'next/image'
import {useState} from 'react'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center', // Căn giữa toàn bộ
                alignItems: 'center',
                overflowX: 'hidden',
            }}
        >
            {/* Container chính giới hạn chiều rộng và căn giữa */}
            <Box
                sx={{
                    width: '100%',
                    maxWidth: {xs: 450, md: 900}, // Giới hạn 450px trên mobile, 900px trên desktop
                    margin: '0 auto', // Căn giữa
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'}, // Chuyển sang row trên desktop
                }}
            >
                {/* Left side */}
                <Box
                    sx={{
                        flex: {md: 1}, // Chia đều không gian với bên phải trên desktop
                        bgcolor: '#2f80ed',
                        color: 'white',
                        display: {xs: 'none', md: 'flex'}, // Ẩn trên mobile
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        p: 4,
                        minHeight: {md: 620}, // Đảm bảo chiều cao khớp
                    }}
                >
                    <Image src="/assets/loginbg.jpg" alt="STEAM" width={350} height={260}/>
                    <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant="subtitle1" fontWeight="bold" align="left">
                            GIEO MẦM SÁNG TẠO...
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" align="right">
                            ... DẪN HƯỚNG ĐAM MÊ
                        </Typography>
                    </Box>
                </Box>

                {/* Right side - login form */}
                <Box
                    sx={{
                        flex: {md: 1}, // Chia đều không gian với bên trái trên desktop
                        width: '100%', // Linh hoạt trên mobile
                        maxWidth: 450, // Giới hạn tối đa 450px trên mọi kích thước
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center', // Căn giữa nội dung
                        px: {xs: 2, sm: 2, md: 4},
                        py: {xs: 2, md: 3},
                        minHeight: {xs: 650, md: 620}, // Chiều cao 650px trên mobile, 620px trên desktop
                        bgcolor: '#fff', // Nền xám nhạt chỉ bao quanh form
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Viền bóng
                        borderRadius: 2, // Bo góc nhẹ
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

                        <Box component="form" noValidate sx={{width: '100%'}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                type="email"
                                placeholder="Nhập email"
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
                            >
                                Đăng nhập
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
            </Box>
        </Box>
    )
}