import * as functions from "firebase-functions";
import { firestore } from "../init";
import Note from "../core/models/Note";
import sanitizeNote from "../core/services/sanitizeNote";

const createNote = functions.https.onRequest(async (request, response) => {
    
    if (request.method !== "POST") {
        response.status(400).send("Only Accept POST Request");
        return;
    }
    
    const data = request.body as Note;

    // Log to the functions console the content of the request
    functions.logger.info("Request body: " + JSON.stringify(data));

    // Check whether the POST body exists or not
    if (!data) {
        response.status(400).send("Request Body cannot be blank");
        return;
    }
    
    // Check whether the data of the Note exists or not
    if (!data.title || !data.content) {
        response.status(400).send("Content and title of a note are required!");
        return;
    }

    // Remove all bad words from the Note
    sanitizeNote(data);

    try {
        // Add new document to the Notes collection
        const added = await firestore.collection("notes").add(data);

        // Return the ID or the newly added document
        response.status(201).send(added.id);
    } catch (e) {
        functions.logger.error(e);
        response.status(500);
    }
    return;
});

export default createNote;
