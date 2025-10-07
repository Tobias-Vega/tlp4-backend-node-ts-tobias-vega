import type { Request, Response } from "express";
import { ProductService } from "../services/product.service.js";

export class ProductController {

  constructor(private productService: ProductService) {}

  createProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, type, brand, responsible } = req.body;
      const product = await this.productService.createProduct({ name, type, brand, responsible });
      return res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  getAllProducts = async (req: Request, res: Response): Promise<Response> => {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      console.error('Get all products error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  getProductById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      const product = await this.productService.getProductById(id);
      if (!product) return res.status(404).json({ message: 'Product not found' });

      return res.status(200).json(product);

    } catch (error) {
      console.error('Get product by id error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  updateProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name, type, brand, responsible, status } = req.body;

      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      const updatedProduct = await this.productService.updateProduct(id, { name, type, brand, responsible, status });
      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Update product error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ message: 'Product ID is required' });

      const removed = await this.productService.deleteProduct(id);

      if (!removed) return res.status(404).json({ message: 'Product not found' });

      return res.status(204).send();
    } catch (error) {
      console.error('Delete product error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}