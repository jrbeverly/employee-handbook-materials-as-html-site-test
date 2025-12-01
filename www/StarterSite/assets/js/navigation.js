// Booklet keyboard navigation — progressive enhancement.
// All navigation works without JavaScript via standard anchor links.

(function () {
  if (typeof window === 'undefined') return;

  if (document.documentElement.classList.contains('no-js')) {
    document.documentElement.classList.remove('no-js');
  }

  // Place focus on the main landmark after a page turn so keyboard
  // and screen-reader users land on content, not the top of the page.
  var main = document.getElementById('main-content');
  if (main) {
    main.setAttribute('tabindex', '-1');
    main.focus();
  }

  var prevLink = document.querySelector('.booklet-sequential-nav__prev');
  var nextLink = document.querySelector('.booklet-sequential-nav__next');
  var tocLink  = document.querySelector('.booklet-return-toc');

  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';
    var editable = document.activeElement && document.activeElement.isContentEditable;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || editable) {
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      if (prevLink) { e.preventDefault(); prevLink.click(); }
    } else if (e.key === 'ArrowRight' || e.key === 'PageDown') {
      if (nextLink) { e.preventDefault(); nextLink.click(); }
    } else if (e.key === 'Escape') {
      if (tocLink) { e.preventDefault(); tocLink.click(); }
    }
  });
})();
