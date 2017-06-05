const registers = new Map();

export function updateRegister(reg,value) {
    registers.set(reg, value);
}

export function getRegisters() {
    return registers;
}