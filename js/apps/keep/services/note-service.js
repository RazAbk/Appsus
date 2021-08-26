import { utilService } from "../../../services/util.service.js";
import { storageService } from "../../../services/storage.service.js";

export const notesService = {
    query,
    deleteNote,

};

const NOTES_KEY = "notesDB";
const gNotes = storageService.loadFromStorage(NOTES_KEY) || [
  {
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
    info: { url: "http://some-img/me", title: "Bobi and Me" },
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

function query(){
    return Promise.resolve(gNotes);
}

// Crud

function deleteNote(noteId){
    const deleteIdx = gNotes.findIndex(note => noteId === note.id);
    if(deleteIdx !== -1){
        gNotes.splice(deleteIdx, 1);
        _saveNotesToStorage();
    }
}






function _saveNotesToStorage(){
    storageService.saveToStorage(NOTES_KEY,gNotes);
}