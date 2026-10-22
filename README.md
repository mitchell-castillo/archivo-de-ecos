# Archivo de Ecos

Juego original para Daily Games, 22 de octubre de 2026. Memoriza señales visuales en nueve balizas: tres capítulos en orden original y tres en orden inverso. Sin cuenta, anuncios, compras ni seguimiento.

## Jugar
Pulsa **Ver señal**, observa y reproduce con los botones o teclas 1–9. No hay límite para responder. Puedes repetir la señal, cambiar de capítulo o reiniciar el progreso con confirmación. Escape interrumpe la reproducción; ocultar la pestaña también la pausa. Los capítulos completados se guardan solo en el navegador. El juego sigue funcionando si el almacenamiento está bloqueado. No incluye audio.

## Desarrollo
Sin dependencias. Node 22 para ejecutar `npm run check` (sintaxis y pruebas unitarias). `npm start` sirve el directorio con Python 3. GitHub Pages puede servir la raíz de main directamente.

## Diseño y pruebas
Motor puro separado de la interfaz. Seis secuencias originales; memoria de orden y reversión, diferente de los juegos de órbitas, faro, jardinería y vías del catálogo. 23 pruebas unitarias cubren los seis capítulos, errores, reproducción, bloqueo de entrada, orden inverso y persistencia inválida. La portada SVG, los estilos y el código son originales de este proyecto.

## Privacidad y alcance
El único dato persistido es una lista de capítulos completados en localStorage (`daily-games:archivo-de-ecos:v1`). No se envía a servidores. Sin backend, formulario, contador global ni integración con buzón pendiente.
