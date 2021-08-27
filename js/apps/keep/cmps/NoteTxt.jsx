export function NoteTxt({ noteId, info, selectedNote, onSaveEdit, onGoback }) {
    let setInfo;

    const txtRef = React.createRef()

    const handleRef = () => {
        setInfo = { txt: txtRef.current.value }
        onSaveEdit(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId) {
        return (
            <div className="note-txt">
                <h2>{info.txt}</h2>
            </div>
        )
    } else {
        return (
            <div className="note-txt">
                <form>
                    <input ref={txtRef} name="text" type=" text" placeholder={info.txt} />
                </form>
                <button onClick={() => { handleRef() }}>save</button>
            </div>

        )

    }
}
