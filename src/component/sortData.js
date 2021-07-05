import { useState, useMemo } from 'react'

export const useSortableData = (items, config = null, assetConfig) => {

    const [sortConfig, setSortConfig] = useState(config);


    const sortedItems = useMemo(() => {

        let sortableItems = [...items];

        const checkSortCondition = (a, b, dir) => {
            let returnval
            if (sortConfig.key === 'assetClass') {
                returnval = dir === 'asc' ? assetConfig[a[sortConfig.key]] < assetConfig[b[sortConfig.key]]
                    : assetConfig[a[sortConfig.key]] > assetConfig[b[sortConfig.key]]
            } else {
                returnval = dir === 'asc' ? a[sortConfig.key] < b[sortConfig.key]
                    : a[sortConfig.key] > b[sortConfig.key]
            }
            return returnval
        }

        if (sortConfig !== null) {

            sortableItems.sort((a, b) => {
                if (checkSortCondition(a, b, 'asc')) {

                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (checkSortCondition(a, b, 'dsc')) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig, assetConfig]);

    const requestSort = key => {
        let direction = "ascending";
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === "ascending"
        ) {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};