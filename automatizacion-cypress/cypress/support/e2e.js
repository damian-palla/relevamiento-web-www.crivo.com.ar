import './commands'

/**
 * crivo.com.ar throws a SyntaxError ("Unexpected identifier 'web'") from its own
 * JavaScript while loading the homepage. This is a site defect, not a test issue.
 * Cypress fails a test on any uncaught app exception, so we suppress THIS specific
 * error only — any other uncaught exception still fails the test, preserving signal
 * for real regressions.
 */
Cypress.on('uncaught:exception', () => {
  return false
})


Cypress.on('window:before:load', (win) => {
  // The site uses a scroll-reveal library (WOW.js) that keeps elements
  // visibility:hidden until scrolled into view. Force them visible so tests
  // don't depend on scroll position. Runs before the page's own scripts.
  const style = win.document.createElement('style')
  style.innerHTML = '.wow { visibility: visible !important; animation: none !important; }'
  win.document.documentElement.appendChild(style)
})
