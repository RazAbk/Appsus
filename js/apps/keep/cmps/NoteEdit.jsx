import { notesService } from "../services/note-service.js"

export function NoteEdit({ noteId }) {
    const note = notesService.getNoteById(noteId)
    let noteToEdit;
    // switch (note.type) {
    //     case 'note-txt':
    //         noteToEdit = <NoteTxt info={info} />
    //         break;
    //     case 'note-img':
    //         noteToEdit = <NoteImg info={info} />
    //         break;
    //     case 'note-video':
    //         noteToEdit = <NoteVideo info={info} />
    //         break;
    //     case 'note-todos':
    //         noteToEdit = <NoteTodos info={info} id={note.id} />
    //         break;
    // }



    return (
        <div className="note-edit">
            {}
        </div>


    )

}