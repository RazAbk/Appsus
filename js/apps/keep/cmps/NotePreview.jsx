import { NoteTxt } from "./NoteTxt.jsx";

export function NotePreview({ note }){

    const {info} = note;
    
    let noteToDisplay;

    switch(note.type){
        case 'note-txt':
            noteToDisplay = <NoteTxt info={info} />
        break;
        default:
            noteToDisplay = '';
    }

    return(
        <div className={`note ${note.type}`}>
            {Object.keys(info).map((inf,idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)}
        </div>
    )
}