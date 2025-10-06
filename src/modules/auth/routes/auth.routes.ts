import { Router } from "express";
import { UserController } from "../controllers/auth.controller.js";
import { validation } from "../../../middlewares/validation.middleware.js";
import { loginValidation, registerValidation } from "../validations/auth.validation.js";
import { AuthService } from "../services/auth.service.js";

const authRouter = Router();

const authService = new AuthService();
const userController = new UserController(authService);

authRouter.post(
  "/register", 
  registerValidation, 
  validation, 
  userController.register
);

authRouter.post(
  "/login", 
  loginValidation, 
  validation, 
  userController.login
);

authRouter.post(
  "/logout",
  userController.logout
)

export default authRouter;