class GerenciaEstacionamento{
    constructor() {
        if(Estacionamento.instancia){
            return Estacionamento.instancia;
        }
        this.carros = [];
        this.limiteVagas = 10;
        Estacionamento.instancia = this;
    }

    static getInstance(){
        if(!Estacionamento.instancia){
            Estacionamento.instancia = new Estacionamento();
        }

        return Estacionamento.instancia;
  }

addCarro(placa, modelo) {
    if (this.carros.length >= this.limiteVagas) {
        console.log("estacionamento cheio");
        return;
    }

    for(let i = 0; i < this.carros.length; i++){
        if(this.carro[i].placa === placa){
            return console.log("Carro já está estacionado!");
        }
    }

    const Carro = {
        placa: placa,
        modelo: modelo
    };
    
    this.carros.push(Carro)
}

removerCarro(placa){
    for(let i = 0; i < this.carros.length; i++){
       if(this.carros[i].placa === placa){
            this.carros.splice(i, 1);
            console.log(`Carro com placa: ${this.carros[i].placa} saiu do estacionamento!!`);
       }
    }
    console.log("Carro não encontrado!");
    }
}




function entrarVeiculo(){
    const placa = document.getElementById("placa");
    const modelo = document.getElementById("modelo");

    const estacionamento = GerenciaEstacionamento.getInstance();

    estacionamento.addCarro(placa, modelo);

    console.log("Carro que entrou ---------");
    console.log(`Placa: ${placa} - Modelo: ${modelo}`);

}