export type LoginPayload = {
    email: string
    password: string
}


export type SingUpPayload = {
    username: string,
    email: string,
    password: string,
    roles: string[]
}