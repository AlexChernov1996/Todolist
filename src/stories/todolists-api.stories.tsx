import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolistsApi";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'f44de11a-0b43-4d14-9d1c-b85ca62809f9'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodos()
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodo('BLL')
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '16c9481f-6f76-41a6-996a-a9fd0b69f684'
        todolistsApi.deleteTodo(id)
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const id = '69aa2ddd-65c8-44a9-bd9d-fad3aec661fb'
            todolistsApi.changeTodosTitle(id,'changed')
            .then((res) => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

