// router.js

function detectBase() {
  const p = window.location.pathname;
  if (p.endsWith(".html")) {
    return p.substring(0, p.lastIndexOf("/"));
  }
  const baseTag = document.querySelector("base[href]");
  if (baseTag) return baseTag.getAttribute("href").replace(/\/$/, "");
  return "";
}

const BASE = detectBase();
window.__router__ = { BASE };

const routes = {
  "/":        { file: "markdown/pages/home.md",    type: "home" },
  "/blog":    { file: null,                         type: "blog" },
  "/kits":    { file: "markdown/pages/kits.md",    type: "page" },
  "/legal": { file: "markdown/pages/legal.md", type: "page" },
};

function resolveRoute(path) {
  let p = path;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length) || "/";
  if (p === "/index.html" || p === "") p = "/";
  if (p !== "/" && p.endsWith("/")) p = p.slice(0, -1);

  if (routes[p]) return routes[p];

  return { file: null, type: "not-found" };
}