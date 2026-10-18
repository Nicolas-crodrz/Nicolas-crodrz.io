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
CNAME               Dominio personalizado de GitHub Pages (pendiente de reactivar)
```

## 🌐 Dominio y publicación

El sitio está publicado con GitHub Pages en:

**https://nicolas-crodrz.github.io/Nicolas-crodrz.io/**

> 📌 **La ruta de GitHub Pages distingue mayúsculas y minúsculas.** La URL depende del nombre exacto
> del repositorio, que es **`Nicolas-crodrz.io`** (con `N` mayúscula). Por eso
> `/Nicolas-crodrz.io/` funciona y `/nicolas-crodrz.io/` devuelve 404. Si algún día se renombra el
> repositorio, hay que actualizar `canonical`, `og:url`, `og:image` y `twitter:image` en `index.html`.

### Estado del dominio `nicolas-crodrz.io`

⚠️ **El dominio `nicolas-crodrz.io` todavía no existe en DNS** (el registro `.io` devuelve
NXDOMAIN y su RDAP responde 404), así que hoy **no está registrado o no tiene nameservers**.
Mientras eso no se resuelva, el sitio se sirve en la URL de GitHub indicada arriba.

Para pasar al dominio propio hay que hacer, en este orden:

1. **Registrar `nicolas-crodrz.io`** en un registrador de dominios `.io`.
2. **Crear el DNS**:

| Tipo | Nombre | Valor |
| --- | --- | --- |
| `A` | `@` | `185.199.108.153` |
| `A` | `@` | `185.199.109.153` |
| `A` | `@` | `185.199.110.153` |
| `A` | `@` | `185.199.111.153` |
| `CNAME` | `www` | `nicolas-crodrz.github.io` |

3. **Volver a añadir el archivo `CNAME`** en la raíz con el contenido `nicolas-crodrz.io`
   y hacer push. En *Settings → Pages* tiene que quedar *Source = Deploy from a branch*, rama
   `main`, carpeta `/ (root)`, dominio `nicolas-crodrz.io` y **Enforce HTTPS** activado.

> ⚠️ En cuanto exista el `CNAME`, GitHub sirve el sitio **solo** en ese dominio: si el DNS aún no
> resuelve, la URL `*.github.io` deja de funcionar (da 404). Por eso ahora mismo **no** está.
>
> Al reactivar el dominio hay que actualizar también `canonical`, `og:url`, `og:image` y
> `twitter:image` en `index.html`, que hoy apuntan a la URL de GitHub.

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
