var assert = require('assert');
import FuncionesAuxiliares, { datosSonValidos } from '../src/clases/FuncionesAuxiliares';
import Usuario from '../src/clases/Usuario';

// Sustituye localStorage por un almacén en memoria para poder probar la
// persistencia sin navegador
function instalarStorage() {
    const store = {};
    const storage = {
        getItem(clave) {
            return Object.prototype.hasOwnProperty.call(store, clave) ? store[clave] : null;
        },
        setItem(clave, valor) {
            store[clave] = String(valor);
        },
        removeItem(clave) {
            delete store[clave];
        },
        clear() {
            for (const clave in store) {
                delete store[clave];
            }
        }
    };
    Object.defineProperty(globalThis, 'localStorage', {
        value: storage,
        configurable: true,
        writable: true
    });
    return store;
}

describe('Persistencia en localStorage', function () {
    let store;

    beforeEach(function () {
        store = instalarStorage();
    });

    it('Crea un usuario por defecto si no hay datos guardados', function () {
        const restaurado = FuncionesAuxiliares.restaurarEstadoLocalStorage();

        assert.strictEqual(restaurado, true);
        assert.strictEqual(Usuario.$usuarioLocal.nombre, 'User');
        assert.strictEqual(Usuario.$usuarioLocal.planEstudio.asignaturas.length, 1);
    });

    it('Guarda y recupera el estado del usuario', function () {
        Usuario.$usuarioLocal = new Usuario('Sesi');
        assert.strictEqual(FuncionesAuxiliares.guardarEstadoLocalStorage(), true);

        Usuario.$usuarioLocal = new Usuario('otro');
        assert.strictEqual(FuncionesAuxiliares.restaurarEstadoLocalStorage(), true);

        assert.strictEqual(Usuario.$usuarioLocal.nombre, 'Sesi');
        assert.strictEqual(store.usuarioLocal__respaldo, undefined);
    });

    it('Respalda los datos corruptos y arranca de cero', function () {
        store.usuarioLocal = '{"nombre":"roto",,,';

        const restaurado = FuncionesAuxiliares.restaurarEstadoLocalStorage();

        assert.strictEqual(restaurado, false);
        assert.strictEqual(store.usuarioLocal__respaldo, '{"nombre":"roto",,,');
        assert.strictEqual(Usuario.$usuarioLocal.nombre, 'User');
        // El estado nuevo ya queda escrito, no solo en memoria
        assert.strictEqual(JSON.parse(store.usuarioLocal).nombre, 'User');
    });

    it('Rechaza JSON válido pero con una estructura incorrecta', function () {
        const original = JSON.stringify({ nombre: 42 });
        store.usuarioLocal = original;

        const restaurado = FuncionesAuxiliares.restaurarEstadoLocalStorage();

        assert.strictEqual(restaurado, false);
        assert.strictEqual(store.usuarioLocal__respaldo, original);
        assert.strictEqual(Usuario.$usuarioLocal.nombre, 'User');
        assert.strictEqual(JSON.parse(store.usuarioLocal).nombre, 'User');
    });

    it('Devuelve false si el almacenamiento no permite escribir', function () {
        Object.defineProperty(globalThis, 'localStorage', {
            value: {
                getItem: () => null,
                setItem: () => {
                    throw new Error('QuotaExceededError');
                }
            },
            configurable: true,
            writable: true
        });

        assert.strictEqual(FuncionesAuxiliares.guardarEstadoLocalStorage(), false);
    });

    it('datosSonValidos acepta el formato exportado por la app', function () {
        Usuario.$usuarioLocal = new Usuario('Sesi');
        const datos = JSON.parse(JSON.stringify(Usuario.$usuarioLocal));

        assert.strictEqual(datosSonValidos(datos), true);
    });

    it('datosSonValidos rechaza basura', function () {
        assert.strictEqual(datosSonValidos(null), false);
        assert.strictEqual(datosSonValidos('texto'), false);
        assert.strictEqual(datosSonValidos([1, 2, 3]), false);
        assert.strictEqual(datosSonValidos({}), false);
        assert.strictEqual(datosSonValidos({ nombre: 'x' }), false);
    });
});
