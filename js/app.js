// app.js
// Orquestrador central + lógica de artigos/markdown.

// ─── CACHE E ESTADO ───────────────────────────────────────

const articleContentCache = {};
let articles = [];
let currentView = "home";

// ─── CARREGA LISTA DE ARTIGOS ─────────────────────────────

async function loadArticles() {
  try {
    const res = await fetch(BASE + "/data/articles.json");
    if (!res.ok) throw new Error("articles.json não encontrado");
    articles = await res.json();
  } catch (err) {
    console.error("Erro ao carregar articles.json:", err);
    articles = [];
  }
}

// ─── PRÉ-CARREGA CONTEÚDO DOS ARTIGOS PARA BUSCA ─────────

async function preloadArticleContents() {
  await Promise.all(
    articles.map(async (a) => {
      if (articleContentCache[a.slug] !== undefined) return;
      try {
        const res = await fetch(BASE + `/articles/${a.slug}.md`);
        if (!res.ok) { articleContentCache[a.slug] = ""; return; }
        const raw = await res.text();
        const { body } = parseFrontmatter(raw);
        articleContentCache[a.slug] = body.toLowerCase();
      } catch {
        articleContentCache[a.slug] = "";
      }
    })
  );
}

// ─── RENDER ARTIGO ────────────────────────────────────────

async function openArticle(slug) {
  currentView = "article:" + slug;
  renderLoading();

  const data = await loadMarkdown(BASE + `/articles/${slug}.md`);
  if (!data) {
    renderNotFound();
    return;
  }

  document.getElementById("app").innerHTML = `
    <article class="markdown-body">
      <a href="${BASE}/" id="back-btn" class="back-link">← Voltar</a>
      ${data.html}
    </article>
  `;

  document.getElementById("back-btn").onclick = (e) => {
    e.preventDefault();
    navigate('/');
  };

  if (data.meta.title) document.title = data.meta.title + " | grcodev/blog";
  updateNavActive();
  window.scrollTo(0, 0);
}

// ─── INIT ─────────────────────────────────────────────────

loadArticles().then(() => {
  renderNavbar();
  renderFooter();
  initRouter();
});