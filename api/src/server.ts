import express from "express";
import http from "http";
import { router } from "./router";

const app = express();
const server = http.createServer(app)

const PORT = process.env.PORT ?? 3012;

app.use("/", router)

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

