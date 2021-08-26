export class NotesApp extends React.Component {

    render(){
        return(
            <div className="notes-app">

                <section className="notes-input notes-layout">
                    <form className="notes-input-form">
                        <label htmlFor="notes-title"></label>
                        <input id="notes-title" type="text" placeholder="Whats on your mind?"/>
                        <label htmlFor="notes-content"></label>
                        <input id="notes-content" type="text" placeholder="Take a note"/>
                    </form>
                </section>

                <section className="notes-cards notes-layout">
                        <h2>pinned</h2>
                    <div className="notes-pinned">
                        <div className="cards-container">
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaiis aliquid autem!</div>
                            <div className="note" > quibusdam officiaaaaaaaaaaaaaaaais aliquid autem!</div>
                            <div className="note" > quibusdam ofusdam officiis alusdam officiis alficiis aliquid autem!</div>

                         
                        </div>
                    </div>
                        <h2>notes</h2>
                    <div className="notes-general">
                        <div className="cards-container">
                            <div className="note" >aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>

                            <div className="note" > quibusdamaaaaaaaaaaaaaa officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis alusdam officiis alusdam officiis alusdam officiis alusdam officiis alusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officaaaaaaaaaaaaaaaaaaiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid usdam officiis alusdam officiis alusdam officiis alusdam officiis alautem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>
                            <div className="note" > quibusdam officaaaaaaaaaaaaaaaaaaaaaaiis aliquid autem!</div>
                            <div className="note" > quibusdam officiis aliquid autem!</div>



                        </div>

                    </div>
                </section>
            </div>
        )
    }
}