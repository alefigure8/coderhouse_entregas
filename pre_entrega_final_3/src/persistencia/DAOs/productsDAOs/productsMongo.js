import { productsModel } from "../../mongoDB/model/products.model.js";

class ProductManager {
  //CREATE
  async addProduct(product) {
    try {
      const newProduct = productsModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  //GET ALL PAGINATED
  async findAll(query, options) {
    try {
      const products = await productsModel.paginate(query, options);
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }


  //GET ONE
  async findOneProduct(option) {
    try {
      const product = await productsModel.findOne(option).lean();
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  // UPDATE
  async updateProduct(id, product) {
    try {
      const updatedProduct = await productsModel.findByIdAndUpdate(id, product, {new: true});
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
