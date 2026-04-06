// main.js — inicializa o roteador e mapeia as rotas

Router.define('/',                  () => HomePage.render());
Router.define('/shop',              () => ShopPage.render());
Router.define('/contact',           () => ContactPage.render());
Router.define('/legal',             () => LegalPage.render('privacidade'));
Router.define('/legal/privacidade', () => LegalPage.render('privacidade'));
Router.define('/legal/cookies',     () => LegalPage.render('cookies'));
Router.define('/legal/termos',      () => LegalPage.render('termos'));

Router.init();