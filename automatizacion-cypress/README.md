<a id="top"></a>
**English** | [Español](#espanol)

<a id="english"></a>
# 🤖 E2E Automation — crivo.com.ar (Cypress)

**End-to-end (E2E)** test suite for the [crivo.com.ar](https://crivo.com.ar) website, developed as a complement to the manual QA assessment. It automates the **desktop** subset of cases with **Cypress** and the **Page Object Model (POM)** pattern.

> Part of the [QA Assessment — Crivo S.R.L.](../README.md) project.

---

## 📦 Stack

| Tool | Version |
|---|---|
| Cypress | ^13.17.0 |
| Design pattern | Page Object Model (POM) |
| Node.js | 18+ recommended |

---

## 🚀 Install & run

```bash
# From the automatizacion-cypress/ folder
npm install

npm run cy:open        # Interactive mode (Cypress App)
npm run cy:run         # Headless mode (terminal / CI)
npm run cy:run:headed  # Headless with a visible browser
```

The site's base URL is configured in [`cypress.config.js`](cypress.config.js).

---

## 🗂️ Structure

```
automatizacion-cypress/
├── README.md              # This guide
├── TEST_PLAN.md           # Spec ↔ manual Test Plan case mapping
├── cypress.config.js      # Cypress configuration (baseUrl, etc.)
├── package.json
└── cypress/
    ├── e2e/               # Spec files (.cy.js) — one per module
    ├── pages/             # Page Objects (POM) — selectors and actions
    ├── fixtures/          # Test data (.json)
    └── support/           # Custom commands, endpoints and configuration
```

---

## 📋 Coverage (36 automated cases)

> Desktop **only**. The mobile view remains manual testing (see [`TEST_PLAN.md`](TEST_PLAN.md)).

| Spec | Covers | Cases |
|---|---|---|
| `contact.cy.js` | Contact form — happy path, validations, honeypot and `<select>` integrity | 11 |
| `footer.cy.js` | Newsletter (Mailchimp) + integrations (WhatsApp, IG/LinkedIn, mailto) | 7 |
| `navigation.cy.js` | Navbar — tabs, logo and products dropdown | 5 |
| `home.cy.js` | Home sections — "View all products" and supplies | 2 |
| `products.cy.js` | Categories, cards and product detail page | 4 |
| `seo.cy.js` | Metadata — `<title>`, `<h1>` and `<meta description>` per endpoint | 4 |
| `security.cy.js` | Server error exposure on `/productos` and `/enviar_news` | 2 |
| `health.cy.js` | Availability (HTTP 200) of public endpoints | 1 |
| **TOTAL** | | **36** |

---

## 🧱 Conventions

- **One Page Object per page/section**, exported as a singleton instance. Selectors live in a `SELECTORS` const at the top of each POM, never inline.
- **Methods named after actions** (`fillForm`, `selectProductType`, `submit`); assertion methods are prefixed with `assert` (`assertSubmissionSuccess`).
- **Traceability**: every `it()` references its catalogue case number (`TC N — …`).
- **Exact data**: when comparing against a source of truth (e.g. the products `<select>`), assert presence **and** exact count.

### `[BUG]` tests

Cases that document a **known defect** carry the `[BUG]` prefix in their name and **assert the defective behaviour**:

- ✅ A `[BUG]` test that **passes** → the bug is still present on the site.
- ❌ A `[BUG]` test that **fails** → the bug was fixed; the test must be updated to the correct behaviour.

---

## 📑 References

- [`TEST_PLAN.md`](TEST_PLAN.md) — full mapping of specs to manual cases and bug reports.
- [Main project README](../README.md) — full QA assessment, bugs and improvement proposals.

---
---

[English](#english) | **Español**

<a id="espanol"></a>
# 🤖 Automatización E2E — crivo.com.ar (Cypress)

Suite de pruebas **end-to-end (E2E)** del sitio [crivo.com.ar](https://crivo.com.ar), desarrollada como complemento al relevamiento QA manual. Automatiza el subconjunto de casos de **escritorio** con **Cypress** y el patrón **Page Object Model (POM)**.

> Forma parte del proyecto [Relevamiento QA — Crivo S.R.L.](../README.md).

---

## 📦 Stack

| Herramienta | Versión |
|---|---|
| Cypress | ^13.17.0 |
| Patrón de diseño | Page Object Model (POM) |
| Node.js | 18+ recomendado |

---

## 🚀 Instalación y ejecución

```bash
# Desde la carpeta automatizacion-cypress/
npm install

npm run cy:open        # Modo interactivo (Cypress App)
npm run cy:run         # Modo headless (terminal / CI)
npm run cy:run:headed  # Headless con navegador visible
```

La URL base del sitio se configura en [`cypress.config.js`](cypress.config.js).

---

## 🗂️ Estructura

```
automatizacion-cypress/
├── README.md              # Esta guía
├── TEST_PLAN.md           # Mapeo de specs ↔ casos manuales del Test Plan
├── cypress.config.js      # Configuración de Cypress (baseUrl, etc.)
├── package.json
└── cypress/
    ├── e2e/               # Spec files (.cy.js) — uno por módulo
    ├── pages/             # Page Objects (POM) — selectores y acciones
    ├── fixtures/          # Datos de prueba (.json)
    └── support/           # Comandos custom, endpoints y configuración
```

---

## 📋 Cobertura (36 casos automatizados)

> Solo **escritorio**. La vista mobile queda como prueba manual (ver [`TEST_PLAN.md`](TEST_PLAN.md)).

| Spec | Cubre | Casos |
|---|---|---|
| `contact.cy.js` | Formulario de contacto — happy path, validaciones, honeypot e integridad del `<select>` | 11 |
| `footer.cy.js` | Newsletter (Mailchimp) + integraciones (WhatsApp, IG/LinkedIn, mailto) | 7 |
| `navigation.cy.js` | Navbar — tabs, logo y dropdown de productos | 5 |
| `home.cy.js` | Secciones del home — "Ver todos los productos" e insumos | 2 |
| `products.cy.js` | Categorías, cards y página de detalle de producto | 4 |
| `seo.cy.js` | Metadata — `<title>`, `<h1>` y `<meta description>` por endpoint | 4 |
| `security.cy.js` | Exposición de errores del servidor en `/productos` y `/enviar_news` | 2 |
| `health.cy.js` | Disponibilidad (HTTP 200) de los endpoints públicos | 1 |
| **TOTAL** | | **36** |

---

## 🧱 Convenciones

- **Un Page Object por página/sección**, exportado como instancia singleton. Los selectores viven en una constante `SELECTORS` al inicio de cada POM, nunca inline.
- **Métodos nombrados por acción** (`fillForm`, `selectProductType`, `submit`); los de aserción llevan prefijo `assert` (`assertSubmissionSuccess`).
- **Trazabilidad**: cada `it()` referencia su número de caso del catálogo (`TC N — …`).
- **Datos exactos**: al comparar contra una fuente de verdad (p. ej. el `<select>` de productos) se afirma presencia **y** cantidad exacta.

### Tests `[BUG]`

Los casos que documentan un **defecto conocido** llevan el prefijo `[BUG]` en su nombre y **afirman el comportamiento defectuoso**:

- ✅ Un test `[BUG]` que **pasa** → el bug sigue presente en el sitio.
- ❌ Un test `[BUG]` que **falla** → el bug fue corregido; hay que actualizar el test al comportamiento correcto.

---

## 📑 Referencias

- [`TEST_PLAN.md`](TEST_PLAN.md) — mapeo completo de specs a casos manuales y bug reports.
- [README principal del proyecto](../README.md) — relevamiento QA completo, bugs y propuestas de mejora.