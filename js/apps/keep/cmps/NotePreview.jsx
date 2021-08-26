import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from "./NoteVideo.jsx";



export function NotePreview({ note, onDeleteNote, onToggleNotePin, onIsEditMode, isEditMode }) {

    // let noteToEdit = false
    let currNote = React.createRef();
    let noteToDisplay;
    console.log(onIsEditMode)

    const { info } = note

    switch (note.type) {
        case 'note-txt':
            noteToDisplay = <NoteTxt info={info} isEditMode={isEditMode} />
            break;
        case 'note-img':
            noteToDisplay = <NoteImg info={info} />
            break;
        case 'note-video':
            noteToDisplay = <NoteVideo info={info} />
            break;
        case 'note-todos':
            noteToDisplay = <NoteTodos info={info} id={note.id} />
            break;
    }

    const displayFuncs = (ev) => {
        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        ev.stopPropagation();
        if (elFuncs) {
            elFuncs.classList.add('expand-note')
        }
    }


    const hideFuncs = (ev) => {
        const elFuncs = ev.target.getElementsByClassName('note')[0];
        ev.stopPropagation();
        if (elFuncs) {
            elFuncs.classList.remove('expand-note')
        }

    }

    const toggleEditModal = (ev) => {
        const elNote = ev.target.parentElement.parentElement;
        elNote.style.backgroundColor = 'red';
    }

    const toggleEditMode = () => {
        console.log('hi')
        console.log(currNote.current)
        onIsEditMode(true)
        
        currNote.current.classList.add('note-edit')

    }



    return (
        <div className={`note ${note.type}`} onMouseEnter={displayFuncs} onMouseLeave={hideFuncs} ref={currNote}>
            <div className="note-content">
                {noteToDisplay}
            </div>
            <div className="note-funcs">
                <i onClick={() => { onDeleteNote(note.id) }} className="fas fa-trash"></i>
                <i onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i className="fas fa-palette"></i>
                <i className="fas fa-clone"></i>
                {/* <i onClick={() => { onEditNote(note.id); console.log('hey');  }} className={`fas fa-edit`}></i> */}
                {/* <i onClick={toggleEditModal} className={`fas fa-edit`}></i> */}
                <i onClick={toggleEditMode} className={`fas fa-edit`}></i>
                <i className="fas fa-at"></i>
            </div>

        </div>
    )
}