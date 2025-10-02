import { Router } from "express";
import { UserController } from "../controllers/auth.controller.js";
import { validation } from "../middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "../validations/auth.validation.js";

const authRouter = Router();

const userController = new UserController();

authRouter.post("/register", registerValidation, validation, (req, res) => userController
.register(req, res));
authRouter.post("/login", loginValidation, validation, (req, res) => userController.login(req, res));
authRouter.post("/logout", (req, res) => userController.logout(req, res));

export default authRouter;