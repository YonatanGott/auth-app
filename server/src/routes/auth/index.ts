import { currentUser, logout, refreshAccessToken, signIn, signUp } from "../../controllers/authController";
import { Router } from "express";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import { check } from "express-validator";
import { isAuthenticated } from "../../middlewares/authMiddleware";

const authRoutes = (): Router => {
    const router = Router()

    router.post(
        "/sign-up",
        validatorMiddleware([
            check("email").notEmpty().isEmail(),
            check("password").notEmpty().isLength({ min: 6 }).isStrongPassword(),
        ]),
        signUp
    );

    router.post(
        "/sign-in",
        validatorMiddleware([
            check("email").notEmpty().isEmail(),
            check("password").notEmpty().isLength({ min: 6 }),
        ]),
        signIn
    );

    router.post('/refresh', refreshAccessToken);

    router.get('/current-user',isAuthenticated, currentUser);


    router.get('/log-out', logout);

    return router
}

export default authRoutes