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

export const getCart = async (req, res) => {
  const user = res.user;
  const cid = req.params.id;

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

  if (user) {
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
