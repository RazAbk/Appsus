export function NoteVideo({ info }) {

    let newUrl = info.url.replace('watch?v=', `embed/`);
    newUrl = newUrl.replace('youtube', 'youtube-nocookie');
   
    return (
        <div className="note-video">
            <iframe src={newUrl}></iframe>
            <p>{info.title}</p>
        </div>
    )

}
