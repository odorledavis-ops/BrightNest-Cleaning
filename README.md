# BrightNest Cleaning — Demo de portafolio

Sitio web demostrativo de una **empresa de limpieza residencial ficticia** (EE. UU., contenido en inglés),
creado como pieza de portafolio para mostrar trabajo front-end a clientes internacionales.

Construido **solo con HTML5, CSS3 y JavaScript vanilla**: sin frameworks, sin dependencias,
sin servicios de pago y sin backend.

## Cómo abrir la página

**Opción 1 — Doble clic (la más simple):**
Abre el archivo `index.html` con doble clic, o arrástralo a una ventana de tu navegador
(Chrome, Firefox, Edge…). Funciona sin instalar nada.

**Opción 2 — Servidor local (opcional):**
Si tienes Python instalado, dentro de esta carpeta ejecuta:

```bash
python3 -m http.server 8000
```

y abre `http://localhost:8000` en el navegador.

**Opción 3 — VS Code:**
Instala la extensión gratuita *Live Server*, clic derecho sobre `index.html` → *Open with Live Server*
(se recarga sola al guardar cambios).

## Estructura

```
primera-demo/
├── index.html        → todo el contenido de la página
├── css/
│   └── styles.css    → estilos, colores y diseño responsive
├── js/
│   └── main.js       → menú móvil, animaciones, formulario demo
├── AGENTS.md         → notas para asistentes de IA (OpenCode)
└── README.md         → este archivo
```

## Notas importantes (contenido de demostración)

- **El formulario no envía datos**: valida localmente y muestra un mensaje que lo aclara.
  No hay backend ni datos que salgan de tu navegador.
- **Los testimonios son ficticios** y están marcados como demo ("Demo review" + aviso visible).
- Teléfono, email, estadísticas y nombres son inventados, y la página lo declara en el
  aviso superior y en el pie.
- La única referencia externa es Google Fonts (gratis); si no hay internet, la página usa
  fuentes del sistema y se ve igual de bien.

## Personalización rápida

- Colores y tipografías: variables al inicio de `css/styles.css` (`:root { ... }`).
- Textos, servicios, precios y testimonios: directamente en `index.html`.
