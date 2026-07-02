/* =========================================================
   Hypnosis Journey — interactions
   ========================================================= */
(function () {
  "use strict";

  const header = document.getElementById("site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.getElementById("nav-list");

  /* --- Sticky header state --- */
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* --- Mobile nav toggle --- */
  if (navToggle && navList) {
    const closeNav = () => {
      navList.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    };
    navToggle.addEventListener("click", () => {
      const open = navList.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    navList.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeNav));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
  }

  /* --- Reveal on scroll --- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            entry.target.style.transitionDelay = (i % 4) * 80 + "ms";
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* --- Current year --- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* --- Contact form (client-side validation + graceful fallback) --- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form && status) {
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      status.className = "form-status";
      status.textContent = "";

      const name = form.name;
      const email = form.email;
      const message = form.message;
      let firstInvalid = null;

      [name, email, message].forEach((field) => {
        const empty = !field.value.trim();
        const badEmail = field === email && field.value.trim() && !emailRe.test(field.value.trim());
        if (empty || badEmail) {
          field.classList.add("invalid");
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.classList.remove("invalid");
        }
      });

      if (firstInvalid) {
        status.className = "form-status error";
        status.textContent = "Please fill in the required fields with a valid email.";
        firstInvalid.focus();
        return;
      }

      // No backend wired up yet — confirm receipt and reset.
      // Replace this block with a fetch() to your form endpoint when ready.
      status.className = "form-status success";
      status.textContent = "Thank you — your message is ready to send. We'll be in touch soon.";
      form.reset();
    });

    form.querySelectorAll("input, textarea").forEach((el) => {
      el.addEventListener("input", () => el.classList.remove("invalid"));
    });
  }
})();
