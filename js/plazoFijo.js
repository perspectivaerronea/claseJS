/*
PLAN DE AHORRO

La idea es la creación de una aplicacíon que a través de definir un monto obejetivo nos calcule cuanto tiempo nos llevaría llegar al mismo a través del uso de plazos fijos, teniendo en cuenta el TNA, 
cuanto ahorramos de forma constante mensualmente.

En este momento funciona sin permitir un ajuste fino de si en un mes no queremos reinvertir la ganancia del plazo fijo, o si podemos ahorrar un poco más. Esta edición a nivel de MES se va a agregar 
cuando ya podamos trabajar con el DOM (o al menos esa es la idea).

*/

//CONSTANTES
const SALTO = "\n";
const DOS_DECIMALES = (num) => { return Math.round(num * 100) / 100; };

//VARIABLES
let cajaMeses = document.getElementById("meses");
let montoObjetivo = document.getElementById("montoObjetivo");
let ahorroMensual = document.getElementById("ahorroMensual");
let tna = document.getElementById("tna");
let reinvertir = document.getElementById('reinvertir');
let resultado = document.getElementById('resultado');

let PlanAhorroTemp;

//CLASES

class PlazoFijo {
    constructor(inversion, ahorroAcumulado, tna) {
        this.inversion = inversion;
        this.ahorroAcumulado = ahorroAcumulado;
        this.tna = tna;
        this.tnaMensual = 0;
        this.ganancia = 0;
    }

    //Getters & Setters
    getInversion() {
        return this.inversion;
    }

    getAhorroAcumulado() {
        return this.ahorroAcumulado;
    }

    getTNA() {
        return this.tna;
    }

    getTNAMensual() {
        return this.tnaMensual;
    }

    getGanancia() {
        return this.ganancia;
    }

    setInversion(inversion) {
        this.inversion = inversion;
    }

    setAhorroAcumulado(ahorroAcumulado) {
        this.ahorroAcumulado = ahorroAcumulado;
    }

    setTNA(tna) {
        this.tna = tna;
    }

    //Metodos
    calcularTNAMensual() {
        this.tnaMensual = this.tna / 12;
    }

    calcularAhorroAcumulado() {
        this.ahorroAcumulado += this.inversion;
    }

    cancelarAhorroAcumulado() {
        this.ahorroAcumulado -= this.inversion;
    }

    calcularGanancia() {
        this.calcularTNAMensual();
        this.calcularAhorroAcumulado();
        this.ganancia = DOS_DECIMALES(this.ahorroAcumulado * this.tnaMensual / 100);
    }


}

class Mes {
    constructor(inversion, ahorroAcumulado, gananciaAnterior, reinvertir, tna) {
        this.inversion = inversion;
        this.ahorroAcumulado = ahorroAcumulado;
        this.gananciaAnterior = gananciaAnterior;
        this.reinvertir = reinvertir;
        this.tna = tna;

        this.montoinversion = this.obtenerMonto();
        this.plazoFijo = new PlazoFijo(this.montoinversion, this.ahorroAcumulado, this.tna);
    }

    //Getters & Setters
    getInversion() {
        return DOS_DECIMALES(this.inversion);
    }

    getMontoInversion() {
        return DOS_DECIMALES(this.montoinversion);
    }

    getAhorroAcumulado() {
        return DOS_DECIMALES(this.ahorroAcumulado);
    }

    getReinvertir() {
        if (this.reinvertir) {
            return "Si";
        } else {
            return "No";
        }
    }

    getTNA() {
        return this.plazoFijo.getTNA();
    }

    getGanancia() {
        return this.plazoFijo.getGanancia();
    }

    getPlazoFijo() {
        return this.plazoFijo;
    }

    setInversion(inversion) {
        this.inversion = inversion;
    }

    setAhorroAcumulado(ahorroAcumulado) {
        this.ahorroAcumulado = ahorroAcumulado;
    }

    setGananciaAnterior(gananciaAnterior) {
        this.gananciaAnterior = gananciaAnterior;
    }

    setReinvertir(reinvertir) {
        if (reinvertir.toUpperString() == "SI") {
            this.reinvertir = true;
        } else {
            this.reinvertir = false;
        }
    }

    setTNA(tna) {
        this.plazoFijo.setTNA(tna);
    }

    //Metodos
    obtenerMonto() {
        let monto = 0;
        if (this.reinvertir) {
            monto = this.inversion + this.gananciaAnterior;
        } else {
            monto = this.inversion;
        }
        return monto;
    }

