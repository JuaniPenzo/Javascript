/*Simulador de Inversiones*/
let monto_inversion_1 = document.getElementById("monto_inversion");
let tiempo_inversion_1 = document.getElementById("tiempo_inversion");
let simular_1 = document.getElementById("simular_inversion");
let recibira_1 = document.getElementById("recibira");
let radios = document.getElementsByName('gridRadios');
let valor =[]

simular_1.addEventListener('click', recibirValor);

function recibirValor(evento) {
    evento.preventDefault();
    for (let radio of radios){
        if (radio.checked) {
            return valor.push(radio.value)
        }
    };    
};
simular_1.addEventListener('click', simularInversion);

function simularInversion(evento) {
    evento.preventDefault();
    if (monto_inversion_1.value>0 && tiempo_inversion_1.value>0) {
        recibira_1.value = ((parseFloat(monto_inversion_1.value)*parseFloat((tiempo_inversion_1.value)/365)*(valor[0]))+parseFloat(monto_inversion_1.value));
    }
}

/*Simulador de plazos*/
let monto_inversion_2 = document.getElementById("monto_inversion_2");
let monto_inversion_22 = document.getElementById("monto_inversion_22");
let simular_2 = document.getElementById("simular_inversion_2");
let tiempo_estimado_2 = document.getElementById("tiempo_estimado");
let radios_2 = document.getElementsByName('gridRadios_2');
let valor_2 =[]
let i = 0

simular_2.addEventListener('click', recibirValor_2);

function recibirValor_2(evento) {
    evento.preventDefault();
    for (let radio of radios_2){
        if (radio.checked) {
            return valor_2.push(radio.value)
        }
    };    
};

simular_2.addEventListener('click', simularInversion_2);

function simularInversion_2(evento) {
    evento.preventDefault();
    do{
        i++;
    }while (i<(365*(parseFloat(monto_inversion_22.value)-parseFloat(monto_inversion_2.value))/((monto_inversion_2.value)*valor_2[0])))
}

simular_2.addEventListener('click', mostrarValor);

function mostrarValor(evento) {
    evento.preventDefault();
    if (monto_inversion_2.value>0 && monto_inversion_22.value>0 ) {
        tiempo_estimado_2.value = i
    }
}

/*Cartera de Inversiones*/
let carrito =JSON.parse(localStorage.getItem('Inversiones'))|| [];
let valor_3 =[];
let monto_cartera_3 = document.getElementById("monto_cartera_3");
let tiempo_cartera_3 = document.getElementById("tiempo_cartera_3");
let agregar = document.getElementById("agregar");
let radios_3 = document.getElementsByName('gridRadios_3');

agregar.addEventListener('click', recibirValor_3);

function recibirValor_3(evento) {
    evento.preventDefault();
    for (let radio of radios_3){
        if (radio.checked) {
            return valor_3.push(radio.value)
        }
    };    
};

function recibirValor_31(valor_3) {
    switch (valor_3) {
        case "LEBAC":
            return 2
        case "Plazo Fijo":
            return 1.85
        case "Bono Soberano":
            return 1.9
    }
}

class cartera{
    inversion;
    monto;
    tiempo;
    ganado;
    constructor(inversion, monto, tiempo, ganado){
        this.inversion = inversion;
        this.monto = monto;
        this.tiempo = tiempo;
        this.ganado = ganado;
    }
}

agregar.addEventListener('click', CargarunaInversion);
agregar.addEventListener('click', guardarInversion);
agregar.addEventListener('click', mostrarInversion);

function CargarunaInversion() {
    let seleccion = new cartera();

    seleccion.inversion = valor_3[valor_3.length-1];
    seleccion.monto = monto_cartera_3.value;
    seleccion.tiempo = tiempo_cartera_3.value;
    seleccion.ganado = (parseFloat(monto_cartera_3.value)+recibirValor_31(valor_3[valor_3.length-1])*parseFloat(monto_cartera_3.value)*parseFloat(tiempo_cartera_3.value)/365);

    carrito.push(seleccion);

    return seleccion;
}
function guardarInversion(){
    let invest = JSON.stringify(carrito);
    localStorage.setItem('Inversiones', invest);
}

function mostrarInversion(){
    let tabla = document.getElementById("tablita")
    tabla.innerHTML = ``
    carrito.forEach((elemento) => { 
        tabla.innerHTML += `<tr>
                                <th> ${elemento.inversion} </th> 
                                <th> ${elemento.monto} </th>
                                <th> ${elemento.tiempo} </th>
                                <th> ${elemento.ganado} </th>
                            </tr>`
    });
}

