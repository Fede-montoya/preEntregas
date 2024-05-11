import fs from "fs";

import { v4 as uuidv4 } from "uuid";

export default class ProductManager {
  constructor(path) {
    this.path = path;
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = await fs.promises.readFile(this.path, "utf-8");
        return JSON.parse(products);
      } else return [];
    } catch (error) {
      console.error(error);
    }
  }
  async addProduct(obj) {
    try {
      let products = await this.getProducts();
      const product = {
        id: uuidv4(),
        status: true,
        ...obj,
      };
      const codeExist = products.find((p) => p.code === product.code);
      if (codeExist) return "El código ya existe";
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto agregado");
    } catch (error) {
      console.error("Error al agregar el producto", error);
    }
  }
  async updateProduct(obj, id) {
    try {
      let products = await this.getProducts();
      let productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        console.error("Producto no encontrado");
        return null;
      }
      products[productIndex] = { ...products[productIndex], ...obj };

      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto actualizado");
      return products[productIndex];
    } catch (error) {
      console.error("Error al actualizar el producto", error);
      throw error;
    }
  }
  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        console.error("Producto no encontrado");
        return;
      }
      products.splice(index, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      console.log("Producto eliminado");
    } catch (error) {
      console.error("Error al eliminar el producto ", error);
    }
  }
  async getProductById(id) {
    try {
      const products = await this.getProducts();
      const product = products.find((product) => product.id === id);
      if (!product) {
        console.error("Producto no encontrado");
      }
      return product;
    } catch (error) {
      console.error("Error al obtener el producto", error);
    }
  }
}