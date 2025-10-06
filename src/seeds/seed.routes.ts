import { Router } from "express";
import { SeedController } from "./seed.controller.js";

const seedRouter = Router();
const seedController = new SeedController();

seedRouter.post('/', seedController.seedDatabase);

export default seedRouter;