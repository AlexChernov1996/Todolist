import {v1} from "uuid";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import {TodolistType} from "../App";
let todolistId1: string
let todolistId2: string
let initState: TodolistType[]


beforeEach(() => {
    todolistId1 = v1()
    todolistId2 = v1()
    initState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
})
test("Delete todolist", () => {

    const endState = todolistsReducer(initState, removeTodolistAC(todolistId1))

    expect(endState[0].id).toBe(todolistId2)
    expect(endState.length).toBe(1)
})
test("Add todolist", () => {

    const endState = todolistsReducer(initState, addTodolistAC("3"))
    expect(endState[0].id).toBe(todolistId1)
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('3')
})
test("Change title", () => {

    const endState = todolistsReducer(initState, changeTodolistTitleAC(todolistId2, "3"))
    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('3')
})
test("CHANGE todolist filter", () => {
    const endState = todolistsReducer(initState, changeTodolistFilterAC(todolistId1, 'active'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})
