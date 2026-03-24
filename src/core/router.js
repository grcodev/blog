import * as Articles from "../pages/articles.js"
import * as Contact  from "../pages/contact.js"
import * as Ebook    from "../pages/ebook.js"
import * as Legal    from "../pages/legal.js"

function setActiveNav() {
  const hash = location.hash || "#/"
  document.querySelectorAll("nav a").forEach((a) => {
    const href = a.getAttribute("href")
    const isActive =
      href === hash ||
      (href !== "#/" && hash.startsWith(href))
    a.classList.toggle("active", isActive)
  })
}

export function initRouter() {
  function handleRoute() {
    const hash = location.hash || "#/"
    setActiveNav()

    if (hash === "#/" || hash === "" || hash.startsWith("#/articles")) {
      Articles.render()
      return
    }

    if (hash === "#/ebook") {
      Ebook.render()
      return
    }

    if (hash === "#/contact") {
      Contact.render()
      return
    }

    const legalMatch = hash.match(/#\/legal\/(.+)/)
    if (legalMatch) {
      Legal.render(legalMatch[1])
      return
    }

    document.getElementById("app").innerHTML = `
      <div class="not-found">
        <span class="code">404</span>
        <p>Page not found. <a href="#/">Go home.</a></p>
      </div>
    `
  }

  window.addEventListener("hashchange", handleRoute)
  handleRoute()
}