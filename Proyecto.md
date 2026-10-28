# Proyecto.md — BrightNest Cleaning (demo de portafolio)

> Nota de trabajo generada el 27-oct-2026 a partir de `AGENTS.md` y `README.md`
> (más una verificación mínima del código). No sustituye a esos documentos.

## Qué es la web

Demo estática de portafolio: sitio de una **empresa de limpieza residencial ficticia**
(EE. UU., todo el contenido visible en inglés). Pieza para mostrar trabajo front-end
a clientes internacionales.

- **Stack:** HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin dependencias,
  sin paso de build, sin backend y sin gestor de paquetes.
- **Archivos:**
  - `index.html` — todo el contenido; cada icono/ilustración es SVG inline (sin imágenes ni CDN de iconos).
  - `css/styles.css` — estilos responsive; los tokens de diseño (colores, fuentes, radios, sombras) viven en `:root` al inicio del archivo.
  - `js/main.js` — un solo IIFE con `defer`: menú móvil, efectos de scroll, animaciones de aparición, contadores y formulario demo.

**Cosas que son así a propósito (no "arreglar"):** el formulario nunca envía datos (valida en local y lo declara); los testimonios son ficticios y llevan sus marcas de demo visibles ("Demo review" + avisos); teléfono, email, estadísticas y precios son placeholder. Única referencia externa: Google Fonts (gratis, con fallback a fuentes del sistema).

## Cómo abrirla

1. **Doble clic (lo más simple):** abrir `index.html` en el navegador (Chrome, Firefox, Edge…). No requiere instalar nada.
2. **Servidor local:** dentro de esta carpeta, `python3 -m http.server 8000` y abrir `http://localhost:8000`.
3. **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server* (recarga al guardar).

Verificación mínima del JS: `node --check js/main.js` — **ejecutada el 27-oct-2026, pasa sin errores**.

## Tareas pendientes

### Problemas comprobados

- **Ninguno.** Ni `AGENTS.md` ni `README.md` documentan errores, y la única
  verificación disponible (`node --check js/main.js`) pasa correctamente.
- Importante: los elementos listados arriba como "a propósito" **no cuentan como
  problemas** — son diseño intencional de la demo (ver "Demo-only by design" en `AGENTS.md`).

### Mejoras propuestas (ideas, aún sin confirmar ni implementar)

- Prueba visual responsive en los breakpoints documentados: 860 px (menú móvil + hamburguesa), 900 px, 640 px y 480 px.
- Comprobar en navegador el estado sin JS y con `prefers-reduced-motion: reduce`: el contenido con `data-reveal` debe seguir siendo visible (la clase `.js` del `<head>` es la que activa las animaciones).
- Validación HTML/CSS con el validador del W3C (opcional, solo como control de calidad).
- Repasar visualmente el offset del header fijo en los saltos de ancla (`scroll-padding-top` en `html`).

Estas propuestas no están acordadas; decidir cuáles hacer antes de tocar código.

## Aviso al editar (gotchas clave)

- No renombrar los IDs de ancla `#home #services #about #testimonials #contact`: los usan nav, footer, skip link, CTAs y el JS de enlace activo.
- Cambiar colores/tipografías solo en las variables de `:root` de `styles.css`, nunca inline.
- No poner los contadores de estadísticas a `0` en el HTML: su valor final está en el HTML como fallback sin JS; el JS lo anima desde cero al entrar en vista.
- Toda animación debe respetar `prefers-reduced-motion` (hay un kill-switch global al final de `styles.css`).
- No añadir tracking, analytics ni servicios de pago de terceros.
