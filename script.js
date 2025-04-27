class Pokemon {
    constructor(nome, tipo, descricao, imagem) {
        this.nome = nome;
        this.tipo = tipo;
        this.descricao = descricao;
        this.imagem = imagem;
        this.pontos = 0;
    }
}

let pokemons = [
    new Pokemon("Bulbasaur", "Terra", "Bulbasaur é calmo e adora a natureza.", "img/bulbasaurPNG.png"),
    new Pokemon("Charmander", "Fogo", "Charmander é energético e corajoso.", "img/CharmanderPNG.png"),
    new Pokemon("Squirtle", "Água", "Squirtle é determinado e estratégico.", "img/SquirtlePNG.png")
];

const pontuacoes = {
    floresta: [3, 1, 2],
    montanhas: [1, 3, 2],
    praia: [2, 1, 3],
    Verde: [3, 1, 2],
    Vermelho: [1, 3, 2],
    Azul: [2, 1, 3],
    Salada: [3, 1, 2],
    Churrasco: [1, 3, 2],
    "Frutos do mar": [2, 1, 3],
    Paciente: [3, 1, 2],
    Corajoso: [1, 3, 2],
    Determinado: [2, 1, 3],
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
    Energetico: [1, 3, 2],
    Cauteloso: [2, 1, 3],
    Tranquilo: [3, 1, 2],
    Desejo: [2, 1, 3],
    Confiante: [3, 1, 2]
};

if (window.location.pathname.includes('questionario.html')) {
    document.querySelector('.botaoEnviar').addEventListener('click', function (e) {
        let respostas = document.querySelectorAll('input[type=radio]:checked');
        let totalPerguntas = document.querySelectorAll('.container-questoes div').length;

        if (respostas.length < totalPerguntas) {
            e.preventDefault(); 
            alert('Por favor, responda todas as perguntas antes de enviar!');
            return;
        }

        respostas.forEach(resposta => {
            let valores = pontuacoes[resposta.value];
            if (valores) {
                pokemons.forEach((pokemon, index) => {
                    pokemon.pontos += valores[index];
                });
            }
        });

        let vencedor = pokemons.reduce((prev, curr) => prev.pontos > curr.pontos ? prev : curr);

        localStorage.setItem('resultadoPokemon', JSON.stringify(vencedor));
    });
}

if (window.location.pathname.includes('resultado.html')) {
    const resultado = JSON.parse(localStorage.getItem('resultadoPokemon'));

    if (resultado) {
        document.body.innerHTML = `
            <div class="container">
                <h1>Você seria o ${resultado.nome}!</h1>
                <img src="${resultado.imagem}" alt="${resultado.nome}" style="width:200px;">
                <p>${resultado.descricao}</p>
                <a href="index.html"><button class="btnComecarQuestionario">Refazer</button></a>
            </div>
        `;
    } else {
        document.body.innerHTML = `
            <div class="container">
                <h1>Ops, nenhum resultado encontrado!</h1>
                <a href="index.html"><button class="btnComecarQuestionario">Voltar</button></a>
            </div>
        `;
    }
}
