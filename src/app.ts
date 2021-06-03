import { json } from "body-parser";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandler } from "./middleware/errorHandler";
import EnvVars from "./lib/EnvVars";
import CreateGreetingRouter from "./routes/greeting/CreateGreetingRouter";
import DeleteGreetingRouter from "./routes/greeting/DeleteGreetingRouter";
import ReadGreetingRouter from "./routes/greeting/ReadGreetingRouter";
import ReadGreetingsRouter from "./routes/greeting/ReadGreetingsRouter";
import UpdateGreetingRouter from "./routes/greeting/UpdateGreetingRouter";
import GreetingStoreFactory from "./storage/GreetingStoreFactory";


const greetingStore = GreetingStoreFactory.getGreetingStore(EnvVars.STORAGE_TYPE);


const app = express();
app.use(cors());
app.use(json());
app.use(errorHandler);

const createGreetingRouter = new CreateGreetingRouter(greetingStore);
app.use(createGreetingRouter.getRouter());

const readGreetingRouter = new ReadGreetingRouter(greetingStore);
app.use(readGreetingRouter.getRouter());

const readGreetingsRouter = new ReadGreetingsRouter(greetingStore);
app.use(readGreetingsRouter.getRouter());

const updateGreetingRouter = new UpdateGreetingRouter(greetingStore);
app.use(updateGreetingRouter.getRouter());

const deleteGreetingRouter = new DeleteGreetingRouter(greetingStore);
app.use(deleteGreetingRouter.getRouter());


app.all("*", (request, response) => {
  response.status(404).send("Not Found");
});

export default app;