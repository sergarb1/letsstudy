// Clase que configura el objeto Pomodoro asociado al Usuario
// (en principio solamente existirá uno)

class Pomodoro {
    // Se construye inicialmente al crearse el Ususario
    // con los valores por defecto de un pomodoro clásico, con
    // las duraciones por minutos
    constructor() {
        this.numeroCiclos = 1
        this.numeroRondas = 3
        this.duracionRonda = 25
        this.duracionDescansoCorto = 5
        this.duracionDescansoLargo = 25
        // Inicializamos atributos para controlar la sesión pomodoro
        this.cicloActual = 0
        this.rondaActual = 0
        this.descansoActual = 0
        this.enDescanso = false  // para controlar si estamos en estudio o en descanso
        this.enMarcha = false  // para controlar si estamos en sesion de pomodoro o no
    }

    // Getters y setters de todos los atributos para hacerlos
    // configurables por el propio usuario
    getNumeroCiclos() {
        return this.numeroCiclos
    }
    setNumeroCiclos(cantidad) {
        this.numeroCiclos = cantidad
    }

    getNumeroRondas() {
        return this.numeroRondas
    }
    setNumeroRondas(cantidad) {
        this.numeroRondas = cantidad
    }

    getDuracionRonda() {
        return this.duracionRonda
    }
    setDuracionrondas(tiempo) {
        this.duracionRonda = tiempo
    }

    getDuracionDescansoCorto() {
        return this.duracionDescansoCorto
    }
    setDuracionDescansoCorto(tiempo) {
        this.duracionDescansoCorto = tiempo
    }

    getDuracionDescansoLargo() {
        return this.duracionDescansoLargo
    }
    setDuracionDescansoLargo(tiempo) {
        this.duracionDescansoLargo = tiempo
    }

    // Atributos con solo getters
    getCicloActual() {
        return this.cicloActual
    }
    getRondaActual() {
        return this.rondaActual
    }
    getDescansoActual() {
        return this.descansoActual
    }
    getEnDescanso() {
        return this.enDescanso
    }
    getEnMarcha() {
        return this.enMarcha
    }

    // Setter para poner en marcha/parar la sesión pomodoro desde fuera de la clase
    // podría valer para parar ela sesión pomodoro antes de hora?
    setEnMarcha(valor) {
        this.enMarcha = valor  // valor booleano
    }

    // Si se decide controlar el pomodoro desde la clase,
    // a continuación vendrían los métodos para ello

    // incrementamos ronda mientras queden, si no a cero
    incrementaRondaActual() {
        if(this.getEnMarcha() && this.getRondaActual() < this.numeroRondas) {
            this.rondaActual += 1
            this.descansoActual = this.getDuracionDescansoCorto()
            this.enDescanso = true
            setTimeout(function(){
                this.enDescanso = false
            }, (this.descansoActual * 60 *60 *1000))  // función que cambia de descanso a no descanso en un tiempo establecido

        } else if(this.getEnMarcha()) {
            this.rondaActual = 0
            this.cicloActual += 1
            this.descansoActual = this.getDuracionDescansoLargo()
            this.enDescanso = true
            setTimeout(function(){
                this.enDescanso = false
            }, (this.descansoActual * 60 * 60 * 1000))  // función que cambia de descanso a no descanso en un tiempo establecido

            if(this.getCicloActual() === this.numeroCiclos) {
                this.cicloActual = 0
                this.descansoActual = 0
                this.enMarcha = false
            }
        }
    }

    // método principal de gestión de la sesión pomodoro, tiempo en minutos
    // se ejecutará cada minuto en iniciar el cronómetro
    update(tiempo) {
        let ciclos = this.getCicloActual()
        let rondas = this.getRondaActual() + (ciclos * this.getNumeroRondas())
        let descansoTotal = (ciclos * this.duracionDescansoLargo) + (rondas * this.duracionDescansoCorto)
        if(this.getEnMarcha() && !this.getEnDescanso() && (tiempo - descansoTotal) % this.getDuracionRonda() === 0) {
            this.incrementaRondaActual()
        }
    }

}
