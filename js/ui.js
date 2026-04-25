// ui.js
// Componentes visuais fixos: navbar e footer.

// ─── NAVBAR ───────────────────────────────────────────────

function renderNavbar() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  nav.innerHTML = `
    <img src="./grimbook_icon.png" style="width: 32px; height: 32px; border-radius: 25%;">
    <a href="/blog/" data-link>Home</a>
  `;

  bindLinks();
}

// ─── FOOTER ───────────────────────────────────────────────

function renderFooter() {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer-inner">
      <div class="footer-about">
        <span class="footer-brand">Sobre</span>
        <p>Projeto desenvolvido por Guilherme Ribeiro.</p>
        <p><br>🛠️ Documentação de Projetos + JavaScript Boilerplate Kit
        <br><a href="https://grcodev.github.io/blog/p/jskit">→ Explorar</a>
        <br>📘 EBOOK Manual Completo Git & VSCode
        <br><a href="https://grcodev.github.io/blog/p/ebook">→ Explorar</a>
        </p>
      </div>
      <div class="footer-col">
        <span class="footer-col-title">Contato</span>
        <a href="mailto:topverbs@gmail.com">topverbs@gmail.com</a>
        <a href="https://github.com/grcodev" target="_blank" rel="noopener">github.com/grcodev</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© grcodev/blog</span>
      <a href="${BASE}/legal" id="footer-legal-link">Privacidade e Termos</a>
    </div>
  `;

  document.getElementById("footer-legal-link").onclick = (e) => {
    e.preventDefault();
    navigate('/legal');
  };
}