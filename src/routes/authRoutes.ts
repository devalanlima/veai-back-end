import express from "express";
import { createNewUser } from "../controllers/authControllers";

const router = express.Router();

router.post("/signup", createNewUser);

export default router;
