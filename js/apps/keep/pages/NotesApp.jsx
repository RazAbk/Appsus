import { notesService } from "../services/note-service.js";
import { NotesList } from "../cmps/NotesList.jsx";

export class NotesApp extends React.Component {

    state = {
        notes: []
    }


    componentDidMount(){
        this.loadNotes();
    }

    loadNotes = () => {
        notesService.query().then(notes => {
            this.setState({notes})
        })
    }

    onInputFocus = (ev) => {
        console.dir(ev.target)
    }

    render(){

        return(
            <div className="notes-app">

                <section className="notes-input notes-layout">
                    <form className="notes-input-form" ref={this.formRef}>
                        <label htmlFor="notes-title"></label>
                        <input id="notes-title" type="text" placeholder="Whats on your mind?"/>
                        <label htmlFor="notes-content"></label>
                        <input id="notes-content" type="text" placeholder="Take a note" onFocus={this.onInputFocus}/>
                    </form>
                </section>

                <section className="notes-cards notes-layout">
                    <h2>pinned</h2>
                    <div className="notes-pinned">
                        <div className="cards-container">
                            
                            {/* Notes list */}
                            <NotesList notes={this.state.notes.filter(note => note.isPinned)}/>
                        
                        </div>
                        </div>

                    <h2>notes</h2>
                    <div className="notes-general">
                        <div className="cards-container">
                        
                            {/* Notes list */}
                            <NotesList notes={this.state.notes.filter(note => !note.isPinned)}/>

                        </div>

                    </div>
                </section>
            </div>
        )
    }
}