import { parseMarkdown } from "../lib/marked.js"

const posts = [
  { slug: "intro-web", title: "Introdução programação WEB" },
  { slug: "intro-javascript", title: "Introdução JavaScript" },
]

let articleCache = {}

async function fetchArticle(slug) {
  if (articleCache[slug]) return articleCache[slug]
  try {
    const res = await fetch(`/articles/${slug}.md`)
    if (!res.ok) return null
    const text = await res.text()
    articleCache[slug] = text
    return text
  } catch {
    return null
  }
}

async function searchArticles(query) {
  const term = query.trim().toLowerCase()
  if (!term) return []

  const results = []

  for (const post of posts) {
    const content = await fetchArticle(post.slug)
    if (!content) continue

    const lower = content.toLowerCase()
    const index = lower.indexOf(term)

    if (index !== -1) {
      const start = Math.max(0, index - 60)
      const end = Math.min(content.length, index + term.length + 60)
      let excerpt = content.slice(start, end).replace(/[#*`]/g, "").trim()
      if (start > 0) excerpt = "..." + excerpt
      if (end < content.length) excerpt = excerpt + "..."

      results.push({ post, excerpt, index })
    }
  }

  return results
}

function highlight(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return text.replace(new RegExp(`(${escaped})`, "gi"), "<mark>$1</mark>")
}

export async function render() {
  const app = document.getElementById("app")

  app.innerHTML = `
    <div class="articles-header">
      <h1>Artigos</h1>
    </div>

    <div class="search-bar">
      <input
        type="text"
        id="search-input"
        placeholder="🔍Buscar nos artigos..."
        autocomplete="off"
        spellcheck="false"
      />
    </div>

    <div id="search-results" class="search-results" hidden></div>

    <ul class="post-list" id="post-list">
      ${posts.map((p) => `
        <li>
          <a href="#/articles/${p.slug}">
            <span class="post-title">${p.title}</span>
            <span class="post-slug">${p.slug}</span>
          </a>
        </li>`).join("")}
    </ul>

    <div id="article-view"></div>
  `

  const input = document.getElementById("search-input")
  const resultsEl = document.getElementById("search-results")
  const postList = document.getElementById("post-list")

  let debounceTimer

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer)
    const query = input.value.trim()

    if (!query) {
      resultsEl.hidden = true
      resultsEl.innerHTML = ""
      postList.hidden = false
      return
    }

    debounceTimer = setTimeout(async () => {
      resultsEl.innerHTML = `<p class="loading">Buscando...</p>`
      resultsEl.hidden = false
      postList.hidden = true

      const results = await searchArticles(query)

      if (results.length === 0) {
        resultsEl.innerHTML = `<p class="search-empty">Nenhum resultado para "<strong>${query}</strong>".</p>`
        return
      }

      resultsEl.innerHTML = results.map(({ post, excerpt }) => `
        <div class="search-result-item">
          <a href="#/articles/${post.slug}" class="search-result-title">${post.title}</a>
          <p class="search-result-excerpt">${highlight(excerpt, query)}</p>
        </div>
      `).join("")
    }, 300)
  })

  const match = location.hash.match(/#\/articles\/(.+)/)
  if (match) {
    loadArticle(match[1])
  } else {
    document.getElementById("article-view").innerHTML =
      `<p class="article-placeholder">© Cubelog<br>Desenvolvido por Guilherme Ribeiro</p>`
  }
}

async function loadArticle(slug) {
  const container = document.getElementById("article-view")
  container.innerHTML = `<p class="loading">Loading...</p>`

  try {
    const content = await fetchArticle(slug)
    if (!content) throw new Error()
    container.innerHTML = parseMarkdown(content)
  } catch {
    container.innerHTML = `<p class="article-placeholder">Article not found.</p>`
  }
}