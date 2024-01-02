import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { gameRoutes } from "./routes/game.js";
import session from "express-session";

export const app = express();

app.listen(3000, () => {
  console.log(
    "Server is listening a http://localhost:3000/ Let 's play a game"
  );
});

app.use(
  session({
    secret: "twoj tajny klucz", // Klucz używany do szyfrowania ID sesji.
    resave: false,
    saveUninitialized: true,
  })
);

const publicPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "public"
);
app.use(express.static(publicPath));

gameRoutes(app);
