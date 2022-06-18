import React, {ChangeEvent, memo, useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton, List, ListItem} from "@material-ui/core";
import {Checkbox} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {TodolistType} from "./AppRedux";
import {useDispatch, useSelector} from "react-redux";
import {RootAppType} from "./Store/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./Store/tasksReducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./Store/todolistsReducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    todolist: TodolistType
}

export const TodolistWithTasks= memo(({todolist}: PropsType)=> {
    console.log('todolist')
    let tasks = useSelector<RootAppType, TaskType[]>(state => state.tasks[todolist.id])
    let dispatch = useDispatch()
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolist.id))
    }, [dispatch])
    const onAllClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "all")), [dispatch]);
    const onActiveClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "active")), [dispatch]);
    const onCompletedClickHandler = useCallback(() => dispatch(changeTodolistFilterAC(todolist.id, "completed")), [dispatch]);
    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolist.id, title))
    }, [dispatch])
    const removeTodolistHandler = useCallback(() => {
        dispatch(removeTodolistAC(todolist.id))
    }, [dispatch])
    let tasksForTodolist = tasks
    if (todolist.filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (todolist.filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }
    return <div>
        <h3>
            <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
            <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                <DeleteIcon fontSize="small"/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <List>
            {
                tasksForTodolist.map(t => {
                    const removeTaskOnClickHandler = () => dispatch(removeTaskAC(t.id, todolist.id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, todolist.id));
                    }
                    const changeTaskTitle = (title: string) => {
                        dispatch(changeTaskTitleAC(t.id, title, todolist.id))
                    }
                    return <ListItem
                        style={{
                            padding: "0",
                            height: "30px"
                        }}
                        key={t.id}
                        className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            color={'primary'}
                            onChange={onChangeHandler}
                            checked={t.isDone}/>
                        <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                        <IconButton aria-label="delete" onClick={removeTaskOnClickHandler}>
                            <DeleteIcon fontSize="small"/>
                        </IconButton>
                    </ListItem>
                })
            }
        </List>
        <div>
            <Button color={todolist.filter === 'all' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={todolist.filter === 'all' ? "active-filter" : ""}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button color={todolist.filter === 'active' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={todolist.filter === 'active' ? "active-filter" : ""}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button color={todolist.filter === 'completed' ? 'secondary' : 'primary'}
                    variant={'contained'}
                    size={'small'}
                    className={todolist.filter === 'completed' ? "active-filter" : ""}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
})
