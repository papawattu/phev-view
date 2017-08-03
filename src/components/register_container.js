export default function RegisterContainer({ document, registers, labels }) {

    const domCreateEl = e => document.createElement(e);
    const domCreateText = e => document.createTextNode(e);

    const registerContainer = domCreateEl('table');
    const registerHeader = domCreateEl('thead');
    const registerHeaderRow = domCreateEl('tr');
    const registerTitle = domCreateEl('th');
    const registerTitleText = domCreateText('Register');
    const registerDataTitle = domCreateEl('th');
    const registerDataTitleText = domCreateText('Data');

    const registerBody = domCreateEl('tbody');

    registerContainer.appendChild(registerHeader);
    registerHeader.appendChild(registerHeaderRow);
    registerHeaderRow.appendChild(registerTitle);
    registerHeaderRow.appendChild(registerDataTitle);
    registerTitle.appendChild(registerTitleText);
    registerDataTitle.appendChild(registerDataTitleText);
    registerContainer.appendChild(registerBody);

    const toHex = dec => '0x' + (Number.parseInt(dec).toString(16).length < 2 ? 
        '0' + Number.parseInt(dec).toString(16) 
        : Number.parseInt(dec).toString(16));
    const toRow = e => '<tr>' + e + '</tr>';
    const toData = value => '<td>' + value + '</td>';
    const toHeader = value => '<td>' + value + '</td>';
    const findLabel = (e,labels) => Object.entries(labels)[e];
    const noLabel = e => `NO LABEL - ${toHex(e)}`;
    const toLabel = (e,labels) => findLabel(e,labels) ? findLabel(e,labels)[0] : noLabel(e);
    const toDataRow = x => x.map(e => toData(toHex(e))).toArray().join('');
 
    registerBody.innerHTML = Object.entries(
        registers.map((data, register) =>
            toRow(
                toHeader(toLabel(register,labels) + toDataRow(data))))
           .toJS())
           .map(x => x[1])
           .join('');

    return registerContainer
}