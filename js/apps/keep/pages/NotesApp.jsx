import { Screen } from "../../../cmps/Screen.jsx";
import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";
import { NoteEdit } from "../cmps/NoteEdit.jsx";

export class NotesApp extends React.Component {

    state = {
        notes: [],
        isEditMode: false
    }


    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then(notes => {
            this.setState({ notes })
        })
    }

    onInputFocus = (ev) => {
        console.dir(ev.target)
    }

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
    onIsEditMode = (noteMode) => {
        this.setState({ isEditMode: noteMode })

    }




    // notesService.editNote(noteId)



    render() {
        const { isEditMode } = this.state
        return (
            <div className="notes-app">

                <section className="notes-input notes-layout">
                    <form className="notes-input-form" ref={this.formRef}>
                        <label htmlFor="notes-title"></label>
                        <input id="notes-title" type="text" placeholder="Whats on your mind?" />
                        <label htmlFor="notes-content"></label>
                        <input id="notes-content" type="text" placeholder="Take a note" onFocus={this.onInputFocus} />
                    </form>
                </section>

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
                                onIsEditMode={this.onIsEditMode}
                                isEditMode={isEditMode}

                            />

                        </div>
                    </div>

                    <h2>notes</h2>
                    <div className="notes-general">
                        <div className="cards-container">

                            {/* Notes list */}
                            <NotesList
                                notes={this.state.notes.filter(note => !note.isPinned)}
                                onDeleteNote={this.onDeleteNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onIsEditMode={this.onIsEditMode}
                                isEditMode={isEditMode}


                            />

                        </div>

                    </div>
                </section>
            </div>
        )
    }
}