import * as functions from "firebase-functions";
import sanitizeNote from "../core/services/sanitizeNote";
import Note from "../core/models/Note";

const isIdentical = (note1: Note, note2: Note) => {
    return note1.content === note2.content &&
    note1.title === note2.title
};


// Listens for new notes added to /notes/:documentId/original and creates an
// uppercase version of the message to /notes/:documentId/uppercase
const onNoteCreated = functions.firestore
  .document("/notes/{noteId}")
  .onUpdate((change, context) => {
    // Grab the current value of what was written to Firestore.
    const note = change.after.data() as Note;

    const beforeSanitization = { ...note };

    // Remove all bad words from the content and title of the note
    sanitizeNote(note);

    // IMPORTANT: check if this note is the same after sanitization
    // If it is the same as before, terminate this function call right away.
    // Otherwise, it will introduce an infinite loop of update operations.
    if (isIdentical(beforeSanitization, note))
      return;

    return change.after.ref.update(note);
  });

export default onNoteCreated;
