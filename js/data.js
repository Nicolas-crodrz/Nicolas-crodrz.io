/* =========================================================
   Nicolás Cabrera Rodríguez — Portfolio · data.js
   Datos de los proyectos (separados de la lógica de interfaz)
   ========================================================= */

export const GITHUB = "https://github.com/Nicolas-crodrz";

export const CATS = ["Todos", "Apps", "Efectos", "3D", "Herramientas", "Backend"];

export const PROJECTS = [
  {
    name: "Taskify", cat: "Backend", icon: "fa-solid fa-list-check", accent: "#ff2d20",
    desc: "Gestor de tareas con Laravel: registro e inicio de sesión, creación y asignación de tareas, estados personalizables y un historial completo de acciones.",
    tech: ["Laravel", "PHP", "MySQL", "Blade"], repo: GITHUB + "/Taskify", live: null,
  },
  {
    name: "Game of Life", cat: "Efectos", icon: "fa-solid fa-dna", accent: "#00f733",
    desc: "El autómata celular de Conway sobre canvas con p5.js: cada generación evoluciona a partir de un estado inicial, sin necesidad de intervención.",
    tech: ["JavaScript", "p5.js", "Canvas", "SCSS"], repo: GITHUB + "/GAME-OF-LIFE", live: null,
  },
  {
    name: "Music Player", cat: "Apps", icon: "fa-solid fa-music", accent: "#ff2972",
    desc: "Reproductor de música con control de volumen, bucle, adelantar y retroceder pista, y reinicio desde el principio.",
    tech: ["JavaScript", "Audio API", "HTML", "CSS"], repo: GITHUB + "/MUSIC-PLAYER", live: null,
  },
  {
    name: "Calculator 3D", cat: "3D", icon: "fa-solid fa-calculator", accent: "#00e5ff",
    desc: "Calculadora con perspectiva 3D y tipografía digital. Interfaz con profundidad y botones con relieve.",
    tech: ["HTML", "SCSS", "JavaScript"], repo: GITHUB + "/CALCULATOR-3D", live: null,
  },
  {
    name: "Calculator Glass", cat: "Herramientas", icon: "fa-solid fa-calculator", accent: "#7c5dff",
    desc: "Calculadora con efecto glassmorphism e inclinación 3D al pasar el ratón.",
    tech: ["HTML", "CSS", "JavaScript"], repo: GITHUB + "/CALCULATOR-GLASS", live: null,
  },
  {
    name: "Calculator", cat: "Herramientas", icon: "fa-solid fa-calculator", accent: "#f9a825",
    desc: "Calculadora clásica construida con HTML y CSS puros, sin dependencias.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/CALCULATOR", live: null,
  },
  {
    name: "Cursor Effect", cat: "Efectos", icon: "fa-solid fa-arrow-pointer", accent: "#ffd600",
    desc: "Efecto de cursor personalizado que sigue al puntero con una estela suave.",
    tech: ["JavaScript", "CSS"], repo: GITHUB + "/CURSOR-EFFECT", live: null,
  },
  {
    name: "Infinity", cat: "Efectos", icon: "fa-solid fa-infinity", accent: "#00f733",
    desc: "Símbolo del infinito animado utilizando únicamente HTML y CSS, sin JavaScript.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/INFINITY", live: null,
  },
  {
    name: "Loading Neon", cat: "Efectos", icon: "fa-solid fa-spinner", accent: "#00e5ff",
    desc: "Indicador de carga con estética neón, animado con CSS.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/LOADING-NEON", live: null,
  },
  {
    name: "Loading Neon V2", cat: "Efectos", icon: "fa-solid fa-spinner", accent: "#ff2bd6",
    desc: "Segunda versión del indicador de carga neón, con un trazado más detallado.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/LOADING-NEON-V2", live: null,
  },
  {
    name: "Ribbon Shape", cat: "Efectos", icon: "fa-solid fa-tag", accent: "#ff5252",
    desc: "Cintas y banners decorativos aplicados sobre tarjetas con CSS puro.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/RIBBON-SHAPE", live: null,
  },
  {
    name: "Tree JavaScript", cat: "Efectos", icon: "fa-solid fa-tree", accent: "#4caf50",
    desc: "Generador de árboles procedurales dibujados de forma recursiva sobre canvas.",
    tech: ["JavaScript", "Canvas"], repo: GITHUB + "/TREE-JAVASCRIPT", live: null,
  },
  {
    name: "Text Bubble", cat: "Efectos", icon: "fa-solid fa-comment-dots", accent: "#03a9f4",
    desc: "Texto animado con burbujas circulares en movimiento sobre canvas.",
    tech: ["JavaScript", "Canvas"], repo: GITHUB + "/TEXT-BUBBLE", live: null,
  },
  {
    name: "Text Animation 2", cat: "Efectos", icon: "fa-solid fa-font", accent: "#ff9100",
    desc: "Animación tipográfica interactiva que reacciona al puntero.",
    tech: ["JavaScript", "Canvas"], repo: GITHUB + "/TEXT-ANIMATION-STYLE-2", live: null,
  },
  {
    name: "Particle Img", cat: "3D", icon: "fa-solid fa-image", accent: "#e040fb",
    desc: "Una imagen convertida en miles de partículas interactivas que reaccionan al ratón.",
    tech: ["JavaScript", "Canvas", "Partículas"], repo: GITHUB + "/PARTICLE-IMG", live: null,
  },
  {
    name: "Planet 3D", cat: "3D", icon: "fa-solid fa-globe", accent: "#7c4dff",
    desc: "Prototipo de escena 3D con Three.js: un planeta de partículas con anillos y control orbital.",
    tech: ["Three.js", "WebGL", "OrbitControls"], repo: null, live: null,
  },
  {
    name: "Reloj 3D", cat: "3D", icon: "fa-solid fa-clock", accent: "#04fc43",
    desc: "Reloj analógico y digital con volumen 3D, agujas animadas y marcadores luminosos.",
    tech: ["HTML", "CSS", "JavaScript"], repo: null, live: null,
  },
  {
    name: "Chat en tiempo real", cat: "Apps", icon: "fa-solid fa-comments", accent: "#00e676",
    desc: "Chat con Node.js y Socket.io: mensajería instantánea cliente-servidor con salas.",
    tech: ["Node.js", "Socket.io", "Express"], repo: GITHUB + "/CHAT", live: null,
  },
  {
    name: "Education App", cat: "Backend", icon: "fa-solid fa-graduation-cap", accent: "#ff2d20",
    desc: "Aplicación educativa construida con Laravel para la gestión de contenidos y usuarios.",
    tech: ["Laravel", "PHP", "MySQL"], repo: GITHUB + "/education-app", live: null,
  },
  {
    name: "Reddit Clone", cat: "Backend", icon: "fa-solid fa-comment-dots", accent: "#ff4500",
    desc: "Clon de Reddit con Laravel: publicaciones, votos y comentarios.",
    tech: ["Laravel", "PHP", "MySQL"], repo: GITHUB + "/Reddit", live: null,
  },
  {
    name: "News Portal", cat: "Backend", icon: "fa-solid fa-newspaper", accent: "#ff2d20",
    desc: "Portal de noticias con Laravel y panel de administración de contenidos.",
    tech: ["Laravel", "PHP", "MySQL"], repo: GITHUB + "/news-portal", live: null,
  },
  {
    name: "Vuelos", cat: "Backend", icon: "fa-solid fa-plane", accent: "#00acc1",
    desc: "App web de vuelos con backend en Node.js y base de datos MongoDB.",
    tech: ["Node.js", "MongoDB", "Express"], repo: GITHUB + "/vuelo", live: null,
  },
  {
    name: "Movie App", cat: "Apps", icon: "fa-solid fa-film", accent: "#61dafb",
    desc: "Aplicación de películas desarrollada con React y consumo de API.",
    tech: ["React", "JavaScript", "API"], repo: GITHUB + "/movieapp", live: null,
  },
  {
    name: "Star Wars Universe", cat: "Apps", icon: "fa-solid fa-star", accent: "#ffe81f",
    desc: "Explorador del universo Star Wars con JavaScript y datos de personajes y naves.",
    tech: ["JavaScript", "HTML", "CSS"], repo: GITHUB + "/Star-Wars-Universe", live: null,
  },
  {
    name: "Mundo Pokémon", cat: "Apps", icon: "fa-solid fa-dragon", accent: "#ffcb05",
    desc: "Pokédex / mundo Pokémon con fichas de criaturas y diseño colorido.",
    tech: ["HTML", "CSS", "JavaScript"], repo: GITHUB + "/Mundo-Pokemon", live: null,
  },
  {
    name: "Music Store", cat: "Apps", icon: "fa-solid fa-store", accent: "#1db954",
    desc: "Maquetación de una tienda de música con diseño responsive.",
    tech: ["HTML", "CSS"], repo: GITHUB + "/Music-store", live: null,
  },
  {
    name: "Walking Trails", cat: "Apps", icon: "fa-solid fa-person-hiking", accent: "#8bc34a",
    desc: "Aplicación sobre rutas de senderismo y experiencias al aire libre.",
    tech: ["JavaScript", "HTML", "CSS"], repo: GITHUB + "/Walking_Trails", live: null,
  },
  {
    name: "Multimedia", cat: "Apps", icon: "fa-solid fa-photo-film", accent: "#26c6da",
    desc: "Proyecto multimedia con JavaScript: galería y contenido audiovisual.",
    tech: ["JavaScript", "HTML", "CSS"], repo: GITHUB + "/Multimedia", live: null,
  },
  {
    name: "Bootstrap & React", cat: "Apps", icon: "fa-brands fa-react", accent: "#7952b3",
    desc: "Práctica de integración de Bootstrap con React y componentes reutilizables.",
    tech: ["React", "Bootstrap"], repo: GITHUB + "/A4.2-RM-Bootstrap-and-React", live: null,
  },
  {
    name: "PHP Function Finder", cat: "Herramientas", icon: "fa-solid fa-magnifying-glass", accent: "#777bb4",
    desc: "Buscador de funciones de PHP: consulta rápida de utilidades del lenguaje.",
    tech: ["HTML", "PHP"], repo: GITHUB + "/php-function-finder", live: null,
  },
];
