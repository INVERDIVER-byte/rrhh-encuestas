# Encuestas RRHH

Sitio estático (GitHub Pages) para encuestas y captación de datos de RRHH. Las respuestas se guardan automáticamente en un Google Sheet.

## Estructura

```
rrhh-encuestas/
├── index.html                     → menú de formularios
├── primera-semana-labores.html    → encuesta de inducción
├── css/styles.css
├── js/
│   ├── config.js                  → URL del Apps Script
│   └── primera-semana-labores.js
└── google-apps-script/
    └── Code.gs                    → código para pegar en Google Apps Script
```

## Pasos para dejarlo funcionando

### 1. Google Sheets + Apps Script
1. Crea un Google Sheet nuevo con una pestaña llamada `PrimeraSemana`.
2. En la fila 1, agrega los encabezados de columnas (están listados al inicio de `Code.gs`).
3. Abre **Extensiones > Apps Script**, pega el contenido de `google-apps-script/Code.gs`.
4. Reemplaza `SHEET_ID` con el ID de tu hoja (lo encuentras en la URL del Sheet).
5. Click en **Deploy > New deployment**, tipo **Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Copia la URL que termina en `/exec`.

### 2. Configurar el sitio
1. Pega esa URL en `js/config.js`, reemplazando `PEGA_AQUI_TU_URL_DE_APPS_SCRIPT`.
2. Sube el repositorio a GitHub.
3. En el repo, ve a **Settings > Pages** y activa GitHub Pages (rama `main`, carpeta raíz).
4. Tu sitio quedará disponible en `https://<usuario>.github.io/<repo>/`.

## Agregar un nuevo formulario
Cada formulario nuevo (por ejemplo, el de datos de empleados) sigue el mismo patrón:
1. Un `.html` nuevo basado en `primera-semana-labores.html`.
2. Un `.js` propio en `js/` con la lógica de ese formulario.
3. Una pestaña nueva en el Sheet y su bloque `if` correspondiente en `Code.gs`.
4. Un enlace nuevo en `index.html`.
