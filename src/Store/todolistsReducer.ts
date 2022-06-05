import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type AddTodolistAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type DeleteTodolistAT = {
    type: "DELETE-TODOLIST"
    id: string
}
export type ChangeTodolistTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}
type ActionsType = AddTodolistAT | DeleteTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT
export const todolistsReducer = (todolists: TodolistType[], action: ActionsType) => {
    switch (action.type) {
        case "ADD-TODOLIST":
            return [...todolists, {id: action.todolistId, title: action.title, filter: 'all'}]
        case "DELETE-TODOLIST":
            return todolists.filter(t => t.id !== action.id)
        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(t => t.id === action.id ? {...t, title: action.title} : t)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
    }
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}
export const DeleteTodolistAC = (id: string): DeleteTodolistAT => {
    return {type: "DELETE-TODOLIST", id}
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    let todolistId = v1()
    return {type: "ADD-TODOLIST", title:title, todolistId:todolistId}
}
