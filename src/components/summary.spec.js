import chai from 'chai';
import sinon from 'sinon';
import { summary } from './summary';
import { Map, List, fromJS } from 'immutable';

const assert = chai.assert;


const registers = { "1": [1, 0], "2": [2, 0, 0, 1], "3": [1, 17, 99], "12": [2], "13": [1], "14": [0], "15": [0], "16": [0], "17": [0], "18": [17, 8, 3, 17, 59, 35, 4], "19": [0], "20": [0, 0, 0, 0, 0, 0, 0], "21": [0, 74, 77, 65, 88, 68, 71, 71, 50, 87, 71, 90, 48, 48, 50, 48, 51, 53, 0, 1], "22": [2, 229, 1, 166, 30, 167, 30, 0], "23": [1], "24": [255, 255, 255, 255, 7, 255, 255, 31, 255, 255, 255, 255, 7, 255, 255, 31], "25": [1, 255, 255, 255, 255, 7, 255, 255, 31], "26": [0, 0], "27": [1], "28": [33], "29": [94, 0, 0, 3], "30": [0, 0], "31": [0, 0, 0], "32": [0, 0, 255, 127, 255, 1, 255, 127, 255, 1], "33": [0], "34": [0, 0, 255, 127, 255, 1], "35": [0, 1, 0, 2, 2], "36": [1, 0, 0, 0, 0, 0, 0, 0, 0, 0], "37": [14, 0, 255], "38": [0], "39": [0], "40": [82, 69, 77, 79, 84, 69, 52, 53, 99, 102, 115, 99, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255], "41": [2, 2], "44": [0], "192": [48, 48, 49, 70, 48, 50, 48, 48, 48, 48, 0, 1, 0] };
const labels = {"KO_ECU_VERSION_EVR":192,"KO_AC_MANUAL_SW_EVR":26,"KO_AC_TIMER_SW_EVR":25,"KO_TIMER_CHG_SW_EVR":24,"KO_TM_AC_PRESET_SCH_INFO_REP_EVR":34,"KO_TM_CHG_PRESET_SCH_UPDATE_EVR":32,"KO_WF_12BATT_SCH_STAT_EVR":37,"KO_WF_AC_ERROR_STAT_EVR":17,"KO_WF_ANY_CONNECT_EVR":39,"KO_WF_BATTERY_CHRG_EVR":10,"KO_WF_BATT_LEVEL_INFO_REP_EVR":29,"KO_WF_BUP_ERROR_STAT_EVR":19,"KO_WF_CHG_ERROR_STAT_EVR":15,"KO_WF_CHG_GUN_STATUS_EVR":2,"KO_WF_CHG_TYPE_INFO_REP_EVR":30,"KO_WF_DATE_INFO_SYNC_EVR":18,"KO_WF_DOOR_CONTROL_EVR":5,"KO_WF_DOOR_STATUS_INFO_REP_EVR":36,"KO_WF_ECU_COMM_EVR":44,"KO_WF_ECU_CUSTOM_INFO_REP_EVR":22,"KO_WF_ECU_VERSION_EVR":43,"KO_WF_EVR_PRE_OK_ON_EVR":13,"KO_WF_EVR_TIM_OK_ON_EVR":12,"KO_WF_FULL_CHG_STAT_EVR":14,"KO_WF_HEAD_LMP_CONT_EVR":8,"KO_WF_HORN_CONT_EVR":9,"KO_WF_LAMP_STATUS_INFO_REP_EVR":35,"KO_WF_MAX_CMD_EVR":45,"KO_WF_NAV_PRESENT_EVR":23,"KO_WF_NOP_CMD_EVR":0,"KO_WF_OBCHG_OK_ON_INFO_REP_EVR":31,"KO_WF_OPTION_HTR_PRSNT_EVR":1,"KO_WF_PANIC_ALARM_EVR":6,"KO_WF_POSITION_LMP_CONT_EVR":7,"KO_WF_PRE_AC_CONT_EVR":11,"KO_WF_PRE_AC_STAT_EVR":16,"KO_WF_REGISTRATION_EVR":42,"KO_WF_REMOTE_SECURTY_PRSNT_INFO_EVR":3,"KO_WF_SSID_EVR":40,"KO_WF_THEFT_ALARM_EVR":4,"KO_WF_THEFT_HISTORY_INFO_SYNC_EVR":20,"KO_WF_TM_AC_STAT_INFO_REP_EVR":28,"KO_WF_TM_CHG_MODE_STAT_INFO_REP_EVR":27,"KO_WF_TM_FUNC_DISP_EVR":38,"KO_WF_TM_REG_POINT_STAT_INFO_REP_EVR":33,"KO_WF_VIN_INFO_EVR":21,"KO_WF_WCM_S_PRSNT_EVR":41};
const sut = summary({registers : fromJS(registers),labels: fromJS(labels)});


describe('Page', () => {
    it('Should bootstrap', () => {
        assert.isNotNull(sut);
    });
    it('Should return vin',() => {
        assert.equal(sut.vin,'JMAXDGG2WGZ002035');
    });
    it('Should return ssid',() => {
        assert.equal(sut.ssid,'REMOTE45cfsc');
    });
    it('Should return ecu version',() => {
        assert.equal(sut.ecuVersion,'001F020000');
    });
});