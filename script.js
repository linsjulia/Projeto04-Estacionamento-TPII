
// GERENCIAMENTO DE ESTACIONAMENTO
// Padrão GoF Criacional - Singleton


class GerenciaEstacionamento {
    constructor() {
        if (GerenciaEstacionamento.instancia) {
            return GerenciaEstacionamento.instancia;
        }

        this.carros = [];
        this.limiteVagas = 10;
        GerenciaEstacionamento.instancia = this;
    }


    static getInstance() {
        if (!GerenciaEstacionamento.instancia) {
            GerenciaEstacionamento.instancia =
                new GerenciaEstacionamento();
        }
        return GerenciaEstacionamento.instancia;
    }


    addCarro(placa, modelo) {
        // Verifica se o estacionamento está cheio
        if (this.carros.length >= this.limiteVagas) {
            console.log(
                "ESTACIONAMENTO LOTADO ----------------"
            );
            return "Estacionamento Lotado!";
        }

        for (let i = 0; i < this.carros.length; i++) {
            if (this.carros[i].placa === placa) {
                console.log(
                    "VEÍCULO JÁ ESTACIONADO ----------------"
                );
                return "Carro já está estacionado!";
            }
        }

        const carro = {
            placa: placa,
            modelo: modelo
        };

        this.carros.push(carro);
        console.log(
            "VEÍCULO ADICIONADO ----------------"
        );

        console.log(
            `${carro.placa} - ${carro.modelo}`
        );
        return "Veículo entrou no estacionamento!";
    }


    // REMOVE CARRO
    removerCarro(placa) {
        for (let i = 0; i < this.carros.length; i++) {
            if (this.carros[i].placa === placa) {
                const carroRemovido = this.carros[i];
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


        console.log(
            "VEÍCULO NÃO ENCONTRADO ----------------"
        );

        return "Veículo não encontrado!";
    }
}


const estacionamento1 = GerenciaEstacionamento.getInstance();
const estacionamento2 = GerenciaEstacionamento.getInstance();

console.log(estacionamento1 === estacionamento2);

const estacionamento = estacionamento1;

function atualizarInterface() {
    const total = estacionamento.limiteVagas;
    const ocupadas = estacionamento.carros.length;
    const disponiveis = total - ocupadas;

    document.getElementById("totalVagas").textContent = total;
    document.getElementById("vagasOcupadas").textContent = ocupadas;
    document.getElementById("vagasDisponiveis").textContent = disponiveis;

    const lista = document.getElementById("listaVeiculos");

    lista.innerHTML = "";

    if (estacionamento.carros.length === 0) {
        const item = document.createElement("li");

        item.textContent =
            "Nenhum veículo estacionado.";

        lista.appendChild(item);
        return;
    }


    estacionamento.carros.forEach((carro) => {

        const item = document.createElement("li");

        item.textContent =
            `${carro.placa} - ${carro.modelo}`;

        lista.appendChild(item);
    });
}


function entrarVeiculo() {
    const placa = document.getElementById("placa");
    const modelo = document.getElementById("modelo");
    
    const valorPlaca = placa.value.trim();
    const valorModelo = modelo.value.trim();

    if (valorPlaca === "" || valorModelo === "") {
        document.getElementById("mensagem").textContent =
            "Preencha a placa e o modelo!";

        return;
    }

    const resultado =
        estacionamento.addCarro(
            valorPlaca,
            valorModelo
        );

    document.getElementById("mensagem").textContent =
        resultado;

    atualizarInterface();

    if (resultado === "Veículo entrou no estacionamento!") {

        placa.value = "";
        modelo.value = "";
    }
}

function sairVeiculo() {
    const placa = document.getElementById("placa");

    const valorPlaca = placa.value.trim();

    if (valorPlaca === "") {
        document.getElementById("mensagem").textContent =
            "Informe a placa do veículo!";

        return;
    }

    const resultado = estacionamento.removerCarro(valorPlaca);

    document.getElementById("mensagem").textContent = resultado;

    atualizarInterface();

    if (resultado === "Veículo saiu do estacionamento!") {
        document.getElementById("placa").value = "";
        document.getElementById("modelo").value = "";
    }
}

function limparCampos() {
    document.getElementById("placa").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("mensagem").textContent = "";
}



