document.querySelectorAll('.dl-page details[id]').forEach(function (panel) {
  function revealAnchor() { if (location.hash === '#' + panel.id) panel.open = true; }
  window.addEventListener('hashchange', revealAnchor);
  revealAnchor();
});
