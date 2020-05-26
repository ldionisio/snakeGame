
var width = 40;
var height = 30;
var snake = [[15,20], [15, 21], [15, 22]];
var comida = [];

function lanzadera(){
    table();
    food();
}
window.onload = lanzadera;


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

 
   for (var i=0; i<snake.length; i++){
        document.getElementById(snake[i][0]+"-"+snake[i][1]).style.background = "#000000";   
    }

    
}


function food(){
    var vertical=Math.floor(Math.random()* (height - 1)) +1;
    var horizontal=Math.floor(Math.random()* (width - 1)) +1;
    
    comida[0] = vertical;
    comida[1] = horizontal;
    
    var celda = document.getElementById(comida[0] + "-" + comida[1]);
    celda.style.background = "#FFFFFF";
    console.log(celda);
}  



document.addEventListener ('keydown', function (event){
    console.log (event.which);
    console.log("tecla 38");
}); 
 
var evt = new KeyboardEvent('keydown', {'keyCode':38, 'which':38});
document.dispatchEvent (evt);






window.document.addEventListener("keyup", speed);
function speed() {
    var speed;
    console.log("se ha soltado la tecla");
    var evento = window.event;
    console.log(evento.keyCode);
   
    if(evento.keyCode == 37);
        console.log("Vas a la izquierda");
        

}


window.document.addEventListener("keydown", checkkey);
function checkkey(key){
    var nuevaPosicion = [];


    //calculo la nueva posicion
    switch(key.keyCode){
        
        case 37: //left
            
            if (snake[0][1] == 0){
                nuevaPosicion[1] = 39;
            }else{
                nuevaPosicion[1] = snake[0][1]-1; //j
            }
            nuevaPosicion[0] = snake[0][0];
            break;

        case 38: //up

            if (snake[0][0] == 0){
                nuevaPosicion[0] = 29;
            }else{
                nuevaPosicion[0] = snake[0][0]-1;
  
            }
            nuevaPosicion[1] = snake[0][1];

            break;
        case 39: //right
            if (snake[0][1] == 39){
                nuevaPosicion[1] = 0;
            }else{
                nuevaPosicion[1] = snake[0][1]+1;
            }
            nuevaPosicion[0] = snake[0][0];
            break;

        case 40: //down
            if (snake[0][0] == 29){
                nuevaPosicion[0] = 0;
            }else{
                nuevaPosicion[0] = snake[0][0]+1; 
            }
            nuevaPosicion[1] = snake[0][1];

            break; 
    }
    if (nuevaPosicion.length == 2){
        if (nuevaPosicion[0] == comida[0] && nuevaPosicion[1]== comida[1]){
            //ha comido
            snake.unshift(nuevaPosicion);
            //pintar nuevo elemento
            document.getElementById(snake[0][0]+"-"+snake[0][1]).style.background = "#000000"; 
            food();
            console.log("Comer");
        
            
        }
        else if (checkcolision(snake, nuevaPosicion)) {
            document.getElementById(nuevaPosicion[0]+"-"+nuevaPosicion[1]).style.background = "red"; 
            console.log("Muerte");
        
        }else{

            //caso normal
            //oculando snake
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
            console.log("Normal");
        }
    }
}


function checkcolision(s, n){
    for (var i  = 0; i < s.length; i++){
        if (n[0] == s[i][0] && n[1] == s[i][1]){
            return true;
        }
    }
    return false;
}
