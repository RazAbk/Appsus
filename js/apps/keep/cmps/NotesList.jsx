import { NotePreview } from "./NotePreview.jsx"

export function NotesList({ notes, onDeleteNote }){

    return notes.map(note => <NotePreview key={note.id}  note={note} onDeleteNote={onDeleteNote} />)
}