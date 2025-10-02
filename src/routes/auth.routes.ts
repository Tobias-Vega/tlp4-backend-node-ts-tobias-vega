import { Router } from "express";
import { UserController } from "../controllers/auth.controller.js";

const authRouter = Router();

const userController = new UserController();

authRouter.post("/register", (req, res) => userController
.register(req, res));
authRouter.post("/login", (req, res) => userController.login(req, res));

export default authRouter;