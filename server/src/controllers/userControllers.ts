import { Request, Response } from "express";

export function registerUser(req: Request, res: Response) {
  res.status(201).json({ msg: "User successfully registered" });
  return;
}
export function loginUser(req: Request, res: Response) {
  res.status(200).json({ msg: "Logged-in successfully" });
}
