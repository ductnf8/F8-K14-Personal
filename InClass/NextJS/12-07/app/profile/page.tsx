'use client'

import {useState} from 'react'
import {Avatar, Button, TextField, Box} from '@mui/material'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

export default function ProfilePage() {
    const [user, setUser] = useState({
        name: 'Trần Xuân Băng',
        email: 'bangtran.hha@gmail.com',
        school: '',
        parentName: '',
        parentPhone: '',
    })

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflowX: 'hidden',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    px: {xs: 2, sm: 2, md: 4}, // Padding ngang giống LoginPage
                    py: {xs: 2, md: 3}, // Padding dọc giống LoginPage
                }}
            >
                {/* Thông tin cơ bản */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: 2,
                        p: {xs: 2, md: 6}, // Padding nhỏ hơn trên desktop
                        mb: {xs: 4, md: 8},
                        width: '100%', // Chiều rộng 100% trên mọi kích thước
                    }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-blue-700 font-semibold">Thông tin cơ bản</h2>
                        <div className="md:block hidden">
                            <Button variant="contained" size="medium">
                                Lưu lại
                            </Button>
                        </div>
                    </div>

                    {/* Avatar + Upload */}
                    <div className="flex flex-col items-center mb-8">
                        <Avatar sx={{width: 150, height: 150}}>
                            TB
                        </Avatar>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<CloudUploadIcon/>}
                            sx={{mt: 3}} // Sử dụng MUI sx cho khoảng cách
                        >
                            Tải lên
                        </Button>
                    </div>

                    {/* Thông tin người dùng */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Tên của bạn</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={user.name}
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Email</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                disabled
                                value={user.email}
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Trường</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={user.school}
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Tên phụ huynh</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={user.parentName}
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Số điện thoại phụ
                                huynh</label>
                            <TextField
                                variant="outlined"
                                fullWidth
                                value={user.parentPhone || user.email}
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                    </div>

                    {/* Nút lưu lại - dưới cùng (hiển thị trên mobile) */}
                    <div className="mt-9 md:hidden">
                        <Button variant="contained" size="medium" fullWidth>
                            Lưu lại
                        </Button>
                    </div>
                </Box>

                {/* Thay đổi mật khẩu */}
                <Box
                    sx={{
                        bgcolor: '#fff',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        borderRadius: 2,
                        p: {xs: 2, md: 6}, // Padding nhỏ hơn trên desktop
                        width: '100%', // Chiều rộng 100% trên mọi kích thước
                    }}
                >
                    <h2 className="text-blue-700 font-semibold mb-6">Thay đổi mật khẩu</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Mật khẩu cũ</label>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Mật khẩu mới</label>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-gray-700 mb-2">Nhập lại mật khẩu
                                mới</label>
                            <TextField
                                type="password"
                                variant="outlined"
                                fullWidth
                                InputProps={{style: {fontSize: '1rem'}}}
                                sx={{'& .MuiInputBase-root': {height: '48px'}}}
                            />
                        </div>
                    </div>

                    {/* Nút lưu lại - dưới cùng, căn chỉnh kích thước trên desktop */}
                    <div className="mt-9">
                        <Button
                            variant="contained"
                            size="medium"
                            fullWidth
                            sx={{
                                '@media (min-width: 768px)': {
                                    width: 'auto',
                                    minWidth: '100px', // Đảm bảo chiều rộng tối thiểu khớp với nút trên
                                },
                            }}
                        >
                            Lưu lại
                        </Button>
                    </div>
                </Box>
            </Box>
        </Box>
    )
}