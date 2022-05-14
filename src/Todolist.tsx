import React, {ChangeEvent, useState} from 'react';
import {FilterValuesType, TaskType, TodolistType} from "./App";

type TodolistPropsType = {
    filter: FilterValuesType
    todolists: TodolistType[]
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (newValue: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string) => void
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
                props.addTask(title)
                setTitle('')
            } else setError('error')

        }
        const onClickButtonAll = () => props.changeFilter('all')
        const onClickButtonActive = () => props.changeFilter('active')
        const onClickButtonCompleted = () => props.changeFilter('completed')

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
                const removeTask = () => props.removeTask(t.id)
                const onChangeTaskStatusHandler = () => props.changeTaskStatus(t.id)

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
                    <h3>{props.todolists[0].title}</h3>
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
