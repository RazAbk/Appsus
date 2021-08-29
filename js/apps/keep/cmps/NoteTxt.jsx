export function NoteTxt({ noteId, info, selectedNote, onSaveEdit, onGoBack, isSelectedColor }) {
    let setInfo;

    const txtRef = React.createRef()

    const handleRef = () => {
        setInfo = { txt: txtRef.current.value }
        onSaveEdit(noteId, setInfo)
    }

    if (!selectedNote || selectedNote != noteId || isSelectedColor) {
        return (
            <div className="note-txt">
                <h2>{info.txt}</h2>
            </div>
        )
    } else {
        return (
            <div className="edit-note">
                <form className="edit-inputs-todos">
                    <input className="txt" ref={txtRef} name="text" type=" text" defaultValue={info.txt} />
                </form>
                <div className="edit-buttons">
                    <button className="btn edit-save" onClick={() => handleRef()}> save! </button>
                    <button className="btn edit-goback fas fa-times" onClick={() => onGoBack()}></button>

                </div>
            </div>

        )

    }
}
