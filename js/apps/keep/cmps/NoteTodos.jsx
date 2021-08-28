export function NoteTodos({ noteId, info, selectedNote, onSaveEdit, onGoBack }) {

    const todos = info.todos
    const todosRef = React.createRef();
    const labelRef = React.createRef()

    const handleRef = () => {
        const inputs = Array.from(todosRef.current.children)
        const Info = inputs.map(input => {
            const value = input.children[0].value;
            return { txt: value, doneAt: Date.now() }
        })
        const setInfo = {
            label: labelRef.current.value,
            todos: Info
        }
        onSaveEdit(noteId, setInfo)
    }

    const toggleTodo = (ev) => {
        ev.target.classList.toggle('put-line');
    }
    if (!selectedNote || selectedNote != noteId) {

        return (
            <div className="todos">
                <h2>{info.label}</h2>
                < ul className="todos-list" >
                    {todos.map((todo, idx) =>
                        <li title="toggle done / undone" onClick={toggleTodo} className="todo" key={`${todo.id}-${idx}`}>{todo.txt}</li>)}
                </ul>
            </div >
        )
    } else {
        return (
            <div className="edit-note">
                <div className="edit-inputs-todos">
                    <input className="edit-label" name="label" type="text" defaultValue={info.label} ref={labelRef} />
                    < ul className="todos-list" ref={todosRef}>
                        {todos.map((todo, idx) =>
                            <li className="edit-list" key={`${todo.id}-${idx}`}><input type="text" defaultValue={todo.txt} /> </li>)}
                    </ul>
                </div>
                <div className="edit-buttons ">
                    <button className="btn edit-save" onClick={() => handleRef()}> save! </button>
                    <button className="btn edit-goback fas fa-times" onClick={() => onGoBack()}></button>
                </div>


            </div >

        )
    }
}