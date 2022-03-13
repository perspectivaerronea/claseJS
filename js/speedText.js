/*
Speed Char - Es un juego para agilizar el manejo con el teclado
*/


class Puntaje {
    constructor(id, puntaje) {
        this.id = id;
        this.puntaje = puntaje;
        this.nuevo = true;
    }

    // GETTERS
    getID() {
        return this.id;
    }

    getPuntaje() {
        return this.puntaje;
    }

    getNuevo() {
        return this.nuevo;
    }

    setNuevo(nuevo) {
        this.nuevo = nuevo;
    }

    yaNoEsNuevo() {
        this.nuevo = false;
    }
}

class Turno {
    constructor(numTurno) {
        this.numTurno = numTurno;
        this.caracter = "";
        this.caracterUsuario = "";
        this.tiempoInicio = new Date();
        this.tiempoFin = new Date();
        this.tiempoTurno = 0;
        this.puntaje = 0;
    }

    //Getters and Setters
    getNumTurno() {
        return this.numTurno;
    }

    getCaracter() {
        return this.caracter;
    }

    getCaracterUsuario() {
        return this.caracterUsuario;
    }

    getTiempoInicio() {
        return this.tiempoInicio;
    }

    getTiempoFin() {
        return this.tiempoFin;
    }

    getTiempoTurno() {
        return this.tiempoTurno / 1000;
    }

    getPuntaje() {
        return this.puntaje;
    }

    setNumTurno(numTurno) {
        this.numTurno = numTurno;
    }

    setCaracter(caracter) {
        this.caracter = caracter;
    }

    setCaracterUsuario(caracterUsuario) {
        this.caracterUsuario = caracterUsuario;
    }

    setTiempoInicio() {
        this.tiempoInicio = new Date();
    }

    setTiempoFin() {
        this.tiempoFin = new Date();
    }

    //METODOS

    calculaTiempo() {
        this.tiempoTurno = this.tiempoFin - this.tiempoInicio;
    }

    calculaPuntaje() {
        //Evalua la clasificación del caracter
        let letra = this.caracter;

        this.puntaje = 0;

        if (this.caracter.toUpperCase() == this.caracterUsuario.toUpperCase()) {
            //Puntaje en base al tipo de caracter
            if (isNaN(parseInt(letra))) {
                //Si no es un número evaluo que el código no sea uno que esté comprendido entre 65 (A) y 90 (Z) para identificar los caracteres especiales
                if (letra.charCodeAt(0) < 65 || letra.charCodeAt(0) > 90) {
                    if (this.caracter === this.caracterUsuario) {
                        this.puntaje = 30;
                    } else {
                        this.puntaje = 25;
                    }
                } else {
                    this.puntaje = 40;
                }
            } else {
                this.puntaje = 15;
            }

            //Calcula el tiempo en segundos en milisegundos
            this.calculaTiempo();

            //Se pasa de milisegundos a segundos
            let tiempo = this.tiempoTurno / 1000;

            //En base a cuanto haya tardado determina un puntaje
            if (tiempo <= 1.5) {
                this.puntaje += 100;
            } else if (tiempo <= 3) {
                this.puntaje += 80;
            } else if (tiempo <= 5) {
                this.puntaje += 40;
            } else if (tiempo <= 7) {
                this.puntaje += 20;
            } else if (tiempo <= 10) {
                this.puntaje += 10;
            }
        }

        // console.log(this.puntaje);

    }
}

