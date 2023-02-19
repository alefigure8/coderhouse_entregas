// eslint-disable-next-line no-undef
const socket = io();

// **** VARIABLES DOM **** //
const cards = document.getElementById("cards");

// **** PRODUCTOS **** //

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

//Actualizar cantidad en producto al carrito
const productCart = document.querySelectorAll(".cartDescription")
productCart.forEach(cart => {
  cart.children[3].addEventListener("click", async (e) => {
    e.preventDefault();

    const pid = e.target.getAttribute("id-product");
    const cid = e.target.getAttribute("id-cart");

    postCart(cid, pid, cart.children[2].value)
   
  });
})

// Actualizar carrito
async function postCart(cid, pid, quantity){
  try {
    await fetch(`/api/carts/${cid}/product/${pid}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({quantity}),
    });
  } catch (error) {
    console.log(error);
  }
}