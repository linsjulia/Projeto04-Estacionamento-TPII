
// GERENCIAMENTO DE ESTACIONAMENTO
// Padrão GoF Criacional - Singleton


class GerenciaEstacionamento {

    // Construtor da classe
    constructor() {

        // Se já existe uma instância, retorna ela
        if (GerenciaEstacionamento.instancia) {
            return GerenciaEstacionamento.instancia;
        }

        // Dados do estacionamento
        this.carros = [];
        this.limiteVagas = 10;

        // Armazena a única instância da classe
        GerenciaEstacionamento.instancia = this;
    }


    // Retorna a única instância do estacionamento
    static getInstance() {

        if (!GerenciaEstacionamento.instancia) {
            GerenciaEstacionamento.instancia =
                new GerenciaEstacionamento();
        }

        return GerenciaEstacionamento.instancia;
    }


    
    // ADICIONAR CARRO
     

    addCarro(placa, modelo) {

        // Verifica se o estacionamento está cheio
        if (this.carros.length >= this.limiteVagas) {
            console.log(
                "ESTACIONAMENTO LOTADO ----------------"
            );

            return "Estacionamento Lotado!";
        }


        // Verifica se o veículo já está estacionado
        for (let i = 0; i < this.carros.length; i++) {

            if (this.carros[i].placa === placa) {
                console.log(
                    "VEÍCULO JÁ ESTACIONADO ----------------"
                );

                return "Carro já está estacionado!";
            }
        }


        // Cria o objeto que representa o carro
        const carro = {
            placa: placa,
            modelo: modelo
        };


        // Adiciona o carro ao estacionamento
        this.carros.push(carro);

        console.log(
            "VEÍCULO ADICIONADO ----------------"
        );

        console.log(
            `${carro.placa} - ${carro.modelo}`
        );

        return "Veículo entrou no estacionamento!";
    }
    
    // REMOVER CARRO
    

    removerCarro(placa) {

        // Procura o veículo pela placa
        for (let i = 0; i < this.carros.length; i++) {

            if (this.carros[i].placa === placa) {

                // Guarda o carro antes de removê-lo
                const carroRemovido = this.carros[i];

                // Remove o carro do array
                this.carros.splice(i, 1);

                console.log(
                    "VEÍCULO REMOVIDO ----------------"
                );

                console.log(
                    `${carroRemovido.placa} - ${carroRemovido.modelo}`
                );

                return "Veículo saiu do estacionamento!";
            }
        }


        // Caso a placa não seja encontrada
        console.log(
            "VEÍCULO NÃO ENCONTRADO ----------------"
        );

        return "Veículo não encontrado!";
    }
}



// SINGLETON


// As duas variáveis recebem a mesma instância
const estacionamento1 = GerenciaEstacionamento.getInstance();
const estacionamento2 = GerenciaEstacionamento.getInstance();

// Verifica se realmente é a mesma instância
console.log(estacionamento1 === estacionamento2);


// Instância utilizada pela interface
const estacionamento = estacionamento1;



// ATUALIZAR INTERFACE


function atualizarInterface() {

    const total = estacionamento.limiteVagas;
    const ocupadas = estacionamento.carros.length;
    const disponiveis = total - ocupadas;


    // Atualiza os números de vagas
    document.getElementById("totalVagas").textContent = total;
    document.getElementById("vagasOcupadas").textContent = ocupadas;
    document.getElementById("vagasDisponiveis").textContent = disponiveis;


    // Obtém a lista de veículos
    const lista = document.getElementById("listaVeiculos");

    // Limpa a lista antes de recriá-la
    lista.innerHTML = "";


    // Caso não existam veículos
    if (estacionamento.carros.length === 0) {

        const item = document.createElement("li");

        item.textContent = "Nenhum veículo estacionado.";

        lista.appendChild(item);

        return;
    }


    // Adiciona cada veículo à lista
    estacionamento.carros.forEach((carro) => {

        const item = document.createElement("li");

        item.textContent =
            `${carro.placa} - ${carro.modelo}`;

        lista.appendChild(item);
    });
}



// ENTRADA DE VEÍCULO


function entrarVeiculo() {

    const placa = document.getElementById("placa");
    const modelo = document.getElementById("modelo");


    // Obtém os valores digitados pelo usuário
    const valorPlaca = placa.value.trim();
    const valorModelo = modelo.value.trim();


    // Verifica se os campos foram preenchidos
    if (valorPlaca === "" || valorModelo === "") {

        document.getElementById("mensagem").textContent =
            "Preencha a placa e o modelo!";

        return;
    }


    // Tenta adicionar o veículo ao estacionamento
    const resultado = estacionamento.addCarro(
        valorPlaca,
        valorModelo
    );


    // Exibe o resultado da operação
    document.getElementById("mensagem").textContent =
        resultado;


    // Atualiza as vagas e a lista de veículos
    atualizarInterface();


    // Limpa os campos somente se o veículo foi adicionado
    if (resultado === "Veículo entrou no estacionamento!") {

        placa.value = "";
        modelo.value = "";
    }
}



// SAÍDA DE VEÍCULO
 

function sairVeiculo() {

    const placa = document.getElementById("placa");

    // Obtém a placa digitada
    const valorPlaca = placa.value.trim();


    // Verifica se a placa foi informada
    if (valorPlaca === "") {

        document.getElementById("mensagem").textContent =
            "Informe a placa do veículo!";

        return;
    }


    // Tenta remover o veículo
    const resultado =
        estacionamento.removerCarro(valorPlaca);


    // Exibe o resultado da operação
    document.getElementById("mensagem").textContent =
        resultado;


    // Atualiza a interface
    atualizarInterface();


    // Limpa os campos se o veículo foi removido
    if (resultado === "Veículo saiu do estacionamento!") {

        document.getElementById("placa").value = "";
        document.getElementById("modelo").value = "";
    }
}


// LIMPAR CAMPOS


function limparCampos() {

    document.getElementById("placa").value = "";
    document.getElementById("modelo").value = "";

    document.getElementById("mensagem").textContent = "";
}