const createTable = () => document.createElement('table');
const createTableHeader = () => document.createElement('thead');
const createTableHeaderName = name => document.createElement('th').appendChild(document.createTextNode(name)).parentElement;
const createTableRow = () => document.createElement('tr');
const createTableElement = text => document.createElement('td');


const createRegisterTable = id => {

    const table = createTable()
        .appendChild(createTableHeader()
            .appendChild(createTableRow()));

    return {
        table :table,
        update: registers => registers.map(console.log),
    };
}

export default function RegisterContainer() {

    const table = document.createElement('div');

    table.innerHTML = `
        <table>
            <thead>
                <tr>
                    <th>Register</th><th>Data</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>1</td><td>2</td></tr>
            </tbody>
        </table>`
    //registers.subscribe(reg => {
    //    table.update(reg.keys);
        //tableRegisterCol.appendChild()
    //});

    return table;
}