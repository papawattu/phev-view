const createRegisterTable = doc => {
    const table = doc.createElement('table');
    const tableHeader = doc.createElement('thead');
    const tableHeaderRow = doc.createElement('tr');
    const tableHeaderColOneHead = doc.createElement('th');
    const tableHeaderColOneText = doc.createTextNode('Register');
    const tableHeaderColTwoHead = doc.createElement('th');
    const tableHeaderColTwoText = doc.createTextNode('Data');
    const tableRow = doc.createElement('tr');
    const tableRegisterCol = doc.createElement('td');
    const tableRegisterColText = doc.createTextNode('0x00');
    const tableDataCol = doc.createElement('td');
    const tableDataColText = doc.createTextNode('0xff');

    table.appendChild(tableHeader);
    tableHeader.appendChild(tableHeaderRow);
    tableHeaderRow.appendChild(tableHeaderColOneHead);
    tableHeaderColOneHead.appendChild(tableHeaderColOneText);
    tableHeaderRow.appendChild(tableHeaderColTwoHead);
    tableHeaderColTwoHead.appendChild(tableHeaderColTwoText);
    table.appendChild(tableRow);
    tableRow.appendChild(tableRegisterCol);
    tableRegisterCol.appendChild(tableRegisterColText);
    tableRow.appendChild(tableDataCol);
    tableDataCol.appendChild(tableDataColText);

    return table;
}

export default function RegisterContainer({ document, registers }) {

    const table = createRegisterTable(document);

    registers.subscribe(reg => {
        console.log(reg.toJS());
        //tableRegisterCol.appendChild()
    });

    return table;
}