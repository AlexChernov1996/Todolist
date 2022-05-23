import React, {ChangeEvent,KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle:(title:string)=>void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState('')
    const [editable, setEditable] = useState(false)
    const onDoubleClickOnEditableMode =() => setEditable(true)
    const onBlurEditableModeOff = () => {
        setEditable(false)
        props.changeTitle(title)
    }
    const onKeyPressChangeTitle = (e:KeyboardEvent<HTMLInputElement>)=>{
       if(e.key ==="Enter"){
           setEditable(false)
           props.changeTitle(title)
           setTitle('')
       }
    }
   const editableInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setTitle(e.currentTarget.value)
   }
    return (
        <>
            {editable
                ? <input autoFocus value={title}
                         onBlur={onBlurEditableModeOff}
                         onChange={editableInputChange}
                         onKeyPress={onKeyPressChangeTitle}
                />
                : <span onDoubleClick={onDoubleClickOnEditableMode}>{props.title}</span>}
        </>
    );
};

