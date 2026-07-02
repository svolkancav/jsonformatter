import { JsonFormatter } from '../../components/JsonFormatter';
import { JsonToExcelConverter } from '../../components/JsonToExcelConverter';
import { TextConverter } from '../../components/TextConverter';
import { LocaleToolPage, LocaleHub } from '../../components/LocaleToolPage';
import { localeBySlug } from '../../data/localeContent';
import { jsonToCsv } from '../../utils/dataConverters';

export function EsHub() {
  return <LocaleHub locale="es" />;
}

export function EsFormatter() {
  return (
    <LocaleToolPage def={localeBySlug['es/formateador-json']}>
      <JsonFormatter />
    </LocaleToolPage>
  );
}

export function EsViewer() {
  return (
    <LocaleToolPage def={localeBySlug['es/visor-json']}>
      <JsonFormatter />
    </LocaleToolPage>
  );
}

export function EsJsonCsv() {
  return (
    <LocaleToolPage def={localeBySlug['es/json-a-csv']}>
      <TextConverter
        inputLabel="Entrada JSON"
        outputLabel="Salida CSV"
        placeholder={'[{"name": "Ada", "age": 36}, {"name": "Linus", "age": 54}]'}
        convertLabel="Convertir a CSV"
        downloadName="convertido.csv"
        inputLanguage="json"
        outputLanguage="text"
        example={'[{"name": "Ada", "age": 36}, {"name": "Linus", "age": 54}]'}
        convert={jsonToCsv}
      />
    </LocaleToolPage>
  );
}

export function EsJsonExcel() {
  return (
    <LocaleToolPage def={localeBySlug['es/json-a-excel']}>
      <JsonToExcelConverter />
    </LocaleToolPage>
  );
}
