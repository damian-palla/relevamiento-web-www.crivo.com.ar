# Cypress-Crivo — Project Conventions

## Language rules

This project tests a Spanish-language site (crivo.com.ar). Code and content are in
different languages depending on their role:

| Element | Language | Examples |
|---|---|---|
| Method names | English | `fillForm`, `assertSubmissionSuccess` |
| Variable names | English | `contactPage`, `productType`, `firstName` |
| Class names | English | `ContactPage`, `HomePage` |
| Constants (non-product) | English | `SELECTORS`, `BASE_URL` |
| Comments and JSDoc | English | `// Scrolls the form into view` |
| `PRODUCT_OPTIONS` keys | Spanish UPPER_SNAKE_CASE | `VINILOS_IMPRESION`, `LONAS_MESH` |
| `PRODUCT_OPTIONS` values | Spanish (exact site text) | `'Vinilos de impresión'` |
| Fixture data keys | English | `firstName`, `productType`, `noResults` |
| Fixture data values (site content) | Spanish | `'Vinilos'`, `'Lonas Front'` |
| CSS selectors / `name` attributes | Spanish (mirrors real HTML) | `input[name="nombre"]` |
| Fixture data values (test-generated) | English | `'Test User'`, `'Automated test inquiry'` |

## PRODUCT_OPTIONS key convention

Keys must describe the product in Spanish, in UPPER_SNAKE_CASE, with no accent marks
(identifiers do not support accented characters reliably across all tooling).

```js
// Correct
VINILOS_IMPRESION:                'Vinilos de impresión',
VINILOS_IMPRESION_MICROPERFORADO: 'Vinilos de impresión microperforado',
VINILOS_ALTO_TRANSITO:            'Vinilos de alto tránsito',   // no accent on TRANSITO
MAQUINA_SEMIAUTOMATICA_OJALES:    'Máquina semiautomática de ojales',

// Wrong
VINYL_PRINT:         'Vinilos de impresión',   // English key
VINILOS_IMPRESIÓN:   'Vinilos de impresión',   // accent in identifier
```

Values must always match the site's `<option value="...">` text exactly, including
accents, special characters, and capitalisation. Never alter a value.

## File structure

```
cypress/
  e2e/          spec files  (.cy.js)
  fixtures/     test data   (.json)
  pages/        Page Objects (.js)  — prefix with POM is optional but consistent
  support/
    commands.js custom Cypress commands
    e2e.js      support entry point
cypress.config.js
CLAUDE.md
package.json
```

## Page Object conventions

- One class per page/section; export a singleton instance as the default export.
- Selector strings live in a `SELECTORS` const at the top of the file, never inline.
- Methods are named after actions: `fillFirstName`, `selectProductType`, `submit`.
- Assertion methods are prefixed with `assert`: `assertFormIsVisible`, `assertSubmissionSuccess`.
- `fillForm(data)` accepts a plain object whose keys match `contact.json → form`.

## Testing scope & conventions

- **Desktop only.** Mobile cases are not automated and `cy.viewport` is not used.
  Responsive behaviour stays as manual testing (see `TEST_PLAN.md`).
- **Form validation philosophy:** asserting the observable outcome is enough — the
  success message (`.banner_gracias` / "GRACIAS") or a URL change. The network
  contract of the POST is **not** intercepted with `cy.intercept`; that is verified
  manually in Postman.
- **Data-integrity checks are exact.** When comparing against a source of truth (e.g.
  `PRODUCT_OPTIONS` vs the real `<select>`), assert both presence *and* exact count,
  not just "contains".
- **Case traceability.** Every `it()` must reference the catalogue case number from
  `cypress/e2e/CLAUDE.md` in its title, prefixed `TC N — …` (or `TC N [BUG] — …`
  when it documents a known bug). This makes each test trace back to a catalogue case.
- **Build order:** `cases → inspect the live site → POM → fixtures → specs`, with user
  approval at each stage. The POM drives the fixture (the interface defines the data),
  not the other way around.
- Full automated case catalogue and spec-file layout live in `cypress/e2e/CLAUDE.md`.

## Site facts (do not change selectors without re-inspecting the live site)

- Contact form is on the **homepage** at `/#contacto`, not a separate route.
- Form POSTs to `/enviar_mail`; on success the browser lands on that URL (full page).
- `input[name="name"]` (class `input_h`) is a **honeypot** — never fill it in tests.
- None of the text inputs have `id` attributes; use `name` attributes as selectors.

