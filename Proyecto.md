# Proyecto.md — BrightNest Cleaning (demo de portafolio)

> Nota de trabajo. Creada el 27-oct-2026 a partir de `AGENTS.md` y `README.md`;
> actualizada el mismo día tras dos rondas de mejoras y verificación (ronda 1:
> enlaces "Choose this service", aviso demo, legibilidad; ronda 2: placeholders
> ≥4.5:1, formulario a prueba de "sin JavaScript", saltos y breakpoints).
> No sustituye a esos documentos.

## Qué es la web

Demo estática de portafolio: sitio de una **empresa de limpieza residencial ficticia**
(EE. UU., todo el contenido visible en inglés). Pieza para mostrar trabajo front-end
a clientes internacionales.

- **Stack:** HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin dependencias,
  sin paso de build, sin backend y sin gestor de paquetes.
- **Archivos:**
  - `index.html` — todo el contenido; cada icono/ilustración es SVG inline (sin imágenes ni CDN de iconos).
  - `css/styles.css` — estilos responsive; los tokens de diseño (colores, fuentes, radios, sombras) viven en `:root` al inicio del archivo.
  - `js/main.js` — un solo IIFE con `defer`: menú móvil, efectos de scroll, animaciones de aparición, contadores, formulario demo (blindado sin JS) y preselección de servicio desde las tarjetas.

**Cosas que son así a propósito (no "arreglar"):** el formulario nunca envía datos (valida en local y lo declara); los testimonios son ficticios y llevan sus marcas de demo visibles ("Demo review" + avisos); teléfono, email, estadísticas y precios son placeholder. Única referencia externa: Google Fonts (gratis, con fallback a fuentes del sistema).

## Cómo abrirla

1. **Doble clic (lo más simple):** abrir `index.html` en el navegador (Chrome, Firefox, Edge…). No requiere instalar nada.
2. **Servidor local:** dentro de esta carpeta, `python3 -m http.server 8000` y abrir `http://localhost:8000`.
3. **VS Code:** extensión *Live Server* → clic derecho en `index.html` → *Open with Live Server* (recarga al guardar).

## Cambios realizados — ronda 1 (27-oct-2026)

1. **Enlace "Choose this service" en las 6 tarjetas de servicios.**
   Cada tarjeta termina en un enlace (`a.card-link`, `href="#contact"`,
   `data-service="<texto exacto de la opción>"`). Al activarlo, `js/main.js`
   (sección 8) localiza en el `<select id="cf-service">` la opción cuyo texto
   coincide (sin distinguir mayúsculas) y la preselecciona; si el panel de éxito
   está abierto, restaura primero el formulario. Se reutilizan el ID y las
   opciones existentes — no se creó ninguna opción nueva. Sin JS, el enlace
   sigue llevando al formulario (mejora progresiva).
