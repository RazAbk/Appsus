
export function NoteImg({ info }) {
    console.log(info)
    return (
        <img className="img-Note" src={`${info.url}`} />
    )

}