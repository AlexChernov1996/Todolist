import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./Store/todolistsReducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./Store/tasksReducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todolistId: string]: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(id: string, todolistId: string) {
        dispatchTasks(removeTaskAC(id, todolistId))
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasks(addTaskAC(title, todolistId))
    }

    function changeStatus(taskId: string, status: boolean, todolistId: string) {
        dispatchTasks(changeTaskStatusAC(taskId, status, todolistId))
    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchTodolists(action)
        dispatchTasks(action)
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        dispatchTodolists(changeTodolistFilterAC(todolistId, value))
    }

    function removeTodolist(todolistId: string) {
        dispatchTasks(removeTodolistAC(todolistId))
        dispatchTodolists(removeTodolistAC(todolistId))
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        dispatchTasks(changeTaskTitleAC(taskId, title, todolistId))
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchTodolists(changeTodolistTitleAC(todolistId, title))
    }

    return (<div className="App">
            <AppBar position={"static"}>
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoList
                    </Typography>
                    <Button color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: '10px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container>
                    {todolists.map((t) => {
                        let tasksForTodolist = tasks[t.id]
                        if (t.filter === "active") {
                            tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                        }
                        if (t.filter === "completed") {
                            tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                        }
                        return <Paper elevation={3} style={{margin: '20px 10px', padding: "20px"}}>
                            <Todolist
                                key={t.id}
                                todolistId={t.id}
                                title={t.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                filter={t.filter}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                            /></Paper>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default App;
