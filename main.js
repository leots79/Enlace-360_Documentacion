// main.js
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const menuToggle = document.getElementById('menuToggle');
  const indexLinks = document.querySelectorAll('.index-link');
  const sections = document.querySelectorAll('.section');

  // Toggle Menú en Móviles
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });

  // Cerrar sidebar al hacer click en un link (en móvil)
  indexLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
    });
  });

  // ScrollSpy - Resalta el menú lateral según el Scroll
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remover clase activa de todos
        indexLinks.forEach(link => link.classList.remove('active'));
        
        // Agregar clase activa al correspondiente
        const activeId = entry.target.getAttribute('id');
        const activeLink = document.querySelector(`.index-link[href="#${activeId}"]`);
        if (activeLink) {
          activeLink.classList.add('active');
          // Scrollear ligeramente el sidebar si el item queda oculto
          activeLink.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    });
  }, observerOptions);

  // Observer para Animaciones de Fade-Up
  const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const fadeObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, fadeObserverOptions);

  const fadeElements = document.querySelectorAll('.fade-up');
  fadeElements.forEach(el => fadeObserver.observe(el));

  sections.forEach(section => {
    observer.observe(section);
  });
});