/*Grafico con uso de librerias*/
let grafico = document.getElementById("id_grafico")

let monto_lebac = 0;
let monto_plazofijo = 0;
let monto_bonosoberano = 0;

agregar.addEventListener("click", carritoG)

function carritoG(){
    monto_lebac=0
    monto_plazofijo=0
    monto_bonosoberano=0
    carrito.forEach((elemento)=>{
        if (elemento.inversion === "LEBAC") {
            monto_lebac += parseFloat(elemento.monto)
        };
        if (elemento.inversion === "Plazo Fijo") {
            monto_plazofijo += parseFloat(elemento.monto)
        };
        if (elemento.inversion === "Bono Soberano") {
            monto_bonosoberano += parseFloat(elemento.monto)
        }
    })
}

carritoG();

agregar.addEventListener("click", pintarGrafico)

let id_grafico 

function pintarGrafico(){
    if (id_grafico) {
        id_grafico.destroy();
    }
    id_grafico = new Chart(grafico, {
        type:"pie",
        data: {
            labels: [
            'Lebac',
            'Plazo Fijo',
            'Bono Soberano'
        ],
            datasets: [{
            label: 'My First Dataset',
            data: [monto_lebac, monto_plazofijo, monto_bonosoberano],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
            }]
        }
    })
}

pintarGrafico()

/* Conexion con la API */
let mostrarDatos = document.getElementById("exposicion_datos")
let leliqb = document.getElementById("leliqb")
let depositob = document.getElementById("depositob")
let badlarb = document.getElementById("badlarb")

leliqb.addEventListener('click', mostrarLeliq)
depositob.addEventListener('click', mostrarDeposito)
badlarb.addEventListener('click', mostarbadlar)

    //leliq
function mostrarLeliq(){
    fetch("https://api.estadisticasbcra.com/tasa_leliq",{
        headers:{
            Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk3NDkxMjAsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqdWFuaXBlbnpvOTdAZ21haWwuY29tIn0.TiX7m6UdmFG95d2Zl7wEi-qYlATwZIfGLnbXhMyQceRzct_2QK73hKOeUEZkIc9BGHIO-9V97Ny1IRyoxX3M0Q"},
    })
    .then((response)=>response.json())
    .then((data)=>{
        let datas = data.slice(data.length-10)
        mostrarDatos.innerHTML=""
        datas.forEach(elemento=>{
            mostrarDatos.innerHTML += `<tr>
            <th> ${elemento.d} </th> 
            <th> ${elemento.v} </th>
                            </tr>`
        })
    })
    .catch((err)=>console.log(err))
}

    //depositos
function mostrarDeposito(){
    fetch("https://api.estadisticasbcra.com/tasa_depositos_30_dias",{
        headers:{
            Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk3NDkxMjAsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqdWFuaXBlbnpvOTdAZ21haWwuY29tIn0.TiX7m6UdmFG95d2Zl7wEi-qYlATwZIfGLnbXhMyQceRzct_2QK73hKOeUEZkIc9BGHIO-9V97Ny1IRyoxX3M0Q"},
    })
    .then((response)=>response.json())
    .then((data)=>{
        let datas = data.slice(data.length-10)
        mostrarDatos.innerHTML=""
        datas.forEach(elemento=>{
            mostrarDatos.innerHTML += `<tr>
            <th> ${elemento.d} </th> 
            <th> ${elemento.v} </th>
                            </tr>`
        })
    })
    .catch((err)=>console.log(err))
}

    //badlar
function mostarbadlar(){
    fetch("https://api.estadisticasbcra.com/tasa_badlar",{
        headers:{
            Authorization: "BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTk3NDkxMjAsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJqdWFuaXBlbnpvOTdAZ21haWwuY29tIn0.TiX7m6UdmFG95d2Zl7wEi-qYlATwZIfGLnbXhMyQceRzct_2QK73hKOeUEZkIc9BGHIO-9V97Ny1IRyoxX3M0Q"},
    })
    .then((response)=>response.json())
    .then((data)=>{
        let datas = data.slice(data.length-10)
        mostrarDatos.innerHTML=""
        datas.forEach(elemento=>{
            mostrarDatos.innerHTML += `<tr>
            <th> ${elemento.d} </th> 
            <th> ${elemento.v} </th>
                            </tr>`
        })
    })
    .catch((err)=>console.log(err))
}