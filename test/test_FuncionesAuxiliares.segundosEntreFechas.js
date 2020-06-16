var assert = require('assert');
import FuncionesAuxiliares from '../src/clases/FuncionesAuxiliares';

/*
// Tests funcion segundosEntreFechas
console.log(FuncionesAuxiliares.segundosEntreFechas("2000-01-02 00:00:00","January 1 2000 00:00:00"));
console.log(FuncionesAuxiliares.segundosEntreFechas("January 2 2000 00:00:00","January 1 2000 00:00:00"));
console.log ("introduciendo ms: "+ FuncionesAuxiliares.segundosEntreFechas(1600,5000));
*/

describe('FuncionesAuxiliares.segundosEntreFechas(fechaA, fechaB)', function () {

    it('Probando años, meses, días, horas, minutos y segundos', function () {
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2020-6-1") ), 0);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:00:59") ), 59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:59"), new Date("2020-6-1 00:00:00") ), 59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:01:00") ), 60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:01:59") ), 60+59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:01:59"), new Date("2020-6-1 00:00:00") ), 60+59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:59:00") ), 59*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:59:00"), new Date("2020-6-1 00:00:00") ), 59*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:00:00") ), 60*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:00:59") ), 60*60+59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:01:00") ), 61*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:01:59") ), 61*60+59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:00:00") ), 1380*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:59:00") ), 1439*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:59:59") ), 1439*60+59);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2020-6-2") ), 24*60*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-2 01:01") ), (24*60+61)*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2020-7-1") ), 30*24*60*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2020-7-1 01:01") ), (30*24*60+61)*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2021-6-1") ), 365*24*60*60);
        assert.equal(FuncionesAuxiliares.segundosEntreFechas(new Date("2020-6-1"), new Date("2021-6-1 01:01") ), (365*24*60+61)*60);
    });

});