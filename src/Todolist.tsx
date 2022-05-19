import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType, TodolistType} from "./App";

type TodolistPropsType = {
    filter: FilterValuesType
    title:string
    tasks: TaskType[]
    removeTask: (taskId: string,todolistId:string) => void
    changeFilter: (newValue: FilterValuesType,todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeTaskStatus: (id: string, todolistId:string) => void
    todolistId:string
    removeTodolist:(todolistId:string) => void
}

const Todolist = (props: TodolistPropsType) => {
        const [title, setTitle] = useState('')
        const [error, setError] = useState('')
        const getTasksForRender = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
            switch (filter) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks
            }
        }
        const addTask = () => {
            if (title.trim()) {
                props.addTask(title, props.todolistId)
                setTitle('')
            } else setError('error')

        }
        const onClickButtonAll = () => props.changeFilter('all',props.todolistId)
        const onClickButtonActive = () => props.changeFilter('active',props.todolistId)
        const onClickButtonCompleted = () => props.changeFilter('completed',props.todolistId)

        const addActiveClassToFilterAll = props.filter === 'all' ? 'active' : ''
        const addActiveClassToFilterActive = props.filter === 'active' ? 'active' : ''
        const addActiveClassToFilterCompleted = props.filter === 'completed' ? 'active' : ''

        const onChangeTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
            if (error) setError('')
        }
        const tasksForTodolist = getTasksForRender(props.tasks, props.filter)
        const tasksForRender = tasksForTodolist.length ?
            tasksForTodolist.map(t => {
                const removeTask = () => props.removeTask(t.id,props.todolistId)
                const onChangeTaskStatusHandler = () => props.changeTaskStatus(t.id,props.todolistId)

                return <li key={t.id}>
                    <input type="checkbox" checked={t.isDone} onChange={onChangeTaskStatusHandler}/>
                    <span className={t.isDone ? 'completed' : ''}>{t.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>
            })
            : <span>List is empty</span>
        return (
            <div>
                <div>
                    <h3>{props.title}
                        <button onClick={()=>props.removeTodolist(props.todolistId)}>x</button></h3>
                    <div>
                        <input
                            value={title}
                            onChange={onChangeTaskTitle}
                            onKeyPress={(e) => {
                                e.key === "Enter" && addTask()
                            }}
                            className={error ? 'error' : ''}
                            placeholder={error ? 'Title is required' : ''}
                        />
                        <button onClick={addTask}>+</button>
                    </div>
                    <ul>
                        {tasksForRender}
                    </ul>
                    <div>
                        <button onClick={onClickButtonAll} className={addActiveClassToFilterAll}>All</button>
                        <button onClick={onClickButtonActive} className={addActiveClassToFilterActive}>Active</button>
                        <button onClick={onClickButtonCompleted} className={addActiveClassToFilterCompleted}>Completed
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default Todolist;
