import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { greetRouter } from "./routes/greet/greet";


const app = express();
app.use(cors());
app.use(json());

app.use(greetRouter);


app.all("*", (request, response) => {
  response.status(404).send("Not Found");
});

export default app;