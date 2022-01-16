const celulas = document.querySelectorAll(".celula");
const JOGADOR_X = "X";
const JOGADOR_O = "O";
const x = document.getElementById('jogo').innerHTML;


const WIN = [

// Guarda todas as situações em que um jogador vence

    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


var checaturno = true;

/*=========================================================================================*/

// Contador de vitórias/empates

const vitx = document.getElementById("vitoriax");
const vito = document.getElementById("vitoriao");
const emp = document.getElementById("empate");

var vitxc = document.createElement("span");
var vitoc = document.createElement("span");
var empc = document.createElement("span");

vitx.appendChild(vitxc);
vito.appendChild(vitoc);
emp.appendChild(empc);

var vitorias = [];
vitorias['E'] = 0;
vitorias['X'] = 0;
vitorias['O'] = 0;


/*=========================================================================================*/

// criando o mostrador de turnos

const TelaTurno = document.getElementById("turnos");
const vez = document.createElement("span");

TelaTurno.appendChild(vez)
vez.innerHTML = "X";

/*=========================================================================================*/

function atualizaTurno(){

    vez.innerHTML = checaturno ? JOGADOR_X : JOGADOR_O

    empc.innerHTML = vitorias['E'].toString();
    vitxc.innerHTML = vitorias['X'].toString();
    vitoc.innerHTML = vitorias['O'].toString();
};

document.addEventListener("click", (event) => {

    // deteecta o clique do jogador e verifica se foi em alguma celula que ainda não foi clicada

    if(event.target.matches(".celula") && 
     !(event.target.matches(".X") || 
       event.target.matches(".O"))){
        play(event.target.id)
    }

});

function play (id){
    const celula = document.getElementById(id);

    turno = checaturno ? JOGADOR_X : JOGADOR_O;
    celula.textContent = turno;
    celula.classList.add(turno);

    checaVitoria(turno);

    atualizaTurno();

}

function checaVitoria(turno){
    const vencedor = WIN.some((comb) => {
        return comb.every((index) => {
            return celulas[index].classList.contains(turno);
        });
    });
    
    if(vencedor){
        encerrarJogo(turno);
    }
    else if(empate()){
        encerrarJogo();
    }
    else{
        checaturno = !checaturno;
    }
    
}

function empate() {
    let x = 0;
    let o = 0;

    for(index in celulas){
        if(!isNaN(index)){
            if(celulas[index].classList.contains(JOGADOR_X)){
                x++; 
            }

            if(celulas[index].classList.contains(JOGADOR_O)){
                o++;
            }
        }
    }

    return x + o == 9 ? true : false;
}

function encerrarJogo(vencedor = null){
    const telafinal = document.getElementsByClassName("fimJogo");
    const popup =document.getElementById("Mensagem");
    const mensagem = document.createElement("h2");

    telafinal[1].style.display = 'flex';
    telafinal[0].style.display = 'block';   
    popup.appendChild(mensagem);

    if (vencedor){
        mensagem.innerHTML = "<span class =" + vencedor + " > O Jogador "  + vencedor + " venceu! </span>";

        vitorias[vencedor]++; 
    }
    else{
        mensagem.innerHTML = "A partida empatou";

        vitorias['E']++;
    }
}


function refresh() {
    console.log("botao");

    document.getElementById('jogo').innerHTML = x;
}