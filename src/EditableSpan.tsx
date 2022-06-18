import React, {ChangeEvent, KeyboardEvent, memo, useCallback, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log('Span')
    const [title, setTitle] = useState('')
    const [editable, setEditable] = useState(false)
    const onDoubleClickOnEditableMode = () => setEditable(true)
    const onBlurEditableModeOff = () => {
        setEditable(false)
        if (title.trim()) {
            props.changeTitle(title)
        }

    }
    const onKeyPressChangeTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditable(false)
            props.changeTitle(title)
            setTitle('')
        }
    }
    const editableInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <>
            {editable
                ? <TextField autoFocus
                             value={title}
                             onBlur={onBlurEditableModeOff}
                             onChange={editableInputChange}
                             onKeyPress={onKeyPressChangeTitle}

                />
                : <span onDoubleClick={onDoubleClickOnEditableMode}>{props.title}</span>}
        </>
    );
})

