interface ConnectionConfiguration {
    type: 'ssh' | 'smb' | 'rdp';
    config: object;
}

interface IndexedItem {
    id: number;
    data: object;
}

interface SearchResult<T> {
    index: number;
    element?: T;
}

function findElement<T>(array: T[], predicate: (item: T) => boolean): SearchResult<T> {
    let result: SearchResult<T> = {index: -1, element: undefined};

    for (const [index, element] of array.entries()) {
        if (predicate(element)) {
            result = {index, element};
            break;
        }
    }

    return result;
}

function findByID(id: number): (element: IndexedItem) => boolean {
    return (element: IndexedItem) => element.id === id;
}

const arrA: ConnectionConfiguration[] = [
    {type: 'ssh', config: {}},
    {type: 'smb', config: {}},
    {type: 'rdp', config: {}}
];
const resA1: SearchResult<ConnectionConfiguration> = findElement<ConnectionConfiguration>(arrA, item => item.type === 'rdp'); // ok

const arrB: IndexedItem[] = [{id: 1, data: {}}, {id: 2, data: {}}, {id: 3, data: {}}];
const resB1: SearchResult<IndexedItem> = findElement<IndexedItem>(arrB, findByID(1)); // ok
const resB2: SearchResult<IndexedItem> = findElement<IndexedItem>(arrB, findByID(4)); // not found

console.log(resA1);
console.log(resB1);
console.log(resB2);
