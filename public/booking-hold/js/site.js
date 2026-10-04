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

  if (toggle && nav) {
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

  // <base href="/booking/"> makes all asset/page paths base-relative.
  // data-depth is kept for markup compatibility but must not rewrite URLs.
  function artistHref(page, depth) {
    return page;
  }

  function depthPrefix(depth) {
    return "";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderRoster() {
    var artists = (window.RMBA && window.RMBA.ARTISTS) || [];
    var nodes = document.querySelectorAll("[data-roster]");
    if (!nodes.length || !artists.length) return;

    nodes.forEach(function (root) {
      var depth = parseInt(root.getAttribute("data-depth") || "0", 10);
      root.innerHTML = artists.map(function (a) {
        var href = artistHref(a.page, depth);
        var photo = a.photo
          ? '<span class="artist-card-photo" aria-hidden="true"><img src="' + escapeHtml(a.photo) + '" alt="" width="640" height="480" loading="lazy" decoding="async"></span>'
          : "";
        return (
          '<a class="artist-card" href="' + escapeHtml(href) + '">' +
            photo +
            '<p class="card-kicker">' + escapeHtml(t(a.kickerKey)) + "</p>" +
            "<h3>" + escapeHtml(a.name) + "</h3>" +
            "<p>" + escapeHtml(t(a.summaryKey)) + "</p>" +
            '<span class="card-link">' + escapeHtml(t("card.view")) + "</span>" +
          "</a>"
        );
      }).join("");
    });
  }


  function josephLicenseLinks() {
    var wrap = document.createElement("span");
    wrap.className = "photo-license";
    var file = document.createElement("a");
    file.href = "https://commons.wikimedia.org/wiki/File:Joseph_reinhardt.jpg";
    file.rel = "noopener noreferrer";
    file.textContent = "Wikimedia Commons";
    var license = document.createElement("a");
    license.href = "https://www.gnu.org/licenses/old-licenses/fdl-1.2.html";
    license.rel = "noopener noreferrer";
    license.textContent = "GFDL 1.2+";
    wrap.appendChild(document.createTextNode(" "));
    wrap.appendChild(file);
    wrap.appendChild(document.createTextNode(" · "));
    wrap.appendChild(license);
    return wrap;
  }

  function licenseLinks() {
    var wrap = document.createElement("span");
    wrap.className = "photo-license";
    var file = document.createElement("a");
    file.href = "https://commons.wikimedia.org/wiki/File:Brady_Winterstein_Cosmopolite_Djangofestivalen_(220932).jpg";
    file.rel = "noopener noreferrer";
    file.textContent = "Wikimedia Commons";
    var license = document.createElement("a");
    license.href = "https://creativecommons.org/licenses/by-sa/4.0/";
    license.rel = "noopener noreferrer";
    license.textContent = "CC BY-SA 4.0";
    var site = document.createElement("a");
    site.href = "http://www.setre.net/";
    site.rel = "noopener noreferrer";
    site.textContent = "setre.net";
    wrap.appendChild(document.createTextNode(" "));
    wrap.appendChild(file);
    wrap.appendChild(document.createTextNode(" · "));
    wrap.appendChild(license);
    wrap.appendChild(document.createTextNode(" · "));
    wrap.appendChild(site);
    return wrap;
  }

  function fillPanel(panel, artist, depth) {
    var prefix = depthPrefix(depth);
    panel.innerHTML = "";

    var frame = document.createElement("div");
    frame.className = "band-frame";

    if (artist.photo) {
      var figure = document.createElement("figure");
      figure.className = "band-photo";
      var img = document.createElement("img");
      img.src = prefix + artist.photo;
      img.alt = t(artist.photoAltKey || "artist.brady.photoAlt");
      figure.appendChild(img);
      var cap = document.createElement("figcaption");
      cap.textContent = t(artist.photoCaptionKey || "artist.brady.photoCaption");
      if (artist.slug === "brady-winterstein-trio") {
        cap.appendChild(licenseLinks());
      }
      if (artist.slug === "django-rosenberg-trio") {
        cap.appendChild(josephLicenseLinks());
      }
      figure.appendChild(cap);
      frame.appendChild(figure);
    } else {
      var placeholder = document.createElement("div");
      placeholder.className = "placeholder-portrait band-photo-note";
      var note = document.createElement("p");
      note.textContent = t(artist.photoNoteKey || "artist.marcia.photoNote");
      placeholder.appendChild(note);
      frame.appendChild(placeholder);
    }

    var copy = document.createElement("div");
    copy.className = "prose band-copy";

    var kicker = document.createElement("p");
    kicker.className = "kicker";
    kicker.textContent = t(artist.kickerKey);
    copy.appendChild(kicker);

    var title = document.createElement("h1");
    title.id = "band-title";
    title.textContent = artist.name;
    copy.appendChild(title);

    (artist.bioKeys || []).forEach(function (key) {
      var p = document.createElement("p");
      p.textContent = t(key);
      copy.appendChild(p);
    });

    (artist.sections || []).forEach(function (section) {
      if (section.titleKey) {
        var h = document.createElement("h2");
        h.textContent = t(section.titleKey);
        copy.appendChild(h);
      }
      (section.paraKeys || []).forEach(function (key) {
        var p = document.createElement("p");
        p.textContent = t(key);
        copy.appendChild(p);
      });
      if (section.itemKeys && section.itemKeys.length) {
        var list = document.createElement("ul");
        list.className = "book-list";
        section.itemKeys.forEach(function (key) {
          var li = document.createElement("li");
          li.textContent = t(key);
          list.appendChild(li);
        });
        copy.appendChild(list);
      }
    });

    if (artist.details && artist.details.length) {
      var details = document.createElement("ul");
      details.className = "detail-list";
      artist.details.forEach(function (row) {
        var li = document.createElement("li");
        var lbl = document.createElement("span");
        lbl.className = "lbl";
        lbl.textContent = t(row.labelKey);
        var val = document.createElement("span");
        if (row.html) val.innerHTML = t(row.valueKey);
        else val.textContent = t(row.valueKey);
        li.appendChild(lbl);
        li.appendChild(val);
        details.appendChild(li);
      });
      copy.appendChild(details);
    }

    var recordKeys = (artist.plainRecords || []).concat((artist.links || []).map(function (link) {
      return link.labelKey;
    }));
    if (artist.plainRecords && artist.plainRecords.length || (artist.links && artist.links.length)) {
      var rh = document.createElement("h2");
      rh.textContent = artist.links && artist.links.length && !(artist.plainRecords || []).length
        ? t("stage.links")
        : t("stage.records");
      copy.appendChild(rh);
      var records = document.createElement("ul");
      records.className = "book-list";
      (artist.plainRecords || []).forEach(function (key) {
        var li = document.createElement("li");
        li.textContent = t(key);
        records.appendChild(li);
      });
      (artist.links || []).forEach(function (link) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = link.href;
        a.rel = "noopener noreferrer";
        a.textContent = t(link.labelKey);
        li.appendChild(a);
        records.appendChild(li);
      });
      copy.appendChild(records);
    }

    var row = document.createElement("div");
    row.className = "btn-row";
    var book = document.createElement("a");
    book.className = "btn";
    book.href = prefix + "contact.html?artist=" + encodeURIComponent(artist.slug);
    book.textContent = t("btn.bookThis");
    var page = document.createElement("a");
    page.className = "btn btn--ghost";
    page.href = artistHref(artist.page, depth);
    page.textContent = t("stage.fullPage");
    row.appendChild(book);
    row.appendChild(page);
    copy.appendChild(row);

    frame.appendChild(copy);
    panel.appendChild(frame);
    panel.setAttribute("aria-labelledby", "band-title");
  }

  function initStage() {
    var root = document.querySelector("[data-stage]");
    if (!root) return;
    var artists = (window.RMBA && window.RMBA.ARTISTS) || [];
    if (!artists.length) return;
    var depth = parseInt(root.getAttribute("data-depth") || "0", 10);
    var navEl = root.querySelector("[data-band-nav]");
    var panel = root.querySelector("[data-band-panel]");
    if (!navEl || !panel) return;
    var index = 0;

    function slugIndex(slug) {
      for (var i = 0; i < artists.length; i += 1) {
        if (artists[i].slug === slug) return i;
      }
      return 0;
    }

    function readHash() {
      var hash = (location.hash || "").replace(/^#/, "");
      try { hash = decodeURIComponent(hash); } catch (err) { hash = ""; }
      return slugIndex(hash) === 0 && artists[0].slug !== hash && hash ? 0 : slugIndex(hash);
    }

    function renderNav() {
      navEl.setAttribute("aria-label", t("stage.navLabel"));
      navEl.innerHTML = "";
      var kicker = document.createElement("p");
      kicker.className = "band-nav-kicker";
      kicker.textContent = t("stage.kicker");
      navEl.appendChild(kicker);
      artists.forEach(function (artist, i) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "band-link";
        button.setAttribute("data-slug", artist.slug);
        if (i === index) button.setAttribute("aria-current", "true");
        if (artist.photo) {
          var thumb = document.createElement("span");
          thumb.className = "band-thumb";
          var img = document.createElement("img");
          img.src = depthPrefix(depth) + artist.photo;
          img.alt = "";
          img.width = 72;
          img.height = 72;
          img.loading = "lazy";
          thumb.appendChild(img);
          button.appendChild(thumb);
        } else {
          var num = document.createElement("span");
          num.className = "band-index is-visible";
          num.textContent = String(i + 1).padStart(2, "0");
          button.appendChild(num);
        }
        var text = document.createElement("span");
        var name = document.createElement("span");
        name.className = "band-name";
        name.textContent = artist.listName || artist.name;
        var sub = document.createElement("span");
        sub.className = "band-sub";
        sub.textContent = t(artist.kickerKey);
        text.appendChild(name);
        text.appendChild(sub);
        button.appendChild(text);
        button.addEventListener("click", function () { go(i, "push"); });
        navEl.appendChild(button);
      });
      var hint = document.createElement("p");
      hint.className = "band-hint";
      hint.textContent = t("stage.hint");
      navEl.appendChild(hint);
    }

    function render(animate) {
      renderNav();
      if (animate) {
        panel.classList.remove("is-enter");
        void panel.offsetWidth;
        panel.classList.add("is-enter");
      }
      fillPanel(panel, artists[index], depth);
    }

    function go(nextIndex, mode) {
      index = (nextIndex + artists.length) % artists.length;
      var slug = artists[index].slug;
      var url = location.pathname + location.search + "#" + slug;
      if (mode === "push") history.pushState({ slug: slug }, "", url);
      else if (mode === "replace") history.replaceState({ slug: slug }, "", url);
      render(mode !== "silent");
    }

    panel.addEventListener("click", function (event) {
      var step = event.target.closest("[data-band-step]");
      if (!step || !panel.contains(step)) return;
      go(index + parseInt(step.getAttribute("data-band-step"), 10), "push");
    });

    var startX = null;
    var startY = null;
    panel.addEventListener("touchstart", function (event) {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    panel.addEventListener("touchend", function (event) {
      if (startX == null) return;
      var touch = event.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
      go(index + (dx < 0 ? 1 : -1), "push");
    }, { passive: true });

    window.addEventListener("popstate", function () {
      var hash = (location.hash || "").replace(/^#/, "");
      index = hash ? slugIndex(hash) : 0;
      render(false);
    });

    var initialHash = (location.hash || "").replace(/^#/, "");
    index = initialHash ? slugIndex(initialHash) : 0;
    if (initialHash && artists[index].slug === initialHash) {
      history.replaceState({ slug: artists[index].slug }, "", location.pathname + location.search + "#" + artists[index].slug);
    }
    render(false);
    window.RMBA.renderStage = function () { render(false); };
  }

  function bindPageSwipe() {
    var panel = document.querySelector("[data-swipe-next]");
    if (!panel || panel.closest("[data-stage]")) return;
    var startX = null;
    var startY = null;
    panel.addEventListener("touchstart", function (event) {
      if (event.touches.length !== 1) return;
      startX = event.touches[0].clientX;
      startY = event.touches[0].clientY;
    }, { passive: true });
    panel.addEventListener("touchend", function (event) {
      if (startX == null) return;
      var touch = event.changedTouches[0];
      var dx = touch.clientX - startX;
      var dy = touch.clientY - startY;
      startX = null;
      startY = null;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy)) return;
      var href = dx < 0 ? panel.getAttribute("data-swipe-next") : panel.getAttribute("data-swipe-prev");
      if (href) window.location.href = href;
    }, { passive: true });
  }

  function fieldLabel(input) {
    var label = input.closest("label");
    if (!label) return input.name || "This field";
    var named = label.querySelector("[data-i18n]");
    if (named) return named.textContent.replace(/\s+/g, " ").trim();
    var text = label.childNodes[0] ? label.childNodes[0].textContent : "";
    return text.replace(/\s+/g, " ").trim() || input.name;
  }

  function initForm() {
    var form = document.getElementById("booking-form");
    if (!form) return;
    form.setAttribute("novalidate", "");

    var params = new URLSearchParams(window.location.search);
    var preset = params.get("artist");
    var select = form.querySelector('[name="artist"]');
    if (preset && select) {
      var match = Array.prototype.find.call(select.options, function (opt) {
        return opt.value === preset;
      });
      if (match) select.value = preset;
    }

    var status = document.getElementById("form-status");

    function setInvalid(input, message) {
      var label = input.closest("label");
      if (!label) return;
      label.classList.add("is-invalid");
      var err = label.querySelector(".field-error");
      if (err) err.textContent = message;
      input.setAttribute("aria-invalid", "true");
    }

    function clearInvalid(input) {
      var label = input.closest("label");
      if (!label) return;
      label.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    }

    function validate() {
      var ok = true;
      var firstBad = null;
      form.querySelectorAll("input, select, textarea").forEach(function (input) {
        clearInvalid(input);
        if (input.type === "hidden") return;
        var value = (input.value || "").trim();
        var required = input.hasAttribute("required");
        var message = "";
        if (required && !value) message = t("form.required").replace("{label}", fieldLabel(input));
        else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = t("form.emailInvalid");
        }
        if (message) {
          setInvalid(input, message);
          ok = false;
          if (!firstBad) firstBad = input;
        }
      });
      if (firstBad) firstBad.focus();
      return ok;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        if (status) {
          status.classList.add("is-visible", "is-error");
          status.textContent = t("form.statusBad");
        }
        return;
      }

      var fd = new FormData(form);
      var artistText = t("form.artist.several");
      if (select && select.selectedIndex >= 0) artistText = select.options[select.selectedIndex].text;
      var eventText = fd.get("event") || "";
      var eventSelect = form.querySelector('[name="event"]');
      if (eventSelect && eventSelect.selectedIndex >= 0) eventText = eventSelect.options[eventSelect.selectedIndex].text;

      var lines = [
        t("form.inquiryHead"),
        "",
        t("form.name") + ": " + (fd.get("name") || ""),
        t("form.email") + ": " + (fd.get("email") || ""),
        t("form.org") + ": " + (fd.get("organization") || ""),
        t("form.event") + ": " + eventText,
        t("form.dates") + ": " + (fd.get("dates") || ""),
        t("form.venue") + ": " + (fd.get("venue") || ""),
        t("form.artist") + ": " + artistText,
        "",
        t("form.message") + ":",
        fd.get("message") || ""
      ];

      var mailto = "mailto:info@romanimusic.com?subject=" +
        encodeURIComponent(t("form.inquiryHead") + " — " + artistText) +
        "&body=" + encodeURIComponent(lines.join("\n"));

      if (status) {
        status.classList.remove("is-error");
        status.classList.add("is-visible");
        status.textContent = t("form.statusOk");
      }
      window.location.href = mailto;
    });

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      input.addEventListener("input", function () { clearInvalid(input); });
      input.addEventListener("change", function () { clearInvalid(input); });
    });
  }

  function initJoinForm() {
    var form = document.getElementById("join-form");
    if (!form) return;
    form.setAttribute("novalidate", "");
    var status = document.getElementById("join-form-status");

    function clearInvalid(input) {
      var label = input.closest("label");
      if (!label) return;
      label.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    }

    function markInvalid(input, message) {
      var label = input.closest("label");
      if (!label) return;
      label.classList.add("is-invalid");
      input.setAttribute("aria-invalid", "true");
      var error = label.querySelector(".field-error");
      if (error) error.textContent = message;
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var firstBad = null;
      form.querySelectorAll("input, textarea").forEach(function (input) {
        clearInvalid(input);
        var value = (input.value || "").trim();
        var message = "";
        if (input.hasAttribute("required") && !value) message = t("form.required").replace("{label}", fieldLabel(input));
        else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = t("form.emailInvalid");
        if (message) {
          markInvalid(input, message);
          if (!firstBad) firstBad = input;
        }
      });
      if (firstBad) {
        firstBad.focus();
        if (status) {
          status.className = "form-status is-visible is-error";
          status.textContent = t("join.statusBad");
        }
        return;
      }

      var fd = new FormData(form);
      var files = form.querySelector('[name="photos"]').files;
      var photoNames = files.length ? Array.prototype.map.call(files, function (file) { return file.name; }).join(", ") : "None selected";
      var lines = [
        t("join.subject"),
        "",
        t("form.name") + ": " + (fd.get("name") || ""),
        t("join.email") + ": " + (fd.get("email") || ""),
        t("join.phone") + ": " + (fd.get("phone") || ""),
        t("join.website") + ": " + (fd.get("website") || ""),
        t("join.photos") + ": " + photoNames,
        "",
        t("join.bio") + ":",
        fd.get("bio") || ""
      ];
      var mailto = "mailto:info@romanimusic.com?subject=" + encodeURIComponent(t("join.subject")) + "&body=" + encodeURIComponent(lines.join("\n"));
      if (status) {
        status.className = "form-status is-visible";
        status.textContent = t("join.statusOk");
      }
      window.location.href = mailto;
    });

    form.querySelectorAll("input, textarea").forEach(function (input) {
      input.addEventListener("input", function () { clearInvalid(input); });
      input.addEventListener("change", function () { clearInvalid(input); });
    });
  }

  if (window.RMBA && window.RMBA.applyI18n) window.RMBA.applyI18n(document);
  renderRoster();
  initStage();
  bindPageSwipe();
  initForm();
  initJoinForm();

  document.addEventListener("rmba:lang", function () {
    setOpen(false);
    renderRoster();
    if (window.RMBA.renderStage) window.RMBA.renderStage();
  });
})();
