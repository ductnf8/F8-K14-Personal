'use client'

import {Box, Typography} from '@mui/material'
import Image from 'next/image'
import LoginForm from './LoginForm'
import loginImage from "../assets/loginbg.jpg"

export default function LoginPage() {
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
                    maxWidth: {xs: 450, md: 900},
                    margin: '0 auto',
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                }}
            >
                <Box
                    sx={{
                        flex: {md: 1},
                        bgcolor: '#2f80ed',
                        color: 'white',
                        display: {xs: 'none', md: 'flex'},
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        p: 4,
                        minHeight: {md: 620},
                    }}
                >
                    <Image src={loginImage} alt="STEAM" width={350} height={260}/>
                    <Box sx={{width: '100%', mt: 4}}>
                        <Typography variant="subtitle1" fontWeight="bold" align="left">
                            GIEO MẦM SÁNG TẠO...
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold" align="right">
                            ... DẪN HƯỚNG ĐAM MÊ
                        </Typography>
                    </Box>
                </Box>

                <LoginForm/>
            </Box>
        </Box>
    )
}