2. **Aviso demo en contacto.** La promesa de respuesta ("…we'll get back to you
   within one business day") se sustituyó por: **"Demo form — explore the
   experience. No information is sent."** Se mantienen la validación local, el
   recordatorio bajo el botón y el panel de éxito que declara que nada se envía.
3. **Legibilidad** (paleta y tonos intactos, solo más contraste): `--clr-muted`
   `#5c6b65` → `#4d5d56` (≈7:1 sobre blanco); placeholders oscurecidos;
   `.stat-label` 0.82 → 0.92 y `.stats-note` 0.55 → 0.75 de opacidad sobre el verde.

## Cambios realizados — ronda 2 (27-oct-2026)

1. **Placeholders a ≥4.5:1.** `#6f837b` (≈4.0:1) → **`#647770`**: medido sobre su
   fondo real (blanco del input) da **4.76:1** en los 4 campos con placeholder
   (nombre, email, teléfono, mensaje). Mismo tono verde-gris de la paleta; la
   jerarquía visual se conserva (tinta #15271f > placeholder #647770 > secundarios).
2. **Formulario a prueba de "JavaScript desactivado"** (problema comprobado y corregido):
   - **Evidencia previa al fix** (copia sin JS, eventos de usuario reales vía CDP):
     el botón `type="submit"` sin `action` hacía un submit GET → la URL quedaba
     `index.html?name=Maria+Lopez&email=maria%40example.com&…` y se generaban 2
     peticiones de red (recarga). Con Enter pasaba igual.
   - **Fix:** el botón es `type="button"` (sigue sin `action`) y `js/main.js`
     (sección 7) maneja clic y Enter (en inputs de una línea; el textarea conserva
     su salto de línea) ejecutando el mismo flujo: `checkValidity` →
     `reportValidity` si falla, panel de éxito si pasa. Con JS desactivado ya no
     existe ningún camino de envío.
   - Con JS activo se mantiene todo: validación nativa, panel de éxito con su
     declaración de que nada se envía, y botón "Send another demo request".
3. **Saltos tarjeta→contacto y menú:** verificados (sin necesidad de cambios; ver abajo).

## Estado de las comprobaciones

### Comprobado (Chrome headless, eventos de usuario reales vía CDP + batería en iframe)

- **Formulario sin JS** (copia del sitio sin los 2 `<script>`, 9/9 PASS):
  clic en el botón y Enter → **sin campos en la URL, sin navegación, sin
  peticiones de red**, formulario intacto y panel de éxito oculto.
- **Formulario con JS** (11/11 PASS): envío vacío (clic y Enter) → validación
  nativa sin panel; envío válido (clic y Enter) → panel de éxito; "Send another"
  restaura; **0 peticiones de red y 0 navegación** en todos los casos.
- **Batería general** (38/38 PASS): 6 enlaces de tarjeta → preselección correcta
  + `#contact` + foco en el select; botón `type=button` y sin `action`; panel de
  éxito con su texto demo; overflow 0 px a 390 px; avisos de empresa ficticia,
  badges "Demo review", disclaimer y notas intactos.
- **Salto tarjeta→contacto** (1280 px y 390 px, 8/8 PASS): tras el salto, la
  sección queda a ~88 px del borde con el header a 72 px (nada tapado, incluido
  el título del formulario); el foco aterriza en el select con su anillo visible
  dentro del viewport.
- **Anchos 900/860/640/480** (21/21 PASS): overflow horizontal 0 px en todos;
  a 900 px la nav sigue en fila (hamburguesa oculta); a 860/640/480 la
  hamburguesa abre el panel, el panel abierto no desborda y el clic en un enlace
  lo cierra; captura visual del panel a 860 px correcta.
- **Contraste de placeholders:** 4.76:1 en los 4 campos (≥4.5), verificado sobre
  el CSS servido y `getComputedStyle(el, "::placeholder")`.
- `node --check js/main.js` OK tras cada cambio.

### Pendiente

- Repetir la prueba "sin JS" (botón y Enter) en **Firefox y Safari**: solo se
  ha comprobado en Chrome. Tras el fix, el camino de envío ya no existe
  estructuralmente (no hay botón de submit ni `action`), pero conviene confirmarlo.
- Revisión visual completa de la página sin JavaScript (el estado del formulario
  ya está verificado; el render de `data-reveal` sin JS no se inspeccionó a ojo).
- (Idea, sin decidir) El CTA "Get my free quote" podría preseleccionar
  "Not sure yet" — la opción existe pero ninguna tarjeta la usa.

### Descartado por decisión

- Herramientas/validadores externos (W3C, etc.): no se añadirán; el proyecto se
  mantiene con verificación manual + CDP.

## Aviso al editar (gotchas clave)

- No renombrar los IDs de ancla `#home #services #about #testimonials #contact`: los usan nav, footer, skip link, CTAs y el JS de enlace activo.
- Cambiar colores/tipografías solo en las variables de `:root` de `styles.css`, nunca inline.
- **Acoplamiento tarjeta↔select:** los `data-service` se emparejan *por texto* con las opciones de `#cf-service` (sin distinguir mayúsculas). Si se renombra una opción, actualizar el `data-service` de su tarjeta ("Not sure yet" no tiene tarjeta).
- **No devolver el botón del formulario a `type="submit"`** ni añadir `action`: eso reintroduce el envío con JS desactivado (campos en la URL). El flujo vive en `main.js` sección 7 (clic + Enter).
- El color de placeholder (`#647770`, en la regla `::placeholder`) está calibrado a 4.76:1 sobre blanco: no aclararlo.
- No poner los contadores de estadísticas a `0` en el HTML: su valor final está en el HTML como fallback sin JS; el JS lo anima desde cero al entrar en vista.
- Toda animación debe respetar `prefers-reduced-motion` (hay un kill-switch global al final de `styles.css`).
- No añadir tracking, analytics ni servicios de pago de terceros. El formulario nunca enviará datos.
