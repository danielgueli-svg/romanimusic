(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function t(key) {
    return window.RMBA && window.RMBA.t ? window.RMBA.t(key) : key;
  }

  function setOpen(open) {
    if (!header || !toggle) return;
    header.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    var label = toggle.querySelector(".sr-only");
    if (label) label.textContent = open ? t("nav.close") : t("nav.open");
  }

  if (toggle && nav && header) {
    toggle.addEventListener("click", function () {
      setOpen(!header.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }


  var langBtn = document.querySelector(".lang-flag");
  if (langBtn && header) {
    langBtn.addEventListener("click", function () {
      var open = header.classList.toggle("lang-open");
      langBtn.setAttribute("aria-expanded", open ? "true" : "false");
      syncHeaderHeight();
    });
    document.addEventListener("click", function (e) {
      if (!header.classList.contains("lang-open")) return;
      if (e.target.closest(".lang-flag") || e.target.closest(".lang-switch")) return;
      header.classList.remove("lang-open");
      langBtn.setAttribute("aria-expanded", "false");
    });
    header.querySelectorAll(".lang-switch [data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        header.classList.remove("lang-open");
        langBtn.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape" || !header.classList.contains("lang-open")) return;
      header.classList.remove("lang-open");
      langBtn.setAttribute("aria-expanded", "false");
    });
  }

  function syncHeaderHeight() {
    if (!header) return;
    document.documentElement.style.setProperty("--header-h", header.offsetHeight + "px");
  }

  syncHeaderHeight();
  window.addEventListener("resize", syncHeaderHeight);
  window.addEventListener("load", syncHeaderHeight);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(syncHeaderHeight).catch(function () {});
  }

  document.addEventListener("rmba:lang", function () {
    syncHeaderHeight();
    if (toggle && header) {
      var label = toggle.querySelector(".sr-only");
      if (label) {
        label.textContent = header.classList.contains("is-open") ? t("nav.close") : t("nav.open");
      }
    }
  });

  var stage = document.querySelector(".stage");
  if (!stage) return;

  var slot = stage.querySelector("[data-stage-video]");
  var links = stage.querySelectorAll(".name-link[data-act]");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var films = {
    brady: "GwVl_I3LEr8",
    marcia: "-8NO05pyltM",
    django: "LXZhWTnTE0c"
  };
  var cycle = [
    { act: "brady", id: "GwVl_I3LEr8", start: 2, end: 14 },
    { act: "marcia", id: "-8NO05pyltM", start: 12, end: 26 }
  ];
  var token = 0;
  var hold = 0;
  var step = 0;
  var paused = false;

  function showClip(act, id, startAt, endAt) {
    if (act !== "brady" && act !== "marcia" && act !== "daniel" && act !== "django") return;
    stage.setAttribute("data-act", act);
    if (reduce || !slot) return;
    var mine = ++token;
    slot.classList.remove("is-on");
    window.setTimeout(function () {
      if (mine !== token) return;
      slot.replaceChildren();
      if (!id) return;
      var frame = document.createElement("iframe");
      var src = "https://www.youtube-nocookie.com/embed/" + id +
        "?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1&rel=0";
      if (startAt != null && endAt != null) src += "&start=" + startAt + "&end=" + endAt;
      else src += "&loop=1&playlist=" + id;
      frame.src = src;
      frame.title = "";
      frame.tabIndex = -1;
      frame.setAttribute("aria-hidden", "true");
      frame.allow = "autoplay; encrypted-media; picture-in-picture";
      frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      frame.addEventListener("load", function () {
        if (mine === token) slot.classList.add("is-on");
      });
      slot.appendChild(frame);
    }, 280);
  }

  function show(act) {
    var id = films[act];
    showClip(act, id);
  }

  function nextCycle() {
    if (paused || reduce) return;
    var clip = cycle[step];
    showClip(clip.act, clip.id, clip.start, clip.end);
    window.clearTimeout(hold);
    hold = window.setTimeout(function () {
      step = (step + 1) % cycle.length;
      nextCycle();
    }, (clip.end - clip.start) * 1000 - 200);
  }

  links.forEach(function (link) {
    var act = link.getAttribute("data-act");
    function holdAct() {
      paused = true;
      window.clearTimeout(hold);
      show(act);
    }
    link.addEventListener("mouseenter", holdAct);
    link.addEventListener("focus", holdAct);
  });

  var nameList = stage.querySelector(".name-list");
  if (nameList) {
    nameList.addEventListener("mouseleave", function () {
      if (!paused) return;
      paused = false;
      step = 0;
      nextCycle();
    });
  }

  function start() {
    if (reduce) {
      stage.setAttribute("data-act", fromHash || stage.getAttribute("data-act") || "brady");
      return;
    }
    nextCycle();
  }

  if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 900 });
  else window.addEventListener("load", start);
})();
