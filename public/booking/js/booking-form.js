(function () {
  "use strict";

  var form = document.getElementById("booking-form");
  if (!form) return;

  // Own the checks when script runs. If this file fails to load, the browser
  // still enforces the required attributes before the mailto fallback.
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

  function fieldLabel(input) {
    var label = input.closest("label");
    if (!label) return input.name || "This field";
    var node = label.firstChild;
    var text = "";
    while (node) {
      if (node.nodeType === 1 && node.classList && node.classList.contains("field-error")) break;
      if (node.nodeType === 1 && /^(INPUT|SELECT|TEXTAREA)$/.test(node.tagName)) break;
      var chunk = node.textContent || "";
      if (chunk.replace(/\s+/g, " ").trim()) {
        text = chunk;
        break;
      }
      node = node.nextSibling;
    }
    return text.replace(/\s+/g, " ").trim() || input.name;
  }

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
    if (label) {
      label.classList.remove("is-invalid");
      input.removeAttribute("aria-invalid");
    }
    var box = input.closest("fieldset");
    if (box) {
      box.classList.remove("is-invalid");
      var err = box.querySelector(".field-error");
      if (err) err.textContent = "";
    }
  }

  function validate() {
    var ok = true;
    var firstBad = null;
    var fields = form.querySelectorAll("input, select, textarea");

    var seenRadio = {};
    fields.forEach(function (input) {
      clearInvalid(input);
      if (input.type === "hidden") return;
      if (input.type === "radio") {
        if (seenRadio[input.name]) return;
        seenRadio[input.name] = true;
        var group = form.querySelectorAll('input[type="radio"][name="' + input.name + '"]');
        var checked = form.querySelector('input[type="radio"][name="' + input.name + '"]:checked');
        var requiredGroup = Array.prototype.some.call(group, function (radio) {
          return radio.hasAttribute("required");
        });
        if (requiredGroup && !checked) {
          var box = input.closest("fieldset") || input.closest("label");
          if (box) {
            box.classList.add("is-invalid");
            var err = box.querySelector(".field-error");
            if (err) err.textContent = window.RMBA.t("form.travel") + " " + window.RMBA.t("form.required");
          }
          input.setAttribute("aria-invalid", "true");
          ok = false;
          if (!firstBad) firstBad = input;
        }
        return;
      }

      var value = (input.value || "").trim();
      var required = input.hasAttribute("required");
      var message = "";

      if (required && !value) {
        message = fieldLabel(input) + " " + window.RMBA.t("form.required");
      } else if (input.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        message = window.RMBA.t("form.badEmail");
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
        status.textContent = window.RMBA.t("form.check");
      }
      return;
    }

    var fd = new FormData(form);
    var travelInput = form.querySelector('input[name="travel"]:checked');
    var travelText = "";
    if (travelInput) {
      var travelLabel = travelInput.closest("label");
      var travelSpan = travelLabel ? travelLabel.querySelector("[data-i18n^='form.travel.']") : null;
      var travelLabelText = travelSpan ? travelSpan.textContent.replace(/\s+/g, " ").trim() : "";
      travelText = travelInput.value + (travelLabelText ? " — " + travelLabelText : "");
    }
    var artistText = window.RMBA.t("form.artist.several");
    if (select && select.selectedIndex >= 0) {
      artistText = select.options[select.selectedIndex].text;
    }

    var lines = [
      "Booking inquiry — Romani Music Booking Agency",
      "",
      "Name: " + (fd.get("name") || ""),
      "Email: " + (fd.get("email") || ""),
      "Organization: " + (fd.get("organization") || ""),
      "Event type: " + (fd.get("event") || ""),
      "Preferred dates: " + (fd.get("dates") || ""),
      "City / venue: " + (fd.get("venue") || ""),
      "Artist: " + artistText,
      "Travel arrangement: " + travelText,
      "",
      "Message:",
      fd.get("message") || ""
    ];

    var subject = "Booking inquiry — " + artistText;
    var mailto =
      "mailto:info@romanimusic.com?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(lines.join("\n"));

    if (status) {
      status.classList.remove("is-error");
      status.classList.add("is-visible");
      status.textContent = window.RMBA.t("form.ready");
    }

    window.location.href = mailto;
  });

  form.querySelectorAll("input, select, textarea").forEach(function (input) {
    input.addEventListener("input", function () { clearInvalid(input); });
    input.addEventListener("change", function () { clearInvalid(input); });
  });
})();
