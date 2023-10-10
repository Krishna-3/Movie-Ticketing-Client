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
    refreshToken: string,
    accessToken: string,
}
export interface User {
    Id: string,
    Name: string,
    Email: string,
    Role: string,
    nbf: string,
    exp: string,
    iss: string,
    aud: string
}