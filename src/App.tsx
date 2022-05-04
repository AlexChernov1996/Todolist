import React from 'react';
import './App.css';
import Todolist from "./Todolist";

export type TodolistType = {
    id: string
    title: string
    filter: 'all' | 'active' | 'completed'
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

function App() {
    const tasks: TaskType[] = [
        {id: '1', title: 'Beer', isDone: true},
        {id: '2', title: 'Milk', isDone: true},
        {id: '3', title: 'Beer', isDone: true},
    ]

    const todolists: TodolistType[] = [
        {id: '1', title: 'What to buy', filter: 'all'}
    ]

    return (
        <div className="App">
            <Todolist
                todolists={todolists}
                tasks={tasks}
            />
        </div>
    )
}

export default App;
