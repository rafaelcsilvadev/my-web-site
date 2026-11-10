# Site vitrine · Rafael Couto Silva

Projeto estático simples: HTML, CSS e um arquivo de JavaScript. Sem build, sem dependências.

## Estrutura

```
index.html                      Home
caso-avaria.html                Caso Avaria
caso-my-trello-version.html     Caso My Trello Version
caso-este-site.html             Caso Este site
css/style.css                   Todos os estilos (e as fontes locais)
js/menu.js                      Menu mobile (aria-expanded, Esc fecha)
assets/img/                     Retrato e captura do quadro
assets/fonts/                   Manrope e JetBrains Mono (woff2)
favicon.svg, favicon.ico, favicon-32.png, apple-touch-icon.png
og-image.png                    Imagem de preview, 1200x630
```

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta:

```
npx serve .
# ou
python3 -m http.server 8080
```

## Antes de publicar

1. Coloque o currículo em `assets/cv.pdf`. Os botões "Baixar CV" já apontam para esse arquivo.
2. Troque `SEU-DOMINIO` pelo endereço real nas tags `og:url` e `og:image` das quatro páginas (o preview em redes sociais exige URL absoluta).
3. Confira os períodos da Mobs2 e da DUO Technology na Home.
4. Confira os números marcados com `[conferir ...]` (Método, My Trello Version e Este site) e remova os avisos.
5. Os estilos dos blocos vieram do design como `style=""` nos elementos. Se quiser, mova para classes no `css/style.css`.

## Hospedagem

Qualquer hospedagem estática serve: Netlify, Vercel, Cloudflare Pages, GitHub Pages. Publique a pasta inteira.
