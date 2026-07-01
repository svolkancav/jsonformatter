import { JsonToExcelConverter } from '../../components/JsonToExcelConverter';
import { TrToolPage } from '../../components/TrToolPage';

export function TrJsonExcel() {
  return (
    <TrToolPage trKey="json-excel-cevirici">
      <JsonToExcelConverter />
    </TrToolPage>
  );
}
