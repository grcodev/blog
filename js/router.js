// router.js — roteador hash simples

const Router = (() => {
  const routes = {};

  function define(path, handler) {
    routes[path] = handler;
  }

  function resolve() {
    // pega o hash sem o #, ex: "#/shop" → "/shop"
    const hash = window.location.hash.replace(/^#/, '') || '/';
    const path = hash.split('?')[0];

    // tenta rota exata, depois fallback para /
    const handler = routes[path] || routes['/'];

    if (typeof handler === 'function') {
      handler(path);
    }

    // marca link ativo no nav
    document.querySelectorAll('#mainNav a').forEach(a => {
      const href = a.getAttribute('href').replace(/^#/, '') || '/';
      // ativo se rota exata OU se é pai da rota atual (ex: /legal)
      const isActive = href === path || (href !== '/' && path.startsWith(href));
      a.classList.toggle('active', isActive);
    });

    // fecha menu mobile ao navegar
    closeMobileMenu();

    // scroll para o topo
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function closeMobileMenu() {
    const nav    = document.getElementById('mainNav');
    const toggle = document.getElementById('navToggle');
    if (!nav || !toggle) return;
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function init() {
    window.addEventListener('hashchange', resolve);

    // Inicializa depois que o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initHamburger();
        resolve();
      });
    } else {
      initHamburger();
      resolve();
    }
  }

  function initHamburger() {
    const toggle = document.getElementById('navToggle');
    const nav    = document.getElementById('mainNav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha ao clicar fora
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
  }

  function navigate(path) {
    window.location.hash = path;
  }

  return { define, init, navigate };
})();
