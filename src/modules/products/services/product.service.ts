import type {  CreateProductDto } from "../dto/create-product.interface.js";
import type { UpdateProductDto } from "../dto/update-product.interface.js";
import type { IProduct } from "../interfaces/product.interface.js";
import { ProductModel } from "../models/product.model.js";

export class ProductService {

  async createProduct(data: CreateProductDto): Promise<IProduct> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async getAllProducts(): Promise<IProduct[]>  {
    return await ProductModel.find();
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    return await ProductModel.findByIdAndDelete(id);
  }
}