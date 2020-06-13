var assert = require('assert');
//var fa = require('../src/clases/FuncionesAuxiliares');
const fa = require('../src/clases/FuncionesAuxiliares');

// Tests de la clase FuncionesAuxiliares
describe('FuncionesAuxiliares', function () {
    
    //import FuncionesAuxiliares from 'src/clases/FuncionesAuxiliares'

    // Tests de la función segundosToText
    describe('segundosToText()', function () {
        it('Entre 0 y 86400 segundos', function () {
            assert.equal(fa.segundosToText(0), "00:00:00");
            assert.equal(fa.segundosToText(0), "00:00:00");
            assert.equal(fa.segundosToText(1), "00:00:01");
            assert.equal(fa.segundosToText(86399), "23:59:59");
            assert.equal(fa.segundosToText(86400), "24:00:00");
        });
        it('Más de 86400 segundos (24h)', function () {
            assert.equal(fa.segundosToText(86400), "24:00:00");
            assert.equal(fa.segundosToText(86401), "24:00:00");
            assert.equal(fa.segundosToText(90000), "24:00:00");
            assert.equal(fa.segundosToText(999999999), "24:00:00");
        });
        it('Segundos negativos', function () {
            assert.equal(fa.segundosToText(-1), "00:00:00");
            assert.equal(fa.segundosToText(-10), "00:00:00");
            assert.equal(fa.segundosToText(-1000), "00:00:00");
            assert.equal(fa.segundosToText(-999999999), "00:00:00");
        });
    });

    /*
    // Tests de la función minutosEntreFechas
    describe('minutosEntreFechas(fechaA, fechaB)', function () {
        it('...', function () {
            assert.equal(0, -1);
        });
    });

    // Tests de la función segundosEntreFechas
    describe('segundosEntreFechas(fechaA, fechaB)', function () {
        it('...', function () {
            assert.equal(0, -1);
        });
    });
    */

});