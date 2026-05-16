# 🔍 QA Relevamiento — Crivo S.R.L.

Relevamiento independiente de calidad sobre el sitio web [crivo.com.ar](https://crivo.com.ar), realizado en el rol de QA Engineer externo. El objetivo fue brindar un diagnóstico del estado actual del sitio, documentando bugs, proponiendo mejoras y entregando evidencia concreta al equipo de desarrollo y al cliente.

---

## 📌 Información del proyecto

| Campo | Detalle |
|---|---|
| **Cliente** | Crivo S.R.L. |
| **Sitio bajo prueba** | [https://crivo.com.ar](https://crivo.com.ar) |
| **Tipo de pruebas** | Manuales — Caja negra |
| **Entorno** | Producción |
| **Fecha de entrega** | Abril 2026 |
| **QA Engineer** | Damián Palla |

---

## 🎯 Alcance del relevamiento

El relevamiento abarcó las siguientes áreas:

- **Funcionalidad** — Navegación, formularios, integraciones y comportamiento general
- **UX / UI** — Experiencia de usuario, consistencia visual y propuestas de mejora
- **Responsividad** — Comportamiento del sitio en dispositivos móviles
- **SEO / Metadata** — Estructura de HTML, etiquetas `<title>`, `<meta>` y `canonical`

---

## 🛠️ Entorno de pruebas

| Entorno | Detalle |
|---|---|
| **Desktop** | Google Chrome v146.0.7680.178 |
| **Mobile (emulado)** | Chrome DevTools — viewport iPhone 14 Pro Max (430 × 932) |
| **Mobile (real)** | Samsung S22 Ultra — viewport 360 × 772 |
| **Datos de prueba** | Datos ficticios generados para formularios |

---

## 📋 Test Plan

El Test Plan está compuesto por **46 casos de prueba** distribuidos en 7 módulos, cubriendo todas las áreas del alcance definido.

🔗 [Ver Test Plan completo (Google Sheets)](https://docs.google.com/spreadsheets/d/tu-link-aqui)

### Resumen de ejecución por módulo

| Módulo | Casos de prueba | ✅ Aprobados | ❌ Fallidos | % Pasados |
|---|---|---|---|---|
| NAV — Navegación | 10 | 9 | 1 | 90% |
| FORM — Formularios | 7 | 5 | 2 | 71% |
| UI — Contenido y UI | 10 | 10 | 0 | 100% |
| PROD — Páginas de producto | 4 | 4 | 0 | 100% |
| RESP — Responsive | 6 | 3 | 3 | 50% |
| SEO — Metadata | 5 | 2 | 3 | 40% |
| INT — Integraciones | 4 | 4 | 0 | 100% |
| **TOTAL** | **46** | **37** | **9** | **~79%** |

---

## 🐛 Bugs encontrados

Se identificaron un total de **14 bugs** clasificados por severidad.

| Severidad | Cantidad |
|---|---|
| 🔴 Alta | 4 |
| 🟡 Media | 6 |
| 🟢 Baja | 4 |
| **Total** | **14** |

### Detalle de bugs

| Bug ID | Módulo | Título | Severidad |
|---|---|---|---|
| BUG-001 | NAV | Parpadeo del menú desplegable de productos al hacer hover | 🔴 Alta |
| BUG-002 | FORM | Sección Newsletter no visible si el usuario tiene un ad-blocker activo | 🔴 Alta |
| BUG-003 | NAV | Link "Productos" en el footer redirige a un endpoint con error y expone información sensible del servidor | 🔴 Alta |
| BUG-009 | NAV | Endpoint comentado en HTML expone información sensible del servidor | 🔴 Alta |
| BUG-004 | RESP | (Mobile) Elemento del footer desfasado generando scroll horizontal no deseado | 🟡 Media |
| BUG-005 | SEO | `<title>` idéntico en todos los endpoints/páginas del sitio | 🟡 Media |
| BUG-006 | PROD | Campo "Usos recomendados" en formato columna en varios endpoints de productos | 🟡 Media |
| BUG-007 | FORM | Formulario de cotización se envía exitosamente con campo "Tipo de producto" vacío | 🟡 Media |
| BUG-008 | FORM | Formulario de cotización se envía exitosamente con campo "Comentarios" vacío | 🟡 Media |
| BUG-014 | FORM | Mensaje de error genérico al ingresar un email inválido en el formulario de Contacto | 🟡 Media |
| BUG-010 | SEO | `<title>` contiene tilde incorrecta en la palabra "gráficos" | 🟢 Baja |
| BUG-011 | PROD | Nombre del producto "Lona Backlight 15 oz" no coincide con las onzas indicadas en Características (13 oz) | 🟢 Baja |
| BUG-012 | PROD | Nombre en card de "Bicapa" difiere del nombre en el detalle del producto | 🟢 Baja |
| BUG-013 | PROD | Nombre en card de "Prensa" difiere del nombre en el detalle del producto | 🟢 Baja |

> Los bug reports completos, con pasos para reproducir, resultado esperado, resultado obtenido y evidencia (capturas y videos), se encuentran en el repositorio de documentación.

---

## 💡 Propuestas de mejora

Además de los bugs, se identificaron oportunidades de mejora en las siguientes áreas:

### Sección "Contacto"
- Envío automático de mensaje por WhatsApp al cliente al completar el formulario de cotización (con variables personalizadas o mensaje genérico)
- Hacer obligatorio el campo "Tipo de producto" para mejorar la personalización de la atención y obtener métricas de consultas
- Autocompletar el campo "Tipo de producto" cuando el formulario se abre desde la página de detalle de un producto

### Sección "Newsletter"
- Reemplazar el mensaje de confirmación de suscripción por un pop-up más visible para reducir la tasa de abandono del proceso

### Sección "Home"
- Alinear imágenes y botones de los productos en la sección "Nuestros insumos"

### Sección "Productos"
- Agregar imágenes de fondo en las cards de productos
- Alinear botones "Ver producto" en todas las cards
- Agregar delay de al menos 1 segundo en el cierre del menú desplegable de productos
- Corregir el formato del campo "Usos recomendados" para que ocupe el ancho completo de la tabla
- Implementar lightbox para ver imágenes de productos en tamaño ampliado
- Agregar "Vinilos Graphitac" como categoría independiente en el nav-menu

### Vista Mobile
- Aumentar el tamaño y reposicionar las flechas de navegación de imágenes en detalle de producto
- Habilitar zoom en mobile (`user-scalable=yes` o configuración equivalente para Safari)

### SEO
- Definir `<title>` único y descriptivo para cada endpoint/página
- Incorporar palabras clave en los elementos `<h1>` de cada página
- Corregir la etiqueta `canonical` para que cada endpoint apunte a sí mismo y no al home
- Personalizar el `<meta name="description">` para cada producto o sección

---

## 📁 Documentación del proyecto

| Recurso | Link |
|---|---|
| 📊 Test Plan y Bug Reports | [Google Drive](https://drive.google.com/tu-link-aqui) |
| 🎨 Propuestas UX/UI | [Figma](https://www.figma.com/board/X1dLCJ6DTrBBwILGjPU7RT/FigJam-Basics?node-id=0-1&p=f&t=CiRG2TcZdlKFnPSV-0) |
| 📹 Evidencia de bugs | Carpeta adjunta en Drive (capturas y videos por bug) |

---

## 🗂️ Estructura del repositorio

```
📦 qa-relevamiento-crivo/
├── 📄 README.md
├── 📊 TestPlan_Crivo.xlsx          # Test Plan con casos de prueba y bug reports
├── 📄 Crivo_SRL_Relevamiento.pdf   # Reporte final del relevamiento
└── 📁 evidencia/                   # Capturas y videos por bug (ver Drive)
```

---

## ⚙️ Metodología

- Las pruebas fueron ejecutadas de forma **manual** en entorno de **producción**, sin participación previa en el desarrollo del sitio.
- Los casos de prueba siguen una nomenclatura estructurada: `TC-[MÓDULO]-[NRO]` (ej: `TC-NAV-001`).
- Los bugs están vinculados a sus casos de prueba relacionados y clasificados por severidad: **Alta**, **Media** y **Baja**.
- Cada bug cuenta con: descripción, pasos para reproducir, resultado esperado, resultado obtenido y evidencia visual.
- Las propuestas de mejora de UX/UI fueron complementadas con mockups en Figma.

---

## 👤 Autor

**Damián Palla** — QA Engineer  
[LinkedIn](https://www.linkedin.com/in/tu-perfil) · [GitHub](https://github.com/tu-usuario)