function mostrarPuntajes() {
    let posNAP = posUser = 0;

    mensaje = "TABLA DE PUNTAJES" + SALTO + SALTO;

    for (let i = 0; i < puntajes.length; i++) {
        mensaje += (i + 1) + " | " + puntajes[i].getID() + " - " + puntajes[i].getPuntaje() + SALTO;
    }

    //Mensaje espcial
    posNAP = puntajes.indexOf(puntajes.find((el) => el.getID() == "NAP"));
    posUser = puntajes.indexOf(puntajes.find((el) => el.getNuevo() == true));

    mensaje += SALTO;

    let difPosicion = 0;
    //NAP está por sobre el puntaje nuevo

    difPosicion = posUser - posNAP;

    if (posUser == puntajes.length - 1) {
        mensaje += "NAP - ¡Ah! Estás último, te falta mucho para superarme, seguí intentando y capaz me superes alguna vez.";
    } else if (difPosicion <= (puntajes.length - 1) && difPosicion > 1) {
        mensaje += "NAP - Vas mejorando pero todavia te falta para alcanzarme.";
    } else if (difPosicion == 1) {
        mensaje += "NAP - ¿ya 2do lugar? Te felicito, pero aún no me alcanzaste.";
    } else if (posUser == 0) {
        mensaje += "NAP - ¡¿Cómo puede ser que me hayas superado?! Igual no te hagas ilusiones de que vaya a durar demasiado porque cuando cierres la app tu puntaje se va a perder y yo voy a volver al primer lugar. ¡jajajaja!";
    }


    alert(mensaje);
}

//CONSTANTES

// Función Flecha para obtener un número random entre 33 y 165
const RANDOM_NUM = () => {
    //Para definir el rango hago Math.random() * (max-min) + min
    let rn = Math.round((Math.random() * (126 - 33) + 33));
    // console.log("El número generado al azar es: " + rn);
    return rn;
}

// Función Flecha para obtener un caracter al azar para que el usuario lo cargue
const RANDOM_CHAR = () => {
    let st = String.fromCharCode(RANDOM_NUM());
    // console.log("El caracter generado es: " + st);
    return st;
}

const SALTO = "\n";

const MENU = "SpeedChar" + SALTO + SALTO + "Elija una de las opciones" + SALTO + "1) Jugar " + SALTO + "2) Puntajes " + SALTO + "3) ¿Cómo jugar?" + SALTO + "4) Salir";


//VARIABLES
let opcion = repetir = texto = letra = mensaje = "";
let numTurno = puntajeTotal = 0;

// Almacena la cadena que va armando el jugador
let cadena = [];

// Contiene la información de cada turno para luego calcular los puntajes
let turnos = [];

// Este array va a almacenar los puntajes
let puntajes = [];

// Valores por defecto para los puntajes
puntajes.push(new Puntaje('NAP', 2000));
puntajes.push(new Puntaje('NYR', 1000));
puntajes.push(new Puntaje('FCP', 600));
puntajes.push(new Puntaje('DEM', 400));
puntajes.push(new Puntaje('SEL', 200));

//cambio el valor de los puntajes para que no sean considerados como nuevos
for (const p of puntajes) {
    p.yaNoEsNuevo();
}

//PROGRAMA PRINCIPAL

