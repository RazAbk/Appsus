export function NoteTodos({ noteId, info, selectedNote, onSaveEdit }) {
    // let curTodos = [{}]
    let todos = info.todos

    const handleChange = (ev) => {
        curTodos = ev.target.value
    }

    const toggleTodo = (ev) => {
        ev.target.classList.toggle('put-line');
    }
    if (!selectedNote || selectedNote != noteId) {

        return (
            <div className="todos">
                < ul className="todos-list" >
                    {todos.map((todo, idx) =>
                        <li onClick={toggleTodo} className="todo" key={`${todo.id}-${idx}`}>{todo.txt}</li>)}
                </ul>
            </div >
        )
    } else {
        return (
            <div className="todos">
                < ul className="todos-list" >
                    {todos.map((todo, idx) =>
                        <li key={`${todo.id}-${idx}`}><input type="text" placeholder={todo.txt} onChange={handleChange} /> </li>)}
                </ul>
                <button onClick={() => { onSaveEdit(noteId, curentVal) }}>save</button>

            </div >

        )
    }
}