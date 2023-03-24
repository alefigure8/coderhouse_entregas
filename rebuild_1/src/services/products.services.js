import ProductManager from "../DAL/mongoManagers/ProductManager.js";
const productManager = new ProductManager();

// GET ALL
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


    const products = await productManager.findAll(query, options);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

// GET ONE
export async function findOneProductById(id) {
  try {
    const product = await productManager.findOneProduct({ _id: id });

    if (!product) throw new Error("Product not found");

    return product;
  } catch (error) {
    throw new Error(error);
  }
}

// POST
export async function addProduct(product) {
  try {
    const parseProduct = { ...product };

    parseProduct.thumbnail = [];

    if (Array.isArray(product.thumbnail))
      product.thumbnail.forEach((x) => parseProduct.thumbnail.push(x));
    else parseProduct.thumbnail.push(product.thumbnail);

    parseProduct.status = true;

    const newProduct = await productManager.addProduct(parseProduct);
    return newProduct;
  } catch (error) {
    throw new Error(error);
  }
}

// UPDATE
export async function updateProduct(id, product) {
  try {
    const parseProduct = { ...product, _id: id };
    const updatedProduct = await productManager.updateProduct(parseProduct);
    return updatedProduct;
  } catch (error) {
    throw new Error(error);
  }
}

// DELETE
export async function deleteProduct(id) {
  try {
    const deletedProduct = await productManager.delete(id);
    return deletedProduct;
  } catch (error) {
    throw new Error(error);
  }
}