    calularAhorroAcumulado(ahorroAcumulado) {
        this.ahorroAcumulado += ahorroAcumulado;
    }

    calcularPlazoFijo() {
        this.calularAhorroAcumulado(this.inversion);
        this.plazoFijo.calcularGanancia();

    }

    recalcularPlazoFijo() {
        this.plazoFijo.cancelarAhorroAcumulado();
        this.plazoFijo.setInversion(this.obtenerMonto());
        this.plazoFijo.calcularGanancia();
        this.setAhorroAcumulado(this.plazoFijo.getAhorroAcumulado());
    }
}

class PlanAhorro {
    constructor(montoObjetivo, ahorroMensual, reinvertir, tna) {
        this.montoObjetivo = montoObjetivo;
        this.ahorroMensual = ahorroMensual;
        this.reinvertir = reinvertir;
        this.tna = tna;
        this.falta = montoObjetivo;
        this.ahorroAcumulado = 0;
        this.gananciaTotal = 0;
        this.mes = [];
    }

    //Getters & Setters
    getMontoObjetivo() {
        return DOS_DECIMALES(this.montoObjetivo);
    }

    getAhorroMensual() {
        return DOS_DECIMALES(this.ahorroMensual);
    }

    getReinvertir() {
        if (this.reinvertir) {
            return "Si";
        } else {
            return "No";
        }
    }

    getMes(id) {
        return this.mes[id];
    }

    getMeses() {
        return this.mes.length;
    }

    getFalta() {
        return DOS_DECIMALES(this.falta);
    }

    getAhorroAcumulado() {
        return DOS_DECIMALES(this.ahorroAcumulado);
    }

    getGananciaTotal() {
        return DOS_DECIMALES(this.gananciaTotal);
    }

    setMontoObjetivo(montoObjetivo) {
        this.montoObjetivo = montoObjetivo;
    }

    setAhorroMenusal(ahorroMensual) {
        this.ahorroMensual = ahorroMensual;
    }

    setReinvertir(reinvertir) {
        if (reinvertir.toUpperString() == "SI" || reinvertir.toUpperString() == "S") {
            this.reinvertir = true;
        } else {
            this.reinvertir = false;
        }
    }

    //Metodos
    calcularAhorroAcumulado(acumulado) {
        this.ahorroAcumulado += acumulado;
    }

    calcularFalta(acumulado) {
        this.falta -= acumulado;
    }

    calcularGananciaTotal(ganancia) {
        this.gananciaTotal += ganancia;
    }

    mesAnterior() {
        if (this.mes.length <= 1) {
            return 0;
        } else {
            return this.mes.length - 2;
        }
    }

    mesActual() {
        if (this.mes.length <= 1) {
            return 0;
        } else {
            return this.mes.length - 1;
        }
    }

    nuevoMes() {
        if (this.mes.length < 1) {
            this.mes.push(new Mes(this.ahorroMensual, 0, 0, this.reinvertir, this.tna));
        } else {
            this.mes.push(new Mes(this.ahorroMensual, this.ahorroAcumulado, this.mes[this.mes.length - 1].getGanancia(), this.reinvertir, this.tna));
        }
    }

    procesarMes() {
        this.mes[this.mesActual()].calcularPlazoFijo();

        let inversion = this.mes[this.mesActual()].getInversion();
        let ganancia = this.mes[this.mesActual()].getGanancia();
        let monto = 0;

        if (this.reinvertir) {
            monto = inversion + ganancia;
        } else {
            monto = inversion;
        }

        this.calcularAhorroAcumulado(monto);
        this.calcularFalta(monto);
        this.calcularGananciaTotal(ganancia);
    }

    calcularPlanDeAhorro() {
        while (this.falta > 0) {
            this.nuevoMes();
            this.procesarMes();

        }
    }

    reCalcularPlanDeAhorro() {
        let nuevoMes = false;
        this.falta = this.getMontoObjetivo();
        for (const mesN of this.mes) {
            mesN.calcularPlazoFijo();

            let inversion = mesN.getInversion();
            let ganancia = mesN.getGanancia();
            let monto = 0;

            if (this.reinvertir) {
                monto = inversion + ganancia;
            } else {
                monto = inversion;
            }

            this.calcularAhorroAcumulado(monto);
            this.calcularFalta(monto);
            this.calcularGananciaTotal(ganancia);
        }
        if (this.getFalta() > 0) {
            calcularPlanDeAhorro();
        }
    }

}

