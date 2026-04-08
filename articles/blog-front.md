# Criando um Blog Totalmente Front-end com JavaScript, Marked.js e GitHub Pages

Este artigo descreve a construção de um blog estático, leve e funcional usando apenas tecnologias front-end: JavaScript puro para a lógica de navegação, Marked.js para renderização de Markdown no navegador, e GitHub Pages para hospedagem gratuita.

A proposta é intencional: sem geradores de site estático, sem build steps, sem dependências de servidor. O conteúdo vive em arquivos `.md`, e o navegador faz todo o trabalho.

---

## Estrutura do Projeto

```
.
├── index.html
├── articles/
│   ├── post-01.md
│   └── post-02.md
├── js/
│   └── app.js
└── css/
    ├── styles.css
    └── markdown.css
```

- `index.html` é o único ponto de entrada. Carrega os estilos, o Marked.js via CDN e o `app.js`.
- `articles/` armazena os posts como arquivos Markdown individuais. Adicionar um novo post é tão simples quanto criar um novo `.md`.
- `js/app.js` é o núcleo da aplicação: busca os arquivos, renderiza o conteúdo e controla a navegação.
- `css/styles.css` define o layout geral. `css/markdown.css` cuida da tipografia e aparência do conteúdo renderizado.

---

## O `index.html`

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meu Blog</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/markdown.css">
</head>
<body>
  <header>
    <h1>Meu Blog</h1>
    <nav>
      <a href="#home">Home</a>
      <a href="#about">Sobre</a>
    </nav>
  </header>

  <main id="content"></main>

  <footer>
    <p>&copy; 2024 Meu Blog</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```

O Marked.js é carregado via CDN do jsDelivr. O elemento `<main id="content">` é onde todo o conteúdo dos posts será injetado dinamicamente.

---

## A Lógica em `app.js`

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const contentDiv = document.getElementById('content');

  async function loadMarkdown(filename) {
    try {
      const response = await fetch(`articles/${filename}`);

      if (!response.ok) {
        throw new Error(`Arquivo não encontrado: ${filename}`);
      }

      const text = await response.text();
      contentDiv.innerHTML = marked.parse(text);
      contentDiv.className = 'markdown-body';
    } catch (error) {
      contentDiv.innerHTML = '<p>Erro ao carregar o conteúdo.</p>';
      console.error(error);
    }
  }

  function handleNavigation() {
    const hash = window.location.hash.replace('#', '');

    if (!hash || hash === 'home') {
      loadMarkdown('post-01.md');
    } else if (hash === 'about') {
      contentDiv.innerHTML = '<h2>Sobre</h2><p>Um blog estático feito com JavaScript e Marked.js.</p>';
    } else if (hash.startsWith('post/')) {
      const slug = hash.split('/')[1];
      loadMarkdown(`${slug}.md`);
    } else {
      contentDiv.innerHTML = '<h2>Página não encontrada</h2>';
    }
  }

  window.addEventListener('hashchange', handleNavigation);
  handleNavigation();
});
```

A navegação é baseada na hash da URL (`window.location.hash`). Isso permite que diferentes posts sejam carregados sem recarregar a página. O `fetch` busca o arquivo `.md` correspondente de forma assíncrona, e `marked.parse()` converte o Markdown em HTML antes de injetá-lo no DOM.

Para criar um link para um post específico no HTML, basta usar:

```html
<a href="#post/post-02">Ler segundo post</a>
```

---

## Criando Posts

Cada post é um arquivo `.md` dentro de `articles/`. Exemplo de `articles/post-01.md`:

```markdown
# Título do Post

Introdução do post em **Markdown** simples.

## Uma Seção

Conteúdo com listas, links, blocos de código — tudo funciona.

```javascript
function hello(name) {
  return `Olá, ${name}!`;
}
```

Para publicar um novo artigo, basta criar o arquivo e linkar para ele via hash.
```

---

## Deploy com GitHub Pages

1. Crie um repositório público no GitHub (por exemplo, `meu-blog`).

2. No diretório do projeto, inicialize o repositório e faça o primeiro commit:

```bash
git init
git add .
git commit -m "estrutura inicial do blog"
git remote add origin https://github.com/SEU_USUARIO/meu-blog.git
git push -u origin main
```

3. No repositório do GitHub, vá em **Settings > Pages**, selecione o branch `main` como fonte e salve.

Após alguns minutos, o blog estará disponível em `https://SEU_USUARIO.github.io/meu-blog/`. Qualquer push para o branch configurado atualiza o site automaticamente.

---

## Considerações Finais

Essa abordagem funciona bem para blogs pessoais, portfólios e documentações simples. As limitações são claras: não há busca server-side, sem geração de feeds RSS automáticos, e o navegador precisa de acesso à rede para buscar cada `.md` via `fetch`.

Para escalar além disso, vale considerar ferramentas como Eleventy ou Astro, que pre-renderizam o HTML em build time. Mas para o caso de uso proposto aqui, a solução é suficiente, direta e sem overhead.