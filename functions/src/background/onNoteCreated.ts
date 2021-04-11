import * as functions from "firebase-functions";
import sanitizeNote from "../core/services/sanitizeNote";
import Note from "../core/models/Note";

// Listens for new notes added to /notes/:documentId/original and creates an
// uppercase version of the message to /notes/:documentId/uppercase
const onNoteCreated = functions.firestore
  .document("/notes/{noteId}")
  .onCreate((snapshot, context) => {
    
    // Grab the current value of what was written to Firestore.
    const note = snapshot.data() as Note;

    // Remove all bad words from the content and title of the note
    sanitizeNote(note);

    return snapshot.ref.set(note, { merge: true });
  });

export default onNoteCreated;