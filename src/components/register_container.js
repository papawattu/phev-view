export function RegisterContainer({ document }) {
    const doc = document;
    const registers = [];
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