export function NoteImg({ noteId, info, selectedNote, onSaveEdit }) {

    const urlRef = React.createRef()
    const urlTitle = React.createRef()

    const handleRef = () => {
        console.log(urlRef);
        const setInfo = {
            url: urlRef.current.value,
            title: urlTitle.current.value
        }
        console.log(setInfo)

        onSaveEdit(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId) {
        return (
            <div className="note-card">
                <img className="img-Note" src={`${info.url}`} />
                <h3>{info.title}</h3>
            </div>
        )

    } else {
        return (

            <div className="edit-note">
                <img className="img-Note" src={`${info.url}`} />
                <div className="edit-inputs">
                    <input type="text" placeholder="enter new image url" ref={urlRef} />
                    <input type="text" placeholder="enter new image title" ref={urlTitle} />

                </div>
                <button onClick={() => handleRef()}> save!</button>

            </div>
        )

    }
}