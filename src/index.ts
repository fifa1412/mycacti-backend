import "reflect-metadata";
import "express-async-errors";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";

import * as firebaseAdmin from "firebase-admin";
import * as firebaseApp from 'firebase/app';
import 'firebase/auth';

import routes from "./routes/index-routes";
export const environment = process.env.NODE_ENV || "dev";
import {initDatabaseConnection} from "./config/init-db"
import { config } from './config';

initApp();

async function initApp() {
  process.env.TZ = "Asia/Bangkok";
  await initDatabaseConnection(environment);
  //await initFirebaseAdmin();
  //await initFirebaseApp();
  await initWebServer();
  console.log(`Start Environment: ${environment}`);
}

async function initFirebaseAdmin() {
  const serviceAccount = require("../my-cacti-273be-firebase-adminsdk-wobty-bceb953350.json");
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
}

async function initFirebaseApp() {
  firebaseApp.initializeApp(config.firebaseAppConfig);
}

async function initWebServer() {
  const port = process.env.PORT || 40100;
  const app = express();

  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  app.use(cors());
  app.use(bodyParser.json({ limit: "10mb" }));

  app.use("/", routes.router);
  app.listen(port);

  console.log(`Express server has started on port ${port}`);
}

