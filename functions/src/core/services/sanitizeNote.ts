import Note from "../models/Note";

/**
 * Remove all bad words from a Note
 * @param note 
 */
const sanitizeNote = (note: Note) => {

    const badWord = "bad";

    note.content = note.content.replace(badWord, "");
    note.title = note.title.replace(badWord, "");
};

export default sanitizeNote;