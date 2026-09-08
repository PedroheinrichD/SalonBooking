# CLAUDE.md

Landing page de página única para **Ellen Gardelin** — especialista em alisamentos
orgânicos, tratamentos capilares e cursos profissionais em Itápolis - SP. Site
institucional/marketing com estética editorial e animações dirigidas por scroll.
Idioma do conteúdo: **pt-BR**.

## Stack

| Camada        | Tecnologia                                                    |
| ------------- | ------------------------------------------------------------- |
| Framework     | Next.js 16 (App Router) + React 19                           |
| Linguagem     | TypeScript 5 (`strict: true`), alias `@/*` → raiz do projeto |
| Estilização   | CSS puro global em [app/globals.css](app/globals.css) com custom properties (design tokens). Sem Tailwind, sem CSS Modules, sem CSS-in-JS |
| Fontes        | Self-hosted via `@fontsource` — Fraunces (display/serif) e Manrope (corpo/sans) |
| Animação      | GSAP + ScrollTrigger (scroll-driven), Lenis (smooth scroll)  |
| Lint          | ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript) |
| Deploy        | Vercel (padrão Next.js)                                       |

Sem biblioteca de testes, sem Prettier, sem state manager. Não há backend — CTAs
apontam para WhatsApp (`https://wa.me/5516999620073`).

## Comandos

```bash
npm run dev      # servidor de desenvolvimento (localhost:3000)
npm run build    # build de produção
npm run start    # serve o build
npm run lint     # eslint
```

## Estrutura

```
app/
  layout.tsx        # RootLayout: imports de fontes, globals.css, metadata, <SmoothScrollProvider>
  page.tsx          # Home: monta as seções em ordem
  globals.css       # TODOS os estilos do site (tokens + componentes)
components/          # um componente por seção + utilitários; PascalCase, default export
hooks/              # useInView, useScrollVideo — client hooks com "use client"
lib/data.ts         # conteúdo tipado (results, coursePillars, futureCourses)
public/             # /videos, /images (alguns assets são placeholders ainda inexistentes)
```

Ordem das seções em [app/page.tsx](app/page.tsx): `Header` → `Hero` → `About` →
`Services` → `Results` → `Courses` → `Differentials` → `Contact` → `Footer`.

## Componentes

- **Header** — fixo; ganha classe `header--scrolled` após `scrollY > 80`; menu
  mobile em overlay (`< 900px`), trava o scroll do body quando aberto.
- **Hero** — seção "stage" alta (`340vh`) com `hero-sticky` preso; vídeo
  scrubbed pelo scroll via `useScrollVideo`.
- **Reveal** — wrapper de animação de entrada; renderiza `div` ou `li`
  (`as` prop), `variant` = `up | fade | scale`, `delay` em ms. Usa `useInView`.
- **FallbackImage** — `<img>` cru (não `next/image`) porque fotos de
  clientes/curso ainda são placeholders; degrada para bloco com label no
  `onError`. Trocar por foto real = só dropar o arquivo em `/public`.
- **SmoothScrollProvider** — inicializa Lenis + integra com o ticker do GSAP;
  no-op quando `prefers-reduced-motion: reduce`.
- **About / Services / Results / Courses / Differentials / Contact / Footer** —
  seções de conteúdo, majoritariamente estáticas (Server Components).

## Estilização — regras

- Todo estilo vive em [app/globals.css](app/globals.css), organizado por seções
  com cabeçalhos `/* === */`. **Não** criar arquivos `.css` por componente.
- Cores, tipografia, espaçamento, motion e radius são **design tokens**
  (`--c-*`, `--f-*`, `--fs-*`, `--space-*`, `--ease-editorial`, `--dur-*`,
  `--radius-sm`). Usar os tokens; não hard-codar valores.
- Paleta: tons quentes de bege/marrom sobre off-white (`--c-bone`). Ouro
  (`--c-gold`) só como acento, com parcimônia.
- Type scale é fluida (`clamp()`). Classes utilitárias existentes:
  `.container`, `.section`, `.section-head`, `.eyebrow`, `.lead`, `.body-copy`,
  `.btn` (+ `.btn-primary`, `.btn-ghost`, `.btn-on-dark`), `.link-underline`,
  `.reveal*`.
- Mobile-first: media queries são `min-width` (breakpoints usados: 560, 620,
  700, 760, 860, 900, 960, 1080px).
- Classes em kebab-case, com prefixo da seção (`.hero-*`, `.service-*`,
  `.courses-*`). Estado via classe modificadora (`.is-open`, `.is-in-view`,
  `.header--scrolled`).

## Convenções

- Componentes: PascalCase, `export default`, um por arquivo. Só adicionar
  `"use client"` quando o componente/hook usa estado, efeitos ou APIs do
  browser — preferir Server Components.
- Imports internos via alias `@/` (ex.: `@/components/Hero`,
  `@/hooks/useInView`).
- **Acessibilidade**: respeitar `prefers-reduced-motion` em qualquer animação
  nova (padrão já seguido em `useInView`, `useScrollVideo`,
  `SmoothScrollProvider` e no CSS). `aria-label`/`aria-expanded`/`aria-hidden`
  em controles interativos. `:focus-visible` já tem estilo global.
- Links externos: `target="_blank"` + `rel="noopener noreferrer"`.
- Conteúdo tipado fica em [lib/data.ts](lib/data.ts) com `interface` exportada.
- **Não inventar depoimentos, nomes de clientes ou dados** — os itens em
  `lib/data.ts` são placeholders e devem ser substituídos por dados reais.
- Escrever comentários apenas quando explicam um "porquê" não óbvio (ver o
  comentário em `FallbackImage` e `useScrollVideo` como referência de tom).

## Assets

- Vídeo do Hero: `/public/videos/ellen-cabelo.mp4`, re-encodado com GOP curto
  (keyframe a cada ~4 frames) para o scrubbing por scroll cair no frame exato.
- Fotos de clientes/curso em `/public/images/...` — várias ainda não existem;
  `FallbackImage` cobre a ausência em runtime.
