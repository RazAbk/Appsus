import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from "./NoteVideo.jsx";



export function NotePreview({ note, onDeleteNote, onToggleNotePin, onEditMode, selectedNote, onSaveEdit }) {


    // let noteToEdit = false
    let currNote = React.createRef();
    let noteToDisplay;

    const { info } = note

    switch (note.type) {
        case `note-txt`:
            noteToDisplay = <NoteTxt noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} />
            break;
        case `note-img`:
            noteToDisplay = <NoteImg noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} />
            break;
        case `note-video`:
            noteToDisplay = <NoteVideo info={info} />
            break;
        case `note-todos`:
            noteToDisplay = <NoteTodos noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} />
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
        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        ev.stopPropagation();
        if (elFuncs) {
            elFuncs.classList.remove('expand-note')
        }

    }


    const toggleEditMode = () => {
        onEditMode(note.id)

    }



    return (
        <div className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} onMouseEnter={displayFuncs} onMouseLeave={hideFuncs} ref={currNote}>
            <div className="note-content">
                {noteToDisplay}
            </div>
            <div className="note-funcs">
                <i onClick={() => { onDeleteNote(note.id) }} className="fas fa-trash"></i>
                <i onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i className="fas fa-palette"></i>
                <i onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i onClick={toggleEditMode} className={`fas fa-edit`}></i>
                <i className="fas fa-at"></i>
            </div>

        </div>
    )
}