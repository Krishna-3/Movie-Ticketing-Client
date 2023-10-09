export interface UserSignup {
    id: number,
    username: string,
    password: string,
    confirmPassword: string,
    email: string
}

export interface UserLoginRequest {
    username: string,
    password: string
}

export interface UserLoginResponse {
    refreshToken: String,
    accessToken: string,
    user: {
        id: number,
        username: string,
        email: string,
        role: string
    }
}