let nomeAtualParaEditar;
let idadeAtualParaEditar;

function converteParaFahrenheit(){
    const temperaturaCelsius = parseFloat(document.getElementById("temperatura-celsius").value);
    const temperaturaFahrenheit = temperaturaCelsius * 1.8 + 32;

    document.getElementById("resultado-fahrenheit").value = temperaturaFahrenheit.toFixed(2) +"° F";

}

function mostrarCartaoAltera(nome, idade) {
    document.getElementById("nome-alteracao").value = nome;
    nomeAtualParaEditar = nome;

    document.getElementById("idade-alteracao").value = idade;
    idadeAtualParaEditar = parseInt(idade);
}