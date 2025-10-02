
import type { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";


const productService = new ProductService();

export class ProductController {
  async createProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { name, type, brand, responsible } = req.body;
      const product = await productService.createProduct({ name, type, brand, responsible });
      return res.status(201).json(product);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<Response> {
    try {
      const products = await productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getProductById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      const product = await productService.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      return res.status(200).json(product);

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, type, brand, responsible } = req.body;

      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      const updatedProduct = await productService.updateProduct(id, { name, type, brand, responsible });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<Response> {

    try {

      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      await productService.deleteProduct(id);

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}