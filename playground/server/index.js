const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = process.env.PORT || 3000;
const app = express();
const router = express.Router();
const serverName = "back-end";
const {
  EfficientNetCheckPointFactory,
  EfficientNetCheckPoint
} = require("node-efficientnet")

const model = EfficientNetCheckPointFactory.create(EfficientNetCheckPoint.B5);

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  }
});

app.use((req, res, next) => {
  console.info(`${serverName} |  ${req.url}  ${req.method} -- ${new Date()}`);
  next();
});

router.post("/api/upload", (req, res) => {
  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  }).on("end", () => {
    body = Buffer.concat(body).toString();
    model.inference()
    res.status(200).send({});
  });
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.listen(port, function() {
  console.log("Server is running on PORT", port);
});
