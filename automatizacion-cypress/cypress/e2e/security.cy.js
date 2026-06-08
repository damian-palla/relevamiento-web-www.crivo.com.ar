/**
 * Security spec — server error exposure
 * Covers catalogue cases 35–36 (see cypress/e2e/CLAUDE.md → security.cy.js).
 *
 * These are [BUG] tests: they assert the leak is STILL present, so they pass
 * while the defect lives and fail once the server stops exposing internals.
 * cy.request uses failOnStatusCode:false so a 500 does not abort the test.
 *
 * Markers that count as a leaked technical error / stack trace:
 *   - a "Backtrace:" dump
 *   - absolute server filesystem paths ("/home/u676867178/", "public_html")
 *   - the controller filename "Sitio.php"
 */

const LEAK_MARKERS = [
  'Backtrace:',
  '/home/u676867178/',
  'public_html',
  'Sitio.php',
]

describe('Security — server error exposure', () => {

  it('TC 35 [BUG] — /productos returns 500 and leaks a stack trace (BUG-003)', () => {
    cy.request({ url: '/productos', failOnStatusCode: false }).then((res) => {
      expect(res.status).to.eq(500)
      LEAK_MARKERS.forEach(marker => {
        expect(res.body, marker).to.include(marker)
      })
    })
  })

  it('TC 36 [BUG] — /enviar_news exposes a PHP error notice (BUG-009)', () => {
    // Returns 200, but prepends a framework PHP error to the HTML body.
    cy.request({ url: '/enviar_news', failOnStatusCode: false }).then((res) => {
      LEAK_MARKERS.forEach(marker => {
        expect(res.body, marker).to.include(marker)
      })
    })
  })

})
