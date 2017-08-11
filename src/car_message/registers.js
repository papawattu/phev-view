export const registers = [
    {
        register: 0x11,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x12,
        data: [0x00],
        responder: acknowledge,
        sender: time,
    },
    {
        register: 0x13,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x14,
        data: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x15,
        data: [0x00, 0x4a, 0x4d, 0x41, 0x58, 0x44, 0x47, 0x47, 0x32, 0x57, 0x47, 0x5a, 0x30, 0x30, 0x32, 0x30, 0x33, 0x35, 0x00, 0x02],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x16,
        data: [0x02, 0x77, 0x0e, 0x38, 0x06, 0x39, 0x00, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x17,
        data: [0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x18,
        data: [0xff, 0xff, 0xff, 0xff, 0x07, 0xff, 0xff, 0x1f, 0xff, 0xff, 0xff, 0xff, 0x07, 0xff, 0xff, 0x1f],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x19,
        data: [0x01, 0xff, 0xff, 0xff, 0xff, 0x07, 0xff, 0xff, 0x1f],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1a,
        data: [0x00, 0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1b,
        data: [0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1c,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1d,
        data: [0x61, 0x00, 0x00, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1e,
        data: [0x00, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x1f,
        data: [0x01, 0x3c, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x20,
        data: [0x00, 0x00, 0xff, 0x7f, 0xff, 0x01, 0xff, 0x7f, 0xff, 0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x21,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x22,
        data: [0x00, 0x00, 0xff, 0x7f, 0xff, 0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x23,
        data: [0x00, 0x01, 0x01, 0x02, 0x02],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x24,
        data: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x25,
        data: [0x0e, 0x00, 0xff],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x26,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x27,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x28,
        data: [0x6f, 0x75, 0x74, 0x6c, 0x61, 0x6e, 0x64, 0x65, 0x72, 0xff, 0xff, 0xff, 0xff, 0xff,
            0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x29,
        data: [0x02, 0x02],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x2c,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0xa0,
        data: [0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0xc0,
        data: [0x30, 0x30, 0x31, 0x46, 0x30, 0x32, 0x30, 0x30, 0x30, 0x30, 0x00, 0x01, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x01,
        data: [0x01, 0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x02,
        data: [0x02, 0x00, 0x00, 0x06],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x03,
        data: [0x01, 0x11, 0x63],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x04,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
    {
        register: 0x0a,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
    {
        register: 0x0b,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
    {
        register: 0x0c,
        data: [0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x0d,
        data: [0x01],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x0e,
        data: [0x03],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x0f,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x10,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
    },
    {
        register: 0x06,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
    {
        register: 0x05,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
    {
        register: 0xaa,
        data: [0x00],
        responder: acknowledge,
        sender: returnData,
        initSend: false,
    },
];
function time(response) {
    const date = new Date();
    response.data = new Buffer.from([date.getFullYear() - 2000, date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]);
    response.length = 0x0a;
    return response;
}

function acknowledge(response) {
    response.data = Buffer.from([0]);
    response.length = 4;
    return response;
}

function returnData(response) {
    response.data = Buffer.from(registers.find(e => e.register == response.register).data);
    response.length = response.data.length + 3;
    return response;
}

const KO_AC_MANUAL_SW_EVR = 26;
const KO_AC_TIMER_SW_EVR = 25;
const KO_TIMER_CHG_SW_EVR = 24;
const KO_TM_AC_PRESET_SCH_INFO_REP_EVR = 34;
const KO_TM_CHG_PRESET_SCH_UPDATE_EVR = 32;
const KO_WF_12BATT_SCH_SP = 22;
const KO_WF_12BATT_SCH_STAT_EVR = 37;
const KO_WF_AC_ERROR_DISP_SP = 19;
const KO_WF_AC_ERROR_STAT_EVR = 17;
const KO_WF_AC_SCH_SP = 2;
const KO_WF_ANY_CONNECT_EVR = 39;
const KO_WF_ANY_CONNECT_SP = 17;
const KO_WF_BATTERY_CHRG_EVR = 10;
const KO_WF_BATT_LEVEL_INFO_REP_EVR = 29;
const KO_WF_BUP_ERROR_DISP_SP = 7;
const KO_WF_BUP_ERROR_STAT_EVR = 19;
const KO_WF_CHG_ERROR_DISP_SP = 18;
const KO_WF_CHG_ERROR_STAT_EVR = 15;
const KO_WF_CHG_GUN_STATUS_EVR = 2;
const KO_WF_CHG_TYPE_INFO_REP_EVR = 30;
const KO_WF_CONNECT_INFO_GS_SP = 1;
const KO_WF_DATE_INFO_SYNC_EVR = 18;
const KO_WF_DATE_INFO_SYNC_SP = 5;
const KO_WF_DOOR_CONTROL_EVR = 5;
const KO_WF_DOOR_STATUS_INFO_REP_EVR = 36;
const KO_WF_D_LOCK_RQ_SP = 13;
const KO_WF_ECU_COMM_EVR = 44;
const KO_WF_ECU_CUSTOM_INFO_REP_EVR = 22;
const KO_WF_ECU_VERSION_EVR = 43;
const KO_WF_EVR_PRE_OK_ON_EVR = 13;
const KO_WF_EVR_TIM_OK_ON_EVR = 12;
const KO_WF_EV_UPDATE_SP = 6;
const KO_WF_FN_SEL_ADJ_VAL_R_SP = 15;
const KO_WF_FULL_CHG_STAT_EVR = 14;
const KO_WF_HEAD_LMP_CONT_EVR = 8;
const KO_WF_HORN_CONT_EVR = 9;
const KO_WF_H_LAMP_CONT_SP = 10;
const KO_WF_INIT_RQ_SP = 21;
const KO_WF_LAMP_STATUS_INFO_REP_EVR = 35;
const KO_WF_MANUAL_AC_ON_RQ_SP = 4;
const KO_WF_MAX_CMD_EVR = 45;
const KO_WF_MAX_CMD_SP = 24;
const KO_WF_NAV_PRESENT_EVR = 23;
const KO_WF_NOP_CMD_EVR = 0;
const KO_WF_NOP_CMD_GS_SP = 0;
const KO_WF_NOP_CMD_SP = 0;
const KO_WF_OBCHG_OK_ON_INFO_REP_EVR = 31;
const KO_WF_OPTION_HTR_PRSNT_EVR = 1;
const KO_WF_PANIC_ALARM_EVR = 6;
const KO_WF_POSITION_LMP_CONT_EVR = 7;
const KO_WF_PRE_AC_CONT_EVR = 11;
const KO_WF_PRE_AC_STAT_EVR = 16;
const KO_WF_P_ALARM_RQ_SP = 9;
const KO_WF_P_LAMP_CONT_SP = 11;
const KO_WF_REGISTRATION_EVR = 42;
const KO_WF_REG_DISP_SP = 16;
const KO_WF_REMOTE_SECURTY_PRSNT_INFO_EVR = 3;
const KO_WF_R_CUSTOM_SP = 14;
const KO_WF_R_HORN_CONT_SP = 12;
const KO_WF_SSID_CHANGE_SP = 20;
const KO_WF_SSID_EVR = 40;
const KO_WF_THEFT_ALARM_EVR = 4;
const KO_WF_THEFT_DISP_SP = 8;
const KO_WF_THEFT_HISTORY_INFO_SYNC_EVR = 20;
const KO_WF_TM_AC_ON_RQ_SP = 3;
const KO_WF_TM_AC_STAT_INFO_REP_EVR = 28;
const KO_WF_TM_CHG_MODE_STAT_INFO_REP_EVR = 27;
const KO_WF_TM_CHG_ON_RQ_SP = 23;
const KO_WF_TM_CHG_SP = 1;
const KO_WF_TM_FUNC_DISP_EVR = 38;
const KO_WF_TM_REG_POINT_STAT_INFO_REP_EVR = 33;
const KO_WF_VIN_INFO_EVR = 21;
const KO_WF_WCM_S_PRSNT_EVR = 41;