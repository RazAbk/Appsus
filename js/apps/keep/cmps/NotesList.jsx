import { NotePreview } from "./NotePreview.jsx"

export function NotesList({ notes }){

    return notes.map(note => <NotePreview key={note.id}  note={note} />)
}