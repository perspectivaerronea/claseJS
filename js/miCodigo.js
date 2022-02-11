/*
El programa tiene un apartado para trabajar con cadenas de texto y otra para trabajar con números

strings:
    0) Pedir una palabra / cadena de texto
    1) Mostrar cuantas letras tiene la cadena
    2) Mostrar cuantas vocales y cuantas consonantes hay
    3) Mostrar la cadena invertida

números:
    0) pedir un número
    1) mostrar si el número es par o no
    2) mostrar si el número es positivo o negativo
    3) calcular el factorial
    4) Avisarle al usuario que se le van a pedir N números mientras el valor pasado sea menor, o igual, a 10. Sino solo pide 5 números y va a motrar:
        a) suma total
        b) promedio
        c) el mayor
        d) el menor
*/

//CONSTANTES
const SALTO = "\n";
const MENU = "Elija una de las opciones" + SALTO + "1) Texto " + SALTO + "2) Números " + SALTO + "3) Salir";


//VARIABLES
let opcion = repetir = texto = letra = textoInvertida = mensaje = subMensaje = subTexto = "";
let numero = total = factorial = mayor = menor = n = tam = contA = contE = contI = contO = contU = contVoc = contCon = contNum = contEsp = 0;

//PROGRAMA PRINCIPAL

