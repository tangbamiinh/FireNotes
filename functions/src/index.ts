// The Firebase Admin SDK to access Firestore.
import createNote from "./https/createNote";
import onNoteCreated from "./background/onNoteCreated";
import onNoteUpdated from "./background/onNoteUpdated";

export default { 
  createNote,
  onNoteCreated,
  onNoteUpdated,
};

