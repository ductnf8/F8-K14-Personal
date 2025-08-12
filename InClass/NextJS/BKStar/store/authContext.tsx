'use client'

import {createContext, useContext, useState, useEffect, ReactNode} from 'react'
import Cookies from 'js-cookie'
import {jwtDecode} from 'jwt-decode'
import {useRouter} from 'next/navigation'
import {toast} from 'react-toastify'
import {UserInfo} from '@/lib/types/auth'

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
        const accessToken = Cookies.get('accessToken')
        if (accessToken) {
            try {
                const decoded: any = jwtDecode(accessToken)
                console.log('Restored user from accessToken:', decoded)
                setUser({
                    userId: decoded.id,
                    email: decoded.email || '',
                    role: decoded.role || 'student',
                })
            } catch (error) {
                console.error('Failed to decode accessToken:', error)
                Cookies.remove('accessToken')
                Cookies.remove('refreshToken')
                setUser(null)
                toast.error('Phiên đã hết hạn')
                router.push('/login')
            }
        }
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
            try {
                console.log('Using router.push...')
                router.push('/login')
                console.log('Using router.replace...')
                router.replace('/login')
                setTimeout(() => {
                    console.log('Checking current path:', window.location.pathname)
                    if (window.location.pathname !== '/login') {
                        console.log('Router push/replace failed, using window.location.href...')
                        window.location.href = '/login'
                    } else {
                        console.log('Redirect to /login successful')
                    }
                }, 1500)
            } catch (redirectError) {
                console.error('Redirect failed:', redirectError)
                console.log('Falling back to window.location.href...')
                window.location.href = '/login'
            }
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