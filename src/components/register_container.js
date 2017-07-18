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

    registerBody.innerHTML = Object.entries(
        registers.map((data, register) => `<tr><td>${Number.parseInt(register).toString(16)}</td>${data.map(value => `<td>${Number.parseInt(value).toString(16)}</td>`).toArray().join('')}</tr>`)
            .toJS()).map(r => r[1]).join('');

    return registerContainer
}