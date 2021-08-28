import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from "./NoteVideo.jsx";
import { Colors } from "./Colors.jsx";
import { notesService } from "../services/note-service.js";



export function NotePreview({ note, onDeleteNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onSaveEdit, onGoBack, onGetColor, isSelectedColor }) {
    let currNote = React.createRef();
    let noteToDisplay;


    const { info } = note

    switch (note.type) {
        case `note-txt`:
            noteToDisplay = <NoteTxt noteId={note.id} info={info} selectedNote={selectedNote} onSaveEdit={onSaveEdit} onGoBack={onGoBack} isSelectedColor={isSelectedColor} />
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

    const showOrHideFuncs = (ev, input) => {

        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        ev.stopPropagation();
        if (input === 'enter') {
            elFuncs.classList.add('expand-note')
        } else {
            elFuncs.classList.remove('expand-note')
        }
    }

    const changeColor = (ev, noteId) => {

        let style = { backgroundColor: ev.target.value }
        // onGetColor(noteId, style)

    }


    return (
        <div onMouseEnter={(ev) => { showOrHideFuncs(ev, 'enter') }}
            onMouseLeave={(ev) => { showOrHideFuncs(ev, 'leave') }}
            abindex="-1" className={`note ${note.type} ${selectedNote === note.id ? 'note-edit' : ''}`} ref={currNote} style={note.style}  >
            <div className="note-content mobile">
                {noteToDisplay}
            </div>
            <div className={`note-funcs ${selectedNote === note.id ? 'edit-func' : ''}`}>
                <i title="delete note" onClick={() => { onDeleteNote(note.id) }} className="fas fa-trash"></i>
                <i title="pin / unpin note" onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i title="change color" onClick={() => { onGetColor(note.id) }} className="fas fa-palette"></i>
                <i title="duplicate note" onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i title="edit note" onClick={() => { onEditMode(note.id) }} className={`fas fa-edit`}></i>
                {/* <i title="share note" className="fas fa-at"></i> */}
                {isSelectedColor && note.id === selectedNote && <Colors noteId={note.id} />}


            </div>

        </div >
    )

}