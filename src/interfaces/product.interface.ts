import type { Types } from "mongoose";

export interface IProduct {
  name: string; 
  type: string;
  brand: string;
  status: "available" | "unavailable";
  responsible: Types.ObjectId;
}