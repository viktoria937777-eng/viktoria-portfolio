/**
 * Victoria Bychkova Portfolio — Scripts
 */

(function () {
  'use strict';

  // Header scroll effect
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('.nav__link').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }

  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    fadeElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < windowHeight - 60) {
        el.classList.add('visible');
      }
    });
  };

  if (fadeElements.length) {
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    revealOnScroll();
  }

  // Active nav link on scroll (index page)
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('.nav__link[data-nav]');

  if (sections.length && navLinks.length) {
    const highlightNav = () => {
      let current = '';
      sections.forEach((section) => {
        const top = section.offsetTop - 100;
        if (window.scrollY >= top) {
          current = section.getAttribute('data-section');
        }
      });
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('data-nav') === current);
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  }

  // Gallery lightbox
  const galleryItems = document.querySelectorAll('.gallery__item');
  let lightbox = null;

  if (galleryItems.length) {
    lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button class="lightbox__close" aria-label="Закрыть">&times;</button>
      <img class="lightbox__img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('.lightbox__img');
    const lightboxClose = lightbox.querySelector('.lightbox__close');

    galleryItems.forEach((item) => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    };

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = header ? header.offsetHeight + 16 : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();
