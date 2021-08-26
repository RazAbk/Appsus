import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const notesService = {
    query,
    deleteNote,
    toggleNotePin,
    duplicateNote,
    createNote
};

const NOTES_KEY = "notesDB";
const gNotes = storageService.loadFromStorage(NOTES_KEY) || [{
        id: utilService.makeId(5),
        type: "note-txt",
        isPinned: true,
        info: { txt: "Fullstack Me Baby!" },
        style: { backgroundColor: "#00d" }
    },
    {
        id: utilService.makeId(5),
        type: "note-img",
        isPinned: false,
        info: { url: "/assets/img/cat.jpg", title: "Bobi and Me" },
        style: { backgroundColor: "#00d" }
    },
    {
        id: utilService.makeId(5),
        type: "note-todos",
        isPinned: false,
        info: {
            label: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Coding power", doneAt: 187111111 },
            ],
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: utilService.makeId(5),
        type: "note-video",
        isPinned: false,
        info: { url: "https://www.youtube.com/watch?v=EIm4HvDgQCM", title: "funny vid" },
        style: { backgroundColor: "#00d" }
    },
];

function query() {
    return Promise.resolve(gNotes);
}

// Crud

function createNote(info, type){
    const newNote = {
        id: utilService.makeId(5),
        type,
        isPinned: true,
        info,
        style: { backgroundColor: "#00d" }
    }

    gNotes.push(newNote);
    _saveNotesToStorage();
}

function deleteNote(noteId) {
    const deleteIdx = _getNoteIdx(noteId);
    if (deleteIdx !== -1) {
        gNotes.splice(deleteIdx, 1);
        _saveNotesToStorage();
    }
}

function toggleNotePin(noteId) {
    const toggleIdx = _getNoteIdx(noteId);
    if (toggleIdx !== -1) {
        gNotes[toggleIdx].isPinned = !gNotes[toggleIdx].isPinned;
        _saveNotesToStorage();
    }
}

function duplicateNote(noteId) {
    const duplicateIdx = _getNoteIdx(noteId);
    if(duplicateIdx !== -1){
    const duplicateIdx = _getNoteIdx(noteId);
        const newCopy = JSON.parse(JSON.stringify(gNotes[duplicateIdx]));
        gNotes.push(newCopy);
        _saveNotesToStorage();
    }
}

function _saveNotesToStorage() {
    storageService.saveToStorage(NOTES_KEY, gNotes);
}

function _getNoteIdx(noteId) {
    const idx = gNotes.findIndex(note => noteId === note.id);
    return idx;
}