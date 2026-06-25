<a id="top"></a>
**English** | [Español](#espanol)

<a id="english"></a>
# 🔍 QA Assessment — Crivo S.R.L.

Independent quality assessment of the [crivo.com.ar](https://crivo.com.ar) website, carried out as an external QA Engineer. The goal was to provide a diagnosis of the site's current state, documenting bugs, proposing improvements, and delivering concrete evidence to the development team and the client.

<p align="center">
  <a href="https://damian-palla.github.io/relevamiento-web-www.crivo.com.ar/index.html">
    <img src="https://img.shields.io/badge/📊_View_the_live_test_report-2ea44f?style=for-the-badge&logo=cypress&logoColor=white" alt="View the live test report (Mochawesome)">
  </a>
</p>

---

## 📌 Project information

| Field | Detail |
|---|---|
| **Client** | Crivo S.R.L. |
| **Site under test** | [https://crivo.com.ar](https://crivo.com.ar) |
| **Test type** | Manual — Black box |
| **Environment** | Production |
| **Delivery date** | April 2026 |

---

## 👤 Author

**Damián Palla** — QA Engineer  
[LinkedIn](https://www.linkedin.com/in/damianpalla/) · [GitHub](https://github.com/damian-palla)

---

## 🎯 Assessment scope

The assessment covered the following areas:

- **Functionality** — Navigation, forms, integrations and general behaviour
- **UX / UI** — User experience, visual consistency and improvement proposals
- **Responsiveness** — Site behaviour on mobile devices
- **SEO / Metadata** — HTML structure, `<title>`, `<meta>` and `canonical` tags

---

## 🛠️ Test environment

| Environment | Detail |
|---|---|
| **Desktop** | Google Chrome v146.0.7680.178 |
| **Mobile (emulated)** | Chrome DevTools — iPhone 14 Pro Max viewport (430 × 932) |
| **Mobile (real)** | Samsung S22 Ultra — viewport 360 × 772 |
| **Test data** | Fictitious data generated for forms |

---

## 📋 Test Plan

The Test Plan consists of **46 test cases** across 7 modules, covering all the areas in the defined scope.

🔗 [View full Test Plan (Google Sheets)](https://docs.google.com/spreadsheets/d/1owTKM8zT8wdjxl7C9UYXNLAQKs_gSjwe/edit?usp=drive_link&ouid=116250769003121408033&rtpof=true&sd=true)

### Execution summary by module

| Module | Test cases | ✅ Passed | ❌ Failed | % Passed |
|---|---|---|---|---|
| NAV — Navigation | 10 | 9 | 1 | 90% |
| FORM — Forms | 7 | 5 | 2 | 71% |
| UI — Content & UI | 10 | 10 | 0 | 100% |
| PROD — Product pages | 4 | 4 | 0 | 100% |
| RESP — Responsive | 6 | 3 | 3 | 50% |
| SEO — Metadata | 5 | 2 | 3 | 40% |
| INT — Integrations | 4 | 4 | 0 | 100% |
| **TOTAL** | **46** | **37** | **9** | **~79%** |

---

## 🤖 Test automation (Cypress)

As a complement to the manual assessment, a subset of **end-to-end (E2E)** cases was automated with **Cypress**, applying the **Page Object Model (POM)** pattern to keep selectors and actions decoupled from the tests.

### How to run the suite

```bash
cd automatizacion-cypress
npm install
npm run cy:open     # Interactive mode (Cypress App)
npm run cy:run      # Headless mode (terminal / CI)
```

> Detailed suite documentation (structure, conventions and spec ↔ manual case mapping) in [`automatizacion-cypress/README.md`](automatizacion-cypress/README.md).

<p align="center">
  <a href="https://damian-palla.github.io/relevamiento-web-www.crivo.com.ar/index.html">
    <img src="https://img.shields.io/badge/📊_View_the_live_test_report-2ea44f?style=for-the-badge&logo=cypress&logoColor=white" alt="View the live test report (Mochawesome)">
  </a>
</p>

| Field | Detail |
|---|---|
| **Framework** | Cypress 13.17 |
| **Pattern** | Page Object Model (POM) |
| **Type** | E2E — Black box on production |
| **Scope** | Desktop (the mobile view remains manual testing) |
| **Automated cases** | **36** across **8 spec files** |

### Cases per spec

| Spec | Covers | Cases |
|---|---|---|
| `contact.cy.js` | Contact form — happy path, validations, honeypot and `<select>` integrity | 11 |
| `footer.cy.js` | Newsletter (Mailchimp) + integrations (WhatsApp, IG/LinkedIn, mailto) | 7 |
| `navigation.cy.js` | Navbar — tabs, logo and products dropdown (desktop) | 5 |
| `home.cy.js` | Home sections — "View all products" and supplies | 2 |
| `products.cy.js` | Categories, cards and product detail page | 4 |
| `seo.cy.js` | Metadata — `<title>`, `<h1>` and `<meta description>` per endpoint | 4 |
| `security.cy.js` | Server error exposure on `/productos` and `/enviar_news` | 2 |
| `health.cy.js` | Availability (HTTP 200) of public endpoints | 1 |
| **TOTAL** | | **36** |

### `[BUG]` tests

Some cases document **known bugs** and carry the `[BUG]` prefix in their name. These tests **assert the defective behaviour**, so they **pass while the bug is still alive**. The day a `[BUG]` test **fails**, it means the bug was fixed and the test must be updated to the correct behaviour.

---

## 🐛 Bugs found

A total of **14 bugs** were identified, classified by severity.

| Severity | Count |
|---|---|
| 🔴 High | 4 |
| 🟡 Medium | 6 |
| 🟢 Low | 4 |
| **Total** | **14** |

### Bug detail

| Bug ID | Module | Title | Severity |
|---|---|---|---|
| BUG-001 | NAV | Products dropdown menu flickers on hover | 🔴 High |
| BUG-002 | FORM | Newsletter section not visible when the user has an ad-blocker enabled | 🔴 High |
| BUG-003 | NAV | Footer "Productos" link redirects to an endpoint with an error and exposes sensitive server information | 🔴 High |
| BUG-009 | NAV | Endpoint commented out in HTML exposes sensitive server information | 🔴 High |
| BUG-004 | RESP | (Mobile) Misaligned footer element causing unwanted horizontal scroll | 🟡 Medium |
| BUG-005 | SEO | Identical `<title>` across all site endpoints/pages | 🟡 Medium |
| BUG-006 | PROD | "Usos recomendados" field displayed as a column on several product endpoints | 🟡 Medium |
| BUG-007 | FORM | Quote form submits successfully with an empty "Tipo de producto" field | 🟡 Medium |
| BUG-008 | FORM | Quote form submits successfully with an empty "Comentarios" field | 🟡 Medium |
| BUG-014 | FORM | Generic error message when entering an invalid email in the Contact form | 🟡 Medium |
| BUG-010 | SEO | `<title>` contains an incorrect accent in the word "gráficos" | 🟢 Low |
| BUG-011 | PROD | Product name "Lona Backlight 15 oz" doesn't match the ounces listed in Características (13 oz) | 🟢 Low |
| BUG-012 | PROD | Name on the "Bicapa" card differs from the name on the product detail | 🟢 Low |
| BUG-013 | PROD | Name on the "Prensa" card differs from the name on the product detail | 🟢 Low |

> The complete bug reports — with steps to reproduce, expected result, actual result and evidence (screenshots and videos) — are in the documentation repository.

---

## 💡 Improvement proposals

Beyond the bugs, improvement opportunities were identified in the following areas:

### "Contact" section
- Automatically send a WhatsApp message to the client upon completing the quote form (with personalized variables or a generic message)
- Make the "Tipo de producto" field required to improve service personalization and gather inquiry metrics
- Auto-fill the "Tipo de producto" field when the form is opened from a product detail page

### "Newsletter" section
- Replace the subscription confirmation message with a more visible pop-up to reduce process abandonment

### "Home" section
- Align product images and buttons in the "Nuestros insumos" section

### "Products" section
- Add background images to the product cards
- Align "Ver producto" buttons across all cards
- Add a delay of at least 1 second when closing the products dropdown menu
- Fix the "Usos recomendados" field format so it spans the full table width
- Implement a lightbox to view product images enlarged
- Add "Vinilos Graphitac" as an independent category in the nav-menu

### Mobile view
- Increase the size and reposition the image navigation arrows on the product detail
- Enable zoom on mobile (`user-scalable=yes` or equivalent for Safari)

### SEO
- Define a unique, descriptive `<title>` for each endpoint/page
- Add keywords to the `<h1>` elements of each page
- Fix the `canonical` tag so each endpoint points to itself and not to the home
- Customize the `<meta name="description">` for each product or section

---

## 📁 Project documentation

| Resource | Link |
|---|---|
| 📊 Test Plan & Bug Reports | [Google Drive](https://drive.google.com/drive/folders/108cniT7KjhTTbCE8S2aFljwguexl_8oB?usp=drive_link) |
| 🎨 UX/UI proposals | [Figma](https://www.figma.com/board/X1dLCJ6DTrBBwILGjPU7RT/FigJam-Basics?node-id=0-1&p=f&t=CiRG2TcZdlKFnPSV-0) |
| 📹 Bug evidence | Folder attached in Drive (screenshots and videos per bug) |

---

## 🗂️ Repository structure

```
📦 relevamiento-web-www.crivo.com.ar/
├── 📄 README.md
├── 📄 Crivo S.R.L - Relevamiento.docx.pdf   # Final assessment report
├── 📊 Presentacion_Crivo.pptx               # Assessment presentation
└── 📁 automatizacion-cypress/               # E2E automation suite (Cypress)
    ├── 📄 README.md                         # Suite guide (install & run)
    ├── 📄 TEST_PLAN.md                      # Spec ↔ manual case mapping
    ├── 📄 cypress.config.js
    └── 📁 cypress/
        ├── 📁 e2e/                          # Spec files (.cy.js)
        ├── 📁 pages/                        # Page Objects (POM)
        ├── 📁 fixtures/                     # Test data (.json)
        └── 📁 support/                      # Commands & configuration
```

---

## ⚙️ Methodology

- Tests were executed **manually** in a **production** environment, with no prior involvement in the site's development.
- Test cases follow a structured naming convention: `TC-[MODULE]-[NRO]` (e.g. `TC-NAV-001`).
- Bugs are linked to their related test cases and classified by severity: **High**, **Medium** and **Low**.
- Each bug includes: description, steps to reproduce, expected result, actual result and visual evidence.
- UX/UI improvement proposals were complemented with mockups in Figma.

---
---

[English](#english) | **Español**





<a id="espanol"></a>
# 🔍 Relevamiento QA — Crivo S.R.L.

Relevamiento independiente de calidad sobre el sitio web [crivo.com.ar](https://crivo.com.ar), realizado en el rol de QA Engineer externo. El objetivo fue brindar un diagnóstico del estado actual del sitio, documentando bugs, proponiendo mejoras y entregando evidencia concreta al equipo de desarrollo y al cliente.

<p align="center">
  <a href="https://damian-palla.github.io/relevamiento-web-www.crivo.com.ar/index.html">
    <img src="https://img.shields.io/badge/📊_Ver_el_reporte_de_pruebas_en_vivo-2ea44f?style=for-the-badge&logo=cypress&logoColor=white" alt="Ver el reporte de pruebas en vivo (Mochawesome)">
  </a>
</p>

---

## 📌 Información del proyecto

| Campo | Detalle |
|---|---|
| **Cliente** | Crivo S.R.L. |
| **Sitio bajo prueba** | [https://crivo.com.ar](https://crivo.com.ar) |
| **Tipo de pruebas** | Manuales — Caja negra |
| **Entorno** | Producción |
| **Fecha de entrega** | Abril 2026 |

---

## 👤 Autor

**Damián Palla** — QA Engineer  
[LinkedIn](https://www.linkedin.com/in/damianpalla/) · [GitHub](https://github.com/damian-palla)

---

## 🎯 Alcance del relevamiento

El relevamiento abarcó las siguientes áreas:

- **Funcionalidad** — Navegación, formularios, integraciones y comportamiento general
- **UX / UI** — Experiencia de usuario, consistencia visual y propuestas de mejora
- **Responsividad** — Comportamiento del sitio en dispositivos móviles
- **SEO / Metadata** — Estructura de HTML, etiquetas `<title>`, `<meta>` y `canonical`

---

## 🛠️ Entorno de pruebas

| Entorno | Detalle |
|---|---|
| **Desktop** | Google Chrome v146.0.7680.178 |
| **Mobile (emulado)** | Chrome DevTools — viewport iPhone 14 Pro Max (430 × 932) |
| **Mobile (real)** | Samsung S22 Ultra — viewport 360 × 772 |
| **Datos de prueba** | Datos ficticios generados para formularios |

---

## 📋 Test Plan

El Test Plan está compuesto por **46 casos de prueba** distribuidos en 7 módulos, cubriendo todas las áreas del alcance definido.

🔗 [Ver Test Plan completo (Google Sheets)](https://docs.google.com/spreadsheets/d/1owTKM8zT8wdjxl7C9UYXNLAQKs_gSjwe/edit?usp=drive_link&ouid=116250769003121408033&rtpof=true&sd=true)

### Resumen de ejecución por módulo

| Módulo | Casos de prueba | ✅ Aprobados | ❌ Fallidos | % Pasados |
|---|---|---|---|---|
| NAV — Navegación | 10 | 9 | 1 | 90% |
| FORM — Formularios | 7 | 5 | 2 | 71% |
| UI — Contenido y UI | 10 | 10 | 0 | 100% |
| PROD — Páginas de producto | 4 | 4 | 0 | 100% |
| RESP — Responsive | 6 | 3 | 3 | 50% |
| SEO — Metadata | 5 | 2 | 3 | 40% |
| INT — Integraciones | 4 | 4 | 0 | 100% |
| **TOTAL** | **46** | **37** | **9** | **~79%** |

---

## 🤖 Automatización de pruebas (Cypress)

Como complemento al relevamiento manual, se automatizó un subconjunto de casos **end-to-end (E2E)** con **Cypress**, aplicando el patrón **Page Object Model (POM)** para mantener los selectores y las acciones desacoplados de los tests.

### Cómo ejecutar la suite

```bash
cd automatizacion-cypress
npm install
npm run cy:open     # Modo interactivo (Cypress App)
npm run cy:run      # Modo headless (terminal / CI)
```

> Documentación detallada de la suite (estructura, convenciones y mapeo specs ↔ casos manuales) en [`automatizacion-cypress/README.md`](automatizacion-cypress/README.md).

<p align="center">
  <a href="https://damian-palla.github.io/relevamiento-web-www.crivo.com.ar/index.html">
    <img src="https://img.shields.io/badge/📊_Ver_el_reporte_de_pruebas_en_vivo-2ea44f?style=for-the-badge&logo=cypress&logoColor=white" alt="Ver el reporte de pruebas en vivo (Mochawesome)">
  </a>
</p>

| Campo | Detalle |
|---|---|
| **Framework** | Cypress 13.17 |
| **Patrón** | Page Object Model (POM) |
| **Tipo** | E2E — Caja negra sobre producción |
| **Alcance** | Desktop (la vista mobile permanece como prueba manual) |
| **Casos automatizados** | **36** distribuidos en **8 spec files** |

### Casos por spec

| Spec | Cubre | Casos |
|---|---|---|
| `contact.cy.js` | Formulario de contacto — happy path, validaciones, honeypot e integridad del `<select>` | 11 |
| `footer.cy.js` | Newsletter (Mailchimp) + integraciones (WhatsApp, IG/LinkedIn, mailto) | 7 |
| `navigation.cy.js` | Navbar — tabs, logo y dropdown de productos (desktop) | 5 |
| `home.cy.js` | Secciones del home — "Ver todos los productos" e insumos | 2 |
| `products.cy.js` | Categorías, cards y página de detalle de producto | 4 |
| `seo.cy.js` | Metadata — `<title>`, `<h1>` y `<meta description>` por endpoint | 4 |
| `security.cy.js` | Exposición de errores del servidor en `/productos` y `/enviar_news` | 2 |
| `health.cy.js` | Disponibilidad (HTTP 200) de los endpoints públicos | 1 |
| **TOTAL** | | **36** |

### Tests `[BUG]`

Algunos casos documentan **bugs conocidos** y llevan el prefijo `[BUG]` en su nombre. Estos tests **afirman el comportamiento defectuoso**, por lo que **pasan mientras el bug sigue vivo**. El día que un test `[BUG]` **falla**, significa que el bug fue corregido y el test debe actualizarse al comportamiento correcto.

---

## 🐛 Bugs encontrados

Se identificaron un total de **14 bugs** clasificados por severidad.

| Severidad | Cantidad |
|---|---|
| 🔴 Alta | 4 |
| 🟡 Media | 6 |
| 🟢 Baja | 4 |
| **Total** | **14** |

### Detalle de bugs

| Bug ID | Módulo | Título | Severidad |
|---|---|---|---|
| BUG-001 | NAV | Parpadeo del menú desplegable de productos al hacer hover | 🔴 Alta |
| BUG-002 | FORM | Sección Newsletter no visible si el usuario tiene un ad-blocker activo | 🔴 Alta |
| BUG-003 | NAV | Link "Productos" en el footer redirige a un endpoint con error y expone información sensible del servidor | 🔴 Alta |
| BUG-009 | NAV | Endpoint comentado en HTML expone información sensible del servidor | 🔴 Alta |
| BUG-004 | RESP | (Mobile) Elemento del footer desfasado generando scroll horizontal no deseado | 🟡 Media |
| BUG-005 | SEO | `<title>` idéntico en todos los endpoints/páginas del sitio | 🟡 Media |
| BUG-006 | PROD | Campo "Usos recomendados" en formato columna en varios endpoints de productos | 🟡 Media |
| BUG-007 | FORM | Formulario de cotización se envía exitosamente con campo "Tipo de producto" vacío | 🟡 Media |
| BUG-008 | FORM | Formulario de cotización se envía exitosamente con campo "Comentarios" vacío | 🟡 Media |
| BUG-014 | FORM | Mensaje de error genérico al ingresar un email inválido en el formulario de Contacto | 🟡 Media |
| BUG-010 | SEO | `<title>` contiene tilde incorrecta en la palabra "gráficos" | 🟢 Baja |
| BUG-011 | PROD | Nombre del producto "Lona Backlight 15 oz" no coincide con las onzas indicadas en Características (13 oz) | 🟢 Baja |
| BUG-012 | PROD | Nombre en card de "Bicapa" difiere del nombre en el detalle del producto | 🟢 Baja |
| BUG-013 | PROD | Nombre en card de "Prensa" difiere del nombre en el detalle del producto | 🟢 Baja |

> Los bug reports completos, con pasos para reproducir, resultado esperado, resultado obtenido y evidencia (capturas y videos), se encuentran en el repositorio de documentación.

---

## 💡 Propuestas de mejora

Además de los bugs, se identificaron oportunidades de mejora en las siguientes áreas:

### Sección "Contacto"
- Envío automático de mensaje por WhatsApp al cliente al completar el formulario de cotización (con variables personalizadas o mensaje genérico)
- Hacer obligatorio el campo "Tipo de producto" para mejorar la personalización de la atención y obtener métricas de consultas
- Autocompletar el campo "Tipo de producto" cuando el formulario se abre desde la página de detalle de un producto

### Sección "Newsletter"
- Reemplazar el mensaje de confirmación de suscripción por un pop-up más visible para reducir la tasa de abandono del proceso

### Sección "Home"
- Alinear imágenes y botones de los productos en la sección "Nuestros insumos"

### Sección "Productos"
- Agregar imágenes de fondo en las cards de productos
- Alinear botones "Ver producto" en todas las cards
- Agregar delay de al menos 1 segundo en el cierre del menú desplegable de productos
- Corregir el formato del campo "Usos recomendados" para que ocupe el ancho completo de la tabla
- Implementar lightbox para ver imágenes de productos en tamaño ampliado
- Agregar "Vinilos Graphitac" como categoría independiente en el nav-menu

### Vista Mobile
- Aumentar el tamaño y reposicionar las flechas de navegación de imágenes en detalle de producto
- Habilitar zoom en mobile (`user-scalable=yes` o configuración equivalente para Safari)

### SEO
- Definir `<title>` único y descriptivo para cada endpoint/página
- Incorporar palabras clave en los elementos `<h1>` de cada página
- Corregir la etiqueta `canonical` para que cada endpoint apunte a sí mismo y no al home
- Personalizar el `<meta name="description">` para cada producto o sección

---

## 📁 Documentación del proyecto

| Recurso | Link |
|---|---|
| 📊 Test Plan y Bug Reports | [Google Drive](https://drive.google.com/drive/folders/108cniT7KjhTTbCE8S2aFljwguexl_8oB?usp=drive_link) |
| 🎨 Propuestas UX/UI | [Figma](https://www.figma.com/board/X1dLCJ6DTrBBwILGjPU7RT/FigJam-Basics?node-id=0-1&p=f&t=CiRG2TcZdlKFnPSV-0) |
| 📹 Evidencia de bugs | Carpeta adjunta en Drive (capturas y videos por bug) |

---

## 🗂️ Estructura del repositorio

```
📦 relevamiento-web-www.crivo.com.ar/
├── 📄 README.md
├── 📄 Crivo S.R.L - Relevamiento.docx.pdf   # Reporte final del relevamiento
├── 📊 Presentacion_Crivo.pptx               # Presentación del relevamiento
└── 📁 automatizacion-cypress/               # Suite de automatización E2E (Cypress)
    ├── 📄 README.md                         # Guía de la suite (instalación y ejecución)
    ├── 📄 TEST_PLAN.md                      # Mapeo de specs ↔ casos manuales
    ├── 📄 cypress.config.js
    └── 📁 cypress/
        ├── 📁 e2e/                          # Spec files (.cy.js)
        ├── 📁 pages/                        # Page Objects (POM)
        ├── 📁 fixtures/                     # Datos de prueba (.json)
        └── 📁 support/                      # Comandos y configuración
```

---

## ⚙️ Metodología

- Las pruebas fueron ejecutadas de forma **manual** en entorno de **producción**, sin participación previa en el desarrollo del sitio.
- Los casos de prueba siguen una nomenclatura estructurada: `TC-[MÓDULO]-[NRO]` (ej: `TC-NAV-001`).
- Los bugs están vinculados a sus casos de prueba relacionados y clasificados por severidad: **Alta**, **Media** y **Baja**.
- Cada bug cuenta con: descripción, pasos para reproducir, resultado esperado, resultado obtenido y evidencia visual.
- Las propuestas de mejora de UX/UI fueron complementadas con mockups en Figma.