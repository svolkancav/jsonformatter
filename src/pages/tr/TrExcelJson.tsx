import { ExcelToJsonConverter } from '../../components/ExcelToJsonConverter';
import { TrToolPage } from '../../components/TrToolPage';

export function TrExcelJson() {
  return (
    <TrToolPage trKey="excel-json-cevirici">
      <ExcelToJsonConverter />
    </TrToolPage>
  );
}
