/* =========================================================
   Nicolás Cabrera Rodríguez — Portfolio · app.js
   Orquesta la interfaz: preloader, cursor, tema, navegación,
   revelado, contadores, skills, proyectos y formulario.
   Los datos están en data.js y las ventanas en windows.js.
   ========================================================= */
import { CATS, PROJECTS } from "./data.js";
import { createWindowManager } from "./windows.js";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isTouch = window.matchMedia("(hover: none)").matches;
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
// Búsqueda insensible a mayúsculas y acentos ("pokemon" encuentra "Pokémon")
const normalize = (s) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

/* =======================================================
   1. PRELOADER (rápido, sin esperas artificiales)
   ======================================================= */
const preloader = $("#preloader");
const preloaderBar = $("#preloaderBar");
const preloaderPct = $("#preloaderPct");
let preloaderDone = false;

function finishPreloader() {
  if (preloaderDone || !preloader) return;
  preloaderDone = true;
  preloaderBar.style.width = "100%";
  preloaderPct.textContent = "100";
  preloader.classList.add("is-hidden");
  document.body.classList.add("loaded");
  window.setTimeout(() => preloader.remove(), 600);
}

if (preloader) {
  let progress = 0;
  const tick = window.setInterval(() => {
    progress = Math.min(100, progress + 20 + Math.random() * 25);
    preloaderBar.style.width = progress + "%";
    preloaderPct.textContent = String(Math.round(progress));
    if (progress >= 100) {
      window.clearInterval(tick);
      window.setTimeout(finishPreloader, 200);
    }
  }, 110);
  window.addEventListener("load", () => window.setTimeout(finishPreloader, 500));
}

/* =======================================================
   2. CURSOR PERSONALIZADO (sin bucle permanente)
   ======================================================= */
const dot = $("#cursorDot");
const ring = $("#cursorRing");

if (!isTouch && dot && ring) {
  let pending = false;
  let px = 0;
  let py = 0;

  window.addEventListener("pointermove", (e) => {
    px = e.clientX;
    py = e.clientY;
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      const t = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
      dot.style.transform = t;
      ring.style.transform = t;
      document.body.classList.add("cursor-ready");
    });
  }, { passive: true });

  document.addEventListener("pointerover", (e) => {
    const active = e.target.closest("a, button, input, textarea, .p-card, [data-tilt]");
    document.body.classList.toggle("cursor-hover", Boolean(active));
  });
}

/* =======================================================
   3. NAV · PROGRESO DE SCROLL (agrupado con rAF)
   ======================================================= */
const nav = $("#nav");
const navLinks = $("#navLinks");
const burger = $("#navBurger");
const scrollBar = $("#scrollBar");
const toTop = $("#toTop");

if (burger) {
  burger.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    burger.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (e) => {
    if (!e.target.closest("a")) return;
    navLinks.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  });
}

const sections = $$("main section[id]");
const navMap = new Map();
$$(".nav-link", navLinks).forEach((a) => navMap.set(a.getAttribute("href").slice(1), a));

let scrollQueued = false;

function updateScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  scrollBar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
  nav.classList.toggle("is-scrolled", y > 40);
  toTop.classList.toggle("is-visible", y > 600);

  let current = "home";
  for (const s of sections) {
    if (y >= s.offsetTop - window.innerHeight * 0.35) current = s.id;
  }
  navMap.forEach((a, id) => a.classList.toggle("is-active", id === current));
}

window.addEventListener("scroll", () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(() => {
    scrollQueued = false;
    updateScroll();
  });
}, { passive: true });

updateScroll();

toTop.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
);

/* =======================================================
   4. TEMA CLARO / OSCURO
   ======================================================= */
const root = document.documentElement;
const themeToggle = $("#themeToggle");
const themeIcon = $("#themeIcon");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function applyTheme(theme, persist) {
  root.setAttribute("data-theme", theme);
  if (themeIcon) themeIcon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.title = theme === "light" ? "Activar modo oscuro" : "Activar modo claro";
  }
  if (themeColorMeta) themeColorMeta.setAttribute("content", theme === "light" ? "#f2f5fc" : "#05070d");
  if (persist) {
    try { localStorage.setItem("ncr-theme", theme); } catch (_) { /* noop */ }
  }
}

applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark", false);

function toggleTheme() {
  applyTheme(root.getAttribute("data-theme") === "light" ? "dark" : "light", true);
}

if (themeToggle) themeToggle.addEventListener("click", toggleTheme);

const prefersLight = window.matchMedia("(prefers-color-scheme: light)");
const onSystemTheme = (e) => {
  let stored = null;
  try { stored = localStorage.getItem("ncr-theme"); } catch (_) { /* noop */ }
  if (!stored) applyTheme(e.matches ? "light" : "dark", false);
};
if (prefersLight.addEventListener) prefersLight.addEventListener("change", onSystemTheme);
else if (prefersLight.addListener) prefersLight.addListener(onSystemTheme);

/* =======================================================
   5. REVELADO AL HACER SCROLL
   ======================================================= */
const revealEls = $$("[data-reveal]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        window.setTimeout(() => entry.target.classList.add("is-visible"), Math.min(i * 60, 240));
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

/* =======================================================
   6. CONTADORES
   ======================================================= */
if ("IntersectionObserver" in window) {
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const duration = 1200;
      const start = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - start) / duration);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  $$("[data-count]").forEach((el) => countIO.observe(el));
}

/* =======================================================
   7. MÁQUINA DE ESCRIBIR
   ======================================================= */
const typedEl = $("#typed");
if (typedEl && !reduceMotion) {
  const roles = [
    "Desarrollador Web",
    "Administrador de Sistemas",
    "Técnico en Ciberseguridad",
    "Formador de Formadores",
    "Tutor de Teleformación",
  ];
  let ri = 0;
  let ci = 0;
  let deleting = false;
  const type = () => {
    const word = roles[ri];
    typedEl.textContent = word.slice(0, ci);
    if (!deleting && ci < word.length) { ci++; window.setTimeout(type, 70); }
    else if (!deleting) { deleting = true; window.setTimeout(type, 1500); }
    else if (ci > 0) { ci--; window.setTimeout(type, 34); }
    else { deleting = false; ri = (ri + 1) % roles.length; window.setTimeout(type, 320); }
  };
  type();
} else if (typedEl) {
  typedEl.textContent = "Desarrollador Web";
}

/* =======================================================
   8. BARRAS DE SKILLS
   ======================================================= */
if ("IntersectionObserver" in window) {
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelector(".bar-fill").style.width = entry.target.dataset.level + "%";
      barIO.unobserve(entry.target);
    });
  }, { threshold: 0.4 });
  $$(".bar").forEach((b) => barIO.observe(b));
}

/* =======================================================
   9. PROYECTOS · RENDER + FILTROS + BÚSQUEDA
   ======================================================= */
const grid = $("#projectsGrid");
const filtersEl = $("#filters");
const searchEl = $("#projectSearch");
const emptyEl = $("#projectsEmpty");

function cardHTML(p) {
  const tags = p.tech.map((t) => `<span class="p-tag">${t}</span>`).join("");
  const repoBtn = p.repo
    ? `<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Código</a>`
    : "";
  const search = normalize(p.name + " " + p.tech.join(" ") + " " + p.desc);
  return `
    <article class="p-card" data-tilt data-cat="${p.cat}" data-search="${search}" data-name="${p.name}">
      <div class="p-top">
        <span class="p-icon" style="background:${p.accent}22;color:${p.accent};border:1px solid ${p.accent}55"><i class="${p.icon}"></i></span>
        <div>
          <div class="p-name">${p.name}</div>
          <div class="p-cat">${p.cat}</div>
        </div>
      </div>
      <p class="p-desc">${p.desc}</p>
      <div class="p-tags">${tags}</div>
      <div class="p-actions">
        <button class="btn btn-outline" data-open="${p.name}"><i class="fa-solid fa-circle-info"></i> Detalles</button>
        ${repoBtn}
      </div>
    </article>`;
}

const byName = new Map(PROJECTS.map((p) => [p.name, p]));

