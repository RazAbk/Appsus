export function Colors({noteId, onChangeColor}) {
    return(
        <section className={`colors colors-${noteId}`}>
            <button onClick={()=>{onChangeColor('#866dda')}} style={{backgroundColor: '#866dda'}}></button>
            <button onClick={()=>{onChangeColor('#da6666ed')}} style={{backgroundColor: '#da6666ed'}}></button>
            <button onClick={()=>{onChangeColor('#3daf55')}} style={{backgroundColor: '#3daf55'}}></button>
            <button onClick={()=>{onChangeColor('#d5d845')}} style={{backgroundColor: '#d5d845'}}></button>
            <button onClick={()=>{onChangeColor('#33d2d8')}} style={{backgroundColor: '#33d2d8'}}></button>
        </section>
        )
}