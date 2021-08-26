<<<<<<< HEAD
import { NoteImg } from "./NoteImg.jsx";
import { NotesList } from "./NotesList";

export function NotePreview({ note }) {

    const { info } = note;

    return (
        <div className="note">
            {Object.keys(info).map((inf, idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)}
            <NoteImg note={note} />
=======
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
>>>>>>> 4f0b476500114569d6897be982d96e307667b96d
        </div>
    )
}