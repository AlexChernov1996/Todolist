import React from 'react';
import {FilterValuesType, TaskType, TodolistType} from "./App";

type TodolistPropsType = {
    filter: FilterValuesType
    todolists: TodolistType[]
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newValue: FilterValuesType) => void
}

const Todolist = (props: TodolistPropsType) => {
    let tasksForTodolist = props.tasks
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => !t.isDone )
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    const tasksForRender = tasksForTodolist.length ?
        tasksForTodolist.map(t => {
            const removeTask = () => props.removeTask(t.id)
            return  <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        })
        : <span>List is empty</span>
    return (
        <div>
            <div>
                <h3>{props.todolists[0].title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {tasksForRender}
                </ul>
                <div>
                    <button onClick={() => props.changeFilter('all')}>All</button>
                    <button onClick={() => props.changeFilter('active')}>Active</button>
                    <button onClick={() => props.changeFilter('completed')}>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;
