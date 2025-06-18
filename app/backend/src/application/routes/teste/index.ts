import { Router, Request, Response } from "express";

const TesteRouter = Router({ mergeParams: true })
  .get("/", (req: Request, res: Response) => {return res.json({ message: "API rodando :joia:!"})});

export default TesteRouter;