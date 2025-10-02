import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { validateJWT } from "../middlewares/validatejwt.middleware.js";


const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", validateJWT, (req, res) => productController.getAllProducts(req, res));
productRouter.get("/:id", (req, res) => productController.getProductById(req, res));
productRouter.post("/", (req, res) => productController.createProduct(req, res));
productRouter.patch("/:id", (req, res) => productController.updateProduct(req, res));
productRouter.delete("/:id", (req, res) => productController.deleteProduct(req, res));

export default productRouter;