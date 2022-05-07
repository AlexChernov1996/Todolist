import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";

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
        {id: '1', title: 'Beer', isDone: true},
        {id: '2', title: 'Milk', isDone: true},
        {id: '3', title: 'Beer', isDone: true},
    ])
    const [filter,setFilter] = useState<FilterValuesType>('completed')

    const todolists: TodolistType[] = [
        {id: '1', title: 'What to buy', filter: 'all'}
    ]
    const removeTask = (taskId:string)=>{
        setTasks(tasks.filter(t=>t.id !== taskId))
    }
    const changeFilter = (newValue:FilterValuesType) => {
        setFilter(newValue)
    }
    return (
        <div className="App">
            <Todolist
                filter={filter}
                todolists={todolists}
                tasks={tasks}
                removeTask = {removeTask}
                changeFilter = {changeFilter}
            />
        </div>
    )
}

export default App;
