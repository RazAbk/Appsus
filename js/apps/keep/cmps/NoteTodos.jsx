export function NoteTodos({ info, id }) {

    let todos = info.todos

    const toggleTodo = (ev) => {
        console.log(ev)
        ev.target.classList.toggle('put-line');
    }

    return (
        <div className="todos">
            < ul className="todos-list" >
                {todos.map((todo, idx) =>
                    <li onClick={toggleTodo} className="todo" key={`${id}-${idx}`}>{todo.txt}</li>)}
            </ul>
        </div >
    )
}