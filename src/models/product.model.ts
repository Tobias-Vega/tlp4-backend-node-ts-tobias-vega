import { model, Schema } from "mongoose";
import type { IProduct } from "../interfaces/product.interface.js";

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  status: { type: String, enum: ["available", "unavailable"], default: "available" },
  responsible: { type: Schema.Types.ObjectId, ref: "User", required: true }
});

export const ProductModel = model<IProduct>("Product", productSchema);