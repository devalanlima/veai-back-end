import { signUpNewUser } from "../services/authServices";
import { Request, Response } from "express";
import { SignUpBody } from "../types/authTypes";

export async function createNewUser (req: Request, res: Response) {
  const { email, password, name } = req.body as SignUpBody;
  const { data, error } = await signUpNewUser(email, password, name);

  if (error){
    res.send({ msg: error.message }).status(error.status ? error.status : 400);
  } else {
    res.send(data).status(201);
  }
};