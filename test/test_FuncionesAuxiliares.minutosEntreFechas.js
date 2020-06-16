var assert = require('assert');
import FuncionesAuxiliares from '../src/clases/FuncionesAuxiliares';

/*
//Tests funcion minutosEntreFechas
console.log(FuncionesAuxiliares.minutosEntreFechas("2020-6-15","2021-6-15"));
console.log(FuncionesAuxiliares.minutosEntreFechas("November 12 2020 17:51","November 12 2020 17:52:55 "));
console.log(FuncionesAuxiliares.minutosEntreFechas("November 12 2020 17:51","November 12 2020 18:52"));
console.log ("introduciendo ms: "+ FuncionesAuxiliares.minutosEntreFechas(1000,5000));
*/

describe('FuncionesAuxiliares.minutosEntreFechas(fechaA, fechaB)', function () {

    it('Probando años, meses, días, horas, minutos y segundos', function () {
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2020-6-1") ), 0);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:00:59") ), 0);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:59"), new Date("2020-6-1 00:00:00") ), 0);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:01:00") ), 1);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:01:59") ), 1);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:01:59"), new Date("2020-6-1 00:00:00") ), 1);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 00:59:00") ), 59);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:59:00"), new Date("2020-6-1 00:00:00") ), 59);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:00:00") ), 60);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:00:59") ), 60);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:01:00") ), 61);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 01:01:59") ), 61);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:00:00") ), 1380);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:59:00") ), 1439);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-1 23:59:59") ), 1439);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2020-6-2") ), 24*60);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1 00:00:00"), new Date("2020-6-2 01:01") ), 24*60+61);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2020-7-1") ), 30*24*60);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2020-7-1 01:01") ), 30*24*60+61);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2021-6-1") ), 365*24*60);
        assert.equal(FuncionesAuxiliares.minutosEntreFechas(new Date("2020-6-1"), new Date("2021-6-1 01:01") ), 365*24*60+61);
    });

    
});