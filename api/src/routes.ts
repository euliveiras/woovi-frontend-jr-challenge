import { Request, Response, Router } from "express";
import { io } from "./server";

const routes = Router();

routes.get("/mock-payment", async (req: Request, res: Response) => {
  io.emit("first-payment:read");
  return res.send();
});

export { routes };
