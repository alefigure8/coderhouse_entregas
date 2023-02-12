// eslint-disable-next-line no-undef
const socket = io();

// **** VARIABLES DOM **** //
const cards = document.getElementById("cards");
const nombreUsuario = document.getElementById("nombreUsuario");
const chatParrafo = document.getElementById("chatParrafo");
const chatContainer = document.getElementById("chatContainer");


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


// **** CHAT **** //

let usuario = null;

// Alerta para ingresar nombre de usuario
if (!usuario) {
  // eslint-disable-next-line no-undef
  Swal.fire({
    title: "BIENVENIDO",
    text: "Ingrese su nombre de usuario",
    input: "text",
    buttonColor: "#f39c12",
    inputValidator: (value) => {
      if (!value) return "Debe ingresar un nombre de usuario";
    },
  })
    .then((result) => {
      // Obtener nombre de usuario
      usuario = result.value ? result.value : "Anónimo";
      nombreUsuario.innerHTML = usuario;

      // Agregar usuario a input hidden
      document.getElementById("usuario").value = usuario;

      // Emitir nombre de usuario para bradcast
      socket.emit("newUser", usuario);
    })
    .catch((error) => {
      console.log(error);
    });
}

socket.on("messages", (messages) => {

  // Renderizar mensajes
  chatParrafo.innerHTML = messages.map(msg => {
    return `
    <p class="msg"><span class="horaChat">${msg.fecha.split('T')[0] + ' - ' + msg.fecha.split('T')[1].split('.')[0]}</span> <span><strong>${msg.usuario}:</strong> ${msg.mensaje}</span></p>
    `;
  }).join('');

  // Clean input
  document.getElementById("mensaje").value = "";

  // Scroll automático al final del chat
  chatContainer.scrollTop = chatContainer.scrollHeight - chatContainer.clientHeight;
})

// Toast para nuevo usuario
socket.on('broadcast', (newUser) => {
  // eslint-disable-next-line no-undef
  Swal.fire({
    position: 'top-right',
    toast: true,
    timer: 3000,
    showConfirmButton: false,
    icon: 'success',
    iconColor: 'white',
    timerProgressBar: true,
    text: `${newUser} se ha unido al chat`,
  })
})