// app.js

const app = document.getElementById("app");

const articleContentCache = {};
let articles = [];

// ─── FRONTMATTER ─────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };

  const meta = {};
  match[1].split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key   = line.slice(0, i).trim();
    const value = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    meta[key] = value;
  });

  return { meta, body: match[2] };
}

// ─── LOADER ──────────────────────────────────────────────

async function loadMarkdown(filePath) {
  try {
    const res = await fetch(filePath);
    if (!res.ok) return null;
    const raw  = await res.text();
    const { meta, body } = parseFrontmatter(raw);
    const html = marked.parse(body);
    return { meta, html, body };
  } catch (err) {
    console.error("Erro ao carregar markdown:", filePath, err);
    return null;
  }
}

// ─── CARREGA LISTA DE ARTIGOS ─────────────────────────────

async function loadArticles() {
  const { BASE } = window.__router__ || { BASE: "" };
  const prefix = BASE ? BASE + "/" : "";
  try {
    const res = await fetch(`${prefix}js/articles.json`);
    if (!res.ok) throw new Error("articles.json não encontrado");
    articles = await res.json();
  } catch (err) {
    console.error("Erro ao carregar articles.json:", err);
    articles = [];
  }
}

// ─── PRÉ-CARREGA CONTEÚDO DOS ARTIGOS PARA BUSCA ─────────

async function preloadArticleContents() {
  const { BASE } = window.__router__ || { BASE: "" };
  const prefix = BASE ? BASE + "/" : "";
  await Promise.all(
    articles.map(async (a) => {
      if (articleContentCache[a.slug] !== undefined) return;
      try {
        const res = await fetch(`${prefix}markdown/articles/${a.slug}.md`);
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

// ─── RENDER BLOG (lista + pesquisa) ──────────────────────

function renderArticleList(filter = "") {
  const q = filter.toLowerCase().trim();

  const filtered = q
    ? articles.filter((a) => {
        const inTitle       = a.title.toLowerCase().includes(q);
        const inDescription = (a.description || "").toLowerCase().includes(q);
        const inTags        = (a.tags || []).some((t) => t.toLowerCase().includes(q));
        const inContent     = (articleContentCache[a.slug] || "").includes(q);
        return inTitle || inDescription || inTags || inContent;
      })
    : articles;

  if (filtered.length === 0) {
    return `<p class="search-empty">Nenhum artigo encontrado.</p>`;
  }

  return `<ul class="article-list">${filtered.map((a) => `
    <li>
      <a href="#" data-article="${a.slug}">${a.title}</a>
      ${a.description ? `<p class="article-description">${a.description}</p>` : ""}
      <span>${a.date}</span>
    </li>
  `).join("")}</ul>`;
}

function renderBlog() {
  document.title = "Blog | ScriptPRO";
  app.innerHTML = `
    <section class="articles-section">
      <h2>Artigos</h2>
      <input
        id="article-search"
        class="article-search"
        type="text"
        placeholder="Pesquisar artigos…"
        autocomplete="off"
      />
      <div id="article-list-container">
        ${renderArticleList()}
      </div>
    </section>
  `;

  const input = document.getElementById("article-search");
  input.addEventListener("input", () => {
    const container = document.getElementById("article-list-container");
    container.innerHTML = renderArticleList(input.value);
    bindArticleLinks();
  });

  bindArticleLinks();
  preloadArticleContents();
}

// ─── RENDER ARTIGO ────────────────────────────────────────

async function openArticle(slug) {
  const { BASE } = window.__router__ || { BASE: "" };
  const prefix = BASE ? BASE + "/" : "";

  renderLoading();

  const data = await loadMarkdown(`${prefix}markdown/articles/${slug}.md`);
  if (!data) {
    renderNotFound();
    return;
  }

  app.innerHTML = `
    <article class="markdown-body">${data.html}</article>
    <div class="back-link-wrap">
      <a href="#" id="back-to-blog">← Voltar para blog</a>
    </div>
  `;

  if (data.meta.title) document.title = data.meta.title + " | ScriptPRO";

  document.getElementById("back-to-blog").onclick = (e) => {
    e.preventDefault();
    navigate("/blog");
  };

  updateNavActive("/blog");
  window.scrollTo(0, 0);
}

// ─── RENDER PAGE (markdown) ───────────────────────────────

function renderPage(data) {
  app.innerHTML = `<article class="markdown-body">${data.html}</article>`;
  if (data.meta.title) document.title = data.meta.title + " | ScriptPRO";
}

function renderNotFound() {
  app.innerHTML = `
    <div class="not-found">
      <p class="not-found-code">404</p>
      <p>Página não encontrada.</p>
      <a href="/" data-link>← Voltar para home</a>
    </div>
  `;
  document.title = "404 | ScriptPRO";
  bindLinks();
}

function renderLoading() {
  app.innerHTML = `<p class="loading">Carregando…</p>`;
}

// ─── NAV ACTIVE ───────────────────────────────────────────

function updateNavActive(path) {
  document.querySelectorAll("#nav a[data-link]").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("href") === path);
  });
}

// ─── NAVIGATE ─────────────────────────────────────────────

async function navigate(path) {
  updateNavActive(path);

  const { file, type } = resolveRoute(path);

  if (type === "not-found") {
    renderNotFound();
    return;
  }

  if (type === "blog") {
    renderBlog();
    return;
  }

  renderLoading();

  const data = await loadMarkdown(file);
  if (!data) {
    renderNotFound();
    return;
  }

  renderPage(data);
  bindLinks();
  window.scrollTo(0, 0);
}

// ─── LINKS ────────────────────────────────────────────────

function bindLinks() {
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      const href = el.getAttribute("href");
      history.pushState(null, "", href);
      navigate(href);
    };
  });
}

function bindArticleLinks() {
  document.querySelectorAll("[data-article]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      openArticle(el.getAttribute("data-article"));
    };
  });
}

// ─── INIT ─────────────────────────────────────────────────

window.addEventListener("popstate", () => navigate(window.location.pathname));
bindLinks();

loadArticles().then(() => navigate(window.location.pathname));