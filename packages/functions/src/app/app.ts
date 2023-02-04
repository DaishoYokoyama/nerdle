import express, { urlencoded, json } from "express";

import { router } from "./route/v1";

export const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/v1", router);
