export function render() {
  document.getElementById("app").innerHTML = `
    <div class="ebook-header">
      <span class="ebook-eyebrow">Kit</span>
      <h1>Frontend Blueprint</h1>
      <p class="ebook-tagline">Projetos reais com código reutilizável.</p>
      <p class="ebook-subtitle">
        Não é um curso. É um kit prático com projetos completos,
        estrutura de pastas profissional e decisões que você aplica direto no seu código.
      </p>
    </div>

    <div class="ebook-cover-block">
      <div class="ebook-cover">
        <img src="https://github.com/devgbr86/devgbr86/releases/download/assets/cover.13.png" alt="Frontend Blueprint cover">
      </div>
      <div class="ebook-meta">
        <div class="meta-item">
          <span>Formato</span>
          PDF + Código fonte
        </div>
        <div class="meta-item">
          <span>Abordagem</span>
          Project-based — construir, usar, adaptar
        </div>
        <div class="meta-item">
          <span>Conteúdo</span>
          3 projetos completos e reutilizáveis
        </div>
        <div class="meta-item">
          <span>Stack</span>
          Git · HTML/CSS · JavaScript · TypeScript
        </div>
      </div>
    </div>

    <div class="ebook-section">
      <h2>O que você recebe</h2>
      <ul class="chapter-list">
        <li>
          <div>
            <strong>Projetos prontos para uso</strong>
            <p>
              Código completo com estrutura profissional, pronto para adaptar
              e usar como base em novos projetos.
            </p>
          </div>
        </li>
        <li>
          <div>
            <strong>Arquitetura aplicada</strong>
            <p>
              Organização de pastas, separação de responsabilidades e decisões
              que evitam bagunça e retrabalho.
            </p>
          </div>
        </li>
        <li>
          <div>
            <strong>Guia direto ao ponto</strong>
            <p>
              Explicações objetivas focadas no que realmente importa
              na construção de projetos reais.
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="ebook-section">
      <h2>Os três projetos</h2>
      <ul class="chapter-list">
        <li>
          <span class="chapter-num">01</span>
          <div>
            <strong>Setup + Deploy real</strong>
            <p>
              Configure seu ambiente e publique seu primeiro projeto
              com estrutura profissional.
            </p>
          </div>
        </li>
        <li>
          <span class="chapter-num">02</span>
          <div>
            <strong>SPA sem framework</strong>
            <p>
              Roteamento, modularização e organização de código que escala,
              sem depender de bibliotecas.
            </p>
          </div>
        </li>
        <li>
          <span class="chapter-num">03</span>
          <div>
            <strong>TypeScript + API</strong>
            <p>
              Integração com API real, tipagem e tratamento de dados
              prontos para uso em aplicações reais.
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="ebook-section">
      <h2>Resultado</h2>
      <p>
        Você termina com projetos publicados, código organizado e uma base
        reutilizável para novos projetos.
      </p>
    </div>

    <div class="ebook-section">
      <h2>Para quem é</h2>
      <p>
        Para devs que já sabem o básico e querem parar de travar na estrutura
        dos projetos.
      </p>
    </div>

    <div class="ebook-cta">
      <a
        href="https://wa.me/5531996981103?text=Ol%C3%A1%2C%20quero%20comprar%20o%20Frontend%20Blueprint"
        target="_blank"
        rel="noopener noreferrer"
        class="cta-button"
      >
        Comprar kit agora
      </a>
      <p class="cta-note">Pagamento via Pix · Entrega imediata</p>
    </div>
  `
}