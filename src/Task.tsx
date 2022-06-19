import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import DeleteIcon from "@material-ui/icons/Delete";
import {TaskType} from "./TodolistWithTasks";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/tasksReducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}
const Task = memo(({task, todolistId}: TaskPropsType) => {
    console.log('task')
    const {id, title, isDone} = task
    const dispatch = useDispatch()

    const removeTaskOnClickHandler = useCallback(() => dispatch(removeTaskAC(id, todolistId)), [dispatch,id,todolistId])
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(id, e.currentTarget.checked, todolistId));
    }, [dispatch,id,todolistId])
    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(id, title, todolistId))
    }, [dispatch,id,todolistId])
    return (
        <div>
            <Checkbox
                color={'primary'}
                onChange={onChangeHandler}
                checked={isDone}/>
            <EditableSpan title={title} changeTitle={changeTaskTitle}/>
            <IconButton aria-label="delete" onClick={removeTaskOnClickHandler}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </div>
    );
});

export default Task;
