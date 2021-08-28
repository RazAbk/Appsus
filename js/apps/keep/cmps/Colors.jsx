export function Colors(noteId) {
    console.log(noteId)

    const setColorToNote = (color) => {
        switch (color) {
            case 'red': 

                break;

            default:    
                break;
        }

    }
    return(

    <section className="colors">
        <div onClick={() => { setColorToNote('red') }}>red</div>
    </section>
    )

}

