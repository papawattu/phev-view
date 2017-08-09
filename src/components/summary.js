function summary({ labels, registers }) {

    const regs = registers.reduce((data, register, idx) => {

        Object.assign(data, { [labels.keyOf(Number.parseInt(idx)) || idx]: register.toArray() });
        return data;
    }, {});
    const toString = (arr, s, e) => String.fromCharCode(...arr.slice(s, e));
    return {
        vin: toString(regs.KO_WF_VIN_INFO_EVR, 1, 18),
        ssid: toString(regs.KO_WF_SSID_EVR, 0, regs.KO_WF_SSID_EVR.findIndex(x => x === 0xff)),
        ecuVersion: toString(regs.KO_ECU_VERSION_EVR, 0, regs.KO_ECU_VERSION_EVR.findIndex(x => x === 0x00)),
    }
};

export { summary };

