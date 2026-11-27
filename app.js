(function () {
  "use strict";

  var UI = {
    en: {
      title: "Lost Dream",
      badge: "From Hisor Fortress to Paris",
      lede: "The story of Shahiniyor — a 20-year-old young man in whose heart a 12-year-old boy still lives.",
      start: "Start reading",
      meta: function (n) { return n + (n === 1 ? " chapter" : " chapters"); },
      chapters: "Story Chapters",
      chaptersSub: "New chapters are added regularly",
      min: "min",
      chapterOf: function (n, t) { return "Chapter " + n + " of " + t; },
      prev: "Previous chapter",
      next: "Next chapter",
      home: "Back to the home page",
      endTitle: "The story continues.",
      endText: "The next chapter is coming soon.",
      smaller: "Smaller text",
      larger: "Larger text",
      theme: "Switch theme",
      foot1: "Lost Dream",
      foot2: "A story of love, memory, and a journey from Hisor to Paris.",
      copy: "© 2026 Abdullozoda Miyonmuhammad",
      about: "About",
      aboutTitle: "About Lost Dream",
      aboutParas: [
        "Lost Dream is the story of Shahiniyor, a young man from Hisor, Tajikistan. At twelve, he lost the girl he loved when her family moved abroad. Eight years later he opens the paper she left him, and his journey toward Paris begins.",
        "The story is written by Abdullozoda Miyonmuhammad, who grew up in Hisor. Lost Dream began as a story he wrote at sixteen. Now it is being finished chapter by chapter and shared here for free.",
        "New chapters are released regularly. You can follow the story on social media to know when the next chapter comes out."
      ],
      aboutContact: "Contact",
      aboutContactText: "Questions, ideas or feedback? Write to us:",
      backHome: "Back to the home page",
      watch: "Watch Part 1",
      watchText: "One minute: the night, the summer, the worst day, and the paper Eliza left behind."
    }
  };

  var RELEASED = 4;

  var LINKS = {
    instagram: "",
    wattpad: "https://www.wattpad.com/story/420476337",
    telegram: "https://t.me/lostdreambook",
    youtube: "https://www.youtube.com/@Lost-Dream-official",
    email: "lostdream.book@gmail.com"
  };

  function visible() { return STORY[state.lang].chapters.slice(0, RELEASED); }

  var state = { lang: "en", fs: 20 };
  var root = document.documentElement;
  var app = document.getElementById("app");

  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  var f0 = parseInt(load("od-fs"), 10);
  if (!isNaN(f0) && f0 >= 16 && f0 <= 28) state.fs = f0;

  var t0 = load("od-theme");
  if (t0 === "light" || t0 === "dark") root.setAttribute("data-theme", t0);

  root.style.setProperty("--fs", state.fs + "px");

  function words(arr) { return arr.join(" ").trim().split(/\s+/).length; }
  function mins(ch) { return Math.max(1, Math.round(words(ch.paras) / 170)); }
  function excerpt(ch) {
    var p = ch.paras[0] || "";
    if (p.length <= 105) return p;
    var cut = p.slice(0, 105);
    var lastSpace = cut.lastIndexOf(" ");
    return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut) + "…";
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  var CRESCENT_STAR =
    '<svg viewBox="0 0 28 28" aria-hidden="true">' +
    '<defs><mask id="m-logo"><rect width="28" height="28" fill="#fff"/><circle cx="17" cy="11" r="8.5" fill="#000"/></mask></defs>' +
    '<circle cx="12.5" cy="14.5" r="9.5" fill="#e2be64" mask="url(#m-logo)"/>' +
    '<polygon points="18,6.5 19.2,9.8 22.7,9.8 19.9,11.8 21,15.1 18,13.1 15,15.1 16.1,11.8 13.3,9.8 16.8,9.8" fill="#e2be64"/>' +
    '</svg>';

  var THEME_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="display:block;margin:auto"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 4 A8 8 0 0 1 12 20 Z" fill="currentColor"/></svg>';

  var BOOK_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>';

  function bar(view, ui) {
    var tools =
      '<div class="tools">' +
      (view.type !== "read" ? '<a class="navlink" href="#about"' + (view.type === "about" ? ' aria-current="page"' : '') + '>' + esc(ui.about) + '</a>' : '') +
      (view.type === "read"
        ? '<button class="ibtn" data-act="fs-" aria-label="' + esc(ui.smaller) + '">A−</button><button class="ibtn" data-act="fs+" aria-label="' + esc(ui.larger) + '">A+</button>'
        : '') +
      '<button class="ibtn" data-act="theme" aria-label="' + esc(ui.theme) + '">' + THEME_ICON + '</button>' +
      '</div>';

    return '<header class="bar' + (view.type === "read" ? ' reading' : '') + '">' +
      '<div class="wrap"><a class="brand" href="#home" aria-label="' + esc(ui.home) + '">' + CRESCENT_STAR + '<span>' + esc(ui.title) + '</span></a>' + tools + '</div>' +
      (view.type === "read" ? '<div class="progress" id="progress"></div>' : '') +
      '</header>';
  }

  function links() {
    var out = [];
    if (LINKS.instagram) out.push('<a href="' + esc(LINKS.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (LINKS.wattpad) out.push('<a href="' + esc(LINKS.wattpad) + '" target="_blank" rel="noopener">Wattpad</a>');
    if (LINKS.youtube) out.push('<a href="' + esc(LINKS.youtube) + '" target="_blank" rel="noopener">YouTube</a>');
    if (LINKS.telegram) out.push('<a href="' + esc(LINKS.telegram) + '" target="_blank" rel="noopener">Telegram</a>');
    if (LINKS.email) out.push('<a href="mailto:' + esc(LINKS.email) + '">' + esc(LINKS.email) + '</a>');
    return out.length ? '<div class="links">' + out.join("") + '</div>' : '';
  }

  function home(ui, chs) {
    var items = chs.map(function (c, i) {
      return '<li><a href="#ch-' + (i + 1) + '">' +
        '<div><div class="ch-top"><span class="num">' + (i + 1) + '</span><span class="cm">' + mins(c) + ' ' + esc(ui.min) + '</span></div>' +
        '<span class="ct">' + esc(c.title) + '</span>' +
        '<span class="ce">' + esc(excerpt(c)) + '</span></div>' +
        '</a></li>';
    }).join("");

    return '<main>' +
      '<section class="hero"><div class="wrap">' +
      '<div class="banner"><img src="images/cover.jpg" alt="Lost Dream" onerror="this.parentNode.classList.add(\'empty\')"></div>' +
      '<div class="hero-card">' +
      '<div class="arch-badge">' + esc(ui.badge) + '</div>' +
      '<h1>' + esc(ui.title) + '</h1>' +
      '<p class="lede">' + esc(ui.lede) + '</p>' +
      '<a class="cta" href="#ch-1">' + BOOK_ICON + '<span>' + esc(ui.start) + '</span></a>' +
      '<p class="meta-line">' + esc(ui.meta(chs.length)) + '</p>' +
      '</div>' +
      '</div></section>' +
      '<section class="watch"><div class="wrap"><div class="box">' +
      '<video controls playsinline preload="none" poster="images/part1-poster.jpg"><source src="videos/part1.mp4" type="video/mp4"></video>' +
      '<div><h2>' + esc(ui.watch) + '</h2><p>' + esc(ui.watchText) + '</p><a class="cta" href="#ch-1">' + BOOK_ICON + '<span>' + esc(ui.start) + '</span></a></div>' +
      '</div></div></section>' +
      '<section class="chapters"><div class="wrap">' +
      '<div class="sec-head"><h2>' + esc(ui.chapters) + '</h2><p class="sub">' + esc(ui.chaptersSub) + '</p></div>' +
      '<ol class="list">' + items + '</ol>' +
      '</div></section>' +
      '</main>' +
      '<footer class="foot"><div class="wrap"><p><strong>' + esc(ui.foot1) + '</strong></p><p>' + esc(ui.foot2) + '</p>' + links() + '<p><a class="navlink" href="#about">' + esc(ui.about) + '</a></p><p>' + esc(ui.copy) + '</p></div></footer>';
  }

  function about(ui) {
    return '<main class="read about"><div class="wrap"><article class="col">' +
      '<h1>' + esc(ui.aboutTitle) + '</h1>' +
      ui.aboutParas.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("") +
      '<h2>' + esc(ui.aboutContact) + '</h2>' +
      '<p>' + esc(ui.aboutContactText) + '</p>' +
      links() +
      '<nav class="pager"><a class="prev" href="#home"><small>&larr;</small><b>' + esc(ui.backHome) + '</b></a></nav>' +
      '</article></div></main>';
  }

  function read(ui, chs, n) {
    var ch = chs[n - 1];
    var paras = ch.paras.map(function (p) {
      return '<p' + (p.trim().charAt(0) === "—" ? ' class="dlg"' : '') + '>' + esc(p) + '</p>';
    }).join("");

    var figure = ch.img
      ? '<figure class="chimg"><img src="' + esc(ch.img) + '" alt="' + esc(ch.alt || ch.title) + '" loading="lazy" onerror="this.parentNode.remove()"></figure>'
      : '';

    var prev = n > 1
      ? '<a class="prev" href="#ch-' + (n - 1) + '"><small>' + esc(ui.prev) + '</small><b>' + esc(chs[n - 2].title) + '</b></a>'
      : '';

    var next = n < chs.length
      ? '<a class="next" href="#ch-' + (n + 1) + '"><small>' + esc(ui.next) + '</small><b>' + esc(chs[n].title) + '</b></a>'
      : '<div class="end"><b>' + esc(ui.endTitle) + '</b><small>' + esc(ui.endText) + '</small></div>';

    return '<main class="read"><div class="wrap"><article class="col">' +
      '<p class="kicker">' + esc(ui.chapterOf(n, chs.length)) + '</p>' +
      '<h1>' + esc(ch.title) + '</h1>' +
      figure +
      paras +
      '<nav class="pager">' + prev + next + '</nav>' +
      '</article></div></main>';
  }

  function parse() {
    var m = /^#ch-(\d+)$/.exec(location.hash || "");
    var n = m ? parseInt(m[1], 10) : 0;
    var chs = visible();
    if (n >= 1 && n <= chs.length) return { type: "read", n: n };
    if (location.hash === "#about") return { type: "about" };
    return { type: "home" };
  }

  function render(scroll) {
    try {
      var view = parse();
      var ui = UI[state.lang];
      var chs = visible();
      root.setAttribute("lang", state.lang);
      document.title = ui.title;
      app.innerHTML = bar(view, ui) + (view.type === "read" ? read(ui, chs, view.n) : view.type === "about" ? about(ui) : home(ui, chs));
      if (scroll) window.scrollTo(0, 0);
      updateProgress();
    } catch (err) {
      app.innerHTML = '<main class="read"><div class="wrap"><p>Something went wrong while displaying the page.</p></div></main>';
    }
  }

  function updateProgress() {
    var p = document.getElementById("progress");
    if (!p) return;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var r = h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0;
    p.style.width = (r * 100) + "%";
  }

  function effectiveTheme() {
    var a = root.getAttribute("data-theme");
    if (a) return a;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  app.addEventListener("click", function (e) {
    var a = e.target.closest("a[href^='#']");
    if (a && parse().type !== "home") {
      var href = a.getAttribute("href");
      var isHome = href === "#home" || href === "#";
      e.preventDefault();
      if (isHome && history.state && history.state.fromHome) {
        history.back();
      } else if (isHome) {
        history.replaceState(null, "", "#home");
        render(true);
      } else {
        history.replaceState(history.state, "", href);
        render(true);
      }
      return;
    }
    if (a && parse().type === "home" && a.getAttribute("href") !== "#home") {
      e.preventDefault();
      history.pushState({ fromHome: true }, "", a.getAttribute("href"));
      render(true);
      return;
    }
    var t = e.target.closest("button");
    if (!t) return;
    if (t.dataset.act === "theme") {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      save("od-theme", next);
    } else if (t.dataset.act === "fs+" || t.dataset.act === "fs-") {
      state.fs = Math.min(28, Math.max(16, state.fs + (t.dataset.act === "fs+" ? 2 : -2)));
      root.style.setProperty("--fs", state.fs + "px");
      save("od-fs", state.fs);
      updateProgress();
    }
  });

  if (parse().type !== "home") {
    var startHash = location.hash;
    history.replaceState(null, "", "#home");
    history.pushState({ fromHome: true }, "", startHash);
  }

  window.addEventListener("popstate", function () { render(true); });
  window.addEventListener("hashchange", function () { render(true); });
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);
  render(false);
})();
