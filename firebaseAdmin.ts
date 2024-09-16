import { initializeApp, getApp, App, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { get } from "http";

const serviceAccountKey = require("./serviceAccountKey.json");

let app: App;

if (getApps().length === 0) {
    app = initializeApp({ credential: cert(serviceAccountKey) })
} else {
    app = getApp();
}

const adminDB = getFirestore(app);

export { app as adminApp, adminDB };