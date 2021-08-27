export function NoteVideo({ noteId, info, selectedNote, onSaveEdit }) {

    const videoRef = React.createRef()
    const handleRef = () => {
        const setInfo = { url: videoRef.current.value, }
        console.log(setInfo)

        onSaveEdit(noteId, setInfo)
    }

    let newUrl = info.url.replace('watch?v=', `embed/`);
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
                    <input type="text" placeholder="enter new url video" ref={videoRef} />
                </div>
                <button onClick={() => handleRef()}> save!</button>
            </div>
        )

    }

}
