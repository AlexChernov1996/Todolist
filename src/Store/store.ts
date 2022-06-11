import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

let rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})
export let store = legacy_createStore(rootReducer)
export type RootAppType = ReturnType<typeof rootReducer>
