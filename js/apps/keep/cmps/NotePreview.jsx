import { NoteImg } from "./NoteImg.jsx";
import { NotesList } from "./NotesList";

export function NotePreview({ note }) {

    const { info } = note;

    return (
        <div className="note">
            {Object.keys(info).map((inf, idx) => <h2 key={`${note.id}-${idx}`}>{inf}</h2>)}
            <NoteImg note={note} />
        </div>
    )
}