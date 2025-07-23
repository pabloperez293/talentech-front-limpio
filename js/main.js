document.addEventListener('DOMContentLoaded', () => { 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderizarFrutas = () => {

const URL = "https://corsproxy.io/?https://www.fruityvice.com/api/fruit/all";

fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        let contenedorProductos = document.getElementById('contenedor-productos');
        contenedorProductos.innerHTML = ''; 

        for (const fruta of data) { 
            let tarjetaProducto = document.createElement('article');
            tarjetaProducto.classList.add('tarjeta-producto');

            let imagenProducto = document.createElement('img');
            imagenProducto.src = "https://cdn-icons-png.flaticon.com/512/415/415733.png";
            imagenProducto.alt = fruta.name;

            let tituloProducto = document.createElement('h2');
            tituloProducto.textContent = fruta.name;

            // Precio ficticio
            let precio = Math.floor(Math.random() * 100) + 10;
            fruta.price = precio;
            let precioProducto = document.createElement('p');
            precioProducto.textContent = `Precio: $${precio}`;

            let btnAgregar = document.createElement('button');
            btnAgregar.textContent = 'Agregar';
            btnAgregar.addEventListener('click', () => {
                if (!carrito.some(item => item.name === fruta.name)) {
                    agregarProducto(fruta);
                    actualizarAgregados();
                    mostrarMensaje(`Producto agregado: ${fruta.name}`);
                } else {
                    mostrarMensaje(`Ya agregaste ${fruta.name} al carrito`);
                }
            });

            tarjetaProducto.appendChild(imagenProducto);
            tarjetaProducto.appendChild(tituloProducto);
            tarjetaProducto.appendChild(precioProducto);
            tarjetaProducto.appendChild(btnAgregar);

            contenedorProductos.appendChild(tarjetaProducto);
         }
      })
    .catch((error) => console.error('Error fetching products:', error));
};

const agregarProducto = (producto) => {
    carrito.push(producto);
    // Actualizar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const actualizarAgregados = () => {
    const contenedorCarrito = document.getElementById('contador-carrito');
    contenedorCarrito.textContent = carrito.length;

    };
// se vuelve a llamar a la función para que se actualice el contador
    renderizarFrutas();
    actualizarAgregados();
});

// Agrega esta función para mostrar mensajes
function mostrarMensaje(mensaje) {
    let msgDiv = document.getElementById('mensaje');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'mensaje';
        msgDiv.style.position = 'fixed';
        msgDiv.style.bottom = '20px';
        msgDiv.style.right = '20px';
        msgDiv.style.background = '#007bff';
        msgDiv.style.color = '#fff';
        msgDiv.style.padding = '12px 24px';
        msgDiv.style.borderRadius = '8px';
        msgDiv.style.zIndex = '999';
        document.body.appendChild(msgDiv);
    }
        msgDiv.textContent = mensaje;
    setTimeout(() => { msgDiv.remove(); }, 2000);

    if (carrito.length === 0) {
        carritoDiv.innerHTML += '<p>El carrito está vacío.</p>';
    } else {
        carrito.forEach((item, idx) => {
            carritoDiv.innerHTML += `
                <div style="margin-bottom:10px;">
                    ${item.name} - $${item.price}
                    <button onclick="eliminarDelCarrito(${idx})" style="margin-left:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer;">Eliminar</button>
                </div>
            `;
        });
    }
    carritoDiv.innerHTML += `<button onclick="document.getElementById('carrito-visual').remove()" style="margin-top:10px;">Cerrar</button>`;
}

// Eliminar producto del carrito
window.eliminarDelCarrito = function(idx) {
    carrito.splice(idx, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarAgregados();
    mostrarCarrito();
}

// Evento para mostrar el carrito (asegúrate de tener un botón con id="ver-carrito" en tu HTML)
document.addEventListener('DOMContentLoaded', () => {
    // ...existing code...
    renderizarFrutas();
    actualizarAgregados();

    const btnVerCarrito = document.getElementById('ver-carrito');
    if (btnVerCarrito) {
        btnVerCarrito.addEventListener('click', mostrarCarrito);
    }
});
