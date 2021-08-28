export function Colors({noteId, onChangeColor}) {


    return(

        <section className={`colors colors-${noteId}`}>
            <button onClick={()=>{onChangeColor('blue')}}>blue</button>
            <button onClick={()=>{onChangeColor('red')}}>red</button>
        </section>
        )

}

