const express = require("express");
const bodyParser = require("body-parser");
const formidable = require("express-formidable");
const port = process.env.PORT || 3000;
const app = express();
const router = express.Router();
const serverName = "back-end";
const {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint
} = require("node-efficientnet");


const initServer = (model) => {

    app.use((req, res, next) => {
      console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
      next();
    });

    router.post("/api/upload", async (req, res) => {
      const result = await model.inference(req.files.file.path);
      res.status(200).send(result);
    });

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(formidable());
    app.use(router);

    app.listen(port, () => {
      console.log("Server is running on PORT", port);
    });
  }
;

EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B7).then(model => {
  initServer(model);
}).catch(err => {
  console.error(err);
});