//Bucle menú  principal 
do {

    opcion = prompt(MENU);

    if (parseInt(opcion)) {

        //switch opciones
        switch (parseInt(opcion)) {
            case 1:
                //JUGAR

                do {

                    //Reset de las variables
                    contA = contE = contI = contO = contU = contVoc = contCon = contNum = contEsp = numTurno = puntajeTotal = 0;
                    turnos = [];

                    do {
                        numTurno++;

                        turnos.push(new Turno(numTurno, ""));

                        //Inicia el turno
                        turnos[turnos.length - 1].setTiempoInicio();

                        //Pide el ingreso de datos
                        letra = RANDOM_CHAR();
                        letraUsuario = prompt(letra);

                        turnos[turnos.length - 1].setTiempoFin();
                        turnos[turnos.length - 1].setCaracter(letra);
                        turnos[turnos.length - 1].setCaracterUsuario(letraUsuario);
                        turnos[turnos.length - 1].calculaPuntaje();

                        cadena.push(letra);

                        //Info Turno
                        mensaje = "N° Turno: " + turnos[turnos.length - 1].getNumTurno() + SALTO;
                        mensaje += "Caracteres: " + turnos[turnos.length - 1].getCaracter() + " - " + turnos[turnos.length - 1].getCaracterUsuario() + SALTO;
                        mensaje += "Tiempo (en segundos): " + turnos[turnos.length - 1].getTiempoTurno() + SALTO;
                        mensaje += "Puntaje: " + turnos[turnos.length - 1].getPuntaje() + SALTO;
                        mensaje += "Cadena hasta el momento: " + cadena;

                        console.log(mensaje);

                    } while (letra.toUpperCase() == letraUsuario.toUpperCase());

                    //calcula el puntaje total;
                    for (const t of turnos) {
                        puntajeTotal += t.getPuntaje();
                    }

                    do {
                        id = prompt("Ingrese tres caracteres para la tabla de puntajes (tres caracteres, por ejemplo: BAN): ");
                    } while (id.length != 3);

                    if (puntajeTotal == 0) {

                        //Mensaje en caso de que haga 0 puntos
                        alert("NAP - ¿¡0 puntos!? Intentá de nuevo, estoy seguro de que podés hacerlo mejor.");
                    }
                    else {

                        //Buscar el que figure como "nuevo" para que ya deje de serlo
                        nuevoAnt = puntajes.find((el) => el.getNuevo() == true);
                        if (nuevoAnt != undefined) {
                            nuevoAnt.yaNoEsNuevo();
                        }

                        //Almacena el nuevo puntaje
                        puntajes.push(new Puntaje(id.toUpperCase(), puntajeTotal));

                        //Ordeno los puntajes en orden descendente
                        puntajes.sort((a, b) => {
                            if (a.getPuntaje() > b.getPuntaje()) {
                                return -1;
                            }
                            if (a.getPuntaje() < b.getPuntaje()) {
                                return 1;
                            }
                            return 0;
                        });

                        //Limpia los registros por sobre el 6to lugar
                        while(puntajes.length > 6){
                            fuera = puntajes.pop();
                        }

                        //Muestro los puntajes
                        mostrarPuntajes();
                    }


                    //Con este bucle se pregunta para repetir la ejecución de la funcionalidad.
                    do {
                        repetir = prompt("¿Querés jugar otra vez?(S/N)");
                    } while ((repetir.toUpperCase() != "S") && (repetir.toUpperCase() != "N"));

                } while (repetir.toUpperCase() == "S");


                break;

            case 2:
                //PUNTAJE
                mostrarPuntajes();
                break;
            case 3:
                //¿CÓMO JUGAR?
                mensaje = "El juego en cada turno te va a pedir que ingreses un caracter, teniendo en cuenta el tipo de caracter y la velocidad con la que lo ingreses va a calcular tu puntaje." + SALTO + SALTO;
                mensaje += "Calculo Puntaje:" + SALTO;
                mensaje += "Número                            => 15 puntos" + SALTO;
                mensaje += "Letra:" + SALTO;
                mensaje += "Coincidencia Partial  (ej: m = M) => 25 puntos" + SALTO;
                mensaje += "Coincidencia Perfecta (ej: M = M) => 30 puntos" + SALTO;
                mensaje += "Caracter Especial                 => 40 puntos" + SALTO + SALTO;
                mensaje += "Valores en base al tiempo de respuesta:" + SALTO;
                mensaje += "Menos de 1.5 segundos => 100 puntos " + SALTO;
                mensaje += "Entre 1.5~3 segundos  =>  80 puntos " + SALTO;
                mensaje += "Entre 3~5 segundos    =>  40 puntos " + SALTO;
                mensaje += "Entre 5~7 segundos    =>  20 puntos " + SALTO;
                mensaje += "Entre 7~10 segundos   =>  40 puntos " + SALTO;
                mensaje += "Más de 10 segundos    =>  00 puntos " + SALTO;

                alert(mensaje);

                break;
            case 4:
                //SALIDAS
                alert("¡Gracias por jugar!");
                break;
            default:
                alert("Elija alguna de las opciones válidas.");
                break;

        }

    } else {
        alert("Elija alguna de las opciones válidas. ");
    }

    //Final bucle principal
} while (parseInt(opcion) != 4);