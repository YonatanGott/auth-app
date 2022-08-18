import { Request, Response, NextFunction, CookieOptions } from "express";
import { ErrorHandler } from "../middlewares/responseMiddleware";
import { hashPassword, verifyPassword } from "../functions/passwords";
import { User } from "../models/users/user";
import { createAuthToken, createAuthRefreshToken, decodeAuthToken, getAccessToken } from "../functions/tokens";

// Cookie options
const cookieOptions: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: 'none',
    // path:'/',
    maxAge: 3 * 24 * 60 * 60 * 1000
};
export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body
        const emailExists = await User.findOne({ email: email })
        if (emailExists) {
            throw new ErrorHandler(404, 'Email already in use');
        }
        const hashedPassword = await hashPassword(password)
        const user = await User.create({ email, firstName, lastName, password: hashedPassword })

        const token = createAuthToken(user.id)

        const refreshToken = createAuthRefreshToken(user.id)
        // Cookie Version
        // res.cookie('jwtAuthApp', refreshToken, cookieOptions);
        // res.status(200).json({ user, token });

        // localStorage  Version
        res.status(200).json({ user, token, refreshToken });
    }
    catch (error) {
        res.status(400).json({ "error": error });
    }
}

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new ErrorHandler(404, 'Incorrect email');
        }
        const match = verifyPassword(password, user.password)
        if (!match) {
            throw new ErrorHandler(404, 'Incorrect password');
        }

        const token = createAuthToken(user.id)

        const refreshToken = createAuthRefreshToken(user.id)
        // Cookie Version
        // res.cookie('jwtAuthApp', refreshToken, cookieOptions);
        // res.status(200).json({ user, token });

        // localStorage  Version
        res.status(200).json({ user, token, refreshToken });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const currentUser = async (req: Request, res: Response) => {
    try {
        const token  = getAccessToken(req.headers.authorization)
        const decoded: any = decodeAuthToken(token, "accessToken")
        if (!decoded) {
            throw new ErrorHandler(403, 'Could not refresh access token');
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            throw new ErrorHandler(404, "User not found.")
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const refreshAccessToken = async (req: Request, res: Response) => {
    try {
        // Get the refresh token from cookie
        // const refreshToken = req.cookies.jwtAuthApp as string;
        // Get the refresh token from params
        const { refreshToken } = req.body
        const decoded: any = decodeAuthToken(refreshToken, "refreshToken")
        if (!decoded) {
            throw new ErrorHandler(403, 'Could not refresh access token');
        }
        const user = await User.findById(decoded.id)
        if (!user) {
            throw new ErrorHandler(404, "User not found.")
        }
        const token = createAuthToken(user.id)
        const newRefreshToken = createAuthRefreshToken(user.id)
        res.status(200).json({ user, token, refreshToken:newRefreshToken });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
}

export const logout = (res: Response) => {
    try {
        res.cookie('jwtAuthApp', '', { maxAge: 1 });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};