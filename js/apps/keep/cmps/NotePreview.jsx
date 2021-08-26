export function NotePreview({ note }){

    const {info} = note;

    return(
        <div className="note">
            {Object.keys(info).map((inf,idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)}
        </div>
    )
}