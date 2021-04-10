// eslint-disable-next-line no-undef
import { createServer } from "./server.js";
const port = 3000;
createServer()
  .then((app) => {
    app.listen(port, () => {
      console.log("Server is running on PORT", port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
