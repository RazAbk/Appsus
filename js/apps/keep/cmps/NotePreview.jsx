import { NoteTxt } from "./NoteTxt.jsx";
import { NoteImg } from './NoteImg.jsx'
import { NoteTodos } from './NoteTodos.jsx'

export function NotePreview({ note }) {

    const { info } = note;

    let noteToDisplay;

    switch (note.type) {
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
            noteToDisplay = <NoteTodos info={info} id={note.id} />
            break;
    }



    return (
        <div className={`note ${note.type}`}>
            {/* Note Content */}
            {noteToDisplay}
            {/* Note nav bar */}
        </div>
    )
}