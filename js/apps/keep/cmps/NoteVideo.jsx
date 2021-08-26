export function NoteVideo({ info }) {

    const newUrl = info.url.replace('watch?v=', `embed/`)
   
    return (
        <div className="note-video">
            <iframe src={newUrl}></iframe>
            <p>{info.title}</p>
        </div>
    )

}