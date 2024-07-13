import express, { Request } from "express";
import http from "http";
import { router } from "./router";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? ["http://localhost:5173"];

export const io = new Server(server, {
  cors: {
    origin: CORS_ORIGIN,
  },
});
const PORT = process.env.PORT ?? 3012;

app.use(cors({ origin: CORS_ORIGIN }));
app.use("/", router);

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
