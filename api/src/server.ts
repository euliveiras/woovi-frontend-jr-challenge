import express from "express";
import { router } from "./router";

const server = express();

const PORT = process.env.PORT ?? 3012;

server.use("/", router)

server.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

