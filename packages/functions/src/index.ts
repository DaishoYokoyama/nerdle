import * as functions from "firebase-functions";

import { app } from "./app";

const api = functions.https.onRequest(app);

export { api };
