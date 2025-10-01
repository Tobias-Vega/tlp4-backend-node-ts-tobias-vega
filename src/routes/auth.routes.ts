import { Router } from "express";
import { UserController } from "../controllers/auth.controller.js";


const router = Router();

const userController = new UserController();

router.post("/api/auth", (req, res) => userController
.register(req, res));

export default router;