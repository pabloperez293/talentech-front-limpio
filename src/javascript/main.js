const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const icon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  // Cambia el icono de barras a equis y viceversa
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-xmark');
  } else {
    icon.classList.remove('fa-xmark');
    icon.classList.add('fa-bars');
  }
});