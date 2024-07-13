import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/mock-payment", async (req: Request, res: Response) => {
  const query = req.query;
  return res.send();
});

export { routes };
