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

    functions.logger.info("Request body: " + JSON.stringify(data));

    sanitizeNote(data);

    if (!data) {
        response.status(400).send("Request Body cannot be blank");
        return;
    }
    
    if (!data.title || !data.content) {
        response.status(400).send("Content and title of a note are required!");
        return;
    }

    try {
        const added = await firestore.collection("notes").add(data);
        response.status(201).send(added.id);
    } catch (e) {
        functions.logger.error(e);
        response.status(500);
    }
    return;
});

export default createNote;
