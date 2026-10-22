// Filter katalog produk + hitung klik WhatsApp (siap dipasang analitik)
(function () {
  var grid = document.getElementById("grid");
  if (grid) {
    var q = document.getElementById("q"), cat = "", cards = [].slice.call(grid.children), none = document.getElementById("none");
    var run = function () {
      var t = q.value.trim().toLowerCase(), n = 0;
      cards.forEach(function (c) {
        var ok = (!cat || c.dataset.cat === cat) && (!t || c.dataset.q.indexOf(t) > -1);
        c.hidden = !ok; if (ok) n++;
      });
      none.hidden = n > 0;
    };
    q.addEventListener("input", run);
    document.querySelector(".chips").addEventListener("click", function (e) {
      var b = e.target.closest("button"); if (!b) return;
      [].forEach.call(this.children, function (x) { x.classList.toggle("on", x === b); });
      cat = b.dataset.cat; run();
    });
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-wa]");
    if (a && window.dataLayer) window.dataLayer.push({ event: "wa_click", href: a.href });
  });
})();
