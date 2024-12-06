import {
  resetPassword,
  signInUser,
  signUpNewUser,
} from '../services/authServices';
import { Request, Response } from 'express';
import { ResetPasswordBody, SignInBody, SignUpBody } from '../types/authTypes';

export async function createNewUser(req: Request, res: Response) {
  const { email, password, name } = req.body as SignUpBody;
  const { data, error } = await signUpNewUser(email, password, name);

  if (error) {
    res.send({ msg: error.message }).status(error.status ? error.status : 400);
  } else {
    res.send(data).status(201);
  }
}

export async function authenticateUser(req: Request, res: Response) {
  const { email, password } = req.body as SignInBody;
  const { data, error } = await signInUser(email, password);

  if (error) {
    res.send({ msg: error.message }).status(error.status ? error.status : 400);
  } else {
    res.send(data).status(200);
  }
}

export async function sendRecoveryPasswordEmail(req: Request, res: Response) {
  const { email } = req.body as ResetPasswordBody;
  const { error } = await resetPassword(email);

  if (error) {
    res.send({ msg: error.message }).status(error.status ? error.status : 400);
  } else {
    res
      .send({ msg: 'Password reset request sent to email address' })
      .status(200);
  }
}
