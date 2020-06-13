var assert = require('assert');

// Tests de sumas y restas
describe('[Test de Ejemplo] Sumas y restas', function () {

  // Tests de sumas
  describe('#Sumas', function () {

    // Test de suma de números positivos
    it('debería sumar números positivos', function () {
      assert.equal(0 + 0, 0);
      assert.equal(0 + 1, 1);
      assert.equal(0 + 999, 999);
      assert.equal(1 + 999, 1000);
      assert.equal(999 + 999, 1998);
      assert.equal(1000 + 1000, 2000);
    });

    // Test de suma de números negativos
    it('debería sumar números negativos', function () {
      assert.equal(-0 + -0, -0);
      assert.equal(-0 + -1, -1);
      assert.equal(-0 + -999, -999);
      assert.equal(-1 + -999, -1000);
      assert.equal(-999 + -999, -1998);
      assert.equal(-1000 + -1000, -2000);
    });

    // Test de suma de números positivos y negativos
    it('debería sumar números positivos y negativos', function () {
      assert.equal(0 + -0, 0);
      assert.equal(-0 + 0, -0);
      assert.equal(-0 + 1, 1);
      assert.equal(0 + -1, -1);
      assert.equal(0 + -999, -999);
      assert.equal(-0 + 999, 999);
      assert.equal(1 + -999, -998);
      assert.equal(-1 + 999, 998);
      assert.equal(999 + -999, 0);
      assert.equal(-999 + 999, 0);
      assert.equal(1000 + -1000, 0);
      assert.equal(-1000 + 1000, 0);
    });
  });

  // Tests de restas
  describe('#Restas', function () {

    // Test de restas de números positivos
    it('debería restar números positivos', function () {
      assert.equal(0 - 0, 0);
      assert.equal(0 - 1, -1);
      assert.equal(0 - 999, -999);
      assert.equal(1 - 999, -998);
      assert.equal(999 - 999, 0);
      assert.equal(1000 - 1000, 0);
    });

    // Test de restas de números negativos
    it('debería restar números negativos', function () {
      assert.equal(-0 - -0, -0);
      assert.equal(-0 - -1, 1);
      assert.equal(-0 - -999, 999);
      assert.equal(-1 - -999, 998);
      assert.equal(-999 - -999, 0);
      assert.equal(-1000 - -1000, 0);
    });

    // Test de restas de números positivos y negativos
    it('debería restar números positivos y negativos', function () {
      assert.equal(0 - -0, -0);
      assert.equal(-0 - 0, -0);
      assert.equal(-0 - 1, -1);
      assert.equal(0 - -1, 1);
      assert.equal(0 - -999, 999);
      assert.equal(-0 - 999, -999);
      assert.equal(1 - -999, 1000);
      assert.equal(-1 - 999, -1000);
      assert.equal(999 - -999, 1998);
      assert.equal(-999 - 999, -1998);
      assert.equal(1000 - -1000, 2000);
      assert.equal(-1000 - 1000, -2000);
    });
  });

});