import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, ListItem} from "@material-ui/core";
import {Checkbox} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}

export function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.todolistId)
    }
    const onAllClickHandler = () => props.changeFilter("all", props.todolistId);
    const onActiveClickHandler = () => props.changeFilter("active", props.todolistId);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.todolistId);
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }
    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={() => props.removeTodolist(props.todolistId)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>

        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.todolistId)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.todolistId);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.todolistId, t.id, title)
                    }
                    return <ListItem
                        style={{padding:"0",
                        height:"30px"}}
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={'primary'}
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton aria-label="delete" onClick={onClickHandler}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button color={props.filter === 'all' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={props.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={props.filter === 'active' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={props.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={props.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
