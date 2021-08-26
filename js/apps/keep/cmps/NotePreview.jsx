import { NoteTxt } from "./NoteTxt.jsx";

export function NotePreview({ note }){

    const {info} = note;
    console.log(note.type)

    return(
        <div className={`note ${note.type}`}>
            {Object.keys(info).map((inf,idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)}
        </div>
    )
}