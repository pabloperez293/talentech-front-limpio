 document.addEventListener('DOMContentLoaded', () => {
          const contenedorCarrito = document.getElementById('contenedor-carrito');
          const resumenCarrito = document.getElementById('resumen-carrito');
          let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

          function renderizarCarrito() {
              contenedorCarrito.innerHTML = '<h2>Tu carrito</h2>';
              if (carrito.length === 0) {
                  contenedorCarrito.innerHTML += '<p>El carrito está vacío.</p>';
                  resumenCarrito.innerHTML = '';
                  return;
              }
              let total = 0;
              carrito.forEach((item, idx) => {
                  total += item.price;
                  contenedorCarrito.innerHTML += `
                      <div style="margin-bottom:10px;">
                          <strong>${item.name}</strong> - $${item.price}
                          <button onclick="eliminarDelCarrito(${idx})" style="margin-left:10px;background:#dc3545;color:#fff;border:none;border-radius:4px;padding:4px 8px;cursor:pointer;">Eliminar</button>
                      </div>
                  `;
              });
              resumenCarrito.innerHTML = `<h3>Total: $${total}</h3>`;
          }

          window.eliminarDelCarrito = function(idx) {
              carrito.splice(idx, 1);
              localStorage.setItem('carrito', JSON.stringify(carrito));
              renderizarCarrito();
          };

          renderizarCarrito();
      });