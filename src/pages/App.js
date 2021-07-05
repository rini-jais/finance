import ProductTable from './table/table';
import { tableData } from "./tabledata.js";
export default function App() {

  return (
    <div className="app">
      <ProductTable products={tableData}
      />
    </div>
  );
}

