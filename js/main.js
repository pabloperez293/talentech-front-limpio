document.addEventListener('DOMContentLoaded', () => { 
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const renderizarProductos = () => {

URL = "https://dummyjson.com/products?limit=9";

fetch(URL)
    .then((res) => res.json())
    .then((data) => {
        let contenedorProductos = document.getElementById('contenedor-productos');

        for (const producto of data.products){ 
            // Crear un elemento de artículo para cada producto o puede ser un div
            let tarjetaProducto = document.createElement('article');
            tarjetaProducto.classList.add('tarjeta-producto');
        // por orden dejamos una imagen y un título
            let imagenProducto = document.createElement('img');
            imagenProducto.src = producto.images[0];
            imagenProducto.alt = producto.description;

            let tituloProducto = document.createElement('h2');
            tituloProducto.textContent = producto.title;

            let precioProducto = document.createElement('p');
            precioProducto.textContent = `Precio: $${producto.price}`;

            let btnAgregar = document.createElement('button');
            btnAgregar.textContent = 'Agregar';
            btnAgregar.addEventListener('click', () => {
                alert(`Producto agregado: ${producto.title}`);

                agregarProducto(producto);
                actualizarAgregados();
        }); 
            // Agregar elementos al artículo
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
    renderizarProductos();
    actualizarAgregados();
});