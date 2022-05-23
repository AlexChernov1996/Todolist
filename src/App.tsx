import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
export type todolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
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
    function changeTodolistTitle(todolistId:string,title:string){
        setTodolists(todolists.map(t=> t.id === todolistId ? {...t,title} : t))
    }

    return (<div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((t) => {
                let tasksForTodolist = tasks[t.id]
                if (t.filter === "active") {
                    tasksForTodolist = tasks[t.id].filter(t => !t.isDone);
                }
                if (t.filter === "completed") {
                    tasksForTodolist = tasks[t.id].filter(t => t.isDone);
                }
                return <Todolist
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
                />
            })}

        </div>
    )
}

export default App;
