import { Screen } from "../../../cmps/Screen.jsx";
import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";
import { NoteEdit } from "../cmps/NoteEdit.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";

export class NotesApp extends React.Component {
    state = {
        notes: [],
        isEditMode: false,
        inputType: 'note-txt'
    }

    
    componentDidMount(){
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then(notes => {
            this.setState({ notes })
        })
    }

    setInputType = (type) => {
        this.setState({...this.state, inputType: type})
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
    onIsEditMode = (noteMode) => {
        this.setState({ isEditMode: noteMode })

    }



    onCreateNote = (info) => {
        notesService.createNote(info,this.state.inputType);
        this.loadNotes();
    }

    render(){

        const {inputType} = this.state;

        return(
            <div className="notes-app">

               <NoteAdd inputType={inputType} setInputType={this.setInputType} creatNote={this.onCreateNote}/>

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