import { NotePreview } from "./NotePreview.jsx"
import { utilService } from "../../../services/util.service.js"

export function NotesList({ notes, onDeleteNote, onToggleNotePin, onDuplicateNote, onEditMode, selectedNote, onSaveEdit, onGoBack, onSetColorToNote }) {

    return notes.map(note => <NotePreview key={`${note.id}-${utilService.getRandomIntInclusive(1, 100000)}`}
        note={note}
        onDeleteNote={onDeleteNote}
        onToggleNotePin={onToggleNotePin}
        onDuplicateNote={onDuplicateNote}
        onEditMode={onEditMode}
        selectedNote={selectedNote}
        onSaveEdit={onSaveEdit}
        onGoBack={onGoBack}
        onSetColorToNote={onSetColorToNote}
       
    />)

}