/* Menu mobile: botão com aria-expanded, Esc fecha e devolve o foco ao botão. */
(function () {
  var btn = document.querySelector('.menu-btn');
  var panel = document.getElementById('menu-mobile');
  if (!btn || !panel) return;
  var iconOpen = btn.querySelector('.icon-open');
  var iconClose = btn.querySelector('.icon-close');

  function setOpen(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    panel.hidden = !open;
    iconOpen.toggleAttribute('hidden', open);
    iconClose.toggleAttribute('hidden', !open);
  }

  btn.addEventListener('click', function () { setOpen(panel.hidden); });
  panel.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
  document.querySelector('header').addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) { setOpen(false); btn.focus(); }
  });
  window.matchMedia('(min-width: 701px)').addEventListener('change', function (e) {
    if (e.matches) setOpen(false);
  });
})();
