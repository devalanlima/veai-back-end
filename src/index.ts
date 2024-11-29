import express, { Express, Request, Response } from "express";
import supabase from "./utils/supabaseClient";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8888;

app.get("/", async (req: Request, res: Response) => {

  let { data: Suggestions, error } = await supabase
    .from("Suggestions")
    .select("suggestion");

  if (error) {
    res.status(500).send({
      message: "Ocorreu um erro ao processar a solicitação.",
      error: error instanceof Error ? error.message : error,
    });
  } else {
    res.send({ Suggestions });
  }

});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});