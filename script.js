class Pokemon {
    constructor(nome, tipo, descricao, imagem, imagemFundo) {
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }
}

const pokemons = inicializaPokemons();
const pontuacoes = inicializaPontuacoes();

inicializaPaginaQuestionario();
inicializaPaginaResultado();



function inicializaPokemons() {
    return [
        new Pokemon("Bulbasaur", "Terra", "Bulbasaur é calmo e adora a natureza.", "img/bulbasaurPNG.png"),
        new Pokemon("Charmander", "Fogo", "Charmander é energético e corajoso.", "img/CharmanderPNG.png"),
        new Pokemon("Squirtle", "Água", "Squirtle é determinado e estratégico.", "img/SquirtlePNG.png")
    ];
}

function inicializaPontuacoes() {
    return {
        floresta: [3, 1, 2],
        montanhas: [1, 3, 2],
        praia: [2, 1, 3],
        Verde: [6, 1, 2],
        Vermelho: [1, 6, 2],
        Azul: [2, 1, 6],
        Salada: [3, 1, 2],
        Churrasco: [1, 3, 2],
        "Frutos do mar": [2, 1, 3],
        Paciente: [3, 1, 2],
        Corajoso: [1, 3, 2],
        Determinado: [1, 3, 2],
        "O calmo": [3, 1, 2],
        "O animado": [1, 3, 2],
        "O organizado": [2, 1, 3],
        Adaptacao: [3, 1, 2],
        Energizado: [1, 3, 2],
        Resistente: [2, 1, 3],
        Seguranca: [3, 1, 2],
        Esquentar: [1, 3, 2],
        Refrescar: [2, 1, 3],
        Observador: [3, 1, 2],
        Iniciativa: [1, 3, 2],
        Cooperativo: [2, 1, 3],
        Energetico: [3, 1, 2],
        Cauteloso: [1, 3, 2],
        Tranquilo: [2, 1, 3],
        Desistir:[1, 3 , 2],
        Desejo: [3, 1, 2],
        Confiante: [2, 1, 3]
    };
}

function inicializaPaginaQuestionario() {
    if (!window.location.pathname.includes('questionario.html')) return;

    document.querySelector('.botaoEnviar').addEventListener('click', function (e) {
        const respostas = document.querySelectorAll('input[type=radio]:checked');
        const totalPerguntas = document.querySelectorAll('.container-questoes div').length;

        if (!verificaRespostas(respostas.length, totalPerguntas, e)) return;

        calculaPontuacao(respostas);
        const vencedor = defineVencedor();
        salvaResultado(vencedor);
    });
}

function inicializaPaginaResultado() {
    if (!window.location.pathname.includes('resultado.html')) return;

    const resultado = JSON.parse(localStorage.getItem('resultadoPokemon'));
    const pontosTodos = JSON.parse(localStorage.getItem('pontosTodos'));

    if (resultado && pontosTodos) {
        exibeResultado(resultado, pontosTodos);
        mudaCorPaginaConformePokemon(resultado.nome);
    } else {
        exibeErroResultado();
    }
}



function verificaRespostas(respondidas, total, evento) {
    if (respondidas < total) {
        evento.preventDefault();
        alert('Por favor, responda todas as perguntas antes de enviar!');
        return false;
    }
    return true;
}

function calculaPontuacao(respostas) {
    respostas.forEach(resposta => {
        const valores = pontuacoes[resposta.value];
        if (valores) {
            pokemons.forEach((pokemon, index) => {
                pokemon.pontos += valores[index];
            });
        }
    });
}

function defineVencedor() {
    return pokemons.reduce((prev, curr) => prev.pontos > curr.pontos ? prev : curr);
}

function salvaResultado(vencedor) {
    localStorage.setItem('resultadoPokemon', JSON.stringify(vencedor));

    var pontosTodos = {
        Bulbasaur: pokemons.find(p => p.nome === 'Bulbasaur').pontos,
        Charmander: pokemons.find(p => p.nome === 'Charmander').pontos,
        Squirtle: pokemons.find(p => p.nome === 'Squirtle').pontos
    };

    localStorage.setItem('pontosTodos', JSON.stringify(pontosTodos));
}

function exibeResultado(resultado, pontosTodos) {
    const totalPerguntas = 10;
    const maxPontosPorPergunta = 3;
    const pontuacaoMaxima = totalPerguntas * maxPontosPorPergunta + 3;

    document.body.innerHTML = `
        <div class="container">
            <div id="estrelas"></div>
            <h1>Você seria o ${resultado.nome}!</h1>
            <img src="${resultado.imagem}" alt="${resultado.nome}" style="width:200px; animation: pulandinho 2s cubic-bezier(0, 0, 0, 0) infinite">
            <p>${resultado.descricao}</p>
            <h2>Pontuação final: ${resultado.pontos}/${pontuacaoMaxima} pontos</h2>

            <h3>Veja como ficou a pontuação de todos:</h3>
            <ul style="list-style: none; padding: 0;">
                <li><strong>Bulbasaur:</strong> ${pontosTodos.Bulbasaur} pontos</li>
                <li><strong>Charmander:</strong> ${pontosTodos.Charmander} pontos</li>
                <li><strong>Squirtle:</strong> ${pontosTodos.Squirtle} pontos</li>
            </ul>

            <a href="index.html"><button class="btnComecarQuestionario" id="refaz">Refazer</button></a>
        </div>
    `;

    document.getElementById("refaz").onclick = function(){
        pontosTodos.Bulbasaur = 0 
        pontosTodos.Charmander = 0
        pontosTodos.Squirtle = 0
    }

}

function exibeErroResultado() {
    document.body.innerHTML = `
        <div class="container">
            <h1>Ops, nenhum resultado encontrado!</h1>
            <a href="index.html"><button class="btnComecarQuestionario">Voltar</button></a>
        </div>
    `;
}



function mudaCorPaginaConformePokemon(ganhador) {
    if (ganhador == "Squirtle") {
        document.body.style.backgroundColor = "rgb(194, 229, 245)";
        document.querySelector('.circulo').style.backgroundColor = 'rgb(217, 236, 245)';
        document.body.appendChild(Object.assign(document.createElement("img"), {
            className: 'fundoAgua',
            src: "img/aguaPNG.png",
            alt: "Imagem de exemplo"
        }));
    } else if (ganhador == "Charmander") {
        document.body.style.backgroundColor = "rgb(243, 170, 118)";
    } else if (ganhador == "Bulbasaur") {
        document.body.style.backgroundColor = "rgb(230, 255, 224)";
    }
}
