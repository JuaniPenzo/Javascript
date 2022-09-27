/*Condicional*/
alert("Debe elegir entre las siguientes opciones")

let valor = parseInt(prompt("Ingrese el monto dispuesto a invertir"));
let inversion = prompt(`¿Que inversion desea simular? \n [1] LEBAC - 100% TEA \n [2] Plazo Fijo - 85% TEA \n [3] Bono Soberano - 90% TEA \n [S] Salir`)
let tiempo = parseInt(prompt("Ingrese los dias dispuesto a invertir"))

function intereses(inversion){
    switch (inversion) {
        case "1":
            return 2;
        case "2":
            return 1.85;
        case "3":
            return 1.90;
        case "S":
            return "No valido";
    }
}

alert("Usted recibira al final $" + (valor * intereses(inversion)* (tiempo/365) + valor))

/*Ciclos*/
alert("¿Cuantos dias de inversion necesito para alzanzar mi objetivo?");

let valor2 = parseInt(prompt("Ingrese el monto dispuesto a invertir"));
let valorDefinido = parseInt(prompt("Ingrese el monto dispuesto a llegar"));
let inversion2 = prompt(`¿Que inversion desea simular? \n [1] LEBAC - 100% TEA \n [2] Plazo Fijo - 85% TEA \n [3] Bono Soberano - 90% TEA \n [S] Salir`)
let i = 0;

do{
    i++;
}while (i<365*(valorDefinido-valor2)/(valor2*intereses(inversion2)))

alert("Usted necesita " + i + " dias de inversion para alcanzar su objetivo")