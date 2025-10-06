import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { validateJWT } from "../../../middlewares/validate-jwt.middleware.js";
import { permission } from "../../../middlewares/role.middleware.js";
import { productValidation, updateProdcutValidation } from "../validations/product.validation.js";
import { validation } from "../../../middlewares/validation.middleware.js";
import { ProductService } from "../services/product.service.js";

const productRouter = Router();

productRouter.use(validateJWT);

const productService = new ProductService();
const productController = new ProductController(productService);

productRouter.get(
  "/", 
  permission(["admin", "user"]),
  productController.getAllProducts
);

productRouter.get(
  "/:id", 
  permission(["admin", "user"]), 
  productController.getProductById
);

productRouter.post(
  "/", 
  permission(["admin"]), 
  productValidation, validation, 
  productController.createProduct
);

productRouter.patch("/:id", 
  permission(["admin"]), 
  updateProdcutValidation, 
  validation, 
  productController.updateProduct
);

productRouter.delete(
  "/:id", 
  permission(["admin"]), 
  productController.deleteProduct
);

export default productRouter;