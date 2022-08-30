import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Route, Routes, Navigate} from "react-router-dom";
import {isAuthTC, logOutTC} from "../features/Login/authReducer";
import {CircularProgress} from "@mui/material";


function App() {
    const dispatch = useDispatch()

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialize = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialize)
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.auth.isLoggedIn)
    useEffect(() => {
        dispatch(isAuthTC())
    }, [])
    const logOutHandler = () => {
        dispatch(logOutTC())
    }
    if (!isInitialize) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar className={"myToolbar"}>
                    <>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                    </>
                    {isLoggedIn && <Button onClick={logOutHandler} color="inherit">LogOut</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistsList/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='404' element={<h1>404</h1>}/>
                    <Route path="*" element={<Navigate to="404" replace/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
