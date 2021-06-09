import { errorHandler, NotFoundError } from "@atz3n/express-utils";
import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { greetRouter } from "./routes/greet/greet";
import { languageRoute } from "./routes/language/language";


export const app = express();

app.use(cors());
app.use(json());


app.use(greetRouter);
app.use(languageRoute);

app.all("*", (request, response) => {
    throw new NotFoundError();
});


app.use(errorHandler); // must be called last