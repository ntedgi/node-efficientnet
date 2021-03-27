/* eslint-disable no-undef */
import express, { Router } from "express";
import bodyParser from "body-parser";
import formidable from "express-formidable";
const { urlencoded, json } = bodyParser;

const port = process.env.PORT || 3000;
const app = express();
const router = Router();
const serverName = "back-end";
import {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint,
} from "node-efficientnet";

const initServer = (model) => {
  app.use((req, res, next) => {
    console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
    next();
  });

  router.post("/api/upload", async (req, res) => {
    const result = await model.inference(req.files.file.path);
    res.status(200).send(result);
  });

  app.use(urlencoded({ extended: true }));
  app.use(json());
  app.use(formidable());
  app.use(router);

  app.listen(port, () => {
    console.log("Server is running on PORT", port);
  });
};

EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B7)
  .then((model) => {
    initServer(model);
  })
  .catch((err) => {
    console.error(err);
  });
