import { useSortableData } from '../../component/sortData'
import './table.css'
const ProductTable = (props) => {
    const assetConfig = { Equities: 1, Macro: 2, Credit: 3 }

    const { items, requestSort, sortConfig } = useSortableData(props.products, '', assetConfig);
    const getClassNamesFor = name => {
        if (!sortConfig) {
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    };
    const getStyle = (product) => {
        let { assetClass } = product
        if (product) {
            return {
                background: assetClass === 'Equities' ? '#8383d0' :
                    assetClass === 'Credit' ? '#abcaab'
                        : "white"
            }
        }
    }
    return (
        <table>
            <thead>
                <tr>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("ticker")}
                            className={getClassNamesFor("ticker")}
                        >
                            ticker
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("price")}
                            className={getClassNamesFor("price")}
                        >
                            price
                        </button>
                    </th>
                    <th>
                        <button
                            type="button"
                            onClick={() => requestSort("assetClass")}
                            className={getClassNamesFor("assetClass")}
                        >
                            assetClass
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {items.map(product => (
                    <tr key={product.ticker} style={getStyle(product)}>
                        <td >{product.ticker}</td>
                        <td style={{ color: product.price > 0 ? "blue" : "red" }}>{product.price}</td>
                        <td>{product.assetClass}</td>
                    </tr>

                ))}
            </tbody>
        </table>
    );
}

export default ProductTable;