if (grid) {
  grid.innerHTML = PROJECTS.map(cardHTML).join("");

  filtersEl.innerHTML = CATS.map(
    (c, i) => `<button class="filter-btn${i === 0 ? " is-active" : ""}" data-filter="${c}">${c}</button>`
  ).join("");

  const applyFilter = () => {
    const active = filtersEl.querySelector(".filter-btn.is-active")?.dataset.filter || "Todos";
    const q = normalize((searchEl.value || "").trim());
    let visible = 0;
    grid.querySelectorAll(".p-card").forEach((card) => {
      const show = (active === "Todos" || card.dataset.cat === active)
        && (!q || card.dataset.search.includes(q));
      card.hidden = !show;
      if (show) visible++;
    });
    emptyEl.hidden = visible !== 0;
  };

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filtersEl.querySelector(".filter-btn.is-active")?.classList.remove("is-active");
    btn.classList.add("is-active");
    applyFilter();
  });

  searchEl.addEventListener("input", applyFilter);
}

/* =======================================================
   10. VENTANAS FLOTANTES
   ======================================================= */
const windows = createWindowManager({ mount: $("#wm"), taskbar: $("#wmTaskbar") });

if (grid) {
  grid.addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest(".p-card");
    if (!card) return;
    const project = byName.get(card.dataset.name);
    if (project) windows.open(project);
  });
}

/* =======================================================
   11. TILT 3D (delegado, un único listener)
   ======================================================= */
function initTilt() {
  if (reduceMotion || isTouch) return;
  const MAX = 6;
  let el = null;
  let raf = 0;
  let rx = 0;
  let ry = 0;

  const paint = () => {
    raf = 0;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
  };

  document.addEventListener("pointermove", (e) => {
    const target = e.target.closest("[data-tilt]");
    if (target !== el) {
      if (el) el.style.transform = "";
      el = target;
    }
    if (!el) return;
    const r = el.getBoundingClientRect();
    rx = -(((e.clientY - r.top) / r.height) - 0.5) * MAX * 2;
    ry = (((e.clientX - r.left) / r.width) - 0.5) * MAX * 2;
    if (!raf) raf = requestAnimationFrame(paint);
  }, { passive: true });

  window.addEventListener("blur", () => {
    if (el) el.style.transform = "";
    el = null;
  });
}

/* =======================================================
   12. FORMULARIO DE CONTACTO
   ======================================================= */
const form = $("#contactForm");
const note = $("#formNote");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || "Contacto desde el portafolio";
    const message = form.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    form.email.classList.toggle("is-invalid", !emailOk);
    form.name.classList.toggle("is-invalid", !name);
    form.message.classList.toggle("is-invalid", !message);

    if (!name || !emailOk || !message) {
      note.textContent = "Revisa los campos marcados en rojo.";
      note.classList.add("is-error");
      return;
    }

    const body = `Nombre: ${name}%0AEmail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:cabrerarodriguezftv@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    note.classList.remove("is-error");
    note.textContent = "¡Gracias! Se abrirá tu cliente de correo para enviar el mensaje.";
    form.reset();
  });
}

/* =======================================================
   13. MENÚ CONTEXTUAL
   ======================================================= */
const ctx = $("#contextMenu");
document.addEventListener("contextmenu", (e) => {
  if (isTouch || e.target.closest("input, textarea, a, button, .win")) return;
  e.preventDefault();
  ctx.classList.add("is-open");
  ctx.style.left = Math.min(e.clientX, window.innerWidth - 220) + "px";
  ctx.style.top = Math.min(e.clientY, window.innerHeight - 210) + "px";
});
document.addEventListener("click", () => ctx.classList.remove("is-open"));
document.addEventListener("scroll", () => ctx.classList.remove("is-open"), { passive: true });
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") ctx.classList.remove("is-open");
});
$("#ctxTop").addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
);
const ctxTheme = $("#ctxTheme");
if (ctxTheme) ctxTheme.addEventListener("click", toggleTheme);

/* =======================================================
   14. EXTRAS
   ======================================================= */
$("#year").textContent = new Date().getFullYear();
requestAnimationFrame(initTilt);
