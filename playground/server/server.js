/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-undef */
import express, { Router } from "express";
import bodyParser from "body-parser";
import formidable from "express-formidable";
const { urlencoded, json } = bodyParser;

import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
} from "node-efficientnet";

const initServer = (model) => {

  const app = express();
  const router = Router();
  const serverName = "back-end";
  app.use((req, res, next) => {
    console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
  });

  router.post("/api/upload", async (req, res) => {
    try {
      const result = await model.inference(req.files.file.path);
      res.status(200).send(result);
    }
    catch (err) {
      res.status(500).send(err);
    }
  });

  router.get("/api/version", async (req, res) => {
    res.status(200).send({ version: "1.0" });
  });

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(formidable());
  app.use(router);
  return app;
};

const createServer = async () => {
  const model = await EfficientNetCheckPointFactory.create(
    EfficientNetCheckPoint.B7
  );
  return await initServer(model);
};

export { createServer };
