// pages/shop.js — Kits, projetos e arquivos vendáveis via WhatsApp

const ShopPage = (() => {

  const WA_NUMBER = '5531996981103'; // Brazil +55 31 99698-1103

  const KITS = [
    {
      id: 1,
      tag: 'Kit',
      name: 'Kit Starter Web',
      price: 'R$ 29,90',
      desc: 'Estrutura HTML, CSS e JavaScript pronta para quem quer começar um projeto real sem partir do zero. Inclui roteador hash, layout responsivo, exemplos de páginas e comentários explicando cada parte do código.',
      files: '8 arquivos · ZIP · entrega via WhatsApp',
    },
    {
      id: 2,
      tag: 'Kit',
      name: 'Kit Templates UI',
      price: 'R$ 49,90',
      desc: '20 componentes de interface prontos para uso: cards, formulários, tabelas, navbars, grids e modais. Cada um é independente e fácil de adaptar. Copie, cole e ajuste ao seu projeto sem dívidas técnicas.',
      files: '20 templates · ZIP · entrega via WhatsApp',
    },
    {
      id: 3,
      tag: 'Projeto',
      name: 'Projeto Blog Completo',
      price: 'R$ 79,90',
      desc: 'Código-fonte deste blog, completo. Roteador client-side, sistema de posts em Markdown, loja, formulário de contato e páginas legais. Pronto para subir no GitHub Pages ou Netlify sem configuração extra.',
      files: 'Projeto completo · ZIP · entrega via WhatsApp',
    },
    {
      id: 4,
      tag: 'Projeto',
      name: 'Landing Page PRO',
      price: 'R$ 99,90',
      desc: 'Landing page de alto impacto com seção hero, depoimentos, FAQ, formulário e chamada para ação. Design editorial, totalmente responsivo, sem frameworks nem dependências externas.',
      files: 'Projeto completo · ZIP · entrega via WhatsApp',
    },
    {
      id: 5,
      tag: 'Blueprint',
      name: 'Blueprint Frontend',
      price: 'R$ 39,90',
      desc: 'Documento técnico detalhado com a arquitetura de um frontend moderno: organização de pastas, convenções de código, padrões de componente e fluxo de dados. Serve como base para times pequenos ou projetos solo.',
      files: 'PDF · entrega via WhatsApp',
    },
    {
      id: 6,
      tag: 'Roadmap',
      name: 'Roadmap Frontend 2025',
      price: 'R$ 24,90',
      desc: 'Um caminho claro do iniciante ao desenvolvedor frontend empregável. O que aprender, em qual ordem, quais recursos valem o tempo e o que ignorar. Sem enrolação, direto ao ponto.',
      files: 'PDF · entrega via WhatsApp',
    },
    {
      id: 7,
      tag: 'Mentoria',
      name: 'Sessão 1h — Mentoria Frontend',
      price: 'R$ 199,00',
      desc: 'Uma hora focada no que você precisa: revisão de código, dúvidas sobre arquitetura, orientação de carreira ou planejamento de estudos. Acontece pelo WhatsApp ou videochamada, conforme sua preferência.',
      files: 'Agendamento via WhatsApp',
    },
  ];

  const WA_BASE = `https://wa.me/${WA_NUMBER}?text=`;

  function waLink(product) {
    const msg = `Olá! Tenho interesse no *${product.name}* (${product.price}). Pode me passar mais detalhes?`;
    return WA_BASE + encodeURIComponent(msg);
  }

  function render() {
    const app = document.getElementById('app');

    app.innerHTML = `
      <p class="page-title">Kits &amp; Projetos</p>

      <div class="shop-hero">
        <p class="shop-hero-text">
          Vendo PDFs, códigos, blueprints, roadmaps e arquivos ZIP — tudo entregue diretamente pelo WhatsApp.
          Ofereço também sessões de mentoria em frontend para quem quer avançar mais rápido com
          acompanhamento direto. O pagamento é simples: <strong>Pix ou transferência</strong>,
          sem plataformas, sem burocracia.
        </p>
        <a
          class="btn btn-wa"
          href="https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Olá! Quero saber mais sobre os kits e projetos disponíveis.')}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar no WhatsApp
        </a>
      </div>

      <div class="shop-grid">
        ${KITS.map(p => `
          <div class="shop-item">
            <div class="shop-item-header">
              <span class="shop-item-tag">${p.tag}</span>
            </div>
            <div class="shop-item-title">${p.name}</div>
            <p class="shop-item-desc">${p.desc}</p>
            <div class="shop-item-files">${p.files}</div>
            <div class="shop-item-footer">
              <span class="shop-item-price">${p.price}</span>
              <a
                class="btn"
                href="${waLink(p)}"
                target="_blank"
                rel="noopener noreferrer"
              >Quero este &rarr;</a>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="shop-note">
        <p>
          <strong>Como funciona:</strong> Entre em contato pelo WhatsApp, combinamos o pagamento
          via Pix ou transferência e envio os arquivos direto na conversa. Sem cadastro, sem espera,
          sem intermediários.
        </p>
      </div>
    `;
  }

  return { render };
})();