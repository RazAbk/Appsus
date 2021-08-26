import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'

export function NotePreview({ note, onDeleteNote, onToggleNotePin }){

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

    const displayFuncs = (ev) => {
        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        ev.stopPropagation();
        if(elFuncs){
            elFuncs.classList.add('expand-note')
        }
    }
    
    
    const hideFuncs = (ev) => {
        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        ev.stopPropagation();
        if(elFuncs){
            elFuncs.classList.remove('expand-note')
        }
    }



    return(
        <div className={`note ${note.type}`} onMouseEnter={displayFuncs} onMouseLeave={hideFuncs}>
            <div className="note-content">
                {noteToDisplay}
            </div>
            <div className="note-funcs">
                <i onClick={() => {onDeleteNote(note.id)}} className="fas fa-trash"></i>
                <i onClick={() => {onToggleNotePin(note.id)}} className="fas fa-thumbtack"></i>
                <i className="fas fa-palette"></i>
                <i className="fas fa-clone"></i>
                <i className="fas fa-edit"></i>
                <i className="fas fa-at"></i>
            </div>
        </div>
    )
}