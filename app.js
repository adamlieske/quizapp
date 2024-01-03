import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { gameRoutes } from "./routes/game.js";

export const app = express();
const port = process.env.PORT || 3000;

app.listen(3000, () => {
  console.log(
    "Server is listening a http://localhost:3000/ Let 's play a game"
  );
});

const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public"
);
app.use(express.static(publicPath));

gameRoutes(app);
