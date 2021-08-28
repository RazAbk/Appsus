import { Screen } from "../../../cmps/Screen.jsx";
import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";
import { eventBusService } from "../../../services/event-bus-service.js";

export class NotesApp extends React.Component {
    state = {
        notes: [],
        selectedNote: null,
        isSelectedColor: false,
        inputType: 'note-txt',

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


    onEditMode = (noteId) => {
        this.setState({ selectedNote: noteId }, this.loadNotes())

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

    onGetColor = (noteId) => {
        const { selectedColor } = this.state
        this.setState({ selectedColor: !selectedColor, selectedNote: noteId })

        // notesService.editNote(noteId, style)
    }
    onShowModal = (type) => {
        switch (type) {
            case 'duplicate': eventBusService.emit('user-msg', { txt: `duplicated!`, type: 'duplicate', time: 2000 })
                break;
            case 'pined': eventBusService.emit('user-msg', { txt: `now its on the top go look!`, type: 'pined', time: 2000 })
                break;
            case 'delete': eventBusService.emit('user-msg', { txt: `note deleted!`, type: 'delete', time: 2000 })
                break;
        }
    }

    onToggleNotePin = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('pined')
        }
        notesService.toggleNotePin(noteId);
        this.loadNotes();
    }

    onDuplicateNote = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('duplicate')
        }
        notesService.duplicateNote(noteId);
        this.loadNotes();
    }
    onDeleteNote = (noteId) => {
        if (this.state.selectedNote) {
            this.onShowModal('delete')
        }
        notesService.deleteNote(noteId);
        this.onGoBack()
        this.loadNotes();
    }


    render() {

        const { inputType, selectedNote, isSelectedColor } = this.state;

        return (
            <div className="notes-app">
                {selectedNote && <Screen isOpen={selectedNote} closeModal={this.onGoBack} />}
                <NoteAdd inputType={inputType} setInputType={this.setInputType} creatNote={this.onCreateNote} />

                <section className="notes-cards notes-layout">
                    <h2>pinned</h2>
                    <div className="notes-pinned">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => note.isPinned)}
                                onDeleteNote={this.onDeleteNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
                                onEditMode={this.onEditMode}
                                selectedNote={selectedNote}
                                onSaveEdit={this.onSaveEdit}
                                onGoBack={this.onGoBack}
                                onGetColor={this.onGetColor}
                                isSelectedColor={isSelectedColor}

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
                                onGetColor={this.onGetColor}
                                isSelectedColor={isSelectedColor}
                            />
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}