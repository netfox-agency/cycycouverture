/* Couvreur — interactions */
(function () {
  "use strict";

  /* ---- Hero video: maximise l'autoplay (iOS strict, muet requis) ---- */
  const heroVideo = document.querySelector(".hero video");
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.setAttribute("muted", "");
    heroVideo.playsInline = true;
    const tryPlay = () => {
      const p = heroVideo.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    tryPlay();
    // Relance au 1er geste utilisateur (débloque après un mode économie d'énergie, etc.)
    ["touchstart", "pointerdown", "click", "scroll"].forEach((ev) =>
      window.addEventListener(ev, tryPlay, { once: true, passive: true })
    );
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) tryPlay();
    });
  }

  /* ---- Navbar scroll state ---- */
  const onScroll = () => {
    document.body.classList.toggle("nav-scrolled", window.scrollY > 20);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () =>
      document.body.classList.toggle("menu-open")
    );
    document.querySelectorAll(".mobile-menu a").forEach((a) =>
      a.addEventListener("click", () => document.body.classList.remove("menu-open"))
    );
  }

  /* ---- Reveal on scroll ---- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  /* ---- Quote form (Web3Forms — server-side lead capture, no mailto) ---- */
  const form = document.getElementById("devis-form");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const get = (k) => (new FormData(form).get(k) || "").toString().trim();
      const btn = form.querySelector('button[type="submit"]');
      const ok = form.querySelector(".form-success");
      const data = new FormData(form);
      data.set("subject", "🏠 Demande de devis toiture — " + get("prestation") + (get("ville") ? " — " + get("ville") : ""));
      data.set("from_name", "Site couvreur");
      const original = btn ? btn.innerHTML : "";
      if (btn) { btn.disabled = true; btn.textContent = "Envoi en cours…"; }
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        });
        const json = await res.json();
        if (!json.success) throw new Error(json.message || "submit failed");
        form.querySelectorAll(".field, .consent, .form-note, button[type='submit']").forEach((el) => (el.style.display = "none"));
        if (ok) {
          ok.style.display = "block";
          ok.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } catch (err) {
        if (btn) { btn.disabled = false; btn.innerHTML = original; }
        const fail = form.querySelector(".form-error");
        if (fail) fail.style.display = "block";
      }
    });
  }

  /* ---- Clickable service cards (data-href) ---- */
  document.querySelectorAll(".svc-card[data-href]").forEach((card) => {
    const go = () => {
      const href = card.getAttribute("data-href");
      if (href) window.location.href = href;
    };
    card.addEventListener("click", go);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    });
  });

  /* ---- Footer year ---- */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
