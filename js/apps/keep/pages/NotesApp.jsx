import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";
import { NoteAdd } from "../cmps/NoteAdd.jsx";

export class NotesApp extends React.Component {

    state = {
        notes: [],
        inputType: 'text'
    }


    componentDidMount(){
        this.loadNotes();
        this.formRef = React.createRef();
        this.functionBtns = React.createRef();
        this.secondInput = React.createRef();
        this.addNote = React.createRef();
    }

    loadNotes = () => {
        notesService.query().then(notes => {
            this.setState({notes})
        })
    }

    onEnterForm = (ev) => {
        // Expand
        const form = ev.target.form;
        form.classList.add('expand-form')

        //Reveal function buttons
        this.functionBtns.current.classList.add('inside-form-visible');
        // Reveal second input
        if(this.state.inputType !== 'text'){
            this.secondInput.current.classList.add('inside-form-visible');
        }
        // Reveal add button
        this.addNote.current.classList.add('inside-form-visible');
    }

    onLeaveForm = (ev) => {
            // console.log(ev.target.id) 
            // Shrink
            const form = ev.target.form;
            form.classList.remove('expand-form')
            
            // UnReveal function buttons
            this.functionBtns.current.classList.remove('inside-form-visible');
            // UnReveal second input
            this.secondInput.current.classList.remove('inside-form-visible');
            // UnReveal add button
            this.addNote.current.classList.remove('inside-form-visible');
    }

    onSetInputType = (type) => {
        this.setState({...this.state, inputType: type})

        // Expand
        this.formRef.current.classList.add('expand-form')

        //Reveal function buttons
        this.functionBtns.current.classList.add('inside-form-visible');
        // Reveal second input
        if(type !== 'text'){
            this.secondInput.current.classList.add('inside-form-visible');
        }else{
            this.secondInput.current.classList.remove('inside-form-visible');
        }
        // Reveal add button
        this.addNote.current.classList.add('inside-form-visible');

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

    render(){

        const {inputType} = this.state;

        return(
            <div className="notes-app">

                <section className="notes-input notes-layout">
                    <form className="notes-input-form" ref={this.formRef}>
                        <label htmlFor="notes-title"></label>
                        <input id="notes-title" type="text" placeholder="Whats on your mind?" onFocus={this.onEnterForm} onBlur={this.onLeaveForm}/>
                        <div className={`second-input ${inputType !== 'text' ? 'inside-form-visible' : ''}`} ref={this.secondInput}>
                            <label htmlFor="notes-content"></label>
                            <input   id="notes-content" type="text" placeholder="Take a note" onFocus={this.onEnterForm} onBlur={this.onLeaveForm}/>
                        </div>
                        <div className="choose-type-btns" ref={this.functionBtns}>
                            <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {this.onSetInputType('text')}} className="far fa-file-alt"></i>
                            <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {this.onSetInputType('todo')}} className="fas fa-list-ul"></i>
                            <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {this.onSetInputType('image')}} className="far fa-image"></i>
                            <i tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {this.onSetInputType('video')}} className="fab fa-youtube"></i>
                        </div>
                        <button tabIndex="-1" onFocus={(ev)=>{ev.target.click()}} onBlur={(ev)=>{ev.target.blur()}} onClick={() => {console.log('add note')}} ref={this.addNote} className="add-note-btn">add note</button>
                    </form>
                </section>

                <section className="notes-cards notes-layout">
                    <h2>pinned</h2>
                    <div className="notes-pinned">
                        <div className="cards-container">
                            <NotesList
                                notes={this.state.notes.filter(note => note.isPinned)}
                                onDeleteNote={this.onDeleteNote}
                                onToggleNotePin={this.onToggleNotePin}
                                onDuplicateNote={this.onDuplicateNote}
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
                            />
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}