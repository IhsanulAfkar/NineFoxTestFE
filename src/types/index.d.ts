export type SubmitFormType = {
    username: string,
    password: string,
    confirmPassword: string,
    email: string,
    phone: string,
    description: string
}
export type UserData = {
    pkId: number,
    id: string,
    username: string,
    email: string,
    phone: string,
    category: string,
    description: string,
    media?: string
}