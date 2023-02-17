import { productsModel } from "../model/products.model.js";

class ProductManager {
  constructor() {
    this.products = [];
  }

  //Add new
  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) {
    try {
      const product = {};

      product.code = code;
      product.title = title;
      product.description = description;
      product.price = price;
      product.thumbnail = [];

      if (Array.isArray(thumbnail))
        thumbnail.forEach((x) => product.thumbnail.push(x));
      else product.thumbnail.push(thumbnail);

      product.stock = stock;
      product.category = category;
      product.status = true;

      const newProduct = productsModel.create(product);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get all
  async getProducts(querys) {
    try {
      const {
        limit = 10,
        page = 1,
        collation = {
          locale: "en",
          strength: 2,
        },
      } = querys;

      const query = {};
      const options = { limit, page, collation };

      Object.keys(querys).forEach((key) => {
        const tags = [
          "title",
          "description",
          "price",
          "stock",
          "code",
          "status",
        ];

        if (tags.includes(key.toLowerCase()) && querys[key] != "") {
          query[key] = querys[key];
        }

        if (key == "sort" && querys[key] != "") {
          options[key] = { price: querys[key] == "asc" ? 1 : -1 };
        }
      });

      this.products = await productsModel.paginate(query, options);
      return this.products;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get all
  async getViewProducts() {
    try {
      const query = {};
      const options = {
        limit: 10,
        lean: true,
      };
      this.products = await productsModel.paginate(query, options);
      return this.products.docs;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get by ID
  async getProductById(id) {
    try {
      const product = await productsModel.findById(id).lean();
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Update
  async updateProduct(
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
    status
  ) {
    try {
      const product = await productsModel.findByIdAndUpdate(id, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        category,
        status,
      });

      return product;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Delete
  async deleteProduct(id) {
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
