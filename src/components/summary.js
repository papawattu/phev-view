function summary({ labels, registers }) {

    const regs = registers.reduce((data, register, idx) => {

        Object.assign(data, { [labels.keyOf(Number.parseInt(idx)) || idx]: register.toArray() });
        return data;
    }, {});
    const toString = (arr, s, e) => String.fromCharCode(...arr.slice(s, e));
    const toDate = x => new Date(2000 + x[0],x[1]-1,x[2],x[3],x[4],x[5],x[6]);
    return {
        vin: toString(regs.KO_WF_VIN_INFO_EVR, 1, 18),
        ssid: toString(regs.KO_WF_SSID_EVR, 0, regs.KO_WF_SSID_EVR.findIndex(x => x === 0xff)),
        ecuVersion: toString(regs.KO_ECU_VERSION_EVR, 0, regs.KO_ECU_VERSION_EVR.findIndex(x => x === 0x00)),
        batteryLevel: regs.KO_WF_BATT_LEVEL_INFO_REP_EVR[0],
        lastUpdated: toDate(regs.KO_WF_DATE_INFO_SYNC_EVR),
    }
};

export { summary };

