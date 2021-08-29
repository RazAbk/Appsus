export function NoteVideo({ noteId, info, selectedNote, onSaveEdit, onGoBack }) {

    let newUrl;
    const videoRef = React.createRef()

    const handleRef = () => {
        const setInfo = { url: videoRef.current.value, }

        onSaveEdit(noteId, setInfo)
    }

        newUrl = info.url.replace('watch?v=', `embed/`);
        newUrl = newUrl.replace('youtube', 'youtube-nocookie');

    if (!selectedNote || selectedNote != noteId) {
        return (
            <div className="note-video">
                <iframe src={newUrl}></iframe>
                <p>{info.title}</p>
            </div>
        )
    } else {
        return (
            <div className="note-video">
                <div className="edit-inputs">
                    <iframe src={newUrl}></iframe>
                    <p>enter new url</p>
                    <input type="text" defaultValue={newUrl} ref={videoRef} />
                    <div className="edit-buttons">
                        <button className="btn edit-save" onClick={() => handleRef()}> save! </button>
                        <button className="btn edit-goback fas fa-times" onClick={() => onGoBack()}></button>
                    </div>
                </div>
            </div>
        )

    }

}
