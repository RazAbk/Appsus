import { NotePreview } from "./NotePreview.jsx"
import { utilService } from "../../../services/util.service.js"

export function NotesList({ notes, onDeleteNote, onToggleNotePin, onDuplicateNote }){

    return notes.map(note => <NotePreview key={`${note.id}-${utilService.getRandomIntInclusive(1,10000)}`}
                                note={note}
                                onDeleteNote={onDeleteNote}
                                onToggleNotePin={onToggleNotePin}
                                onDuplicateNote={onDuplicateNote}
                            />)
}