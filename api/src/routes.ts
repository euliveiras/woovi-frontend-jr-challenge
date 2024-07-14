import { Request, Response, Router } from "express";
import { io } from "./";

const routes = Router();

routes.get("/mock-payment/first", async (req: Request, res: Response) => {
  io.emit("first-payment:read");
  return res.send();
});

routes.post("/mock-payment/last", async (req: Request, res: Response) => {
  return new Promise((resolve) => setTimeout(() => res.send(), 2000));
});

export { routes };