function limpiarMeses(cajaMeses) {
    //Borrar los elementos en caso que se esté reprocesando        
    if (cajaMeses.children.length > 0) {
        // resultado.removeChild(resultado.lastElementChild);
        while (cajaMeses.hasChildNodes()) {
            cajaMeses.removeChild(cajaMeses.firstChild);
        }
    }
}

//Programa Principal
function listadoMeses(pa) {

    let cajaMeses = document.getElementById("meses");

    //Borrar los elementos en caso que se esté reprocesando        
    limpiarMeses(cajaMeses);

    for (let i = 0; i < pa.getMeses(); i++) {

        let mes = pa.getMes(i);
        let contenedorMes = document.createElement("div");
        let cambioAnio;

        // Para el més que indica un cambio de año se agrega una clase para que sea destacado
        if ((i + 1) % 12 == 0) {
            cambioAnio = 'cambioAnio';
        } else {
            cambioAnio = '';
        }
        
        if ((pa.getMontoObjetivo() - mes.getAhorroAcumulado()) >= 0) {
            contenedorMes.innerHTML = ` <div class='flex-item ${cambioAnio}'>
                                        <div class='cabeceraMes'>
                                            <h4> Mes ${i + 1}°</h4> 
                                            <input type="checkbox" id="editar${i}" name="Editar" class="editar">
                                        </div>
                                        <form>
                                            <div>
                                                <label for="InversionMensual"> Inversión Mensual:</label>
                                                <input id="inversionMensual${i}" name="InversionMensual" value= ${mes.getInversion()} disabled>
                                            </div>
                                            <div>    
                                                <label for="GananciaAnterior"> Ganancia Anterior:</label>
                                                <input id="gananciaAnterior${i}" name="InversionMensual" value= ${mes.getGanancia()} disabled>
                                            </div > 
                                            <div>    
                                            <label for="AhorroAcumulado"> Ahorro Acumulado:</label>
                                            <input id="ahorroAcumulado${i}" name="AhorroAcumulado" value= ${mes.getAhorroAcumulado()} disabled>
                                        </div > 
                                        </form >
                                    </div>`;
            cajaMeses.appendChild(contenedorMes);
        }
    }
}



function validacion(obj) {
    let claseError = 'incompleto';
    obj.classList.remove(claseError);
    if (obj.value == "") {
        obj.focus();
        obj.classList.add(claseError);
        return false;
    }
    return true;
}


/*
Esta función es la que crea el plan de ahorro, crea el listado de meses y pone el resultado del proceso
*/
function creaPlan(montoObjetivo, ahorroMensual, decision, tna) {

    // let resultado = document.getElementById('resultado');
    let parrafo = document.createElement('p');

    let pa = new PlanAhorro(parseFloat(montoObjetivo), parseFloat(ahorroMensual), decision, parseFloat(tna));

    pa.calcularPlanDeAhorro();

    listadoMeses(pa);

    // PROCESAMIENTO DEL PLAZO FIJO    
    let mensaje = "El objetivo de tu plazo fijo es de un monto de $" + pa.getMontoObjetivo() + SALTO;

    // EN BASE A LA CANTIDAD DE MESES QUE LLEVE LLEGAR AL OBJETIVO CAMBIA EL MENSAJE QUE SE MUESTRA AL USUARIO
    if (pa.getMeses() == 1) {
        submensaje = 'mes';
    } else {
        submensaje = 'meses';
    }

    // mensaje += 'Vas a lograr tu objetivo en ' + pa.getMeses() + ' ' + submensaje + ' con un ahorro total de $' + pa.getAhorroAcumulado() + '. Las ganancias totales generadas por el plazo fijo a modo de interés seran de $' + pa.getGananciaTotal();
    mensaje += 'Vas a lograr tu objetivo en ' + pa.getMeses() + ' ' + submensaje + ' con un ahorro total de $' + pa.getAhorroAcumulado() + '.';

    // SE LE MUESTRA AL USUARIO EL RESULTADO DEL PROCESAMIENTO
    let texto = document.createTextNode(mensaje);
    parrafo.appendChild(texto);
    resultado.appendChild(parrafo);

    let Editar = document.querySelectorAll(".editar");
    for (const ed of Editar) {
        ed.addEventListener("change", toggleEdicion);
    }

    PlanAhorroTemp = pa;
}

