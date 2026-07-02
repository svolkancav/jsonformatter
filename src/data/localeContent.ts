export type Locale = 'de' | 'es';

export interface LocaleDef {
  locale: Locale;
  key: string; // stable tool key (shared across languages)
  slug: string; // path under /{locale}/
  title: string;
  description: string;
  keywords: string;
  h1: string;
  tagline: string;
  intro: string[];
  steps: string[];
  faqs: { q: string; a: string }[];
}

// UI section labels per locale.
export const UI_LABELS: Record<Locale, { whatIs: string; howTo: string; faq: string; other: string; hubTitle: string; hubTagline: string; openTool: string }> = {
  de: {
    whatIs: 'Was ist das?',
    howTo: 'Anleitung',
    faq: 'Häufig gestellte Fragen',
    other: 'Weitere Tools',
    hubTitle: 'Kostenlose JSON-Tools (Deutsch)',
    hubTagline: 'JSON formatieren, anzeigen und konvertieren — kostenlos und komplett im Browser.',
    openTool: 'Tool öffnen',
  },
  es: {
    whatIs: '¿Qué es?',
    howTo: 'Cómo usarlo',
    faq: 'Preguntas frecuentes',
    other: 'Otras herramientas',
    hubTitle: 'Herramientas JSON gratis (Español)',
    hubTagline: 'Formatea, visualiza y convierte JSON — gratis y 100% en tu navegador.',
    openTool: 'Abrir herramienta',
  },
};

