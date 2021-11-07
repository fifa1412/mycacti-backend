import * as express from "express";
import { app } from "firebase-admin";

import appRoutes from "./app/app-routes";

const router = express.Router();
const appVersion = require("./../../app-version.json");

router.get('/check/app-version', (req, res) => res.json(appVersion))

router.use("/api", appRoutes);

export default { router }