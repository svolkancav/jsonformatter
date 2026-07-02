import { JsonFormatter } from '../../components/JsonFormatter';
import { JsonToExcelConverter } from '../../components/JsonToExcelConverter';
import { TextConverter } from '../../components/TextConverter';
import { LocaleToolPage, LocaleHub } from '../../components/LocaleToolPage';
import { localeBySlug } from '../../data/localeContent';
import { jsonToCsv } from '../../utils/dataConverters';

export function DeHub() {
  return <LocaleHub locale="de" />;
}

export function DeFormatter() {
  return (
    <LocaleToolPage def={localeBySlug['de/json-formatierer']}>
      <JsonFormatter />
    </LocaleToolPage>
  );
}

export function DeViewer() {
  return (
    <LocaleToolPage def={localeBySlug['de/json-betrachter']}>
      <JsonFormatter />
    </LocaleToolPage>
  );
}

export function DeJsonCsv() {
  return (
    <LocaleToolPage def={localeBySlug['de/json-zu-csv']}>
      <TextConverter
        inputLabel="JSON-Eingabe"
        outputLabel="CSV-Ausgabe"
        placeholder={'[{"name": "Ada", "age": 36}, {"name": "Linus", "age": 54}]'}
        convertLabel="In CSV umwandeln"
        downloadName="konvertiert.csv"
        inputLanguage="json"
        outputLanguage="text"
        example={'[{"name": "Ada", "age": 36}, {"name": "Linus", "age": 54}]'}
        convert={jsonToCsv}
      />
    </LocaleToolPage>
  );
}

export function DeJsonExcel() {
  return (
    <LocaleToolPage def={localeBySlug['de/json-zu-excel']}>
      <JsonToExcelConverter />
    </LocaleToolPage>
  );
}
