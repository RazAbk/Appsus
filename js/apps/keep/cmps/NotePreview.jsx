import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'

export function NotePreview({ note }){

    const {info} = note;
    
    let noteToDisplay;

    switch(note.type){
        case 'note-txt':
            noteToDisplay = <NoteTxt info={info} />
        break;
        case 'note-img':
            noteToDisplay = <NoteImg info={info} />
        break;
        case 'note-video':
            noteToDisplay = '<NoteVideo info={info} />'
        break;
        case 'note-todos':
            noteToDisplay = '<NoteTodos info={info} />'
        break;
    }

    console.log(noteToDisplay)

    return(
        <div className={`note ${note.type}`}>
            {/* {Object.keys(info).map((inf,idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)} */}
            {noteToDisplay}
        </div>
    )
}