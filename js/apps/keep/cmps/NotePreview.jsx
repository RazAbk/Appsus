import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from "./NoteVideo.jsx";



export function NotePreview({ note, onDeleteNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onSaveEdit, onGoBack, onChangeColor, backgroundColor }) {


    // let noteToEdit = false
    let currNote = React.createRef();
    let noteToDisplay;

    const { info } = note

    switch (note.type) {
        case `note-txt`:
            noteToDisplay = <NoteTxt noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} />
            break;
        case `note-img`:
            noteToDisplay = <NoteImg noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} />
            break;
        case `note-video`:
            noteToDisplay = <NoteVideo noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} />
            break;
        case `note-todos`:
            noteToDisplay = <NoteTodos noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} />
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
        <div className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} onMouseEnter={displayFuncs}
            onMouseLeave={hideFuncs} ref={currNote} style={{ backgroundColor: (backgroundColor ? backgroundColor : 'rgb(255 212 212 / 16%);') }}>
            <div className="note-content">
                {noteToDisplay}
            </div>
            <div className={`note-funcs ${selectedNote === note.id ? 'edit-func' : ''}`}>
                <i onClick={() => { onDeleteNote(note.id) }} className="fas fa-trash"></i>
                <i onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <label className="fas fa-palette" htmlFor="color-input"><input className="color-input" id="color-input" type="color" onChange={(ev) => { onChangeColor(ev) }} /></label>
                <i onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i onClick={toggleEditMode} className={`fas fa-edit`}></i>
                <i className="fas fa-at"></i>
            </div>

        </div >
    )

}