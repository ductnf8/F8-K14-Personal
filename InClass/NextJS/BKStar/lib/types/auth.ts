export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    access: string
    refresh: string
}

export interface RegisterCredentials {
    name: string
    email: string
    role: string
    status: string
    password: string
}

export interface RegisterResponse {
    message?: string

    [key: string]: any
}

export interface RefreshTokenResponse {
    access: string
    refresh: string
}

export interface UserInfo {
    userId: string
    email: string
    role: string

    [key: string]: any
}