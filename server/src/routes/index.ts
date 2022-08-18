import { Router } from "express";
//Routes
import authRoutes from "./auth";

const router = (): Router => {
    const router = Router({ mergeParams: true });

    router.use("/auth",authRoutes())
    
    return router;
};

export default router;