/*
Función general que se dispara al crear el plan de ahorro
*/
function armarPlanDeAhorro(e) {
    // let montoObjetivo = document.getElementById("montoObjetivo");
    // let ahorroMensual = document.getElementById("ahorroMensual");
    // let tna = document.getElementById("tna");
    // let reinvertir = document.getElementById('reinvertir');
    let decision = false;


    //Evito funcionamiento estandar
    e.preventDefault();

    //VALIDACIONES
    if (!(validacion(montoObjetivo))) { return false; }
    if (!(validacion(ahorroMensual))) { return false; }
    if (!(validacion(tna))) { return false; }

    if (reinvertir.checked) {
        decision = true;
    } else {
        decision = false;
    }

    //Borrar los elementos en caso que se esté reprocesando        
    if (resultado.children.length > 0) {
        resultado.removeChild(resultado.lastElementChild);
    }

    creaPlan(montoObjetivo.value, ahorroMensual.value, decision, tna.value);

}

//Limpia el formulario y todo lo demás.
function limpiar() {
    // let cajaMeses = document.getElementById("meses");
    // let montoObjetivo = document.getElementById("montoObjetivo");
    // let ahorroMensual = document.getElementById("ahorroMensual");
    // let tna = document.getElementById("tna");
    // let reinvertir = document.getElementById('reinvertir');
    // let resultado = document.getElementById('resultado');

    montoObjetivo.value = '';
    ahorroMensual.value = '';
    tna.value = '';
    reinvertir.checked = false;

    limpiarMeses(cajaMeses);

    //Borrar los elementos en caso que se esté reprocesando        
    if (resultado.children.length > 0) {
        resultado.removeChild(resultado.lastElementChild);
    }
}

//Guarda el objeto que se pasa como parametro en formato JSON dentro del local storage
function guardarJSON(obj) {
    let enJSON = JSON.stringify(obj.value);
    localStorage.setItem(obj.id, enJSON);
}

//Recupera del JSON el valor almacenado
function cargarJSON(obj) {
    return JSON.parse(localStorage.getItem(obj.id));
}

function borrarGuardado() {
    localStorage.clear();
    valoresPrueba();
}

//Guardar Plan
function guardarPlan() {

    // let montoObjetivo = document.getElementById("montoObjetivo");
    // let ahorroMensual = document.getElementById("ahorroMensual");
    // let tna = document.getElementById("tna");
    // let reinvertir = document.getElementById('reinvertir');

    if (reinvertir.checked) {
        reinvertir.value = 'true';
        // sessionStorage.setItem("Reinvertir", "true");
    } else {
        reinvertir.value = 'false';
        // sessionStorage.setItem("Reinvertir", "false");
    }

    //JSON
    guardarJSON(montoObjetivo);
    guardarJSON(ahorroMensual);
    guardarJSON(tna);
    guardarJSON(reinvertir);
}

//Carga Plan, dispara el procesamiento si es que hay algún valor guardado
function cargarPlan() {
    // let cajaMeses = document.getElementById("meses");
    // let montoObjetivo = document.getElementById("montoObjetivo");
    // let ahorroMensual = document.getElementById("ahorroMensual");
    // let tna = document.getElementById("tna");
    // let reinvertir = document.getElementById('reinvertir');
    // let resultado = document.getElementById('resultado');
    let decision = false;


    //Si hay datos guardados disparo la generación del plan
    if (cargarJSON(montoObjetivo) != null) {

        montoObjetivo.value = cargarJSON(montoObjetivo);
        ahorroMensual.value = cargarJSON(ahorroMensual);
        tna.value = cargarJSON(tna);
        reinvertir.checked = (cargarJSON(reinvertir) == 'true');


        if (reinvertir.checked) {
            decision = true;
        } else {
            decision = false;
        }

        //limpia los resultados
        limpiarMeses(cajaMeses);

        //Borrar los elementos en caso que se esté reprocesando        
        if (resultado.children.length > 0) {
            resultado.removeChild(resultado.lastElementChild);
        }

        //Genera el plan asociado a los valores que se habían almacenado
        creaPlan(montoObjetivo.value, ahorroMensual.value, decision, tna.value);
    }

}

function valoresPrueba() {
    localStorage.setItem('montoObjetivoPrueba', JSON.stringify('1000000'));
    localStorage.setItem('ahorroMensualPrueba', JSON.stringify('35000'));
    localStorage.setItem('tnaPrueba', JSON.stringify('41.5'));
    localStorage.setItem('reinvertirPrueba', JSON.stringify('true'));
}

