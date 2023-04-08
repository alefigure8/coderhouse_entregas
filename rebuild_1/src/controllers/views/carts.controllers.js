import {
  addCart,
  updateCart,
  findOneCart,
} from "../../services/carts.services.js";
import {
  updateUser,
  findUserById,
  regenerateToken,
} from "../../services/users.services.js";

export const getCart = async (req, res) => {
  const user = res.user;
  const cid = req.params.id;

  if (user) {
    const userDB = await findUserById(user._id);
    const cart = await findOneCart(userDB.cartId._id);

    if (cart[0].products.length > 0) {
      //Agregar referencia al carrito en cada producto
      cart[0].products.forEach((x) => (x.idCart = cid));
    }

    res.render("carts", {
      user: userDB,
      idCart: cid,
      cart: cart[0].products,
      titulo: "CARRITO",
    });
  } else {
    res.redirect("/products");
  }
};

export const postCart = async (req, res) => {
  const user = res.user;
  let userDB = await findUserById(user._id);
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  let cid;

  if (user) {
    // si no hay carrito en user
    if (!userDB.cartId) {
      // crear carrito
      const cart = await addCart();
      cid = cart._id;

      // guardar carrit en user
      userDB.cartId = cid;

      // guardar user en db
      userDB = await updateUser(userDB._id, userDB);
    } else {
      cid = req.params.cid;
    }

    // actualizar carrito si es el mismo del usuario
    if (userDB.cartId._id.toString() == cid.toString()) {
      await updateCart(cid, { product: pid, quantity: quantity });
     
      // actualizar token
      const token = await regenerateToken(userDB);
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 3600000,
        signed: true,
      });

    } else {
      res.redirect("/errorLogin");
    }

    res.redirect(`/carts/${cid}`);
  } else {
    res.redirect("/products");
  }
};
