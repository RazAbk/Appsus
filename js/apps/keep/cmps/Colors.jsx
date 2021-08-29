

export function Colors({ onSetColorToNote, noteId, test }) {
    console.log(test)
    const setColorToNote = (color) => {
        // switch (color) {
        //     case 'red': onSetColorToNote(noteId, { backgroundColor: 'red' })
        //         break;
        //     case 'blue': onSetColorToNote(noteId, { backgroundColor: 'blue' })
        //         break;

        // }



    }
    return (

        <React.Fragment>
            {test()}
            <div onClick={() => { setColorToNote('red') }}>red</div>
            <div onClick={() => { setColorToNote('blue') }}>blue</div>
        </React.Fragment>
    )

}

