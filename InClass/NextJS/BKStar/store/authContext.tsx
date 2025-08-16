'use client'

import {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'
import {UserInfo} from '@/lib/types/auth'
import {refreshToken} from '@/lib/api/authService'

interface AuthContextType {
    user: UserInfo | null
    setUser: (user: UserInfo | null) => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => {
    },
    logout: () => {
    },
})

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null)
    const router = useRouter()

    useEffect(() => {
        const checkToken = async () => {
            const accessToken = Cookies.get('accessToken')
            if (!accessToken) {
                console.log('No access token found, redirecting to /login...')
                router.push('/login')
                return
            }

            try {
                const decoded: any = jwtDecode(accessToken)
                console.log('Restored user from accessToken:', decoded)

                const currentTime = Math.floor(Date.now() / 1000)
                if (decoded.exp < currentTime) {
                    console.log('Access token expired, attempting to refresh...')
                    try {
                        const newTokens = await refreshToken()
                        Cookies.set('accessToken', newTokens.access, {
                            expires: 15 / (24 * 60), // 15 minutes
                            secure: true,
                            sameSite: 'strict',
                        })
                        Cookies.set('refreshToken', newTokens.refresh, {
                            expires: 7, // 7 days
                            secure: true,
                            sameSite: 'strict',
                        })
                        console.log('Token refreshed successfully:', newTokens)
                        const newDecoded: any = jwtDecode(newTokens.access)
                        setUser({
                            userId: newDecoded.id,
                            email: newDecoded.email || '',
                            role: newDecoded.role || 'student',
                        })
                    } catch (refreshError) {
                        console.error('Refresh token failed:', refreshError)
                        Cookies.remove('accessToken')
                        Cookies.remove('refreshToken')
                        setUser(null)
                        toast.error('Phiên đã hết hạn, vui lòng đăng nhập lại')
                        router.push('/login')
                    }
                } else {
                    setUser({
                        userId: decoded.id,
                        email: decoded.email || '',
                        role: decoded.role || 'student',
                    })
                }
            } catch (error) {
                console.error('Failed to decode accessToken:', error)
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                setUser(null)
                toast.error('Phiên đã hết hạn, vui lòng đăng nhập lại')
                router.push('/login')
            }
        }

        checkToken()
    }, [router])

    const logout = () => {
        console.log('Starting logout process...')
        try {
            console.log('Checking rememberedEmail...')
            const rememberedEmail = Cookies.get('rememberedEmail')
            console.log('Removing accessToken...')
            Cookies.remove('accessToken')
            console.log('Removing refreshToken...')
            Cookies.remove('refreshToken')
            console.log('Setting user to null...')
            setUser(null)
            console.log('Showing toast success...')
            toast.success('Đăng xuất thành công')
            if (rememberedEmail) {
                console.log('Keeping rememberedEmail:', rememberedEmail)
                Cookies.set('rememberedEmail', rememberedEmail, {
                    expires: 30,
                    secure: true,
                    sameSite: 'strict',
                })
            }
            console.log('Attempting redirect to /login...')
            router.push('/login')
        } catch (error) {
            console.error('Logout process failed:', error)
            console.log('Forcing redirect to /login...')
            window.location.href = '/login'
        }
    }

    return (
        <AuthContext.Provider value={{user, setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}