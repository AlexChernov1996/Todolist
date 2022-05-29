import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
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
        const newTasks = {...tasks}
        newTasks[todolistId] = tasks[todolistId].filter(t => t.id !== id)
        setTasks(newTasks);
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = {...tasks};
        newTasks[todolistId].push(task)
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, status: boolean, todolistId: string) {
        let newTasks = {...tasks}
        newTasks[todolistId] = newTasks[todolistId].map(t => t.id === taskId ? {...t, isDone: status} : t)
        setTasks(newTasks);
    }

    function addTodolist(title: string) {
        const todolistId = v1()
        setTodolists([...todolists, {id: todolistId, title, filter: 'all'}])
        setTasks({...tasks, [todolistId]: []})
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, filter: value} : t))
    }

    function removeTodolist(todolistId: string) {
        setTodolists(todolists.filter(t => t.id !== todolistId))
        delete tasks[todolistId]
    }

    function changeTaskTitle(todolistId: string, taskId: string, title: string) {
        let newTasks = {...tasks}
        const updatedTasks = tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        newTasks[todolistId] = updatedTasks
        setTasks(newTasks)
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        setTodolists(todolists.map(t => t.id === todolistId ? {...t, title} : t))
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
                <Grid container style={{margin:'10px'}}>
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
                        return<Paper elevation={3} style={{margin:'20px 10px', padding:"20px"}}>
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
