import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import todolist from "./Todolist";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [todolistId: string]: Array<TaskType>
}

function App() {
    const todolist_1 = v1()
    const todolist_2 = v1()
    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolist_1, title: 'What to buy', filter: 'all'},
        {id: todolist_2, title: 'What to learn', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolist_1]: [
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Beer', isDone: true},
        ],
        [todolist_2]: [
            {id: v1(), title: 'Html', isDone: true},
            {id: v1(), title: 'Css', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
        ],
    })
    const removeTask = (taskId: string, todolistId: string) => {
        const newTasks = {...tasks}
        newTasks[todolistId] = newTasks[todolistId].filter(t => t.id !== taskId)
        setTasks(newTasks)
    }
    const changeFilter = (newValue: FilterValuesType, todolistId: string) => {
        setTodolists(todolists.map(t => t.id === todolistId ? ({...t, filter: newValue}) : t))
    }
    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        const newTasks = {...tasks}
        newTasks[todolistId].push(newTask)
        setTasks(newTasks)
    }
    const changeTaskStatus = (id: string, todolistId: string) => {
        const newTasks = tasks[todolistId].map(t => t.id === id ? {id: t.id, title: t.title, isDone: !t.isDone} : t)
        const newState = {...tasks}
        newState[todolistId] = newTasks
        setTasks(newState)
    }
    const removeTodolist = (todolistId:string) => {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }
    return (
        <div className="App">
            {todolists.map(t => {
                return <Todolist
                    removeTodolist={removeTodolist}
                    key={t.id}
                    todolistId={t.id}
                    filter={t.filter}
                    title = {t.title}
                    tasks={tasks[t.id]}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                />
            })}
        </div>
    )
}

export default App;
