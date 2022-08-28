import {instance, ResponseType} from "./todolists-api";
import {AxiosResponse} from "axios";


export type LogInRequestType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export const authApi = {
    authMe() {
        return instance.get<ResponseType<{ id: string, email: string, login: string }>>('auth/me');
    },
    logIn(data: LogInRequestType) {
        return instance.post<LogInRequestType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', data);
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    }

}