//Bucle menú  principal 
do {

    opcion = prompt(MENU);

    if (parseInt(opcion)) {

        //reset mensaje
        mensaje = "";

        //switch opciones
        switch (parseInt(opcion)) {
            case 1:
                //TEXTO

                //Bucle de repetición del trabajo con texto
                do {

                    //Reset de los contadores 
                    contA = contE = contI = contO = contU = contVoc = contCon = contNum = contEsp = 0;

                    //Pide el ingreso de datos
                    texto = prompt("Ingrese una palabra/texto: ");

                    // 1) Mostrar cuantas letras tiene la cadena
                    tam = texto.length;
                    mensaje = "El dato ingresado tiene un tamaño de " + tam + " caracter/es." + SALTO + SALTO;

                    // 2) Mostrar cuantas vocales y cuantas consonantes hay                    
                    for (i = 0; i < texto.length; i++) {
                        //Recorro el texto que se ingresó contando cada vocal
                        letra = texto[i].toUpperCase();
                        switch (letra) {
                            case "A":
                                contA++;
                                break;
                            case "E":
                                contE++;
                                break;
                            case "I":
                                contI++;
                                break;
                            case "O":
                                contO++;
                                break;
                            case "U":
                                contU++;
                                break;
                            default:
                                if (isNaN(parseInt(letra))) {
                                    //Si no es un número evaluo que el código no sea uno que esté comprendido entre 65 (A) y 90 (Z) para identificar los caracteres especiales
                                    if (letra.charCodeAt(0) < 65 || letra.charCodeAt(0) > 90) {
                                        contEsp++;
                                    } else {
                                        contCon++;
                                    }
                                } else {
                                    contNum++;
                                }
                                break;
                        }
                    }

                    //El contador de vocales sale de sumar los contadores de las vocales individuales
                    contVoc = contA + contE + contI + contO + contU;

                    console.log("Contador Vocales: " + contVoc);
                    console.log("Contador A: " + contA);
                    console.log("Contador E: " + contE);
                    console.log("Contador I: " + contI);
                    console.log("Contador O: " + contO);
                    console.log("Contador U: " + contU);
                    console.log("Contador Consonantes: " + contCon);
                    console.log("Contador Números: " + contNum);
                    console.log("Contador Caracteres Especiales: " + contEsp);

                    mensaje += "El dato ingresado tiene:" + SALTO + "vocales: " + contVoc + SALTO + "consonantes: " + contCon + SALTO + "números: " + contNum + SALTO + "especiales: " + contEsp + SALTO + SALTO;

                    // 3) Mostrar la cadena invertida
                    mensaje += "La cadena invertida quedó así: ";
                    for (i = (texto.length - 1); i >= 0; i--) {

                        mensaje += texto[i];
                    }
                    mensaje += SALTO + SALTO;

                    //Mostrar resultados
                    alert(mensaje);

                    //Con este bucle se pregunta para repetir la ejecución de la funcionalidad.
                    do {
                        repetir = prompt("¿Quiere cargar una nueva palabra/texto?(S/N)");
                    } while ((repetir.toUpperCase() != "S") && (repetir.toUpperCase() != "N"));

                } while (repetir.toUpperCase() == "S");


                break;

            case 2:
                //NÚMEROS

                do {

                    //Repito el pedido de datos hasta que se ingrese un número
                    do {
                        numero = prompt("Ingrese un número:");
                    } while (isNaN(numero));

                    numero = parseInt(numero);

                    // 1) mostrar si el número es par o no
                    mensaje = "El número ingresado (" + numero + ") ";
                    if (numero % 2 == 0) {
                        if (numero == 0) {
                            mensaje += "es cero.";
                        } else {
                            mensaje += "es par.";
                        }
                    } else {
                        mensaje += "es impar.";
                    }

                    mensaje += SALTO;

                    // 2) mostrar si el número es positivo o negativo
                    mensaje += "El número ";
                    if (numero >= 0) {
                        if (numero == 0) {
                            mensaje += "es cero.";
                        } else {
                            mensaje += "es positivo.";
                        }
                    } else {
                        mensaje += "es negativo.";
                    }

                    mensaje += SALTO;

                    // 3) calcular el factorial
                    subMensaje = "";
                    factorial = 1;
                    for (i = numero; i > 0; i--) {
                        if (i == numero) {
                            subMensaje = "Factorial --> " + i + "! = " + i;
                        } else {
                            subMensaje += " x " + i;
                        }
                        factorial *= i;
                        console.log("Valor Parcial del calculo del factorial: " + factorial);
                    }
                    subMensaje += " = " + factorial;

                    mensaje += subMensaje + SALTO + SALTO;

                    // 4) Avisarle al usuario que se le van a pedir N números mientras el valor pasado sea menor, o igual, a 10. Sino solo pide 5 números y va a motrar:
                    if (numero > 1) {
                        if (numero <= 10) {
                            n = numero;
                        } else {
                            n = 5;
                        }

                        alert("A continuación se va a solicitar el ingreso de " + n + " números. (Pueden ser tanto positivos como negativos)");

                        //Reset Variables
                        subMensaje = subTexto = "";     
                        total = mayor = menor =  promedio = 0;                   
                        for (i = 1; i <= n; i++) {
                            //Repito el pedido de datos hasta que se ingrese un número
                            do {
                                numero = prompt("Ingrese el " + i + "° número:");
                            } while (isNaN(numero));

                            numero = parseInt(numero);

                            subTexto = i + "° | " + numero + SALTO;
                            if (i == 1) {
                                subMensaje = subTexto;
                            } else {
                                subMensaje += subTexto;
                            }

                            // a) suma total
                            total += numero;
                            console.log("Total parcial: " + total);

                            // c) el mayor
                            if (numero > mayor) {
                                mayor = numero;                                
                            }
                            console.log("Mayor temporal: " + mayor);

                            // d) el menor
                            if (i == 1) {
                                menor = numero;
                            } else if (numero < menor) {
                                menor = numero;                                
                            }
                            console.log("Menor temporal: " + menor);
                        }

                        // b) promedio
                        promedio = total / n;
                        console.log("Calculo Promedio --> " + total + " / " + n + " = " + promedio);

                        mensaje += subMensaje + SALTO;
                        mensaje += "La suma total de los números ingresados es: " + total + SALTO;
                        mensaje += "El promedio es: " + promedio + SALTO;
                        mensaje += "El mayor de los números ingresados es: " + mayor + SALTO;
                        mensaje += "El menor de los números ingresados es: " + menor + SALTO;
                    }

                    //Mostrar resultados
                    alert(mensaje);


                    //Con este bucle se pregunta para repetir la ejecución de la funcionalidad.
                    do {
                        repetir = prompt("¿Quiere cargar un nuevo número?(S/N)");
                    } while ((repetir.toUpperCase() != "S") && (repetir.toUpperCase() != "N"));

                } while (repetir.toUpperCase() == "S");

                break;
            case 3:
                //SALIDAS
                alert("¡Gracias por usar la app!");
                break;
            default:
                alert("Elija alguna de las opciones válidas.");
                break;

        }

    } else {
        alert("Elija alguna de las opciones válidas. ");
    }

    //Final bucle principal
} while (parseInt(opcion) != 3);