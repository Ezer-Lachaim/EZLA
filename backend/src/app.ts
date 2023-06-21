import express from "express";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import { usersRouter } from "./routes/users";
import { index } from "./routes/index";
import { ridesRouter } from "./routes/rides";
import bodyParser from "body-parser";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.static(path.join(__dirname, "../public")));
app.use("/users", usersRouter);
app.use("/rides", ridesRouter);
app.use("/", index);

app.use(errorNotFoundHandler);
app.use(errorHandler);
