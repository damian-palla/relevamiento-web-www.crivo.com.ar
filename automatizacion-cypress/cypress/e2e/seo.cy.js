import { ENDPOINTS } from '../support/endpoints'

/**
 * SEO spec — page metadata across endpoints
 * Covers catalogue cases 31–34 (see cypress/e2e/CLAUDE.md → seo.cy.js).
 *
 * Uses cy.request + DOMParser rather than cy.visit: the <title>, <h1> and
 * <meta description> live in the static HTML, so parsing the response is
 * deterministic and avoids 8 full page loads.
 */

// The site's <title> as it ships today — note the typo "gŕaficos" (BUG-010).
const HOME_TITLE = 'Crivo | Insumos gŕaficos para la comunicación visual'

// /graphictac is excluded from the h1 / description / duplication checks: it
// ships with no <h1> and an empty <meta description>, and a different <title>.
// Out of scope for cases 31–34 by decision (see catalogue note).
const CONTENT_ENDPOINTS = ENDPOINTS.public.filter(e => e.path !== '/graphictac')

const parse = (body) => new DOMParser().parseFromString(body, 'text/html')

describe('SEO — page metadata', () => {

  it('TC 31 [BUG] — home <title> still ships the "gŕaficos" typo (BUG-010)', () => {
    cy.request('/').then(({ body }) => {
      const title = parse(body).querySelector('title').textContent.trim()
      expect(title).to.eq(HOME_TITLE)
    })
  })

  it('TC 32 [BUG] — <title> is duplicated across content endpoints (BUG-005)', () => {
    // Bug lives: every content page reuses the home <title>. Assert they all
    // match — when each page gets a unique title this fails and the bug is fixed.
    cy.wrap(CONTENT_ENDPOINTS).each(({ path }) => {
      cy.request(path).then(({ body }) => {
        const title = parse(body).querySelector('title').textContent.trim()
        expect(title, path).to.eq(HOME_TITLE)
      })
    })
  })

  CONTENT_ENDPOINTS.forEach(({ path, name }) => {
    it(`TC 33 — ${name} (${path}) has a non-empty <h1>`, () => {
      cy.request(path).then(({ body }) => {
        const h1 = parse(body).querySelector('h1')
        expect(h1, 'h1 element').to.not.be.null
        expect(h1.textContent.trim()).to.not.be.empty
      })
    })

    it(`TC 34 — ${name} (${path}) has a non-empty <meta name="description">`, () => {
      cy.request(path).then(({ body }) => {
        const meta = parse(body).querySelector('meta[name="description"]')
        expect(meta, 'meta description').to.not.be.null
        expect(meta.getAttribute('content').trim()).to.not.be.empty
      })
    })
  })

})
