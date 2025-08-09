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
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        setUser(null)
        toast.success('Đăng xuất thành công')
        router.push('/login')
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