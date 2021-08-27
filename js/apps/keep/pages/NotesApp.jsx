import { Screen } from "../../../cmps/Screen.jsx";
import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";

export class NotesApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null,
        inputType: 'note-txt'
    }


    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then(notes => {
            this.setState({ notes })
        })
    }

    setInputType = (type) => {
        this.setState({ ...this.state, inputType: type })
    }

    // Crud

    onDeleteNote = (noteId) => {
        notesService.deleteNote(noteId);
        this.loadNotes();
    }

    onToggleNotePin = (noteId) => {
        notesService.toggleNotePin(noteId);
        this.loadNotes();
    }

    onDuplicateNote = (noteId) => {
        notesService.duplicateNote(noteId);
        this.loadNotes();
    }
    onEditMode = (noteId) => {
        this.setState({ selectedNote: noteId })
    }
    onSaveEdit = (noteId, info) => {
        notesService.editNote(noteId, info)
        this.setState({ selectedNote: null })

    }

    onCreateNote = (info) => {
        notesService.createNote(info, this.state.inputType);
        this.loadNotes();
    }
    onGoBack = () => {
        this.setState({ selectedNote: null })
    }


    render() {

        const { inputType, selectedNote } = this.state;

        return (
            <div className="notes-app">

                <NoteAdd inputType={inputType} setInputType={this.setInputType} creatNote={this.onCreateNote} />

                <section className="notes-cards notes-layout">
                    <h2>pinned</h2>
                    <div className="notes-pinned">
                        <div className="cards-container">

                            {/* Notes list */}
                            <NotesList
                                notes={this.state.notes.filter(note => note.isPinned)}
                                onDeleteNote={this.onDeleteNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onSaveEdit={this.onSaveEdit}
                                onGoBack={this.onGoBack}

                            />
                        </div>
                    </div>

                    <h2>notes</h2>
                    <div className="notes-general">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => !note.isPinned)}
                                onDeleteNote={this.onDeleteNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onSaveEdit={this.onSaveEdit}
                                onGoBack={this.onGoBack}


                            />
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}