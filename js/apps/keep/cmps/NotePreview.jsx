
import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'
import { NoteVideo } from "./NoteVideo.jsx";
import { Colors } from "./Colors.jsx";




export function NotePreview({ note, onDeleteNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onSaveEdit, onGoBack, onSetColorToNote, test }) {

    let noteToDisplay;
    let currNote = React.createRef();



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

    const showOrHideFuncs = (ev, input) => {

        const elFuncs = ev.target.getElementsByClassName('note-funcs')[0];
        if (input === 'enter') {
            elFuncs.classList.add('expand-note')
        } else {
            elFuncs.classList.remove('expand-note')
        }
    }

    const toggleColor = () => {
        document.querySelector(`.color-${note.id}`).classList.toggle('show')

    }


    return (
        <div onMouseEnter={(ev) => { showOrHideFuncs(ev, 'enter') }}
            onMouseLeave={(ev) => { showOrHideFuncs(ev, 'leave') }}

            abindex="-1" className={`note ${note.type} ${note.id} ${note.id === selectedNote}`} ref={currNote} style={note.style}  >
            <div className="note-content mobile">
                {noteToDisplay}
            </div>
            <div className={`note-funcs ${selectedNote === note.id ? 'edit-func' : ''}`}>
                <i title="delete note" onClick={() => { onDeleteNote(note.id) }} className="fas fa-trash"></i>
                <i title="pin / unpin note" onClick={() => { onToggleNotePin(note.id) }} className="fas fa-thumbtack"></i>
                <i title="change color" onClick={() => { toggleColor() }} className="fas fa-palette"></i>
                <i title="duplicate note" onClick={() => { onDuplicateNote(note.id) }} className="fas fa-clone"></i>
                <i title="edit note" onClick={() => { onEditMode(note.id) }} className={`fas fa-edit`}></i>
                <div className={`colors color-${note.id}`}><Colors onSetColorToNote={onSetColorToNote} noteId={note.id} test={test} /></div>


            </div>

        </div >
    )

}