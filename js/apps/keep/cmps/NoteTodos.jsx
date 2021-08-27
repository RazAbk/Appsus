export function NoteTodos({ noteId, info, selectedNote, onSaveEdit }) {

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
                        <li onClick={toggleTodo} className="todo" key={`${todo.id}-${idx}`}>{todo.txt}</li>)}
                </ul>
            </div >
        )
    } else {
        return (
            <div className="todos">
                <h2 ><input name="label" type="text" placeholder="enter label" ref={labelRef} /></h2>
                < ul className="todos-list" ref={todosRef}>

                    {todos.map((todo, idx) =>
                        <li key={`${todo.id}-${idx}`}><input type="text" placeholder={todo.txt} /> </li>)}
                </ul>
                <button onClick={() => { handleRef() }}>save</button>

            </div >

        )
    }
}