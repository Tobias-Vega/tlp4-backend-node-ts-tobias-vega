import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { validateJWT } from "../../../middlewares/validate-jwt.middleware.js";
import { permission } from "../../../middlewares/role.middleware.js";
import { productValidation, updateProdcutValidation } from "../validations/product.validation.js";
import { validation } from "../../../middlewares/validation.middleware.js";

const productRouter = Router();

productRouter.use(validateJWT);

const productController = new ProductController();

productRouter.get("/", permission(["admin", "user"]), (req, res) => productController.getAllProducts(req, res));
productRouter.get("/:id", permission(["admin", "user"]), (req, res) => productController.getProductById(req, res));
productRouter.post("/", permission(["admin"]), productValidation, validation, (req, res) => productController.createProduct(req, res));
productRouter.patch("/:id", permission(["admin"]), updateProdcutValidation, validation, (req, res) => productController.updateProduct(req, res));
productRouter.delete("/:id", permission(["admin"]), (req, res) => productController.deleteProduct(req, res));

export default productRouter;