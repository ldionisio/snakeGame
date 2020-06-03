//variables globales
var width = 40;
var height = 30;
var snake = [[15,20], [15, 21], [15, 22]];
var comida = [];
var direccion = "";
var contador = 0; //nivel (cada vez que come suma 1)
var time;
var speed = 500; //milisegundos
var velocidad = ''; //cambia de velocidad cada 2 niveles
var score = 0; //puntuación
//hora local
var momentoActual = new Date();
var hora = momentoActual.getHours();
var minuto = momentoActual.getMinutes();
var segundo = momentoActual.getSeconds();
var horaprint = hora + " : " + minuto + " : " + segundo;


//lanzar funciones
function lanzadera(){
    table();
    food();
    name();
    
}
window.onload = lanzadera;

//pedir nombre
function name(){
    var name = prompt("Please, enter your name");
    var player = "Player 1";
    if(name!=null){
        document.getElementById("player").innerHTML = name;
        alert("Ready? 3, 2, 1...");
        start();
    }else{
        document.getElementById("player").innerHTML = player;
    }

}

//crear cuadrícula
function table(){
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var div = document.getElementById("table-body");
    table.style.background = "#125445";
    for (var i = 0; i < height; i++){
        var tr = document.createElement("tr");
        for (var j=0; j < width; j++){
            var td = document.createElement("td");
            td.setAttribute("id", i +"-" + j);
            td.setAttribute("class", "celda");
            td.style.width = "10px";
            td.style.height = "10px";
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);
    //dibujar posición snake inicialS
   for (var i=0; i<snake.length; i++){
        document.getElementById(snake[i][0]+"-"+snake[i][1]).style.background = "#000000";   
    }
}

//posicionar comida
function generarComida(){
    var vertical=Math.floor(Math.random()* (height - 1)) +1;
    var horizontal=Math.floor(Math.random()* (width - 1)) +1;
    comida[0] = vertical;
    comida[1] = horizontal;
    return comida;
}

//comida
function food(){
    comida = generarComida();
    while (comprobarcomida(snake, comida)){
        comida = generarComida();
    }
    var celda = document.getElementById(comida[0] + "-" + comida[1]);
    //console.log(comida[0]);
    //console.log(comida[1]);
    celda.style.background = "#FFFFFF";
}

//comprobar comida no esté en snake
function comprobarcomida(snake, comida){
   // console.log(snake);
    //console.log(comida);
    for (var i=0; i<snake.length; i++){
        if (comida[0] == snake[i][0] && comida[1] == snake[i][1]){
            return true;
        }
    }
}

//direcciones según teclas
window.document.addEventListener("keydown", dire);
function dire(key){
    switch(key.keyCode){
            case 37: //left
                direccion = 'L';
                //console.log("dirección: "+direccion);
                break;
            case 38: //up
                direccion = 'U';
                //console.log("dirección: "+direccion);
                break;
            case 39: //right
                direccion = 'R';
               // console.log("dirección: "+direccion);
                break;
            case 40: //down
                direccion = 'D';
               // console.log("dirección: "+direccion);
                break; 
    }
}

//empezar juego
function start(){
    time = setInterval(mover, speed);
}

//cambio de velocidad
function speedLevel(){
    //añadimos la puntauación
    document.getElementById("score").innerHTML = score;
    if (contador%2==0){
        speed = speed - 50;
        time = setInterval(mover, speed)
        //console.log("new speed: " + speed);
        velocidad++;
        //sumamaos más puntos por cambio de velocidad
        score = score + 400;
    }
}

//mover snake
function mover(){
    var nuevaPosicion = [];
    //calculo la nueva posicion
    switch(direccion){
        case "L": //left
            console.log("left");
            if (snake[0][1] == 0){
                nuevaPosicion[1] = 39;
            }else{
                nuevaPosicion[1] = snake[0][1]-1; //j
            }
            nuevaPosicion[0] = snake[0][0];
            break;
        case "U": //up
            if (snake[0][0] == 0){
                nuevaPosicion[0] = 29;
            }else{
                nuevaPosicion[0] = snake[0][0]-1;
            }
            nuevaPosicion[1] = snake[0][1];
            break;
        case "R": //right
            if (snake[0][1] == 39){
                nuevaPosicion[1] = 0;
            }else{
                nuevaPosicion[1] = snake[0][1]+1;
            }
            nuevaPosicion[0] = snake[0][0];
            break;
        case "D": //down
            if (snake[0][0] == 29){
                nuevaPosicion[0] = 0;
            }else{
                nuevaPosicion[0] = snake[0][0]+1; 
            }
            nuevaPosicion[1] = snake[0][1];
            break;
        default:
            //empieza a moverse al iniciar el juego
            console.log("left");
            if (snake[0][1] == 0){
                nuevaPosicion[1] = 39;
            }else{
                nuevaPosicion[1] = snake[0][1]-1;
            }
            nuevaPosicion[0] = snake[0][0];
    }

    if (nuevaPosicion.length == 2){
        if (nuevaPosicion[0] == comida[0] && nuevaPosicion[1]== comida[1]){
            //ha comido
            snake.unshift(nuevaPosicion);
            //pintar nuevo elemento
            document.getElementById(snake[0][0]+"-"+snake[0][1]).style.background = "#000000"; 
            //poner nueva comida
            food();
            //subir velocidad
            contador++;
            //sumamos 100 puntos
            score = score + 100;
            speedLevel();
            //añadir nivel al contador/velocidad html
            document.getElementById("level").innerHTML = contador;
            document.getElementById("velocidad").innerHTML = velocidad;
  
        }
       //colisión con su propio cuerpo
        else if (checkcolision(snake, nuevaPosicion)) {
            document.getElementById(nuevaPosicion[0]+"-"+nuevaPosicion[1]).style.background = "red"; 
           // console.log("Muerte");
            muerte();
            

        }else{
            //caso normal
            //ocultando snake
            document.getElementById(snake[snake.length-1][0] + "-" + snake[snake.length-1][1]).style.background = "#125445";  
            // muevo posiciones
            for (var i = snake.length-1; i > 0; i--){
                snake[i][0] = snake[i-1][0];
                snake[i][1] = snake[i-1][1]; 
                //console.log(snake[i][0]);
                //console.log(snake[i][1]);
            }
            //añadir nueva posicion
            snake[0][0] = nuevaPosicion[0];
            snake[0][1] = nuevaPosicion[1];
            //pintar nuevo elemento
            document.getElementById(snake[0][0]+"-"+snake[0][1]).style.background = "#000000";  
           // console.log("Normal");

        }
    }
}
//colisión
function checkcolision(s, n){
    for (var i  = 0; i < s.length; i++){
        if (n[0] == s[i][0] && n[1] == s[i][1]){
            return true;
        }
    }
    return false;
}

//fin de juego (puntuación)
function muerte(){
    var tr = document.createElement("tr");
    var horafinal = document.createElement("td");
    var scorefinal = document.createElement("td");
    var tablafinal = document.getElementById("result");
    
    tr.appendChild(horafinal);
    tr.appendChild(scorefinal);
    tablafinal.appendChild(tr);
   
    scorefinal.setAttribute("id", "scorefinal");
    horafinal.setAttribute("id", 'horafinal');
    
    document.getElementById("horafinal").innerHTML = horaprint;
    document.getElementById("scorefinal").innerHTML = score;

    clearInterval(time);
}

//reiniciar juego
function restart(){
    location.reload();
    time = setInterval(mover, speed);
}

