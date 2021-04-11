import admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();

export {
    firestore,
};