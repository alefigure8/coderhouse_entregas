import { productsModel } from "../../mongoDB/model/products.model.js";
import ProductsResponse from "../../DTOs/productsResponse.dto.js";
import ProductDB from "../../DTOs/productsDB.dto.js";

class ProductManager {
  //CREATE
  async addProduct(product) {
    try {
      const productDB = new ProductDB(product);
      const newProduct = productsModel.create(productDB);
      return new ProductDB(newProduct);
    } catch (error) {
      throw new Error(error);
    }
  }

  //GET ALL PAGINATED
  async findAll(query, options) {
    try {
      const products = await productsModel.paginate(query, options);

      products.docs.forEach((product) => product = new ProductsResponse(product));

      return products;
    } catch (error) {
      throw new Error(error);
    }
  }


  //GET ONE
  async findOneProduct(id) {
    try {
      let product = await productsModel.findOne({ _id: id }).lean();
      product = new ProductsResponse(product);
      return product;
      //return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  // UPDATE
  async updateProduct(id, product) {
    try {
      const productDB = new ProductDB(product);
      const updatedProduct = await productsModel.findByIdAndUpdate(id, productDB, {new: true});
      return updatedProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  // DELETE
  async delete(id) {
    try {
      const deleteUser = await productsModel.findByIdAndDelete(id, {
        new: true,
      });
      return deleteUser;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default ProductManager;
