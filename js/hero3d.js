/* =========================================================
   Nicolás Cabrera Rodríguez — Portfolio · hero3d.js
   Escena 3D del hero (Three.js) con núcleo, anillos y partículas
   ========================================================= */
const canvas = document.getElementById("heroCanvas");

(async () => {
  if (!canvas) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Comprobación básica de WebGL
  try {
    const test = document.createElement("canvas");
    const ok = !!(window.WebGLRenderingContext && (test.getContext("webgl") || test.getContext("experimental-webgl")));
    if (!ok) throw new Error("no webgl");
  } catch (e) {
    document.body.classList.add("no-webgl");
    return;
  }

  let THREE;
  try {
    THREE = await import("three");
  } catch (e) {
    document.body.classList.add("no-webgl");
    return;
  }

  /* ---------- Renderer / escena / cámara ---------- */
  const isSmall = window.innerWidth < 820;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isSmall, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.25 : 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
  camera.position.set(0, 0, 9.5);

  /* ---------- Grupos ---------- */
  const world = new THREE.Group();
  scene.add(world);

  /* ---------- Núcleo (icosaedro + wireframe) ---------- */
  const coreGeo = new THREE.IcosahedronGeometry(2.05, 1);

  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x0a1230,
    metalness: 0.92,
    roughness: 0.22,
    emissive: 0x0a4a66,
    emissiveIntensity: 1.1,
    flatShading: true,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  world.add(core);

  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreGeo),
    new THREE.LineBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.65 })
  );
  edges.scale.setScalar(1.004);
  world.add(edges);

  // Núcleo interior brillante
  const inner = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.05, 0),
    new THREE.MeshBasicMaterial({ color: 0x7c5cff, transparent: true, opacity: 0.85 })
  );
  world.add(inner);

  /* ---------- Halo suave (sprite) ---------- */
  function glowTexture(hex) {
    const s = 128;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(" + hex + ",0.85)");
    g.addColorStop(0.35, "rgba(" + hex + ",0.28)");
    g.addColorStop(1, "rgba(" + hex + ",0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    return new THREE.CanvasTexture(c);
  }
  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: glowTexture("0,240,255"), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  halo.scale.setScalar(11);
  world.add(halo);

  /* ---------- Anillos orbitales ---------- */
  const rings = [];
  const ringDefs = [
    { r: 3.1, tube: 0.012, color: 0x00f0ff, rot: [Math.PI / 2.4, 0, 0], speed: 0.35 },
    { r: 3.7, tube: 0.01, color: 0xff2bd6, rot: [Math.PI / 1.7, 0.6, 0], speed: -0.24 },
    { r: 4.4, tube: 0.008, color: 0x7c5cff, rot: [Math.PI / 3, -0.4, 0.6], speed: 0.16 },
  ];
  ringDefs.forEach((d) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(d.r, d.tube, 10, 90),
      new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.7 })
    );
    ring.rotation.set(d.rot[0], d.rot[1], d.rot[2]);
    ring.userData.speed = d.speed;
    world.add(ring);
    rings.push(ring);

    // satélite pequeño en el anillo
    const sat = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 12, 12),
      new THREE.MeshBasicMaterial({ color: d.color })
    );
    sat.userData.ring = d;
    sat.userData.t = Math.random() * Math.PI * 2;
    world.add(sat);
    ring.userData.sat = sat;
  });

  /* ---------- Campo de partículas ---------- */
  const COUNT = window.innerWidth < 700 ? 420 : 900;
  const positions = new Float32Array(COUNT * 3);
  const colors = new Float32Array(COUNT * 3);
  const palette = [new THREE.Color(0x00f0ff), new THREE.Color(0x7c5cff), new THREE.Color(0xff2bd6), new THREE.Color(0xb6ff3c)];

  for (let i = 0; i < COUNT; i++) {
    const radius = 5.5 + Math.random() * 14;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.75;
    positions[i * 3 + 2] = radius * Math.cos(phi);
    const col = palette[(Math.random() * palette.length) | 0];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const particles = new THREE.Points(
    pGeo,
    new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })
  );
  scene.add(particles);

  /* ---------- Luces ---------- */
  scene.add(new THREE.AmbientLight(0x2a3556, 1.1));

  const l1 = new THREE.PointLight(0x00f0ff, 55, 40);
  l1.position.set(6, 5, 6);
  scene.add(l1);

  const l2 = new THREE.PointLight(0xff2bd6, 45, 40);
  l2.position.set(-7, -4, 5);
  scene.add(l2);

  const l3 = new THREE.PointLight(0x7c5cff, 30, 40);
  l3.position.set(0, 6, -6);
  scene.add(l3);

  /* ---------- Interacción ---------- */
  const state = {
    rotX: 0.2,
    rotY: 0,
    velX: 0,
    velY: 0.0016,
    dragging: false,
    lastX: 0,
    lastY: 0,
    px: 0,
    py: 0,
  };

  function pointerDown(x, y) {
    state.dragging = true;
    state.lastX = x;
    state.lastY = y;
    canvas.style.cursor = "grabbing";
  }
  function pointerMove(x, y, isDrag) {
    if (state.dragging && isDrag) {
      const dx = x - state.lastX;
      const dy = y - state.lastY;
      state.rotY += dx * 0.006;
      state.rotX += dy * 0.006;
      state.velY = dx * 0.0016;
      state.velX = dy * 0.0016;
      state.lastX = x;
      state.lastY = y;
    }
    // parallax de cámara
    state.px = (x / window.innerWidth) * 2 - 1;
    state.py = (y / window.innerHeight) * 2 - 1;
  }
  function pointerUp() {
    state.dragging = false;
    canvas.style.cursor = "grab";
  }

  canvas.style.cursor = "grab";
  if (!window.matchMedia("(hover: none)").matches) {
    canvas.addEventListener("pointerdown", (e) => { canvas.setPointerCapture(e.pointerId); pointerDown(e.clientX, e.clientY); });
    canvas.addEventListener("pointermove", (e) => pointerMove(e.clientX, e.clientY, true));
    canvas.addEventListener("pointerup", pointerUp);
    canvas.addEventListener("pointercancel", pointerUp);
  }
  window.addEventListener("pointermove", (e) => { if (!state.dragging) pointerMove(e.clientX, e.clientY, false); }, { passive: true });

  /* ---------- Responsive ---------- */
  function resize() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const wide = w > 980;
    const small = w <= 720;
    world.position.set(wide ? 2.9 : 0, wide ? 0.1 : (small ? 0.55 : 1.2), 0);
    world.scale.setScalar(wide ? 1 : (small ? 0.66 : 0.78));
    halo.scale.setScalar(wide ? 11 : 8);
  }
  window.addEventListener("resize", resize);
  resize();

  /* ---------- Pausa inteligente ---------- */
  let visible = true;
  if ("IntersectionObserver" in window) {
    new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0.02 }).observe(canvas);
  }
  let docVisible = true;
  document.addEventListener("visibilitychange", () => { docVisible = !document.hidden; });

  /* ---------- Bucle ---------- */
  const clock = new THREE.Clock();
  const autoSpeed = reduceMotion ? 0 : 1;
  let lastFrame = 0;

  function animate(now) {
    requestAnimationFrame(animate);
    if (!visible || !docVisible) return;
    // Límite de fotogramas (~60 fps) para no fundir la GPU en pantallas de alta tasa
    if (now - lastFrame < 15) return;
    lastFrame = now;

    const t = clock.getElapsedTime();

    // Inercia
    if (!state.dragging) {
      state.rotY += state.velY;
      state.rotX += state.velX;
      state.velY *= 0.94;
      state.velX *= 0.94;
      state.rotY += 0.0016 * autoSpeed;
      // límite vertical suave
      state.rotX += (0.2 - state.rotX) * 0.012;
    }

    world.rotation.y = state.rotY;
    world.rotation.x = state.rotX;

    // Núcleo
    core.rotation.y = t * 0.18;
    core.rotation.x = t * 0.12;
    edges.rotation.copy(core.rotation);
    inner.rotation.y = -t * 0.5;
    inner.rotation.z = t * 0.3;
    const pulse = 1 + Math.sin(t * 1.6) * 0.05;
    inner.scale.setScalar(pulse);

    // Anillos
    rings.forEach((ring) => {
      ring.rotation.z += ring.userData.speed * 0.01;
      const sat = ring.userData.sat;
      sat.userData.t += 0.01 * (Math.abs(ring.userData.speed) + 0.4);
      const d = sat.userData.ring;
      const r = d.r;
      const p = new THREE.Vector3(r * Math.cos(sat.userData.t), r * Math.sin(sat.userData.t), 0);
      p.applyEuler(new THREE.Euler(d.rot[0], d.rot[1], d.rot[2]));
      sat.position.copy(p);
    });

    // Partículas
    particles.rotation.y = t * 0.03;
    particles.rotation.x = Math.sin(t * 0.06) * 0.08;

    // Luces orbitando
    l1.position.set(Math.cos(t * 0.5) * 7, 5, Math.sin(t * 0.5) * 7);
    l2.position.set(Math.cos(t * 0.4 + 2) * -7, -4, Math.sin(t * 0.4 + 2) * 6);

    // Parallax cámara
    camera.position.x += (state.px * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (-state.py * 0.7 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
  canvas.classList.add("is-ready");
})();
