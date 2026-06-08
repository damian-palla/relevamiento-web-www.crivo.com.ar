# Test Plan — crivo.com.ar

Relevamiento QA — Crivo S.R.L. | Abril 2026 | Ambiente: Producción

Los pasos completos, evidencias y notas detalladas están en `Documentos/TestPlan_Crivo.xlsx`.
Este archivo es la referencia rápida para mapear specs de Cypress a casos manuales.

## Resumen de módulos

| Módulo | TC | ✓ | ✗ | % PASS |
|---|---|---|---|---|
| NAV — Navegación | 10 | 9 | 1 | 90% |
| FORM — Formularios | 7 | 5 | 2 | 71% |
| UI — Contenido y UI | 10 | 10 | 0 | 100% |
| PROD — Páginas de producto | 4 | 4 | 0 | 100% |
| RESP — Responsive | 6 | 3 | 3 | 50% |
| SEO — Metadata | 5 | 2 | 3 | 40% |
| INT — Integraciones | 4 | 4 | 0 | 100% |
| **TOTAL** | **46** | **37** | **9** | **79%** |

---

## NAV — Navegación (10 TC | 9 ✓ 1 ✗)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-NAV-001 | Redireccionamiento correcto de las tabs en nav-menu — Desktop | Alta | ✓ PASS | |
| TC-NAV-002 | Redireccionamiento correcto de cada producto — Desktop | Alta | ✓ PASS | |
| TC-NAV-003 | Dropdown "Productos" y subproductos son visibles — Desktop | Alta | ✓ PASS | |
| TC-NAV-004 | Redireccionamiento correcto de cada subproducto — Desktop | Alta | ✓ PASS | |
| TC-NAV-005 | Menú de navegación — Mobile | Alta | ✓ PASS | |
| TC-NAV-006 | Link "Contacto" desde páginas internas | Media | ✓ PASS | |
| TC-NAV-007 | Links de footer | Media | ✗ FAIL | BUG-003 |
| TC-NAV-008 | Logo — link a home | Baja | ✓ PASS | |
| TC-NAV-009 | Redireccionamiento de "Ver todos los productos" | Alta | ✓ PASS | |
| TC-NAV-010 | Links de categorías desde la sección "Nuestros insumos" | Alta | ✓ PASS | |

---

## FORM — Formularios (7 TC | 5 ✓ 2 ✗)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-FORM-001 | Formulario de presupuesto — envío exitoso con datos válidos | Alta | ✓ PASS | |
| TC-FORM-002 | Formulario — campo "Tipo de producto" obligatorio | Media | ✗ FAIL | BUG-007 |
| TC-FORM-003 | Formulario — campo "Comentarios" obligatorio | Media | ✗ FAIL | BUG-008 |
| TC-FORM-004 | Formulario — envío sin completar ningún campo | Alta | ✓ PASS | |
| TC-FORM-005 | Newsletter — suscripción con email válido | Alta | ✓ PASS | BUG-002 |
| TC-FORM-006 | Newsletter — email con formato inválido | Media | ✓ PASS | |
| TC-FORM-007 | Newsletter — campo vacío | Media | ✓ PASS | |

---

## UI — Contenido y UI (10 TC | 10 ✓)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-UI-001 | Home — videos de fondo, carga y reproducción | Alta | ✓ PASS | |
| TC-UI-002 | Videos de fondo — versión mobile | Alta | ✓ PASS | |
| TC-UI-003 | Carrusel de marcas — navegación | Media | ✓ PASS | |
| TC-UI-004 | Imágenes de categorías — carga correcta | Alta | ✓ PASS | |
| TC-UI-005 | Sección hero — layout y legibilidad en distintas resoluciones | Alta | ✓ PASS | |
| TC-UI-006 | Footer — información de contacto y datos de la empresa | Media | ✓ PASS | |
| TC-UI-007 | (Desktop) Botón WhatsApp — visible y funcional | Alta | ✓ PASS | |
| TC-UI-008 | (Mobile) Botón WhatsApp — visible y funcional | Alta | ✓ PASS | |
| TC-UI-009 | Textos — ortografía y consistencia visual | Media | ✓ PASS | |
| TC-UI-010 | Página Graphictac — redireccionamiento y carga | Media | ✓ PASS | |

---

