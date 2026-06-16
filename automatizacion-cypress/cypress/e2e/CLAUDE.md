# cypress/e2e — Spec index

## Naming convention

`[module].cy.js` — one file per test module, matching the module codes in `TEST_PLAN.md`.

## Spec layout

One file per domain. (The old monolithic `ui.cy.js` was split into the
`footer` / `navigation` / `products` / `contact` specs and removed.)

| File | Covers | Data source | Page Object |
|---|---|---|---|
| `contact.cy.js` | Contact form — happy path, field validation, honeypot, select integrity | `contact.json` | `POMcontactoPage.js` |
| `footer.cy.js` | Newsletter (Mailchimp embed) + integrations (WhatsApp, IG/LinkedIn, mailto, company data) | `contact.json` | `POMfooterPage.js` |
| `navigation.cy.js` | Navbar tabs, logo, dropdown (desktop) | — | `POMnavPage.js` |
| `home.cy.js` | "Ver todos los productos" + insumos category cards | — | `POMhomePage.js` |
| `products.cy.js` | Category filter, cards, "ver producto", detail loads | `products.json` | `POMproductsPage.js` |
| `seo.cy.js` | `<title>`, `<h1>`, `<meta description>` per endpoint | `support/endpoints.js` | — (uses `cy.request`/DOM) |
| `security.cy.js` | Error exposure on `/productos`, `/enviar_news` | `support/endpoints.js` | — |
| `health.cy.js` | All endpoints return 200 | `support/endpoints.js` | — |

## Automated case catalogue (36 cases)

Status: ✅ implemented · 🐛 documents a known bug (`[BUG]` prefix). All 36 cases are
implemented — the spec-generation phase is complete.
Mobile is out of scope (see root `CLAUDE.md → Testing scope`). IDs are provisional;
reconciling them to the `TC-MODULE-NNN` scheme is a separate later step.

### contact.cy.js — Contact form (11)
1. ✅ Submits successfully with all valid fields
2. ✅ Submits successfully with only required fields
3. ✅ Does not submit when all required fields are empty (HTML5 required)
4. ✅🐛 Email missing `@` (BUG-014)
5. ✅🐛 Email with no domain after `@` (BUG-014)
6. ✅🐛 Phone contains letters (BUG-014)
7. ✅🐛 Phone under 8 digits (BUG-014)
8. ✅🐛 Submits with empty "Tipo de producto" (BUG-007)
9. ✅🐛 Submits with empty "Comentarios" (BUG-008)
10. ✅ Honeypot `input[name="name"]` is hidden from the user
11. ✅ `<select>` matches `PRODUCT_OPTIONS` — every value present **and** exact count

### footer.cy.js — Newsletter + integrations (7)

Newsletter is a Mailchimp embed (POSTs to an external list-manage.com URL, opens a
new tab). The old `/enviar_news` form is commented out in the HTML (BUG-009). The
footer has no semantic `<footer>` tag; `.footer` is used only as a scope container.
Case 18 (MOKAP dev-credits link) was dropped — no test on third-party credits.

12. ✅ Newsletter — form wired to Mailchimp + valid email passes native validation (no real subscription; manual check)
13. ✅ Newsletter — rejects email without `@`
14. ✅ Newsletter — rejects empty field
15. ✅ WhatsApp link — correct number and prefilled message (footer-scoped)
16. ✅ Instagram and LinkedIn present with valid href
17. ✅ `mailto:info@crivo.com.ar` link correct
19. ✅ Footer shows company contact data (address, phone, email)

### navigation.cy.js — Navbar (5, desktop)
20. ✅ Navbar tabs redirect correctly
21. ✅ Logo returns to home from an internal page
22. ✅ "Contacto" from an internal page lands on `/#contacto`
23. ✅ "Productos" dropdown visible with all 5 categories
24. ✅ Each dropdown category navigates to its URL

### home.cy.js — Home sections (2, uses POMhomePage)
These live in the home body, not the navbar. The insumos section has no `id`; its
classes are used only as scope containers (links anchored by `href`).
25. ✅ "Ver todos los productos" links to `/productos/vinilos` (site goes to vinilos, not a general `/productos`)
26. ✅ Insumos section shows all 5 category links

### products.cy.js — Products & detail (4)
27. ✅ Category tabs filter products
28. ✅ Each card has a visible "Ver producto" button
29. ✅ "Ver producto" redirects to the detail page (click wiring, 1 representative)
29 bis. ✅ Per category, card links match `products.json` exactly (set + count) — catches live/fixture drift
30. ✅ Every product detail page loads with title and image (one it() per fixture product; full `cy.visit`)

### seo.cy.js — Metadata (4)
Uses `cy.request` + `DOMParser` (title/h1/meta live in the static HTML).
`/graphictac` is **excluded** from cases 31–34: it ships with a different
`<title>` ("Crivo | Graphitac"), no `<h1>`, and an empty `<meta description>`.
31. ✅🐛 Home `<title>` still ships the typo "gŕaficos" (BUG-010) — asserts the typo is present
32. ✅🐛 `<title>` is duplicated across content endpoints (BUG-005) — asserts they all share the home title
33. ✅ Every content endpoint has a non-empty `<h1>` (excl. `/graphictac`)
34. ✅ Every content endpoint has a non-empty `<meta name="description">` (excl. `/graphictac`)

### security.cy.js — Error exposure (2)
`[BUG]` tests: they assert the leak is still present (pass now, fail when fixed).
Leak markers: `Backtrace:`, server path `/home/u676867178/`, `public_html`, `Sitio.php`.
35. ✅🐛 `/productos` returns 500 and leaks a stack trace (BUG-003)
36. ✅🐛 `/enviar_news` exposes a PHP error notice (BUG-009)

### health.cy.js — Availability (1)
37. ✅ All public endpoints respond 200 (`cy.request`); `/productos` & `/enviar_news` excluded (covered by security)

## [BUG] test pattern

Tests that document a known defect are named with a `[BUG]` prefix.
A `[BUG]` test **passing** means the site still has the bug.
A `[BUG]` test **failing** means the bug was fixed — update the test.