### Endpoints

| Ruta | Descripción |
|---|---|
| `/` | Home (contiene `#contacto`, `#insumos`, hero) |
| `/#contacto` | Sección contacto (ancla en el home) |
| `/empresa` | Página institucional |
| `/productos/vinilos` | Categoría Vinilos |
| `/productos/lonas` | Categoría Lonas |
| `/productos/placas-rigidas` | Categoría Placas rígidas |
| `/productos/portabanners` | Categoría Portabanners |
| `/productos/tintas-accesorios` | Categoría Tintas y accesorios |
| `/graphictac` | Página Graphictac (marca) |
| `/detalle_producto/[categoria]/[slug]` | Detalle de producto (patrón dinámico) |
| `/enviar_mail` | POST del formulario de contacto; también es la URL de éxito |
| `/productos` ⚠️ BUG-003 | Expone error técnico con rutas del servidor |
| `/enviar_news` ⚠️ BUG-009 | Comentado en HTML; accesible manualmente; expone error técnico |

### Contact form fields

| Campo | `name` attr | Tipo | ¿Obligatorio? |
|---|---|---|---|
| Nombre | `nombre` | text | Sí — HTML5 required |
| Apellido | `apellido` | text | Sí — HTML5 required |
| Empresa | `empresa` | text | Sí — HTML5 required |
| Email | `email` | text | Sí — HTML5 required (sin `type=email`) |
| Teléfono | `telefono` | text | Sí — HTML5 required (sin `type=tel`) |
| Tipo de producto | `tipo_producto` | select | Marcado como `*` pero acepta vacío — BUG-007 |
| Comentarios | `comentarios` | textarea | Marcado como `*` pero acepta vacío — BUG-008 |
| (honeypot) | `name` | text | Trampa anti-spam — nunca completar en tests |

`email` y `telefono` son `type="text"`: el navegador no valida formato ni tipo. Las
validaciones de formato son responsabilidad del servidor (o están ausentes).

### Known bugs relevant to specs

| Bug ID | Severidad | Descripción | Impacto en specs |
|---|---|---|---|
| BUG-003 | Alta | Footer "Productos" → `/productos` expone error del servidor | Caso 35 `[BUG]` en `security.cy.js`: `cy.request('/productos')` afirma status 500 + marcadores de fuga (`Backtrace:`, ruta del server, `Sitio.php`). Si falla, dejó de filtrar → bug corregido |
| BUG-005 | Media | `<title>` idéntico en todos los endpoints de contenido | Caso 32 `[BUG]` en `seo.cy.js`: afirma que comparten el title del home. Si falla, cada página tiene title propio → bug corregido |
| BUG-007 | Media | Formulario se envía con "Tipo de producto" vacío | Caso 8 `[BUG]` en `contact.cy.js`: afirma que el form igual se envía (`/enviar_mail`). Si falla, el campo pasó a ser obligatorio → bug corregido |
| BUG-008 | Media | Formulario se envía con "Comentarios" vacío | Caso 9 `[BUG]` en `contact.cy.js`: mismo patrón que BUG-007 |
| BUG-009 | Alta | `/enviar_news` accesible; expone error del servidor | Caso 36 `[BUG]` en `security.cy.js`: `cy.request('/enviar_news')` afirma que el body filtra el PHP error (mismos marcadores que BUG-003). Si falla, dejó de filtrar → bug corregido |
| BUG-010 | Baja | `<title>` del home con typo "gŕaficos" (acento en la `r`) | Caso 31 `[BUG]` en `seo.cy.js`: afirma que el typo sigue presente. Si falla, lo corrigieron → actualizar el valor esperado |
| BUG-014 | Media | Email/teléfono inválido aceptado server-side; respuesta en `/enviar_mail` es un error genérico | Casos 4–7 `[BUG]` en `contact.cy.js`: afirman que el envío llega a `/enviar_mail` (defecto vivo). Si fallan, el sitio empezó a rechazar el valor → bug corregido |

**Patrón `[BUG]`**: cuando un `it()` documenta un comportamiento incorrecto conocido, su
nombre lleva el prefijo `[BUG]`. Si el test *falla*, el bug fue corregido — actualizar el test.
