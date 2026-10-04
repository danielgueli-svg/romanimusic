/* Booking desk. Reached only from the footer logo. No artist list until the owner is signed in. */
(function () {
  var root = document.getElementById("desk");
  if (!root) return;

  var state = {
    session: null,
    artists: [],
    artist: null,
    month: currentMonth(),
    marks: {},
    open: null,
    error: "",
  };

  function currentMonth() {
    var parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Amsterdam",
      year: "numeric",
      month: "2-digit",
    }).formatToParts(new Date());
    var year = "";
    var month = "";
    for (var i = 0; i < parts.length; i++) {
      if (parts[i].type === "year") year = parts[i].value;
      if (parts[i].type === "month") month = parts[i].value;
    }
    return year + "-" + month;
  }

  function shiftMonth(ym, delta) {
    var year = Number(ym.slice(0, 4));
    var month = Number(ym.slice(5, 7));
    var next = new Date(Date.UTC(year, month - 1 + delta, 1));
    var mm = String(next.getUTCMonth() + 1);
    if (mm.length < 2) mm = "0" + mm;
    return next.getUTCFullYear() + "-" + mm;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function api(path, options) {
    var opts = options || {};
    opts.credentials = "same-origin";
    opts.headers = Object.assign({ accept: "application/json" }, opts.headers || {});
    return fetch(path, opts).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) {
          var error = new Error(data.error || "Request failed.");
          error.status = res.status;
          throw error;
        }
        return data;
      });
    });
  }

  function showError(error) {
    state.error = error && error.message ? error.message : "Request failed.";
    render();
  }

  function boot() {
    api("/booking/api/session").then(function (session) {
      state.session = session;
      state.error = "";
      if (session.role === "artist") {
        state.artist = session.slug;
        return loadCalendar();
      }
      return api("/booking/api/artists").then(function (body) {
        state.artists = body.artists || [];
        render();
      });
    }).catch(function (error) {
      if (error.status === 401) {
        state.session = null;
        state.error = "";
        render();
        return;
      }
      state.session = null;
      showError(error);
    });
  }

  function loadCalendar() {
    var query = "/booking/api/calendar?month=" + encodeURIComponent(state.month);
    if (state.session && state.session.role === "owner") {
      query += "&artist=" + encodeURIComponent(state.artist);
    }
    return api(query).then(function (body) {
      state.marks = {};
      (body.dates || []).forEach(function (row) {
        state.marks[row.date] = row;
      });
      state.error = "";
      if (state.open) return openDate(state.open);
      render();
    }).catch(showError);
  }

  function openDate(date) {
    state.open = date;
    var query = "/booking/api/dates/" + date;
    if (state.session && state.session.role === "owner") {
      query += "?artist=" + encodeURIComponent(state.artist);
    }
    return api(query).then(function (detail) {
      state.detail = detail;
      state.error = "";
      render();
    }).catch(showError);
  }

  function render() {
    root.textContent = "";
    var header = el("header", "desk-top");
    var home = el("a", "desk-home", "Romani Music Booking");
    home.href = "/booking/";
    header.appendChild(home);
    if (state.session) {
      var out = el("button", "desk-text-button", "Sign out");
      out.type = "button";
      out.addEventListener("click", signOut);
      header.appendChild(out);
    }
    root.appendChild(header);
    if (state.error) root.appendChild(el("p", "desk-error", state.error));
    if (!state.session) {
      renderLogin();
      return;
    }
    if (state.session.role === "owner" && !state.artist) {
      renderOwnerList();
      return;
    }
    renderCalendar();
  }

  function renderLogin() {
    var form = el("form", "desk-card");
    form.appendChild(el("h1", "desk-title", "Sign in"));
    var accountLabel = el("label", "desk-field");
    accountLabel.appendChild(el("span", null, "Email"));
    var account = el("input");
    account.name = "account";
    account.autocomplete = "username";
    account.required = true;
    accountLabel.appendChild(account);
    var passwordLabel = el("label", "desk-field");
    passwordLabel.appendChild(el("span", null, "Password"));
    var password = el("input");
    password.name = "password";
    password.type = "password";
    password.autocomplete = "current-password";
    password.required = true;
    passwordLabel.appendChild(password);
    form.appendChild(accountLabel);
    form.appendChild(passwordLabel);
    var submit = el("button", "desk-button", "Sign in");
    submit.type = "submit";
    form.appendChild(submit);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      state.error = "";
      api("/booking/api/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ account: account.value, password: password.value }),
      }).then(function () {
        boot();
      }).catch(showError);
    });
    root.appendChild(form);
  }

  function renderOwnerList() {
    var card = el("section", "desk-card");
    card.appendChild(el("h1", "desk-title", "Artists"));
    var list = el("ul", "desk-artists");
    state.artists.forEach(function (artist) {
      var item = el("li");
      var button = el("button", "desk-artist", artist.name);
      button.type = "button";
      button.addEventListener("click", function () {
        state.artist = artist.slug;
        state.open = null;
        state.detail = null;
        loadCalendar();
      });
      item.appendChild(button);
      list.appendChild(item);
    });
    card.appendChild(list);
    root.appendChild(card);
  }

  function renderCalendar() {
    var name = calendarName();
    var card = el("section", "desk-card");
    if (state.session.role === "owner") {
      var back = el("button", "desk-text-button", "All artists");
      back.type = "button";
      back.addEventListener("click", function () {
        state.artist = null;
        state.open = null;
        state.detail = null;
        render();
      });
      card.appendChild(back);
    }
    card.appendChild(el("h1", "desk-title", name));
    var nav = el("div", "desk-month");
    var prev = el("button", "desk-text-button", "Previous");
    prev.type = "button";
    prev.addEventListener("click", function () {
      state.month = shiftMonth(state.month, -1);
      state.open = null;
      state.detail = null;
      loadCalendar();
    });
    var next = el("button", "desk-text-button", "Next");
    next.type = "button";
    next.addEventListener("click", function () {
      state.month = shiftMonth(state.month, 1);
      state.open = null;
      state.detail = null;
      loadCalendar();
    });
    nav.appendChild(prev);
    nav.appendChild(el("p", "desk-month-label", state.month));
    nav.appendChild(next);
    card.appendChild(nav);

    var grid = el("div", "desk-grid");
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].forEach(function (label) {
      grid.appendChild(el("div", "desk-dow", label));
    });
    monthCells(state.month).forEach(function (date) {
      if (!date) {
        grid.appendChild(el("div", "desk-day desk-day--empty"));
        return;
      }
      var mark = state.marks[date];
      var classes = "desk-day";
      if (mark && mark.noteCount) classes += " desk-day--noted";
      if (mark && mark.blocked) classes += " desk-day--blocked";
      if (state.open === date) classes += " desk-day--open";
      var button = el("button", classes, date.slice(8));
      button.type = "button";
      var label = date;
      if (mark && mark.blocked) label += ", blocked";
      else if (mark && mark.noteCount) label += ", has notes";
      button.setAttribute("aria-label", label);
      button.addEventListener("click", function () { openDate(date); });
      grid.appendChild(button);
    });
    card.appendChild(grid);
    if (state.detail && state.open) card.appendChild(renderDetail());
    root.appendChild(card);
  }

  function calendarName() {
    if (state.session.role === "artist") return state.session.name;
    for (var i = 0; i < state.artists.length; i++) {
      if (state.artists[i].slug === state.artist) return state.artists[i].name;
    }
    return state.detail && state.detail.name ? state.detail.name : "";
  }

  function monthCells(ym) {
    var year = Number(ym.slice(0, 4));
    var month = Number(ym.slice(5, 7));
    var first = new Date(Date.UTC(year, month - 1, 1));
    var days = new Date(Date.UTC(year, month, 0)).getUTCDate();
    var lead = (first.getUTCDay() + 6) % 7;
    var cells = [];
    for (var i = 0; i < lead; i++) cells.push(null);
    for (var day = 1; day <= days; day++) {
      var dd = String(day);
      if (dd.length < 2) dd = "0" + dd;
      var mm = String(month);
      if (mm.length < 2) mm = "0" + mm;
      cells.push(year + "-" + mm + "-" + dd);
    }
    return cells;
  }

  function renderDetail() {
    var detail = state.detail;
    var panel = el("section", "desk-detail");
    panel.appendChild(el("h2", "desk-date", detail.date));
    if (detail.blocked) panel.appendChild(el("p", "desk-blocked", "Blocked"));
    panel.appendChild(el(
      "p",
      "desk-help",
      "A date is blocked only in consultation. An artist cannot block a date.",
    ));
    var list = el("ol", "desk-notes");
    (detail.notes || []).forEach(function (note) {
      var item = el("li");
      item.appendChild(el("span", "desk-note-author", note.author));
      item.appendChild(el("p", "desk-note-text", note.text));
      list.appendChild(item);
    });
    panel.appendChild(list);

    var form = el("form", "desk-note-form");
    var area = el("textarea");
    area.name = "text";
    area.required = true;
    area.maxLength = 1000;
    area.placeholder = "Set an option";
    form.appendChild(area);
    var add = el("button", "desk-button", "Add note");
    add.type = "submit";
    form.appendChild(add);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var payload = { text: area.value };
      if (state.session.role === "owner") payload.artist = state.artist;
      api("/booking/api/dates/" + detail.date + "/notes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }).then(function () {
        return loadCalendar();
      }).catch(showError);
    });
    panel.appendChild(form);

    if (state.session.role === "owner" && !detail.blocked && (detail.notes || []).length > 0) {
      var block = el("button", "desk-button desk-button--quiet", "Confirm block");
      block.type = "button";
      block.addEventListener("click", function () {
        api("/booking/api/dates/" + detail.date + "/block", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ artist: state.artist }),
        }).then(function () {
          return loadCalendar();
        }).catch(showError);
      });
      panel.appendChild(block);
    }
    return panel;
  }

  function signOut() {
    api("/booking/api/logout", { method: "POST" }).then(function () {
      state.session = null;
      state.artist = null;
      state.open = null;
      state.detail = null;
      state.artists = [];
      state.error = "";
      render();
    }).catch(showError);
  }

  boot();
})();
