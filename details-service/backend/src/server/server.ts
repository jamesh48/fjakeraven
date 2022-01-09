require("dotenv").config();
import express from "express";
const app = express();
import path from "path";
import router from './routes';
import cors from "cors";

app.use(cors());

app.use("*", (req, _res, next) => {
  const { method, originalUrl } = req;
  if (!/(disable_hmr_logs.js)|(proxy)|(favicon)|(images)/.test(originalUrl)) {
    /^\/\d+$/g.test(originalUrl)
      ? console.info("\u001b[1;35m~Serving Client~")
      : /indicator=all/.test(originalUrl)
      // @ts-ignore
      ? console.info("Getting Data at " + req.params["0"])
      : console.info(method, originalUrl);
  }
  next();
});

app.use(express.static(path.resolve("client/dist")));

app.use("/", router);

const port = 8002;
app.listen(port, () => {
  console.log(`Details service is listening on port ${port}`);
});
