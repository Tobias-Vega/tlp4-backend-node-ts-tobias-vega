import { userModel } from "../modules/auth/models/user.model.js";
import { ProductModel } from "../modules/products/models/product.model.js";
import bcrypt from "bcrypt";

export class SeedService {

  public async seedDatabase(): Promise<{ message: string; users: number; products: number }> {
    try {
      
      await ProductModel.deleteMany({});
      await userModel.deleteMany({});
      const hashedAdminPassword = await bcrypt.hash('admin123', 10);
      await userModel.create({
        name: 'Administrador',
        email: 'admin@example.com',
        password: hashedAdminPassword,
        role: 'admin',
        isActive: true,
        createdAt: new Date()
      });

      const users = [];
      const userNames = [
        'Juan Pérez', 'María González', 'Carlos Rodríguez', 'Ana Martínez', 'Luis García',
        'Laura López', 'Miguel Sánchez', 'Carmen Fernández', 'José Ruiz', 'Isabel Torres'
      ];

      const userEmails = [
        'juan@example.com', 'maria@example.com', 'carlos@example.com', 'ana@example.com', 'luis@example.com',
        'laura@example.com', 'miguel@example.com', 'carmen@example.com', 'jose@example.com', 'isabel@example.com'
      ];

      for (let i = 0; i < 10; i++) {
        const hashedPassword = await bcrypt.hash(`user${i + 1}123`, 10);
        const user = await userModel.create({
          name: userNames[i],
          email: userEmails[i],
          password: hashedPassword,
          role: 'user',
          isActive: true,
          createdAt: new Date()
        });
        users.push(user);
      }

      const productTypes = [
        'Laptop', 'Desktop', 'Monitor', 'Impresora', 'Router',
        'Teclado', 'Mouse', 'Disco Duro', 'Memoria RAM', 'Tarjeta Gráfica'
      ];

      const productBrands = [
        'Dell', 'HP', 'Lenovo', 'Asus', 'Acer',
        'Apple', 'Logitech', 'Kingston', 'Corsair', 'NVIDIA'
      ];

      const productNames = [
        'Laptop Inspiron', 'PC Pavilion', 'ThinkPad X1', 'Monitor UltraSharp', 'Impresora LaserJet',
        'Router Nighthawk', 'Teclado Mecánico', 'Mouse Gamer', 'SSD Kingston', 'Tarjeta GeForce RTX'
      ];


      const products = [];
      for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user && user._id) {
          const product = await ProductModel.create({
            name: productNames[i],
            type: productTypes[i],
            brand: productBrands[i],
            status: 'available',
            responsible: user._id
          });
          products.push(product);
        }
      }

      return {
        message: 'Base de datos poblada exitosamente',
        users: users.length + 1,
        products: products.length
      };

    } catch (error) {
      throw new Error(`Error al poblar la base de datos: ${error}`);
    }
  }
}