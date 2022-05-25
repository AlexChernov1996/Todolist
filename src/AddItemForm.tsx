import React, {ChangeEvent, useState} from 'react';
import {KeyboardEvent} from 'react'
import {Button, Icon, TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

type AddItemPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addItem(title)
            setTitle('')
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }
    return (
        <div>
            <TextField value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <Button variant="contained" color="primary" size={"small"} onClick={addItem}>

            <AddIcon />
            </Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};


