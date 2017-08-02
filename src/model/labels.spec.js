import chai from 'chai';
import sinon from 'sinon';
import { labels } from './labels';
import database from '../database';

import * as firebase from 'firebase';

const assert = chai.assert;

const sut = labels({database});

describe('Labels',() => {
    it('Should bootstrap',() => {
        assert.isNotNull(sut);
    });
    it('Should subscribe and get labels', done => {

        sut.subscribe(labels => {
            assert.isNotNull(labels.KO_AC_MANUAL_SW_EVR);
            assert.equal(labels.KO_AC_MANUAL_SW_EVR,26);
            done();
        });
    });
});