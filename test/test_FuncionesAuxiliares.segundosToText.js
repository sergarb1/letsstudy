var assert = require('assert');
import FuncionesAuxiliares from '../src/clases/FuncionesAuxiliares';

describe('FuncionesAuxiliares.segundosToText()', function () {

    it('Entre 0 y <86400 segundos', function () {
        assert.equal(FuncionesAuxiliares.segundosToText(0), "00:00:00");
        assert.equal(FuncionesAuxiliares.segundosToText(1), "00:00:01");
        assert.equal(FuncionesAuxiliares.segundosToText(59), "00:00:59");
        assert.equal(FuncionesAuxiliares.segundosToText(60), "00:01:00");
        assert.equal(FuncionesAuxiliares.segundosToText(61), "00:01:01");
        assert.equal(FuncionesAuxiliares.segundosToText(119), "00:01:59");
        assert.equal(FuncionesAuxiliares.segundosToText(120), "00:02:00");
        assert.equal(FuncionesAuxiliares.segundosToText(121), "00:02:01");
        assert.equal(FuncionesAuxiliares.segundosToText(3540), "00:59:00");
        assert.equal(FuncionesAuxiliares.segundosToText(3541), "00:59:01");
        assert.equal(FuncionesAuxiliares.segundosToText(3599), "00:59:59");
        assert.equal(FuncionesAuxiliares.segundosToText(3600), "01:00:00");
        assert.equal(FuncionesAuxiliares.segundosToText(3601), "01:00:01");
        assert.equal(FuncionesAuxiliares.segundosToText(3660), "01:01:00");
        assert.equal(FuncionesAuxiliares.segundosToText(3661), "01:01:01");
        assert.equal(FuncionesAuxiliares.segundosToText(7199), "01:59:59");
        assert.equal(FuncionesAuxiliares.segundosToText(7200), "02:00:00");
        assert.equal(FuncionesAuxiliares.segundosToText(86399), "23:59:59");
        //assert.equal(FuncionesAuxiliares.segundosToText(86400), "24:00:00");
    });
    it('86400 segundos (24h) o más', function () {
        assert.equal(FuncionesAuxiliares.segundosToText(86400), null);
        assert.equal(FuncionesAuxiliares.segundosToText(86401), null);
        assert.equal(FuncionesAuxiliares.segundosToText(90000), null);
        assert.equal(FuncionesAuxiliares.segundosToText(999999999), null);
    });
    it('Segundos negativos', function () {
        assert.equal(FuncionesAuxiliares.segundosToText(-1), null);
        assert.equal(FuncionesAuxiliares.segundosToText(-10), null);
        assert.equal(FuncionesAuxiliares.segundosToText(-1000), null);
        assert.equal(FuncionesAuxiliares.segundosToText(-999999999), null);
    });
    it('Parámetros que no son números enteros', function () {
        assert.equal(FuncionesAuxiliares.segundosToText(null), null);
        assert.equal(FuncionesAuxiliares.segundosToText(7.0), "00:00:07");
        assert.equal(FuncionesAuxiliares.segundosToText(7.5), null);
        assert.equal(FuncionesAuxiliares.segundosToText('abc'), null);
        assert.equal(FuncionesAuxiliares.segundosToText('10'), null);
        assert.equal(FuncionesAuxiliares.segundosToText(true), null);
        assert.equal(FuncionesAuxiliares.segundosToText(false), null);
    });
});