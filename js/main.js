/* ==========================================================================
   BrightNest Cleaning — demo interactions
   Vanilla JavaScript · no dependencies · nothing is sent anywhere
   ========================================================================== */

(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");
  const toTop = document.querySelector(".to-top");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------
     1. Header shadow + back-to-top visibility (rAF-throttled scroll)
  --------------------------------------------------------------- */
  if (header || toTop) {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (header) header.classList.toggle("is-scrolled", y > 8);
      if (toTop) toTop.classList.toggle("is-visible", y > 600);
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------------
     2. Mobile navigation (hamburger)
  --------------------------------------------------------------- */
  if (header && navToggle && navList) {
    const closeNav = () => {
      header.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close when a link inside the panel is clicked
    navList.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNav();
    });

    // Close on Escape and return focus to the toggle
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && header.classList.contains("nav-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener("click", (event) => {
      if (header.classList.contains("nav-open") && !event.target.closest(".site-header")) {
        closeNav();
      }
    });

    // Reset state if the viewport grows past the mobile breakpoint
    const desktopMQ = window.matchMedia("(min-width: 861px)");
    const onDesktop = (mq) => { if (mq.matches) closeNav(); };
    if (typeof desktopMQ.addEventListener === "function") {
      desktopMQ.addEventListener("change", onDesktop);
    } else if (typeof desktopMQ.addListener === "function") {
      desktopMQ.addListener(onDesktop); // older Safari
    }
  }

  /* ---------------------------------------------------------------
     3. Demo-only links (footer social icons): no navigation
  --------------------------------------------------------------- */
  document.querySelectorAll("[data-demo-link]").forEach((link) => {
    link.addEventListener("click", (event) => event.preventDefault());
  });

  /* ---------------------------------------------------------------
     4. Highlight the nav link of the section in view
  --------------------------------------------------------------- */
  const sectionLinks = new Map();
  document.querySelectorAll('.nav-list a[href^="#"]').forEach((a) => {
    sectionLinks.set(a.getAttribute("href").slice(1), a);
  });

  if (sectionLinks.size && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const link = sectionLinks.get(entry.target.id);
        if (!link) return;
        sectionLinks.forEach((a) => a.classList.remove("is-active"));
        link.classList.add("is-active");
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sectionLinks.forEach((_, id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------------------------------------------------------------
     5. Reveal-on-scroll animations
  --------------------------------------------------------------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach((el) => revealObserver.observe(el));
    }
  }

  /* ---------------------------------------------------------------
     6. Animated stat counters (run once, respect reduced motion)
  --------------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-counter]");

  const runCounter = (el) => {
    const target = Number(el.dataset.counter || 0);
    const suffix = el.dataset.suffix || "";
    const format = (n) => n.toLocaleString("en-US") + suffix;

    // HTML ships with the final value (no-JS fallback); reset before animating.
    el.textContent = format(0);
    if (reduceMotion) {
      el.textContent = format(target);
      return;
    }

    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = format(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    };
    window.requestAnimationFrame(tick);
  };

  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach((el) => counterObserver.observe(el));
    }
  }

  /* ---------------------------------------------------------------
     7. Demo contact form — validates locally, sends NOTHING.
        The success message states this explicitly.
  --------------------------------------------------------------- */
  const form = document.getElementById("quote-form");
  const success = document.getElementById("form-success");

  if (form && success) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity(); // native messages, browser-translated
        return;
      }

      const rawName = form.elements["name"] ? form.elements["name"].value.trim() : "";
      const firstName = rawName.split(/\s+/)[0] || "friend";
      const nameEl = success.querySelector("[data-success-name]");
      if (nameEl) nameEl.textContent = firstName;

      form.hidden = true;
      success.hidden = false;
      success.focus();
    });

    const again = document.getElementById("form-again");
    if (again) {
      again.addEventListener("click", () => {
        success.hidden = true;
        form.hidden = false;
        form.reset();
        if (form.elements["name"]) form.elements["name"].focus();
      });
    }
  }

  /* ---------------------------------------------------------------
     8. Footer year, always current
  --------------------------------------------------------------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
