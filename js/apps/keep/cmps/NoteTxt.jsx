export function NoteTxt({ noteId, info, selectedNote, onSaveEdit }) {
    let setInfo;
    console.log(info);

    const handleChange = (ev) => {
        console.log(ev.target.value);
        setInfo = { txt: ev.target.value }
        console.log(setInfo);
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
                    <input name="text" type=" text" placeholder={info.txt} onChange={handleChange} />
                </form>
                <button onClick={() => { onSaveEdit(noteId, setInfo) }}>save</button>
            </div>

        )

    }
}