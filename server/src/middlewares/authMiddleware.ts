import { NextFunction, Response, Request } from "express";
import { decodeAuthToken, getAccessToken } from "../functions/tokens";
import { User } from "../models/users/user";
import { ErrorHandler } from "./responseMiddleware";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const accessToken = getAccessToken(req.headers.authorization)
    const authToken: any = decodeAuthToken(accessToken, 'accessToken')
    if (!authToken) {
      throw new ErrorHandler(403, "Invalid access token");
    }
    const existingUser = await User.findById(authToken.id);
    if (!existingUser) {
      throw new ErrorHandler(404, "User not found.");
    }
    return next();
  } catch (error) {
    res.status(403).json({ "error": error });
  }
};
