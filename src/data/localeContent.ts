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
      'Der eigentliche Gewinn beim Formatieren ist nicht die Optik, sondern die Geschwindigkeit der Fehlersuche. In einer API-Antwort, die in einer einzigen Zeile steht, kostet ein fehlendes Komma Minuten; eingerückt fällt dieselbe Stelle sofort auf. Die Einrückung zeigt außerdem, wie tief die Struktur verschachtelt ist — eine Information, die Sie brauchen, bevor Sie die Daten im Code verarbeiten.',
      'Das Minifizieren macht das Gegenteil: Es entfernt alle Leerzeichen und verkleinert die Datei. Das ist für Konfigurationsdateien im Produktivbetrieb und für Antworten sinnvoll, die über das Netz gehen. Beide Richtungen beschreiben dieselben Daten, denn Leerraum hat in JSON keine Bedeutung.',
      'Ein Punkt zur Klarstellung: Formatieren repariert keine fehlerhafte Syntax, es macht korrektes JSON nur lesbar. Ist das Dokument ungültig, müssen Sie den Fehler zuerst beheben — dafür ist die angezeigte Zeilen- und Spaltenangabe gedacht.',
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
      { q: 'Ändert das Formatieren meine Daten?', a: 'Nein. Es werden ausschließlich Leerzeichen und Zeilenumbrüche eingefügt. Schlüssel, Werte und deren Reihenfolge bleiben unverändert.' },
      { q: 'Wie viele Leerzeichen soll ich einrücken?', a: 'Zwei Leerzeichen sind am verbreitetsten und in den meisten Sprachen voreingestellt; vier schieben tief verschachtelte Strukturen schnell nach rechts. Entscheidend ist, dass im Team einheitlich eingerückt wird — sonst entstehen in der Versionskontrolle Unterschiede ohne inhaltlichen Grund.' },
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
      'Eine große JSON-Antwort als Fließtext zu lesen ist mühsam, solange Sie nicht wissen, wo das gesuchte Feld liegt. Die Baumansicht lässt Sie das Dokument Ebene für Ebene auf- und zuklappen, sodass nur der Teil sichtbar bleibt, den Sie gerade untersuchen.',
      'Besonders hilfreich ist das bei verschachtelten Strukturen. Wenn Sie sehen, auf welcher Ebene ein Feld liegt und in welchem Array es steckt, wissen Sie unmittelbar, wie Sie im Code darauf zugreifen — genau dort entstehen sonst die meisten Tippfehler.',
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
      { q: 'Gibt es eine Größenbeschränkung?', a: 'Keine feste Grenze. Die Verarbeitung läuft in Ihrem Browser, die praktische Grenze ist also der Arbeitsspeicher Ihres Geräts. Bei sehr großen Dokumenten ist es flüssiger, nur den benötigten Zweig zu öffnen.' },
      { q: 'Kann ich die Daten hier bearbeiten?', a: 'Der Betrachter ist zum Lesen gedacht. Für Änderungen nutzen Sie den Formatierer, dort lässt sich der Text direkt bearbeiten und anschließend kopieren.' },
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
      'CSV ist ein flaches Format: Zeilen und Spalten, mehr nicht. JSON kann verschachtelt sein, also muss diese Tiefe bei der Umwandlung aufgelöst werden. Verschachtelte Objekte werden zu Spaltenüberschriften mit Punktnotation zusammengefasst, jedes Objekt wird zu einer Zeile.',
      'CSV ist nicht wirklich standardisiert. Ob als Trennzeichen ein Komma oder ein Semikolon dient, ob Textfelder in Anführungszeichen stehen und wie Zeilenenden geschrieben werden, unterscheidet sich von Programm zu Programm. In deutschen Excel-Installationen ist das Semikolon üblich — wenn eine Datei in einer einzigen Spalte landet, liegt es fast immer daran.',
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
      { q: 'Was passiert, wenn ein Wert selbst ein Komma enthält?', a: 'Solche Werte werden in Anführungszeichen gesetzt, enthaltene Anführungszeichen werden verdoppelt. Das ist die übliche Maskierung, die alle gängigen Parser verstehen.' },
      { q: 'Excel öffnet alles in einer Spalte — warum?', a: 'Das erwartete Trennzeichen passt nicht zum Inhalt der Datei. Über "Daten > Text in Spalten" lässt sich das Trennzeichen nachträglich festlegen, oder Sie nutzen den Importassistenten.' },
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
      'Der wesentliche Unterschied ist: JSON kann verschachtelt sein, eine Tabelle nicht. Die eigentliche Arbeit beim Konvertieren besteht darin, die Tiefe auf Spalten zu verteilen. Verschachtelte Objekte werden zu Spalten mit Punktnotation aufgelöst, sodass etwa adresse.stadt eine eigene Spalte erhält.',
      'Das sauberste Ergebnis erhalten Sie, wenn die Eingabe ein Array gleichartiger Objekte ist — ein Objekt pro Zeile, ein Schlüssel pro Spalte. Unterscheiden sich die Objekte in ihren Feldern, bleiben einzelne Zellen leer; das ist erwartetes Verhalten und kein Datenverlust.',
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
      { q: 'Wie werden verschachtelte Arrays behandelt?', a: 'Arrays von Objekten werden in Spalten aufgelöst. Arrays einfacher Werte werden in einer Zelle zusammengefasst, da eine Tabellenzelle keine mehreren Zeilen aufnehmen kann.' },
      { q: 'Bleiben Umlaute erhalten?', a: 'Ja. Die erzeugte .xlsx-Datei speichert Text als Unicode. Probleme mit Umlauten treten in der Regel nur auf, wenn der Umweg über CSV genommen und dort nicht UTF-8 gewählt wird.' },
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
      'La verdadera ventaja de formatear no es la estética, sino la rapidez para encontrar errores. En una respuesta de API comprimida en una sola línea, detectar una coma que falta lleva minutos; con sangría, el mismo fallo salta a la vista. La sangría también muestra cuántos niveles tiene la estructura, algo que conviene saber antes de procesar los datos en el código.',
      'Minificar hace lo contrario: elimina todos los espacios y reduce el tamaño del archivo. Es lo habitual en configuraciones de producción y en respuestas que viajan por la red. Ambas versiones representan los mismos datos, porque en JSON los espacios no tienen significado.',
      'Conviene aclarar un punto: formatear no corrige la sintaxis, solo hace legible un JSON que ya es válido. Si el documento tiene errores, primero hay que resolverlos — para eso sirve la línea y columna que indica la herramienta.',
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
      { q: '¿Formatear modifica mis datos?', a: 'No. Solo se añaden espacios y saltos de línea. Las claves, los valores y su orden permanecen intactos.' },
      { q: '¿Cuántos espacios de sangría conviene usar?', a: 'Dos espacios es lo más extendido y el valor por defecto en la mayoría de lenguajes; cuatro desplazan rápidamente hacia la derecha las estructuras muy anidadas. Lo importante es mantener un criterio único en el equipo para evitar diferencias sin contenido en el control de versiones.' },
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
      'Leer una respuesta JSON extensa como texto corrido es lento mientras no sepas dónde está el campo que buscas. La vista de árbol permite plegar y desplegar el documento nivel a nivel, de modo que en pantalla quede solo la parte que estás revisando.',
      'Resulta especialmente útil con estructuras anidadas. Ver en qué nivel está un campo y dentro de qué array se encuentra te dice directamente cómo acceder a él desde el código, que es justo donde suelen aparecer los errores al deducir la ruta a mano.',
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
      { q: '¿Hay un límite de tamaño?', a: 'No hay un límite fijo. El procesamiento ocurre en tu navegador, así que el límite práctico es la memoria de tu dispositivo. Con documentos muy grandes conviene abrir solo la rama que necesitas.' },
      { q: '¿Puedo editar los datos aquí?', a: 'El visor está pensado para leer. Si necesitas modificar algo, usa el formateador: allí puedes editar el texto directamente y copiar el resultado.' },
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
      'CSV es un formato plano: filas y columnas, nada más. JSON puede anidarse, así que al convertir hay que resolver esa profundidad de alguna manera. Los objetos anidados se convierten en encabezados de columna con notación de puntos y cada objeto pasa a ser una fila.',
      'Conviene recordar que CSV no está realmente estandarizado. Si el separador es una coma o un punto y coma, si los textos van entrecomillados y cómo se escriben los finales de línea varía entre programas. En instalaciones de Excel en español el separador suele ser el punto y coma: si el archivo se abre en una sola columna, casi siempre es por eso.',
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
      { q: '¿Qué ocurre si un valor contiene una coma?', a: 'Ese valor se entrecomilla y las comillas internas se duplican. Es el escape estándar de CSV y todos los analizadores habituales lo entienden.' },
      { q: 'Excel abre todo en una sola columna, ¿por qué?', a: 'El separador que espera Excel no coincide con el del archivo. Puedes corregirlo con "Datos > Texto en columnas" o mediante el asistente de importación.' },
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
      'La diferencia de fondo es que JSON puede anidarse y una hoja de cálculo no. El trabajo real al convertir consiste en repartir esa profundidad en columnas. Los objetos anidados se despliegan en columnas con notación de puntos, de modo que un campo como direccion.ciudad ocupa su propia columna.',
      'El resultado más limpio se obtiene cuando la entrada es un array de objetos con la misma forma: un objeto por fila y una clave por columna. Si los objetos difieren en sus campos, algunas celdas quedarán vacías; es el comportamiento esperado y no una pérdida de datos.',
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
      { q: '¿Cómo se tratan los arrays anidados?', a: 'Los arrays de objetos se despliegan en columnas. Los arrays de valores simples se combinan en una sola celda, ya que una celda no admite varias filas.' },
      { q: '¿Se conservan los acentos y la eñe?', a: 'Sí. El archivo .xlsx generado guarda el texto como Unicode. Los problemas con caracteres acentuados suelen aparecer solo si se pasa por CSV y no se elige UTF-8 al importar.' },
    ],
  },
];

export const localeBySlug: Record<string, LocaleDef> = Object.fromEntries(
  localeTools.map((t) => [`${t.locale}/${t.slug}`, t]),
);

export function toolsForLocale(locale: Locale): LocaleDef[] {
  return localeTools.filter((t) => t.locale === locale);
}
