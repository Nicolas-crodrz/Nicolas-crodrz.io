/* =========================================================
   Nicolás Cabrera Rodríguez — Portfolio · windows.js
   Gestor de ventanas flotantes (sin dependencias).
   Arrastrar · minimizar · maximizar · redimensionar · cerrar
   Las operaciones se agrupan con requestAnimationFrame y el
   arrastre usa transform (compositor) para no forzar layout.
   ========================================================= */

export function createWindowManager({ mount, taskbar }) {
  let zTop = 9000;
  let cascade = 0;

  const idFor = (p) => "win-" + p.name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();

  const focus = (win) => { win.style.zIndex = String(++zTop); };

  function refreshTaskbar() {
    const minimized = [...mount.querySelectorAll(".win.is-min")];
    taskbar.innerHTML = minimized
      .map((win) => {
        const title = win.querySelector(".win-title")?.textContent.trim() || "Ventana";
        return `<button class="wm-chip" data-target="${win.id}"><i class="fa-solid fa-window-restore"></i> ${title}</button>`;
      })
      .join("");
    taskbar.classList.toggle("is-visible", minimized.length > 0);
  }

  function close(win) {
    if (win.classList.contains("is-closing")) return;
    win.classList.add("is-closing");
    window.setTimeout(() => {
      win.remove();
      refreshTaskbar();
    }, 230);
  }

  function restoreGeometry(win) {
    if (!win.dataset.geo) return;
    const g = JSON.parse(win.dataset.geo);
    win.style.left = g.left;
    win.style.top = g.top;
    win.style.width = g.width;
    win.style.height = g.height;
  }

  function toggleMax(win) {
    if (win.classList.contains("is-max")) {
      win.classList.remove("is-max");
      restoreGeometry(win);
    } else {
      win.dataset.geo = JSON.stringify({
        left: win.style.left, top: win.style.top,
        width: win.style.width, height: win.style.height,
      });
      win.classList.add("is-max");
    }
  }

  /* ---------- Arrastre (transform + rAF) ---------- */
  function makeDraggable(win) {
    const head = win.querySelector(".win-head");
    let sx = 0, sy = 0, ox = 0, oy = 0, lx = 0, ly = 0;
    let dragging = false;
    let raf = 0;

    const paint = () => {
      raf = 0;
      if (dragging) win.style.transform = `translate3d(${lx}px, ${ly}px, 0)`;
    };

    head.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button, a") || win.classList.contains("is-max")) return;
      dragging = true;
      win.classList.add("is-dragging");
      const r = win.getBoundingClientRect();
      ox = r.left; oy = r.top;
      sx = e.clientX; sy = e.clientY;
      lx = 0; ly = 0;
      head.setPointerCapture(e.pointerId);
      focus(win);
    });

    head.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      lx = e.clientX - sx;
      ly = e.clientY - sy;
      if (!raf) raf = requestAnimationFrame(paint);
    });

    const end = (e) => {
      if (!dragging) return;
      dragging = false;
      win.classList.remove("is-dragging");
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      win.style.transform = "";
      const nx = Math.max(-win.offsetWidth + 80, Math.min(window.innerWidth - 80, ox + lx));
      const ny = Math.max(0, Math.min(window.innerHeight - 44, oy + ly));
      win.style.left = nx + "px";
      win.style.top = ny + "px";
      try { head.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
    };

    head.addEventListener("pointerup", end);
    head.addEventListener("pointercancel", end);
  }

  /* ---------- Redimensionado (rAF) ---------- */
  function makeResizable(win) {
    const handle = win.querySelector(".win-resize");
    let sx = 0, sy = 0, w0 = 0, h0 = 0, nw = 0, nh = 0;
    let resizing = false;
    let raf = 0;

    const paint = () => {
      raf = 0;
      if (!resizing) return;
      win.style.width = nw + "px";
      win.style.height = nh + "px";
    };

    handle.addEventListener("pointerdown", (e) => {
      e.preventDefault();
      resizing = true;
      w0 = win.offsetWidth; h0 = win.offsetHeight;
      nw = w0; nh = h0;
      sx = e.clientX; sy = e.clientY;
      handle.setPointerCapture(e.pointerId);
      focus(win);
    });

    handle.addEventListener("pointermove", (e) => {
      if (!resizing) return;
      nw = Math.max(340, w0 + (e.clientX - sx));
      nh = Math.max(240, h0 + (e.clientY - sy));
      if (!raf) raf = requestAnimationFrame(paint);
    });

    const end = (e) => {
      if (!resizing) return;
      resizing = false;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      try { handle.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
    };

    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  /* ---------- Crear / abrir ---------- */
  function open(p) {
    const id = idFor(p);
    const existing = document.getElementById(id);
    if (existing) {
      existing.classList.remove("is-min");
      focus(existing);
      refreshTaskbar();
      return;
    }

    const tags = p.tech.map((t) => `<span class="p-tag">${t}</span>`).join("");
    const actions = [
      p.repo ? `<a class="btn btn-primary btn-sm" href="${p.repo}" target="_blank" rel="noopener"><i class="fa-brands fa-github"></i> Ver repositorio</a>` : "",
      p.live ? `<a class="btn btn-outline btn-sm" href="${p.live}" target="_blank" rel="noopener"><i class="fa-solid fa-up-right-from-square"></i> Ver en vivo</a>` : "",
    ].join("");

    const win = document.createElement("section");
    win.className = "win";
    win.id = id;
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", p.name);

    win.innerHTML = `
      <header class="win-head">
        <div class="win-dots">
          <button class="d-close" title="Cerrar" aria-label="Cerrar"></button>
          <button class="d-min" title="Minimizar" aria-label="Minimizar"></button>
          <button class="d-max" title="Maximizar" aria-label="Maximizar"></button>
        </div>
        <div class="win-title"><i class="${p.icon}"></i> ${p.name} <span class="win-cat">· ${p.cat}</span></div>
        <div class="win-tools">
          ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener" title="Ver código"><i class="fa-brands fa-github"></i></a>` : ""}
          <button data-close title="Cerrar"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </header>
      <div class="win-body">
        <div class="win-info">
          <span class="p-cat">${p.cat}</span>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="p-tags">${tags}</div>
          ${actions ? `<div class="win-actions">${actions}</div>` : ""}
        </div>
      </div>
      <div class="win-resize" title="Redimensionar"></div>`;

    mount.appendChild(win);

    if (window.innerWidth > 820) {
      const w = Math.min(700, window.innerWidth * 0.9);
      const h = Math.min(520, window.innerHeight * 0.78);
      const offset = (cascade++ % 5) * 26;
      win.style.width = w + "px";
      win.style.height = h + "px";
      win.style.left = Math.max(12, (window.innerWidth - w) / 2 + offset - 40) + "px";
      win.style.top = Math.max(76, (window.innerHeight - h) / 2 + offset - 30) + "px";
    }

    win.querySelector(".d-close").addEventListener("click", () => close(win));
    win.querySelector("[data-close]").addEventListener("click", () => close(win));
    win.querySelector(".d-min").addEventListener("click", () => {
      win.classList.add("is-min");
      refreshTaskbar();
    });
    win.querySelector(".d-max").addEventListener("click", () => toggleMax(win));
    win.querySelector(".win-head").addEventListener("dblclick", (e) => {
      if (!e.target.closest("button, a")) toggleMax(win);
    });
    win.addEventListener("pointerdown", () => focus(win));

    makeDraggable(win);
    makeResizable(win);

    focus(win);
    refreshTaskbar();
  }

  taskbar.addEventListener("click", (e) => {
    const chip = e.target.closest(".wm-chip");
    if (!chip) return;
    const win = document.getElementById(chip.dataset.target);
    if (!win) return;
    win.classList.remove("is-min");
    focus(win);
    refreshTaskbar();
  });

  // Escape cierra la ventana enfocada
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    const top = [...mount.querySelectorAll(".win")].sort(
      (a, b) => (+b.style.zIndex || 0) - (+a.style.zIndex || 0)
    )[0];
    if (top) close(top);
  });

  return { open };
}
