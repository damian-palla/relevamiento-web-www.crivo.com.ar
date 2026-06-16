/**
 * Canonical list of site endpoints, shared by the health, seo and security specs.
 *
 * Lives in support/ (not fixtures/) because it is imported synchronously to
 * generate one it() per endpoint via forEach at the describe level — fixtures load
 * asynchronously and cannot be used that way.
 *
 * Paths are relative to baseUrl (set in cypress.config.js); use them directly with
 * cy.visit(path) and cy.request(path).
 */

export const ENDPOINTS = {
  // Pages that should load normally — used by health (200) and seo (metadata).
  public: [
    { path: '/',                           name: 'Home' },
    { path: '/empresa',                    name: 'Empresa' },
    { path: '/productos/vinilos',          name: 'Vinilos' },
    { path: '/productos/lonas',            name: 'Lonas' },
    { path: '/productos/placas-rigidas',   name: 'Placas rígidas' },
    { path: '/productos/portabanners',     name: 'Portabanners' },
    { path: '/productos/tintas-accesorios', name: 'Tintas y accesorios' },
    //{ path: '/graphictac',                 name: 'Graphictac' },//
  ],

  // Known to expose server errors — used by security (must NOT leak a stack trace).
  errorProne: [
    { path: '/productos',   bug: 'BUG-003' },
    { path: '/enviar_news', bug: 'BUG-009' },
  ],
}
