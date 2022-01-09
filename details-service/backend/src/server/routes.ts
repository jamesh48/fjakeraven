import { Item, UrlArr } from "./serverTypes";
import path from "path";
import axios from "axios";
import express, { Response, Request } from "express";
const appRouter = express.Router();
import { handleDetailsProductId, handleRegularProductId } from "./utils";

appRouter.get("/bundle.js", (_req: Request, res: Response) => {
  res.status(200).sendFile(path.resolve("client/dist/bundle.js"));
});

appRouter.get("/images/:productId", async (req: Request, res: Response) => {
  try {
    let results = await axios(`http://localhost:8001/display/${req.params.productId}`);
    results = JSON.parse(results.data.urls).reduce((arr: UrlArr, item: Item) => {
      arr.push({ url: item });
      return arr;
    }, []);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

appRouter.get("/details/:productId", handleDetailsProductId);

appRouter.get("/:productId", handleRegularProductId);

export default appRouter;
