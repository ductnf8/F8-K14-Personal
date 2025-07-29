export interface LoginCredentials {
    email: string
    password: string
}

export interface RegisterCredentials {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export interface User {
    id: string
    email: string
    password: string
}

export interface AuthResponse {
    token: string
    user: User
}

export interface AuthState {
    user: User | null
    token: string | null
    loading: boolean
    error: string | null
}

