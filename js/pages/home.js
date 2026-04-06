// pages/home.js — lista posts, pesquisa e abre post individual

const HomePage = (() => {

  // Lista de artigos disponíveis.
  // Adicione novos artigos aqui: { file: 'nome.md', title: 'Título', date: 'YYYY-MM-DD' }
  const ARTICLES = [
    { file: 'intro-web.md',        title: 'Introdução Programação Web', date: '2026-04-06' },
    { file: 'intro-javascript.md', title: 'Introdução JavaScript',       date: '2026-04-07' },
  ];

  // Cache dos artigos carregados (para pesquisa offline)
  let _cache = [];

  const app = () => document.getElementById('app');

  // ── Lista de posts ──────────────────────────────────────────
  async function renderList(query = '') {
    app().innerHTML = `
      <p class="page-title">Posts</p>

      <div class="search-bar-wrap">
        <input
          type="search"
          id="search-input"
          class="search-bar"
          placeholder="Pesquisar artigos..."
          value="${escapeAttr(query)}"
          autocomplete="off"
        />
        <span class="search-icon">⌕</span>
      </div>

      <div class="post-list" id="post-list">
        <p class="loading">Carregando artigos...</p>
      </div>
    `;

    // Evento de pesquisa
    const input = document.getElementById('search-input');
    input.addEventListener('input', () => {
      filterAndRender(input.value.trim());
    });

    // Foca no input se há query ativa
    if (query) input.focus();

    // Carrega todos os MDs (usa cache se já carregou)
    if (_cache.length === 0) {
      _cache = await Promise.all(
        ARTICLES.map(async (art) => {
          let rawText = '';
          try {
            const res = await fetch(`articles/${art.file}`);
            if (res.ok) rawText = await res.text();
          } catch (_) { /* arquivo pode não existir ainda */ }

          const clean = rawText.replace(/^---[\s\S]*?---\n?/, '').trim();
          const excerpt = clean.replace(/[#*`>_\[\]!]/g, '').slice(0, 180).trim()
            + (clean.length > 180 ? '…' : '');

          return { ...art, rawText: clean.replace(/[#*`>_\[\]!]/g, ' '), excerpt };
        })
      );
    }

    filterAndRender(query);
  }

  // ── Filtro e renderização ────────────────────────────────────
  function filterAndRender(query) {
    const list = document.getElementById('post-list');
    if (!list) return;

    const q = query.toLowerCase().trim();
    const filtered = q
      ? _cache.filter(art =>
          art.title.toLowerCase().includes(q) ||
          art.rawText.toLowerCase().includes(q)
        )
      : _cache;

    if (filtered.length === 0) {
      list.innerHTML = `<p class="loading">Nenhum artigo encontrado para "<strong>${escapeHtml(q)}</strong>".</p>`;
      return;
    }

    list.innerHTML = filtered.map(art => {
      let excerpt = art.excerpt;

      // Destaca o termo no excerpt
      if (q) {
        const re = new RegExp(`(${escapeRegex(q)})`, 'gi');
        excerpt = excerpt.replace(re, '<mark>$1</mark>');
      }

      return `
        <article class="post-card" data-file="${art.file}">
          <div class="post-card-meta">${formatDate(art.date)}</div>
          <div class="post-card-title">${art.title}</div>
          ${excerpt ? `<div class="post-card-excerpt">${excerpt}</div>` : ''}
          <span class="post-card-read">Ler →</span>
        </article>
      `;
    }).join('');

    list.querySelectorAll('.post-card').forEach(card => {
      card.addEventListener('click', () => renderPost(card.dataset.file));
    });
  }

  // ── Post individual ─────────────────────────────────────────
  async function renderPost(file) {
    app().innerHTML = `<p class="loading">Carregando post...</p>`;

    let raw = '';
    try {
      const res = await fetch(`articles/${file}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      raw = await res.text();
    } catch (e) {
      app().innerHTML = `<p class="error-msg">Erro ao carregar "${file}": ${e.message}</p>`;
      return;
    }

    // Extrai frontmatter simples (--- title: ... date: ... ---)
    let title = file.replace('.md', '');
    let date  = '';
    const fm  = raw.match(/^---\n([\s\S]*?)\n---\n?/);
    if (fm) {
      const t = fm[1].match(/title:\s*(.+)/);
      const d = fm[1].match(/date:\s*(.+)/);
      if (t) title = t[1].trim();
      if (d) date  = d[1].trim();
      raw = raw.replace(fm[0], '');
    } else {
      const art = ARTICLES.find(a => a.file === file);
      if (art) { title = art.title; date = art.date; }
    }

    const html = marked.parse(raw);

    app().innerHTML = `
      <span class="post-back" id="back-btn">← Voltar</span>
      <div class="post-header">
        <h1>${title}</h1>
        ${date ? `<p class="meta">${formatDate(date)}</p>` : ''}
      </div>
      <div class="md-body">${html}</div>
    `;

    document.getElementById('back-btn').addEventListener('click', () => renderList());
  }

  // ── helpers ─────────────────────────────────────────────────
  function formatDate(iso) {
    if (!iso) return '';
    const [y, m, d] = iso.split('-');
    const months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
    return `${d} ${months[parseInt(m, 10) - 1]} ${y}`;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function escapeAttr(str) {
    return str.replace(/"/g, '&quot;');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  return { render: renderList, renderPost };
})();