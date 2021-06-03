import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler";
import { greetRouter } from "./routes/greet/greet";
import { languageRoute } from "./routes/language/language";


const app = express();
app.use(cors());
app.use(json());
app.use(errorHandler);


app.use(greetRouter);
app.use(languageRoute);


app.all("*", (request, response) => {
  response.status(404).send("Not Found");
});

export default app;