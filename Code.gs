// INSTRUCCIONES:
// 1. Crea un Google Sheet nuevo. Copia su ID (está en la URL, entre /d/ y /edit).
// 2. Ve a Extensiones > Apps Script y pega este código, reemplazando SHEET_ID.
// 3. En el Sheet, crea una pestaña llamada "PrimeraSemana" con esta fila de encabezados:
//    fechaEnvio | nombre | sucursal | puesto | fechaIngreso | quienRecibio | bienvenido |
//    calificacionRecepcion | curvaAprendizaje | actividadesAyuda | temasExplicarMejor |
//    supervisorPresento | retroalimentacion | apoyoSupervisor | funcionesCoinciden |
//    diferencias | recursosFaltantes | calificacionGeneral | mejoras
// 4. Deploy > New deployment > tipo "Web app".
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copia la URL generada (termina en /exec) y pégala en js/config.js del sitio.

const SHEET_ID = 'PEGA_AQUI_EL_ID_DE_TU_GOOGLE_SHEET';

const COLUMNS = [
  'fechaEnvio', 'nombre', 'sucursal', 'puesto', 'fechaIngreso', 'quienRecibio',
  'bienvenido', 'calificacionRecepcion', 'curvaAprendizaje', 'actividadesAyuda',
  'temasExplicarMejor', 'supervisorPresento', 'retroalimentacion', 'apoyoSupervisor',
  'funcionesCoinciden', 'diferencias', 'recursosFaltantes', 'calificacionGeneral', 'mejoras'
];

function doPost(e) {
  const data = JSON.parse(e.postData.contents);

  const tabName = data.formulario === 'PrimeraSemana' ? 'PrimeraSemana' : 'Respuestas';
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(tabName);

  const row = COLUMNS.map(col => data[col] || '');
  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