## PROD — Páginas de producto (4 TC | 4 ✓)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-PROD-001 | Sección productos — carga y contenido | Alta | ✓ PASS | BUG-012, BUG-013 |
| TC-PROD-002 | Página de detalle de producto — contenido completo | Alta | ✓ PASS | BUG-011 |
| TC-PROD-003 | Links de productos desde tab "Productos" | Alta | ✓ PASS | BUG-001, BUG-006 |
| TC-PROD-004 | Botón de regreso desde detalle de producto | Media | ✓ PASS | |

---

## RESP — Responsive (6 TC | 3 ✓ 3 ✗)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-RESP-001 | Home — responsividad | Alta | ✗ FAIL | BUG-004 |
| TC-RESP-002 | Formulario de presupuesto — usabilidad en mobile | Alta | ✓ PASS | |
| TC-RESP-003 | Páginas de producto — layout en mobile | Alta | ✓ PASS | |
| TC-RESP-004 | Scroll horizontal no deseado en mobile | Alta | ✗ FAIL | BUG-003 |
| TC-RESP-005 | Imágenes — escalado en diferentes resoluciones | Media | ✓ PASS | |
| TC-RESP-006 | Footer — visibilidad y funcionalidad en mobile | Media | ✗ FAIL | BUG-003 |

---

## SEO — Metadata (5 TC | 2 ✓ 3 ✗)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-SEO-001 | Title del Home | Media | ✗ FAIL | BUG-010 |
| TC-SEO-002 | Estructura de HTML: `<title>` en endpoints | Alta | ✗ FAIL | BUG-005 |
| TC-SEO-003 | Estructura de HTML: `<h1>` en endpoints | Media | ✓ PASS | |
| TC-SEO-004 | Estructura de HTML: `<meta name="description">` en endpoints | Alta | ✗ FAIL | |
| TC-SEO-005 | (Mobile) Estructura de HTML: `<meta name="viewport">` | Alta | ✓ PASS | |

---

## INT — Integraciones (4 TC | 4 ✓)

| ID | Nombre | Prioridad | Status | Bug ref |
|---|---|---|---|---|
| TC-INT-001 | Links externos — Instagram y LinkedIn | Alta | ✓ PASS | |
| TC-INT-002 | Links externos — WhatsApp | Alta | ✓ PASS | |
| TC-INT-003 | Link — email "info@crivo.com.ar" | Alta | ✓ PASS | |
| TC-INT-004 | Footer — link de créditos del desarrollador | Baja | ✓ PASS | |

---

## Bug Reports (14 bugs)

| Bug ID | TC relacionado | Módulo | Severidad | Título | Status |
|---|---|---|---|---|---|
| BUG-001 | TC-PROD-003 | PROD | Alta | Parpadeo de menú desplegable de productos al hacer hover | Abierto |
| BUG-002 | TC-FORM-005 | FORM | Alta | Sección "Newsletter" no visible si el usuario tiene un adblocker | Abierto |
| BUG-003 | TC-NAV-007 | NAV | Alta | Link "Productos" en footer → `/productos` expone error técnico del servidor | Abierto |
| BUG-004 | TC-RESP-001 | RESP | Media | (Mobile) Sección en footer desfasada — texto "*indica obligatorio" fuera de márgenes | Abierto |
| BUG-005 | TC-SEO-002 | SEO | Media | `<title>` repetido en todos los endpoints | Abierto |
| BUG-006 | TC-PROD-003 | PROD | Media | Campo "Usos recomendados" en formato columna en detalle de productos | Abierto |
| BUG-007 | TC-FORM-002 | FORM | Media | Formulario se envía con "Tipo de producto" vacío | Abierto |
| BUG-008 | TC-FORM-003 | FORM | Media | Formulario se envía con "Comentarios" vacío | Abierto |
| BUG-009 | TC-NAV-007 | NAV | Alta | `/enviar_news` comentado en HTML; accesible y expone error técnico del servidor | Abierto |
| BUG-010 | TC-SEO-001 | SEO | Baja | `<title>` con tilde incorrecta: "gŕaficos" en lugar de "gráficos" | Abierto |
| BUG-011 | TC-PROD-002 | PROD | Baja | Nombre de producto inconsistente: "15 oz" en título vs "13 oz" en características | Abierto |
| BUG-012 | TC-PROD-001 | PROD | Baja | Nombre en card "Bicapa" difiere del detalle "Bicapa para grabado laser" | Abierto |
| BUG-013 | TC-PROD-001 | PROD | Baja | Nombre en card "Prensa" difiere del detalle "Roll up Prensa" | Abierto |
| BUG-014 | — | FORM | Media | Email inválido aceptado server-side; respuesta es error genérico en `/enviar_mail` | Abierto |