export const localeTools: LocaleDef[] = [
  // ---------------- German ----------------
  {
    locale: 'de',
    key: 'formatter',
    slug: 'json-formatierer',
    title: 'JSON Formatierer | Kostenloses Online-Tool zum Formatieren von JSON',
    description: 'Kostenloser Online-JSON-Formatierer. Formatieren, verschönern und validieren Sie JSON sofort. Alles läuft in Ihrem Browser.',
    keywords: 'json formatierer, json formatieren, json verschönern, json validieren, online json formatierer',
    h1: 'JSON Formatierer',
    tagline: 'Formatieren, verschönern und validieren Sie Ihre JSON-Daten sofort — übersichtlich und lesbar.',
    intro: [
      'JSON ist das Standardformat für APIs und Konfigurationsdateien, kommt vom Server aber oft als eine unlesbare Zeile. Ein JSON-Formatierer wandelt diesen komprimierten Text in eine sauber eingerückte, gut lesbare Struktur um.',
      'Das Tool validiert außerdem Ihr JSON und zeigt Syntaxfehler mit ihrer genauen Position an. Alles läuft in Ihrem Browser — Ihre Daten werden niemals hochgeladen.',
    ],
    steps: [
      'Fügen Sie Ihr JSON in das Eingabefeld ein.',
      'Klicken Sie auf „Formatieren“, um es einzurücken.',
      'Beheben Sie eventuelle Fehler anhand der markierten Meldung.',
      'Kopieren oder laden Sie das Ergebnis herunter.',
    ],
    faqs: [
      { q: 'Ist der JSON-Formatierer kostenlos?', a: 'Ja, völlig kostenlos, ohne Anmeldung und ohne Limit — auch für kommerzielle Projekte.' },
      { q: 'Sind meine Daten sicher?', a: 'Ja. Die gesamte Verarbeitung erfolgt in Ihrem Browser; es werden keine Daten hochgeladen oder gespeichert.' },
      { q: 'Kann es große Dateien verarbeiten?', a: 'Ja, auch mehrere Megabyte große JSON-Dateien werden problemlos verarbeitet.' },
    ],
  },
  {
    locale: 'de',
    key: 'viewer',
    slug: 'json-betrachter',
    title: 'JSON Viewer (Betrachter) | Kostenloses Online-Tool',
    description: 'Kostenloser Online-JSON-Viewer. Zeigen Sie Ihre JSON-Daten als übersichtliche Baumstruktur an. Schnell, sicher und im Browser.',
    keywords: 'json viewer deutsch, json betrachter, json baumansicht, json anzeigen online',
    h1: 'JSON Viewer',
    tagline: 'Zeigen Sie Ihre JSON-Daten als übersichtliche, aufklappbare Baumstruktur an.',
    intro: [
      'Bei großen JSON-Dokumenten ist reiner Text schwer zu überblicken. Ein JSON-Viewer stellt die Daten als aufklappbare Baumstruktur dar, sodass Sie gezielt navigieren können.',
      'Ideal, um die Struktur unbekannter Daten zu verstehen. Alles läuft in Ihrem Browser; nichts wird hochgeladen.',
    ],
    steps: [
      'Fügen Sie Ihr JSON ein.',
      'Die Daten werden automatisch formatiert angezeigt.',
      'Klappen Sie Objekte und Arrays auf oder zu.',
      'Kopieren Sie den benötigten Abschnitt.',
    ],
    faqs: [
      { q: 'Was ist der Unterschied zum Formatierer?', a: 'Der Formatierer gibt eingerückten Text aus; der Viewer bietet eine interaktive Baumansicht, die bei großen Daten besser skaliert.' },
      { q: 'Bleiben meine Daten privat?', a: 'Ja, der Viewer läuft im Browser und sendet nichts an einen Server.' },
      { q: 'Ist es kostenlos?', a: 'Ja, völlig kostenlos und ohne Limit.' },
    ],
  },
  {
    locale: 'de',
    key: 'json-to-csv',
    slug: 'json-zu-csv',
    title: 'JSON zu CSV Konverter | Kostenloses Online-Tool',
    description: 'Kostenloser Online-Konverter von JSON zu CSV. Wandeln Sie ein JSON-Array sofort in sauberes CSV um — Schlüssel werden Spalten, Objekte werden Zeilen.',
    keywords: 'json zu csv, json in csv, json csv konverter, json nach csv umwandeln',
    h1: 'JSON zu CSV Konverter',
    tagline: 'Wandeln Sie ein JSON-Array sofort in sauberes CSV um — ideal für Excel und Datenbank-Importe.',
    intro: [
      'CSV wird von nahezu jeder Tabellenkalkulation und Datenbank verstanden. Die Umwandlung eines JSON-Arrays in CSV ermöglicht den Import ohne eine Zeile Code.',
      'Jedes Objekt wird zu einer Zeile, jeder Schlüssel zu einer Spalte; Werte mit Kommas oder Anführungszeichen werden automatisch maskiert. Alles läuft im Browser.',
    ],
    steps: [
      'Fügen Sie Ihr JSON-Array ein.',
      'Klicken Sie auf „Konvertieren“.',
      'Schlüssel werden zur Kopfzeile, jedes Objekt zu einer Zeile.',
      'Kopieren Sie das Ergebnis oder laden Sie die .csv-Datei herunter.',
    ],
    faqs: [
      { q: 'Welche JSON-Struktur funktioniert am besten?', a: 'Ein Array flacher Objekte mit einheitlichen Schlüsseln ergibt das sauberste CSV.' },
      { q: 'Wie werden Kommas in Werten behandelt?', a: 'Werte mit Kommas oder Anführungszeichen werden gemäß CSV-Standard automatisch in Anführungszeichen gesetzt.' },
      { q: 'Sind meine Daten privat?', a: 'Ja, die Umwandlung erfolgt vollständig in Ihrem Browser.' },
    ],
  },
  {
    locale: 'de',
    key: 'json-to-excel',
    slug: 'json-zu-excel',
    title: 'JSON zu Excel Konverter | Kostenloses Online-Tool',
    description: 'Kostenloser Online-Konverter von JSON zu Excel. Wandeln Sie JSON-Daten sofort in eine .xlsx-Tabelle um. Schnell, sicher und im Browser.',
    keywords: 'json zu excel, json in excel, json excel konverter, json nach xlsx',
    h1: 'JSON zu Excel Konverter',
    tagline: 'Wandeln Sie Ihre JSON-Daten sofort in eine Excel-Tabelle (.xlsx) um.',
    intro: [
      'JSON ist ideal für Maschinen, aber wenn Sie Daten mit Kolleginnen und Kollegen teilen möchten, ist eine Tabelle zugänglicher. Die Umwandlung von JSON in Excel erzeugt sortier- und filterbare Zeilen und Spalten.',
      'Das Tool ordnet Ihre JSON-Struktur automatisch Spalten zu und erzeugt eine .xlsx-Datei. Alles läuft im Browser; nichts wird hochgeladen.',
    ],
    steps: [
      'Fügen Sie Ihr JSON (meist ein Array von Objekten) ein.',
      'Die Schlüssel werden als Spaltenüberschriften erkannt.',
      'Klicken Sie auf Konvertieren/Herunterladen.',
      'Öffnen Sie die .xlsx-Datei in Excel oder Google Sheets.',
    ],
    faqs: [
      { q: 'Welche JSON-Struktur eignet sich am besten?', a: 'Ein Array flacher Objekte lässt sich am saubersten umwandeln: jedes Objekt eine Zeile, jeder Schlüssel eine Spalte.' },
      { q: 'Welches Dateiformat erhalte ich?', a: 'Eine standardmäßige .xlsx-Datei, die sich in Excel, Google Sheets und LibreOffice öffnen lässt.' },
      { q: 'Werden meine Daten hochgeladen?', a: 'Nein, die gesamte Umwandlung erfolgt in Ihrem Browser.' },
    ],
  },

  // ---------------- Spanish ----------------
  {
    locale: 'es',
    key: 'formatter',
    slug: 'formateador-json',
    title: 'Formateador JSON | Herramienta Online Gratis para Formatear JSON',
    description: 'Formateador JSON online gratis. Formatea, embellece y valida JSON al instante. Todo se ejecuta en tu navegador.',
    keywords: 'formateador json, formatear json, embellecer json, validar json, formateador json online',
    h1: 'Formateador JSON',
    tagline: 'Formatea, embellece y valida tus datos JSON al instante — claros y legibles.',
    intro: [
      'JSON es el formato estándar de las API y los archivos de configuración, pero suele llegar del servidor como una sola línea ilegible. Un formateador JSON convierte ese texto comprimido en una estructura indentada y fácil de leer.',
      'La herramienta también valida tu JSON y muestra los errores de sintaxis con su posición exacta. Todo se ejecuta en tu navegador — tus datos nunca se suben.',
    ],
    steps: [
      'Pega tu JSON en el cuadro de entrada.',
      'Haz clic en «Formatear» para indentarlo.',
      'Corrige cualquier error usando el mensaje resaltado.',
      'Copia o descarga el resultado.',
    ],
    faqs: [
      { q: '¿El formateador JSON es gratis?', a: 'Sí, totalmente gratis, sin registro y sin límites, también para proyectos comerciales.' },
      { q: '¿Mis datos están seguros?', a: 'Sí. Todo el procesamiento ocurre en tu navegador; no se suben ni almacenan datos.' },
      { q: '¿Puede con archivos grandes?', a: 'Sí, maneja sin problema archivos JSON de varios megabytes.' },
    ],
  },
  {
    locale: 'es',
    key: 'viewer',
    slug: 'visor-json',
    title: 'Visor JSON | Herramienta Online Gratis (JSON Viewer)',
    description: 'Visor JSON online gratis. Explora tus datos JSON en una estructura de árbol legible. Rápido, seguro y en tu navegador.',
    keywords: 'visor json, json viewer español, árbol json, ver json online',
    h1: 'Visor JSON',
    tagline: 'Explora tus datos JSON en una estructura de árbol clara y plegable.',
    intro: [
      'En documentos JSON grandes, el texto plano es difícil de recorrer. Un visor JSON muestra los datos como un árbol plegable para que navegues con facilidad.',
      'Ideal para entender la estructura de datos desconocidos. Todo se ejecuta en tu navegador; nada se sube.',
    ],
    steps: [
      'Pega tu JSON.',
      'Los datos se muestran formateados automáticamente.',
      'Expande o contrae objetos y arrays.',
      'Copia la sección que necesites.',
    ],
    faqs: [
      { q: '¿En qué se diferencia del formateador?', a: 'El formateador produce texto indentado; el visor ofrece un árbol interactivo que escala mejor con datos grandes.' },
      { q: '¿Mis datos son privados?', a: 'Sí, el visor funciona en tu navegador y no envía nada a un servidor.' },
      { q: '¿Es gratis?', a: 'Sí, totalmente gratis y sin límites.' },
    ],
  },
  {
    locale: 'es',
    key: 'json-to-csv',
    slug: 'json-a-csv',
    title: 'Convertidor de JSON a CSV | Herramienta Online Gratis',
    description: 'Convertidor de JSON a CSV online gratis. Convierte un array JSON en CSV al instante — las claves son columnas y los objetos, filas.',
    keywords: 'json a csv, convertir json a csv, convertidor json csv, json csv online',
    h1: 'Convertidor de JSON a CSV',
    tagline: 'Convierte un array JSON en CSV limpio al instante — ideal para Excel e importaciones a bases de datos.',
    intro: [
      'CSV lo entiende casi cualquier hoja de cálculo y base de datos. Convertir un array JSON a CSV permite importarlo sin escribir código.',
      'Cada objeto se convierte en una fila y cada clave en una columna; los valores con comas o comillas se escapan automáticamente. Todo se ejecuta en el navegador.',
    ],
    steps: [
      'Pega tu array JSON.',
      'Haz clic en «Convertir».',
      'Las claves forman la fila de encabezado y cada objeto una fila de datos.',
      'Copia el resultado o descarga el archivo .csv.',
    ],
    faqs: [
      { q: '¿Qué estructura JSON funciona mejor?', a: 'Un array de objetos planos con claves consistentes produce el CSV más limpio.' },
      { q: '¿Cómo se tratan las comas en los valores?', a: 'Los valores con comas o comillas se entrecomillan automáticamente según el estándar CSV.' },
      { q: '¿Mis datos son privados?', a: 'Sí, la conversión ocurre por completo en tu navegador.' },
    ],
  },
  {
    locale: 'es',
    key: 'json-to-excel',
    slug: 'json-a-excel',
    title: 'Convertidor de JSON a Excel | Herramienta Online Gratis',
    description: 'Convertidor de JSON a Excel online gratis. Convierte datos JSON en una hoja .xlsx al instante. Rápido, seguro y en el navegador.',
    keywords: 'json a excel, convertir json a excel, convertidor json excel, json a xlsx',
    h1: 'Convertidor de JSON a Excel',
    tagline: 'Convierte tus datos JSON en una hoja de cálculo de Excel (.xlsx) al instante.',
    intro: [
      'JSON es ideal para máquinas, pero para compartir datos con colegas una hoja de cálculo es más accesible. Convertir JSON a Excel crea filas y columnas que se pueden ordenar y filtrar.',
      'La herramienta asigna automáticamente tu estructura JSON a columnas y genera un archivo .xlsx. Todo se ejecuta en el navegador; nada se sube.',
    ],
    steps: [
      'Pega tu JSON (normalmente un array de objetos).',
      'Las claves se detectan como encabezados de columna.',
      'Haz clic en Convertir/Descargar.',
      'Abre el archivo .xlsx en Excel o Google Sheets.',
    ],
    faqs: [
      { q: '¿Qué estructura JSON es mejor?', a: 'Un array de objetos planos se convierte de forma más limpia: cada objeto una fila, cada clave una columna.' },
      { q: '¿Qué formato de archivo obtengo?', a: 'Un archivo .xlsx estándar que se abre en Excel, Google Sheets y LibreOffice.' },
      { q: '¿Se suben mis datos?', a: 'No, toda la conversión ocurre en tu navegador.' },
    ],
  },
];

export const localeBySlug: Record<string, LocaleDef> = Object.fromEntries(
  localeTools.map((t) => [`${t.locale}/${t.slug}`, t]),
);

export function toolsForLocale(locale: Locale): LocaleDef[] {
  return localeTools.filter((t) => t.locale === locale);
}