function cargarValoresPrueba() {

    // let cajaMeses = document.getElementById("meses");
    // let montoObjetivo = document.getElementById("montoObjetivo");
    // let ahorroMensual = document.getElementById("ahorroMensual");
    // let tna = document.getElementById("tna");
    // let reinvertir = document.getElementById('reinvertir');
    // let resultado = document.getElementById('resultado');
    let decision = false;

    //Si hay datos guardados disparo la generación del plan
    montoObjetivo.value = JSON.parse(localStorage.getItem('montoObjetivoPrueba'));
    ahorroMensual.value = JSON.parse(localStorage.getItem('ahorroMensualPrueba'));
    tna.value = JSON.parse(localStorage.getItem('tnaPrueba'));
    reinvertir.checked = (JSON.parse(localStorage.getItem('reinvertirPrueba')) == 'true');

    if (reinvertir.checked) {
        decision = true;
    } else {
        decision = false;
    }

    //limpia los resultados
    limpiarMeses(cajaMeses);

    //Borrar los elementos en caso que se esté reprocesando        
    if (resultado.children.length > 0) {
        resultado.removeChild(resultado.lastElementChild);
    }

    //Genera el plan asociado a los valores que se habían almacenado
    creaPlan(montoObjetivo.value, ahorroMensual.value, decision, tna.value);
}

function actualizarValor() {
    let parrafo = document.createElement('p');
    let num = (this.id).replace('inversionMensual', '');
    let monto = this.value;

    let mes = PlanAhorroTemp.getMes(num);

    mes.setInversion(parseFloat(monto));
    mes.recalcularPlazoFijo();

    document.getElementById('gananciaAnterior' + num).value = mes.getGanancia();
    document.getElementById('ahorroAcumulado' + num).value = mes.getAhorroAcumulado();

    PlanAhorroTemp.reCalcularPlanDeAhorro();

    listadoMeses(PlanAhorroTemp);

    // PROCESAMIENTO DEL PLAZO FIJO    
    let mensaje = "El objetivo de tu plazo fijo es de un monto de $" + PlanAhorroTemp.getMontoObjetivo() + SALTO;

    // EN BASE A LA CANTIDAD DE MESES QUE LLEVE LLEGAR AL OBJETIVO CAMBIA EL MENSAJE QUE SE MUESTRA AL USUARIO
    if (PlanAhorroTemp.getMeses() == 1) {
        submensaje = 'mes';
    } else {
        submensaje = 'meses';
    }

    // mensaje += 'Vas a lograr tu objetivo en ' + pa.getMeses() + ' ' + submensaje + ' con un ahorro total de $' + pa.getAhorroAcumulado() + '. Las ganancias totales generadas por el plazo fijo a modo de interés seran de $' + pa.getGananciaTotal();
    mensaje += 'Vas a lograr tu objetivo en ' + PlanAhorroTemp.getMeses() + ' ' + submensaje + ' con un ahorro total de $' + PlanAhorroTemp.getAhorroAcumulado() + '.';

    // SE LE MUESTRA AL USUARIO EL RESULTADO DEL PROCESAMIENTO
    let texto = document.createTextNode(mensaje);
    parrafo.appendChild(texto);
    resultado.appendChild(parrafo);

    let Editar = document.querySelectorAll(".editar");
    for (const ed of Editar) {
        ed.addEventListener("change", toggleEdicion);
    }


}

function toggleEdicion() {
    let valor = this.checked;
    let num = (this.id).replace('editar', '');
    let mesIM = document.getElementById("inversionMensual" + num);
    mesIM.disabled = !valor;

    mesIM.addEventListener("change", actualizarValor);

}

//EVENTOS 

//PROCESAR 
let submit = document.getElementById("procesar");
submit.addEventListener("click", armarPlanDeAhorro);

//LIMPIAR
let btnLimpiar = document.getElementById("limpiar");
btnLimpiar.addEventListener("click", limpiar);

//GUARDAR
let btnGuardar = document.getElementById("guardar");
btnGuardar.addEventListener("click", guardarPlan);

//CARGAR
let btnCargar = document.getElementById("cargar");
btnCargar.addEventListener("click", cargarPlan);

//CREA VALORES DE PRUEBA EN EL LOCAL STORAGE
valoresPrueba();

//CARGAR VALORES DE PRUEBA
let btnCargarPrueba = document.getElementById("cargarPrueba");
btnCargarPrueba.addEventListener("click", cargarValoresPrueba);


//BORRAR DATOS GUARDADOS
let btnBorrar = document.getElementById("borrar");
btnBorrar.addEventListener("click", borrarGuardado);
