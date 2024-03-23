import express from "express";
import { connect } from "./connection.js";
import cors from "cors";
import User from "./routes/user.routes.js";
import Note from "./routes/note.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "https://notekeeper-frontend-zeta.vercel.app",
  })
);
app.use(cookieParser());

connect();

app.use("/User", User);
app.use("/Note", Note);

app.listen(8000, () => {
  console.log(`App running on port ${8000}`);
});
