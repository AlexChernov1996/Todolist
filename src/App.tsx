import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";

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

function App() {
    const [tasks,setTasks]= useState( [
        {id: v1(), title: 'Beer', isDone: true},
        {id: v1(), title: 'Milk', isDone: true},
        {id: v1(), title: 'Beer', isDone: true},
    ])
    const [filter,setFilter] = useState<FilterValuesType>('all')

    const todolists: TodolistType[] = [
        {id: '1', title: 'What to buy', filter: 'all'}
    ]
    const removeTask = (taskId:string)=>{
        setTasks(tasks.filter(t=>t.id !== taskId))
    }
    const changeFilter = (newValue:FilterValuesType) => {
        setFilter(newValue)
    }
    const addTask = (title:string)=>{
        setTasks([{id:v1(),title,isDone: false}, ...tasks])
    }
    return (
        <div className="App">
            <Todolist
                filter={filter}
                todolists={todolists}
                tasks={tasks}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
                addTask = {addTask}
            />
        </div>
    )
}

export default App;
