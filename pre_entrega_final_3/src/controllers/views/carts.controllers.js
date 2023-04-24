import {
  addCart,
  updateCart,
  findOneCart,
} from "../../services/carts.services.js";
import {
  updateUser,
  findUserById,
  getToken,
} from "../../services/users.services.js";
import { addTicket } from "../../services/ticket.services.js";
import {
  updateProduct,
  findOneProductById,
} from "../../services/products.services.js";

export const getCart = async (req, res) => {
  const user = res.user;
  const cid = req.params.cid;

  if (user) {
    const userDB = await findUserById(user.id);
    const cart = await findOneCart(userDB.cartId);

    if (cart.products.length > 0) {
      //Agregar referencia al carrito en cada producto
      cart.products.forEach((x) => (x.idCart = cid));
    }

    res.render("carts", {
      user: userDB,
      idCart: cid,
      cart: cart.products,
      titulo: "CARRITO",
    });
  } else {
    res.redirect("/products");
  }
};

export const postCart = async (req, res) => {
  const user = res.user;
  let userDB = await findUserById(user.id);

  const pid = req.params.pid;
  const quantity = req.body.quantity;
  let cid;

  if (user && !user.isAdmin) {
    // si no hay carrito en user
    if (!userDB?.cartId) {
      // crear carrito
      const cart = await addCart();
      cid = cart.id;

      // guardar carrit en user
      userDB.cartId = cid;

      // guardar user en db
      userDB = await updateUser(userDB.id, userDB);
    } else {
      cid = req.params.cid;
    }

    // actualizar carrito si es el mismo del usuario
    if (userDB.cartId == cid) {
      await updateCart(cid, { product: pid, quantity: quantity });

      // actualizar token
      const token = await getToken(userDB);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        signed: true,
      });
    } else {
      return res.redirect("/errorLogin");
    }

    res.redirect(`/carts/${cid}`);
  } else {
    res.redirect("/products");
  }
};

export const postTicket = async (req, res) => {
  try {
    const user = res.user;
    const cid = req.params.cid;
    const cart = await findOneCart(cid);

    //Validar que stock sea mayor a cantidad
    const cartStockValid = cart.products.filter(
      (x) => x.product.stock >= x.quantity
    );

    // Obtener el monto total del carrito
    const amount = cartStockValid.reduce(
      (acc, x) => acc + x.product.price * x.quantity,
      0
    );

    // Crear ticket
    const ticket = {
      purcharser: user.email,
      amount,
      code: Math.floor(Math.random() * 1000000),
    };

    if (amount > 0) {
      //Borrar productos del carrito que pasan la validacion de stock
      const removeProducts = cart.products.filter(
        (x) => x.product.stock < x.quantity
      );

      await updateCart(cid, { products: removeProducts });

      //Actualizar stock de productos
      cartStockValid.forEach(async (x) => {
        const product = await findOneProductById(x.product._id);
        product.stock = product.stock - x.quantity;
        await updateProduct(product.id, product);
      });

      await addTicket(ticket);
    }

    res.render("ticket", {
      ticket,
      cart: cartStockValid,
      user,
      titulo: "TICKET",
    });
  } catch (error) {
    throw new Error(error);
  }
};
