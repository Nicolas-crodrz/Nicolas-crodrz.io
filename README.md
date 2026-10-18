# Nicolás Cabrera Rodríguez · Portafolio

Sitio web personal (GitHub Pages) de **Nicolás Cabrera Rodríguez** — desarrollador web,
administrador de sistemas, ciberseguridad y formador de formadores / teleformación.

Sitio estático sin compilación: HTML + CSS + JavaScript puro, con **Three.js** cargado por CDN.

## ✨ Características

- **Escena 3D** interactiva en el hero (Three.js): núcleo, anillos orbitales, partículas y luces
  en movimiento. Se puede **arrastrar para rotar**.
- **Ventanas flotantes**: cada proyecto se abre en una ventana tipo escritorio que puedes
  **arrastrar, minimizar, maximizar, redimensionar y cerrar**. Incluye barra de tareas.
  El arrastre y el redimensionado se agrupan con `requestAnimationFrame` y el movimiento usa
  `transform` (compositor), así que va fluido.
- **Modo claro / oscuro** con botón en la barra de navegación, menú contextual y preferencia del
  sistema. Se guarda en `localStorage` y se aplica antes del pintado para evitar parpadeos.
- Animaciones al hacer scroll, contadores, máquina de escribir, barras de skills, cursor
  personalizado, menú contextual, marquee y efecto tilt 3D en las tarjetas.
- Diseño responsive y móvil cuidado (safe-areas, tipografías fluidas, ventanas a pantalla completa)
  y respeto por `prefers-reduced-motion`.

## ⚡ Rendimiento

Pensado para ir fluido incluso en equipos modestos:

- Sin `backdrop-filter`: los paneles son translúcidos pero no desenfocan lo que hay detrás
  (el desenfoque de fondo es lo que más cuesta al hacer scroll).
- Sin `filter: blur()` en los halos del fondo: son degradados radiales, que ya son suaves.
- La rejilla del fondo y los halos se animan con `transform` (compositor), no repintando.
- Un único listener de puntero para el tilt 3D (delegación) en lugar de uno por tarjeta.
- El cursor personalizado no mantiene un bucle permanente: se actualiza al mover el puntero.
- La escena 3D limita los fotogramas a ~60 fps, baja la resolución en pantallas pequeñas y se
  **pausa automáticamente** cuando el hero no está visible.
- En móvil se desactivan las animaciones de fondo a pantalla completa.

## 📁 Estructura

```
index.html          Página principal
css/style.css       Estilos (tema claro/oscuro con variables CSS)
js/app.js           Módulo principal: preloader, tema, scroll, proyectos, formulario…
js/data.js          Datos de los proyectos (nombre, categoría, tecnologías, enlaces…)
js/windows.js       Gestor de ventanas flotantes (arrastrar, minimizar, maximizar…)
js/hero3d.js        Escena 3D del hero (módulo ES con Three.js)
img/                Favicon, avatar e imagen de previsualización (Open Graph)
CNAME               Dominio personalizado de GitHub Pages
```

## 🌐 Dominio y publicación

El sitio se publica en **https://nicolas-crodrz.io** desde GitHub Pages.

El archivo `CNAME` de la raíz contiene el dominio personalizado. En GitHub hay que tener, en
**Settings → Pages**:

- **Source**: *Deploy from a branch*, rama `main` (o `gh-pages`), carpeta `/ (root)`.
- **Custom domain**: `nicolas-crodrz.io` (GitHub lo lee del `CNAME`).
- **Enforce HTTPS**: activado (el certificado se emite solo, tarda unos minutos).

En el DNS del dominio (en el registrador) deben existir:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `nicolas-crodrz.github.io` |

> Los metadatos (`canonical`, `og:url`, `og:image`…) ya apuntan a `https://nicolas-crodrz.io/`.

## ▶️ Ejecución local

Los módulos ES necesitan un servidor (no funciona abriendo el archivo con `file://`):

```bash
# con Node
npx serve .
# o con Python
python -m http.server 8000
```

Después abre `http://localhost:8000`.

## 🔗 Enlaces

- GitHub: https://github.com/Nicolas-crodrz
- Proyectos: https://github.com/Nicolas-crodrz?tab=repositories

---

© Nicolás Cabrera Rodríguez
