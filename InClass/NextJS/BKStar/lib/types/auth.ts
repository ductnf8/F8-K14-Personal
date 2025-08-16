export interface UserInfo {
    userId: string
    email: string
    role: string

    [key: string]: any
}

export interface LoginCredentials {
    email: string
    password: string
}

export interface LoginResponse {
    access: string
    refresh: string
}

export interface RegisterCredentials {
    email: string
    password: string
}

export interface RegisterResponse {
    message: string
}

export interface RefreshTokenResponse {
    access: string
    refresh: string
}

export interface Class {
    id: string
    name: string
    code: string
    users: number[]
}