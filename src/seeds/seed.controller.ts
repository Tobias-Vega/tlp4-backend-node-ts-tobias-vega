import type { Request, Response } from "express";
import { SeedService } from "./seed.service.js";

export class SeedController {
  private seedService: SeedService;

  constructor() {
    this.seedService = new SeedService();
  }

  seedDatabase = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.seedService.seedDatabase();
      res.status(200).json({
        success: true,
        ...result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  };
}