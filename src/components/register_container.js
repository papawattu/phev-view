export default function RegisterContainer({ document, registers, labels }) {

    const toHex = dec => '0x' + (Number.parseInt(dec).toString(16).length < 2 ? 
        '0' + Number.parseInt(dec).toString(16) 
        : Number.parseInt(dec).toString(16));
    const toRow = e => '<tr>' + e + '</tr>';
    const toData = value => '<td>' + value + '</td>';
    const toHeader = value => '<th>' + value + '</th>';

    const noLabel = e => `NO LABEL - ${toHex(e)}`;
    const toLabel = (e,labels) => Object.entries(labels).filter(y => y[1] == e).map(z => z[0])[0] || noLabel(e);
    const toDataRow = x => x.map(e => toData(toHex(e))).toArray();
    const toDataRowLength = x => x.map(e => toData(toHex(e))).toArray().length;
    const maxDataLength = x => x.reduce((y,z) => z.size > y ? z.size : y ,0);
    const toDisplayChar = x => x >= 0x20 && x <= 0x7e ? String.fromCharCode(x):'.';
    const toTextRow = x => toData(x.map(e => toDisplayChar(e)).toArray().join(''));
    const padToMax = (x,y,f) => x.length === y ? x : new Array().concat(x,new Array(y).fill(f,x.length,y));
    
    const domCreateEl = e => document.createElement(e);
    const domCreateText = e => document.createTextNode(e);

    const registerContainer = domCreateEl('table');
    registerContainer.setAttribute('class','table table-bordered table-striped table-hover table-condensed');
    
    const registerHeader = domCreateEl('thead');
    const registerHeaderRow = domCreateEl('tr');
    const registerTitle = domCreateEl('th');
    const registerTitleText = domCreateText('Register');
    const registerDataTitle = domCreateEl('th');
    registerDataTitle.setAttribute('colspan',maxDataLength(registers));
    
    const registerDataTitleText = domCreateText('Data');
    const registerTextTitle = domCreateEl('th');
    const registerTextTitleText = domCreateText('Text');
    const registerBody = domCreateEl('tbody');

    registerContainer.appendChild(registerHeader);
    registerHeader.appendChild(registerHeaderRow);
    registerHeaderRow.appendChild(registerTitle);
    registerHeaderRow.appendChild(registerDataTitle);
    registerHeaderRow.appendChild(registerTextTitle);
    
    registerTitle.appendChild(registerTitleText);
    registerDataTitle.appendChild(registerDataTitleText);
    registerTextTitle.appendChild(registerTextTitleText);

    registerContainer.appendChild(registerBody);

    registerBody.innerHTML = Object.entries(
        registers.map((data, register) =>
            toRow(toHeader(toLabel(register,labels)) + padToMax(toDataRow(data),maxDataLength(registers),toData('')).join('') + toTextRow(data))).toJS())
                .map(x => x[1])
                .join('');

    return registerContainer
}