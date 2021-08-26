export function NoteTxt({ info }){

    console.log(info)

    return(
        <div className="note">
            {/* {Object.keys(info).map((inf,idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)} */}
            {info.txt}
        </div>
    )
}