import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'f44de11a-0b43-4d14-9d1c-b85ca62809f9'
    }
})

export const todolistsApi = {
    getTodos() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodo(title: string) {
        return instance.post<BaseTodolistType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodo(id: string) {
        return instance.delete<BaseTodolistType>(`todo-lists/${id}`)
    },
    changeTodosTitle(id: string, title: string) {
        return instance.put<BaseTodolistType>(`todo-lists/${id}`, {title})
    }
}

type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
type BaseTodolistType<T = {}> = {
    data: T,
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
}
