export function RegisterContainer({ document, registers }) {
    const doc = document;
    const update = registers => {
        registers.toJS();
    };

    resgisters.subscribe(registers => update(registers));
    return {
        add: register => {
            registers.push(register);
        },
        render: () => {
            return doc.createElement('div');
        },
        update: () => {

        }
    }
}