/*Condicional*/
alert("Debe elegir entre las siguientes opciones")
alert("LEBAC: 100% TEA, Plazo Fijo: 85% TEA, Bono Soberano, 90% TEA")

let valor = parseInt(prompt("Ingrese el monto dispuesto a invertir"));
let inversion = prompt("Ingrese la inversion deseada")
let tiempo = parseInt(prompt("Ingrese los dias dispuesto a invertir"))

function intereses(inversion){
    switch (inversion) {
        case "LEBAC":
            return 2;
        case "Plazo Fijo":
            return 1.85;
        case "Bono Soberano":
            return 1.90;
    }
}

alert("Usted recibira al final $" + (valor * intereses(inversion)* (tiempo/365) + valor))

/*Ciclos*/
alert("¿Cuantos dias de inversion necesito para alzanzar mi objetivo?");
alert("LEBAC: 100% TEA, Plazo Fijo: 85% TEA, Bono Soberano, 90% TEA")

let valor2 = parseInt(prompt("Ingrese el monto dispuesto a invertir"));
let valorDefinido = parseInt(prompt("Ingrese el monto dispuesto a llegar"));
let inversion2 = prompt("Ingrese la inversion deseada");
let i = 0;

do{
    i++;
}while (i<365*(valorDefinido-valor2)/(valor2*intereses(inversion2)))

alert("Usted necesita " + i + " dias de inversion para alcanzar su objetivo")