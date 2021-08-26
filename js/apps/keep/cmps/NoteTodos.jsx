export function NoteTodos({ info, id }) {

    let todos = info.todos
    let isToggle = false


    const toggleTodo = (ev) => {
        ev.target.classList.toggle('put-line');
    }




    return (
        <section className="todos">
            < ul className="todos-list" >
                {todos.map((todo, idx) =>
                    <li onClick={toggleTodo} className="todo" key={`${id}-${idx}`}>{todo.txt}</li>)}
            </ul>




        </section >
    )
}