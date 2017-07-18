export default function RegisterContainer({ document, registers }) {

    const domCreate = e => document.createElement(e);
    const domText = e => document.createTextNode(e);

    const registerContainer = domCreate('table');
    const registerHeader = domCreate('thead');
    const registerHeaderRow = domCreate('tr');
    const registerTitle = domCreate('th');
    const registerTitleText = domText('Register');
    const registerDataTitle = domCreate('th');
    const registerDataTitleText = domText('Data');

    const registerBody = domCreate('tbody');


    registerContainer.appendChild(registerHeader);
    registerHeader.appendChild(registerHeaderRow);
    registerHeaderRow.appendChild(registerTitle);
    registerHeaderRow.appendChild(registerDataTitle);
    registerTitle.appendChild(registerTitleText);
    registerDataTitle.appendChild(registerDataTitleText);
    registerContainer.appendChild(registerBody);

    const toHex = dec => Number.parseInt(dec).toString(16);
    const toRow = e => '<tr>' + e + '</tr>';
    const toData = value => '<td>' + value + '</td>';
    registerBody.innerHTML = Object.entries(
        registers.map((data, register) =>
            toRow(toData(toHex(register))
                + data.map(value => toData(toHex(value))).toArray().join(''))
        ).toJS()).map(r => r[1]).join('');

    return registerContainer
}