// eslint-disable-next-line no-undef
const socket = io();

// **** PRODUCTOS **** //

//variables
const cards = document.getElementById("cards");

// Renderizar productos
socket.on("productos", (prods) => {
  cards.innerHTML = "";
  prods.forEach((prod) => {
    cards.innerHTML += `
    <div class="card">
        <div class="cardHeader">
        <h3>${prod.title}</h3>
        </div>
        <div class="cardBody">
        <div class="cardimg">
            <img src="${prod.thumbnail[0]}" alt="Imagen del producto" />
        </div>
        <div class="cardDescription">
            <p>${prod.description}</p>
            <p class="cardSmall">Precio: $${prod.price}</p>
            <p class="cardSmall">Códgo: ${prod.code}</p>
            <p class="cardSmall">Stock: ${prod.stock}</p>
            <p class="cardSmall">Categoría: ${prod.category}</p>
        </div>
        </div>
        <div class="cardFooter">
        <button class="btn">Agregar</button>
        </div>
    </div>`;
  });
});

// **** FETCHS **** //

//variables
const productCart = document.querySelectorAll(".cartDescription");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");

//Actualizar cantidad en producto al carrito
productCart.forEach((cart) => {
  //Boton uodate
  const btnUpdate = Object.values(cart.children).find(
    (btn) => btn.id == "btnUpdateProducto"
  );

  btnUpdate.addEventListener("click", async (e) => {
    e.preventDefault();

    // Cantidad del input
    const quantity = Object.values(cart.children).find(
      (el) => el.className == "priceCartDescription"
    ).value;

    const pid = e.target.getAttribute("id-product");
    const cid = e.target.getAttribute("id-cart");
    const currentQuantity = e.target.getAttribute("quantity");

    if(currentQuantity != quantity)
      postCart(cid, pid, quantity);

  });
});

async function postCart(cid, pid, quantity) {
  try {
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity }),
    }).then((data) => {
      if (data.ok) window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
}

// Borrar producto de carrito
productCart.forEach((cart) => {
  //Boton update
  const btnUpdate = Object.values(cart.children).find(
    (btn) => btn.id == "btnDeleteProducto"
  );

  btnUpdate.addEventListener("click", async (e) => {
    e.preventDefault();

    const pid = e.target.getAttribute("id-product");
    const cid = e.target.getAttribute("id-cart");

    Swal.fire({
      text: "¿Está seguro que quiere quitar el producto?",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(cid, pid) 
      }
    });
  });
});

async function deleteProduct(cid, pid) {
  try {
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
}

// Vaciar carrio
btnVaciarCarrito.addEventListener("click", async (e) => {
  e.preventDefault();

  const cid = e.target.getAttribute("id-cart");

  Swal.fire({
    text:"Si continúa su carrito se vaciará",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Borrar'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAllProducts(cid);
    }
  });
});

async function deleteAllProducts(cid) {
  try {
    await fetch(`/api/carts/${cid}/product`, {
      method: "DELETE",
    }).then((data) => {
      if (data.ok) window.location.reload();
    });
  } catch (error) {
    console.log(error);
  }
}
