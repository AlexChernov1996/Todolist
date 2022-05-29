import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    DeleteTodolistAC,
    todolistsReducer
} from "./todolistsReducer";
import {TodolistType} from "../App";

test("Delete todolist", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let initState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(initState, DeleteTodolistAC(todolistId1))

    expect(endState[0].id).toBe(todolistId2)
    expect(endState.length).toBe(1)
})
test("Add todolist", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let initState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(initState, AddTodolistAC("3"))

    expect(endState[0].id).toBe(todolistId1)
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('3')
})
test("Change title", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let initState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(initState, ChangeTodolistTitleAC(todolistId2, "3"))

    expect(endState.length).toBe(2)
    expect(endState[1].title).toBe('3')
})
test("CHANGE todolist filter", () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let initState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]
    const endState = todolistsReducer(initState, ChangeTodolistFilterAC(todolistId1,'active'))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe('active')
})
