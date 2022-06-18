import {v1} from "uuid";
import {AddTodolistAT, DeleteTodolistAT} from "./todolistsReducer";
import {TaskType} from "../Todolist";

export type DeleteTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type TasksStateType = {
    [todolistId: string]: TaskType[]
}
let initialState: TasksStateType = {}

type ActionsType = DeleteTaskAT | AddTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistAT | DeleteTodolistAT
export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {

    switch (action.type) {
        case "DELETE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: [...state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)]
            }
        case "ADD-TODOLIST":
            return {...state, [action.todolistId]: []}
        case "DELETE-TODOLIST":
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "DELETE-TASK", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD-TASK", title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE-TASK-TITLE", taskId, title, todolistId} as const
}
