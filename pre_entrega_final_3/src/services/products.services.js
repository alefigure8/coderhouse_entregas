import { productsDAOs } from "../persistencia/factory.js";

// GET ALL PAGIANTE
export async function findAllProducts(querys) {
  try {
    const {
      limit = 10,
      page = 1,
      lean = true,
      collation = {
        locale: "en",
        strength: 2,
      },
    } = querys;

    const query = {};
    const options = { limit, page, collation, lean };

    Object.keys(querys).forEach((key) => {
      const tags = [
        "title",
        "description",
        "price",
        "stock",
        "code",
        "category",
        "status",
      ];

      if (tags.includes(key.toLowerCase()) && querys[key] != "") {
        query[key] = querys[key];
      }

      if (key == "sort" && querys[key] != "") {
        options[key] = { price: querys[key] == "asc" ? 1 : -1 };
      }
    });

    const products = await productsDAOs.findAll(query, options);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

// GET ONE
export async function findOneProductById(id) {
  try {
    const product = await productsDAOs.findOneProduct({ _id: id });

    if (!product) throw new Error("Product not found");

    return product;
  } catch (error) {
    throw new Error(error);
  }
}

// POST
export async function addProduct(product) {
  try {

    const newProducts = [];
    let arrayProduct = []

    if (!Array.isArray(product)){
      arrayProduct = Array(product);
    } else {
      arrayProduct = product;
    }

    arrayProduct.forEach(async (item) => {
      
      if (!Array.isArray(item.thumbnail)){
        item.thumbnail = Array(item.thumbnail);
      }
        
      item.status = true;
      
      const newProduct = await productsDAOs.addProduct(item);
      newProducts.push(newProduct);
    });

    return newProducts;
  } catch (error) {
    throw new Error(error);
  }
}

// UPDATE
export async function updateProduct(id, product) {
  try {
    const updatedProduct = await productsDAOs.updateProduct(id, product);
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
}

// DELETE
export async function deleteProduct(id) {
  try {
    const deletedProduct = await productsDAOs.delete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error(error);
  }
}
