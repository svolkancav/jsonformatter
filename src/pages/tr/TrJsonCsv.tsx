import { TextConverter } from '../../components/TextConverter';
import { jsonToCsv } from '../../utils/dataConverters';
import { TrToolPage } from '../../components/TrToolPage';

export function TrJsonCsv() {
  return (
    <TrToolPage trKey="json-csv-cevirici">
      <TextConverter
        inputLabel="JSON Girişi"
        outputLabel="CSV Çıktısı"
        placeholder='[{"ad": "Ada", "yas": 36}, {"ad": "Linus", "yas": 54}]'
        convertLabel="JSON'dan CSV'ye Dönüştür"
        downloadName="donusturuldu.csv"
        inputLanguage="json"
        outputLanguage="text"
        convert={jsonToCsv}
      />
    </TrToolPage>
  );
}
