import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, IconButton, Toolbar, Typography, Grid, Paper} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import {addTodolistAC} from "./Store/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootAppType} from "./Store/store";
import {TodolistWithTasks} from "./TodolistWithTasks";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


function AppRedux() {
    let todolists = useSelector<RootAppType, TodolistType[]>(store => store.todolists)
    const dispatch = useDispatch()

    const addTodolist = useCallback((title: string)=> {
        dispatch(addTodolistAC(title))
    },[dispatch])
    return (
        <div className="App">
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

                        return <Paper key={t.id} elevation={3} style={{margin: '20px 10px', padding: "20px"}}>
                            <TodolistWithTasks
                                todolist={t}
                            /></Paper>
                    })}
                </Grid>
            </Container>
        </div>
    )
}

export default AppRedux;
