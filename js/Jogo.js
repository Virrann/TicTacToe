const celulas = document.querySelectorAll(".celula");
const JOGADOR_X = "X";
const JOGADOR_O = "O";

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

var vitorias = [];
vitorias['E'] = 0;
vitorias['X'] = 0;
vitorias['O'] = 0;

document.addEventListener("click", (event) => {

    // deteecta o clique do jogador e verifica se foi em alguma celula

    if(event.target.matches(".celula")){
        play(event.target.id)
    }

});

function play (id){
    const celula = document.getElementById(id);

    turno = checaturno ? JOGADOR_X : JOGADOR_O;
    celula.textContent = turno;
    celula.classList.add(turno);

    checaVitoria(turno);
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

    telafinal[0,1].style.display = 'block';
    popup.appendChild(mensagem);

    if (vencedor){
        mensagem.innerHTML = "O player <span class =" + vencedor + " >" + vencedor + "</span> venceu!";

        vitorias[vencedor]++; 
        console.log(vencedor + " = " + vitorias[vencedor]);
    }
    else{
        mensagem.innerHTML = "A partida empatou";

        vitorias['E']++;
    }
}