import React from 'react';
import {Box, Typography} from '@mui/material';
import Image from 'next/image';

const RegisterPage = () => {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center', // Căn giữa trên mọi kích thước
                alignItems: 'center',
                overflowX: 'hidden',
                bgcolor: 'gray.100',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 900, // Giới hạn tối đa 900px trên desktop
                    display: 'flex',
                    flexDirection: 'column', // Chỉ dùng column
                    alignItems: 'center', // Căn giữa nội dung
                }}
            >
                {/* Register form */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: {xs: 450, md: 500}, // Đảm bảo 500px trên desktop
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        px: {xs: 2, sm: 2, md: 4}, // Padding ngang: 8px, 8px, 16px
                        py: {xs: 2, md: 3}, // Padding dọc: 8px, 12px
                        minHeight: {md: 700}, // Tăng chiều cao lên 700px trên desktop
                        bgcolor: '#fff',
                        borderRadius: 2,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Viền bóng
                    }}
                >
                    <Box sx={{width: '100%', textAlign: 'center'}}>
                        <Box sx={{mb: 4}}> {/* Tăng khoảng cách dưới logo */}
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
                        <Box component="form" noValidate sx={{width: '100%', p: {xs: 2, md: 2}}}>
                            <div className="flex flex-col text-left">
                                <label htmlFor="name"
                                       className="text-sm text-gray-700 mb-2"> {/* Tăng mb-1 thành mb-2 */}
                                    Tên của bạn
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nhập tên"
                                    required
                                    className="w-full h-10 px-3 border-2 border-blue-500 rounded-md text-sm outline-none focus:border-blue-600 hover:border-blue-600"
                                />
                            </div>
                            <div className="flex flex-col text-left mt-6"> {/* Tăng mt-4 thành mt-6 */}
                                <label htmlFor="email" className="text-sm text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    required
                                    className="w-full h-10 px-3 border-2 border-blue-500 rounded-md text-sm outline-none focus:border-blue-600 hover:border-blue-600"
                                />
                            </div>
                            <div className="flex flex-col text-left mt-6">
                                <label htmlFor="password" className="text-sm text-gray-700 mb-2">
                                    Mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Nhập mật khẩu"
                                    required
                                    className="w-full h-10 px-3 border-2 border-blue-500 rounded-md text-sm outline-none focus:border-blue-600 hover:border-blue-600"
                                />
                            </div>
                            <div className="flex flex-col text-left mt-6">
                                <label htmlFor="confirmPassword" className="text-sm text-gray-700 mb-2">
                                    Xác nhận mật khẩu
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Xác nhận mật khẩu"
                                    required
                                    className="w-full h-10 px-3 border-2 border-blue-500 rounded-md text-sm outline-none focus:border-blue-600 hover:border-blue-600"
                                />
                            </div>
                            <div className="flex justify-between gap-4 mt-6"> {/* Tăng gap-3 thành gap-4 */}
                                <button
                                    type="submit"
                                    className="w-full h-10 bg-blue-500 text-white rounded-md text-sm font-bold hover:bg-blue-600"
                                >
                                    Đăng Ký
                                </button>
                                <button
                                    type="button"
                                    className="w-full h-10 bg-gray-300 text-gray-800 rounded-md text-sm font-bold hover:bg-gray-400"
                                >
                                    Hủy
                                </button>
                            </div>
                            <p className="text-center mt-4"> {/* Tăng mt-3 thành mt-4 */}
                                Đã có tài khoản?{' '}
                                <a href="/login" className="text-blue-500 hover:underline">
                                    Đăng nhập
                                </a>
                            </p>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default RegisterPage;