import React from 'react';
import {TaskType, TodolistType} from "./App";

type TodolistPropsType = {
    todolists: TodolistType[]
    tasks: TaskType[]
}

const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.todolists[0].title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].title}</span>
                    </li>
                    <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].title}</span>
                    </li>
                    <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span>
                    </li>
                </ul>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
        </div>
    );
};

export default Todolist;
