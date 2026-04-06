// pages/legal.js — Política de Privacidade, Cookies e Termos de Uso

const LegalPage = (() => {

  const SECTIONS = {
    privacidade: {
      title: 'Política de Privacidade',
      content: `
        <h2>Política de Privacidade</h2>
        <p><em>Última atualização: abril de 2026</em></p>

        <h3>1. Quem somos</h3>
        <p>Este blog é operado por [Seu Nome / Empresa]. Nosso site está disponível em <strong>[seusite.com.br]</strong>. Caso tenha dúvidas sobre esta política, entre em contato pelo formulário de <a href="#/contact">contato</a>.</p>

        <h3>2. Quais dados coletamos</h3>
        <p>Coletamos apenas os dados estritamente necessários:</p>
        <ul>
          <li><strong>Dados fornecidos voluntariamente:</strong> nome e e-mail enviados pelo formulário de contato.</li>
          <li><strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas visitadas e tempo de permanência, coletados via ferramentas de análise (ex: Google Analytics), caso habilitadas.</li>
          <li><strong>Cookies:</strong> conforme descrito na nossa Política de Cookies.</li>
        </ul>

        <h3>3. Para que usamos seus dados</h3>
        <ul>
          <li>Responder mensagens enviadas pelo formulário de contato.</li>
          <li>Analisar o tráfego do site para melhorar o conteúdo.</li>
          <li>Cumprir obrigações legais quando necessário.</li>
        </ul>

        <h3>4. Base legal (LGPD)</h3>
        <p>O tratamento dos seus dados se baseia no <strong>legítimo interesse</strong> (análise de tráfego) e no <strong>consentimento</strong> (formulário de contato e cookies não essenciais), conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>

        <h3>5. Compartilhamento de dados</h3>
        <p>Não vendemos nem compartilhamos seus dados com terceiros, exceto:</p>
        <ul>
          <li>Provedores de serviço essenciais (ex: hospedagem, analytics), sob contrato de confidencialidade.</li>
          <li>Quando exigido por lei ou ordem judicial.</li>
        </ul>

        <h3>6. Retenção</h3>
        <p>Dados de contato são mantidos pelo tempo necessário para responder sua solicitação. Dados de navegação são retidos conforme a política do serviço de analytics utilizado.</p>

        <h3>7. Seus direitos</h3>
        <p>Nos termos da LGPD, você tem direito a:</p>
        <ul>
          <li>Confirmar se tratamos seus dados.</li>
          <li>Acessar, corrigir ou excluir seus dados.</li>
          <li>Revogar o consentimento a qualquer momento.</li>
          <li>Solicitar a portabilidade dos dados.</li>
        </ul>
        <p>Para exercer qualquer direito, use o <a href="#/contact">formulário de contato</a>.</p>

        <h3>8. Segurança</h3>
        <p>Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração ou destruição.</p>

        <h3>9. Alterações nesta política</h3>
        <p>Podemos atualizar esta política periodicamente. A data de "última atualização" no topo indica quando ocorreu a última revisão.</p>
      `
    },

    cookies: {
      title: 'Política de Cookies',
      content: `
        <h2>Política de Cookies</h2>
        <p><em>Última atualização: abril de 2026</em></p>

        <h3>O que são cookies</h3>
        <p>Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles permitem que o site reconheça seu navegador em visitas futuras e lembre preferências.</p>

        <h3>Tipos de cookies que usamos</h3>

        <table>
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Finalidade</th>
              <th>Duração</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Essenciais</strong></td>
              <td>Funcionamento básico do site (ex: preferências de navegação).</td>
              <td>Sessão</td>
            </tr>
            <tr>
              <td><strong>Analytics</strong></td>
              <td>Análise de tráfego anônima (ex: Google Analytics).</td>
              <td>Até 2 anos</td>
            </tr>
            <tr>
              <td><strong>Preferências</strong></td>
              <td>Lembrar configurações do usuário.</td>
              <td>1 ano</td>
            </tr>
          </tbody>
        </table>

        <h3>Cookies de terceiros</h3>
        <p>Caso este site utilize serviços externos (Google Analytics, fontes via CDN etc.), esses serviços podem depositar cookies próprios, regidos pelas políticas de privacidade de cada provedor.</p>

        <h3>Como gerenciar cookies</h3>
        <p>Você pode controlar e/ou excluir cookies a qualquer momento pelas configurações do seu navegador:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/pt-BR/kb/cookies-informacoes-armazenadas" target="_blank" rel="noopener">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/pt-br/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
          <li><a href="https://support.microsoft.com/pt-br/microsoft-edge/excluir-cookies-no-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Microsoft Edge</a></li>
        </ul>
        <p>Bloquear cookies essenciais pode impactar o funcionamento do site.</p>

        <h3>Consentimento</h3>
        <p>Ao continuar navegando neste site, você concorda com o uso de cookies conforme descrito nesta política.</p>
      `
    },

    termos: {
      title: 'Termos de Uso',
      content: `
        <h2>Termos de Uso</h2>
        <p><em>Última atualização: abril de 2026</em></p>

        <h3>1. Aceitação dos termos</h3>
        <p>Ao acessar e utilizar este site, você concorda com os presentes Termos de Uso. Se não concordar com qualquer parte, por favor, não utilize o site.</p>

        <h3>2. Uso permitido</h3>
        <p>Este site destina-se a uso pessoal e informativo. É proibido:</p>
        <ul>
          <li>Reproduzir, distribuir ou modificar o conteúdo sem autorização prévia por escrito.</li>
          <li>Utilizar o site para fins ilegais ou que violem direitos de terceiros.</li>
          <li>Tentar obter acesso não autorizado a sistemas ou dados do site.</li>
          <li>Publicar ou transmitir conteúdo ofensivo, difamatório ou que viole a legislação vigente.</li>
        </ul>

        <h3>3. Propriedade intelectual</h3>
        <p>Todo o conteúdo publicado neste blog — textos, imagens, código e design — é de propriedade de [Seu Nome / Empresa] e protegido por direitos autorais, salvo indicação contrária. Citações e compartilhamentos são permitidos desde que atribuídos à fonte original com link.</p>

        <h3>4. Isenção de responsabilidade</h3>
        <p>O conteúdo deste blog é fornecido apenas para fins informativos. Não nos responsabilizamos por:</p>
        <ul>
          <li>Decisões tomadas com base nas informações publicadas.</li>
          <li>Conteúdo de sites externos vinculados por links.</li>
          <li>Eventuais imprecisões ou desatualizações nos artigos.</li>
        </ul>

        <h3>5. Links externos</h3>
        <p>Este site pode conter links para sites de terceiros. Esses links são fornecidos apenas por conveniência e não implicam endosso ou responsabilidade sobre o conteúdo externo.</p>

        <h3>6. Disponibilidade do serviço</h3>
        <p>Não garantimos disponibilidade ininterrupta do site. Podemos suspender, modificar ou encerrar o serviço a qualquer momento sem aviso prévio.</p>

        <h3>7. Lei aplicável</h3>
        <p>Estes termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de [Sua Cidade / Estado] para dirimir eventuais conflitos.</p>

        <h3>8. Alterações nos termos</h3>
        <p>Reservamo-nos o direito de alterar estes termos a qualquer momento. O uso continuado do site após as alterações implica aceitação dos novos termos.</p>

        <h3>9. Contato</h3>
        <p>Dúvidas sobre estes termos? Entre em contato pelo nosso <a href="#/contact">formulário de contato</a>.</p>
      `
    }
  };

  function render(subsection) {
    const app = document.getElementById('app');
    const active = subsection && SECTIONS[subsection] ? subsection : 'privacidade';

    app.innerHTML = `
      <p class="page-title">Legal</p>

      <nav class="legal-tabs" role="tablist">
        ${Object.entries(SECTIONS).map(([key, s]) => `
          <button
            class="legal-tab ${key === active ? 'active' : ''}"
            data-section="${key}"
            role="tab"
            aria-selected="${key === active}"
          >${s.title}</button>
        `).join('')}
      </nav>

      <div class="md-body legal-content" id="legal-content">
        ${SECTIONS[active].content}
      </div>
    `;

    app.querySelectorAll('.legal-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        Router.navigate(`/legal/${btn.dataset.section}`);
      });
    });
  }

  return { render };
})();