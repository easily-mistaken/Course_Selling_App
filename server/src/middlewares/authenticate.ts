import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    username: string;
    role: string;
  };
}

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    let token =
      req.cookies["access-token"] || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const secretKey = process.env.JWT_SECRET;

    if (!secretKey) {
      throw new Error("INVALID SECRET");
    }

    const decoded = jwt.verify(token, secretKey) as CustomRequest["user"];
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const userMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== "user") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  });
};

export const adminMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  verifyToken(req, res, () => {
    if (req.user?.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  });
};
