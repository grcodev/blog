export function render() {
  document.getElementById("app").innerHTML = `
    <div class="contact-header">     
      <h1>Contato</h1>
    </div>
    <div class="contact-item">   
      <span>GitHub</span>
        <a href="https://github.com/ribeirorep">github.com/ribeirorep</a>
      <span>LinkedIn</span>
        <a href="https://linkedin.com/in/gribeirodev">linkedin.com/in/gribeirodev</a>
      <span>Email</span>
        <a href="mailto:topverbs@gmail.com">topverbs@gmail.com</a>
    </div>
  `
}