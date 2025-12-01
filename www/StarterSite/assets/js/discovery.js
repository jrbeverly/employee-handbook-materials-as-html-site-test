// Signature discovery moments — progressive enhancement.
// All content remains readable without JavaScript.
// When JS is unavailable, CSS fallbacks handle the visual state.

(function () {
  if (typeof window === 'undefined') return;

  // Remove no-js sentinel so CSS can apply JS-only styles.
  if (document.documentElement.classList.contains('no-js')) {
    document.documentElement.classList.remove('no-js');
  }

  // ── Chapter-end vignette: reveal on scroll ──────────────────

  var vignettes = document.querySelectorAll('.booklet-chapter-end__stamp');

  if (vignettes.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    vignettes.forEach(function (el) {
      return observer.observe(el);
    });
  } else {
    // Show immediately when IntersectionObserver is unavailable.
    vignettes.forEach(function (el) {
      return el.classList.add('is-visible');
    });
  }

  // ── Foldable diagram: SVG territory → details sync ─────────

  var territories = document.querySelectorAll('[data-diagram-territory]');

  if (territories.length) {
    territories.forEach(function (el) {
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.setAttribute(
        'aria-label',
        'Toggle details for ' + (el.getAttribute('data-diagram-territory') || 'territory')
      );

      var toggle = function () {
        var target = el.getAttribute('data-diagram-territory');
        if (!target) return;
        var details = document.getElementById(target);
        if (!details) return;
        var wasOpen = details.open;
        // Close all details first.
        var allDetails = document.querySelectorAll('.booklet-diagram-details details');
        allDetails.forEach(function (d) {
          d.open = false;
        });
        // Toggle the targeted one.
        details.open = !wasOpen;
        details.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      };

      el.addEventListener('click', toggle);
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }
})();
