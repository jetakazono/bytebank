import selecionaCotacao from "./imprimeCotacao.js";

const $graficoDolar = document.getElementById('graficoDolar');

const graficoParaDolar = new Chart($graficoDolar, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label: 'Dólar',
        data: [],
        borderWidth: 1
      }]
    },
});

function gerarHorario(){
    let data = new Date();
    let horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

    return horario;
}

function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda)
    grafico.data.datasets.forEach((datasets) => {
        datasets.data.push(dados);
    });
    grafico.update();
}

let workerDolar = new Worker('./script/workers/workerDolar.js');
workerDolar.postMessage('usd');
workerDolar.addEventListener("message", event => {
    let tempo = gerarHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaDolar, tempo, valor);
    selecionaCotacao("dolar", valor);
   
});

const graficoIene = document.getElementById('graficoIene');
const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data:{
        labels:[],
        datasets:[{
            label:'Iene',
            data:[],
            borderWidth:1
        }]
    }
})

let workerIene = new Worker('./script/workers/workerIene.js');
workerIene.postMessage('iene');
workerIene.addEventListener("message", event => {
    let tempo = gerarHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaIene, tempo, valor);
    selecionaCotacao("iene", valor);
});

const graficoLibra = document.getElementById('graficoLibra');
const graficoParaLibra = new Chart(graficoLibra, {
    type:'line',
    data:{
        labels:[],
        datasets:[{
            label:'Libra Esterlina',
            data: [],
            borderWidth: 1
        }]
    }
})

let workerLibra = new Worker('./script/workers/workerLibra.js');
workerLibra.postMessage('libra esterlina');
workerLibra.addEventListener("message", event => {
    let tempo = gerarHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaLibra, tempo, valor);
    selecionaCotacao('libra esterlina', valor)
})