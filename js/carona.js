const btnCadastrarCarona = document.getElementById("btnCadastrarCarona");

const veiculos = document.querySelectorAll('input[name="veiculo"]');
const regularidades = document.querySelectorAll('input[name="regularidade"]');
const checkDias = document.querySelectorAll('input[name="dia"]');

let dados;
let uid;
let bairroOrigem = document.getElementById("bairro-origem");
let ruaOrigem = document.getElementById("rua-origem");
let numeroOrigem = document.getElementById("num-origem");
let dataOrigem = document.getElementById("data-origem");
let horaOrigem = document.getElementById("hora-origem");
let bairroDestino = document.getElementById("bairro-destino");
let ruaDestino = document.getElementById("rua-destino");
let numeroDestino = document.getElementById("num-destino");

let i_regularidade, i_veiculo;
let i_dias = [];
auth.onAuthStateChanged((user) => {
  uid = user.uid;
  console.log(uid);
  recuperarCaronas("Caronas/" + uid);
});

btnCadastrarCarona.addEventListener("click", () => {
  for (const v of veiculos) {
    if (v.checked) {
      i_veiculo = v.value;
      break;
    }
  }

  for (const r of regularidades) {
    if (r.checked) {
      i_regularidade = r.value;
      break;
    }
  }
  if (i_regularidade == "true") {
    checkDias.forEach((dia) => {
      if (dia.checked) {
        i_dias.push(dia.value);
      }
    });
  }

  dados = {
    uid_usuario: uid,
    bairro_origem: bairroOrigem.value,
    rua_origem: ruaOrigem.value,
    numero_origem: numeroOrigem.value,
    data_origem: dataAtualFormatada(dataOrigem.value),
    hora_origem: horaOrigem.value,
    bairro_destino: bairroDestino.value,
    rua_destino: ruaDestino.value,
    numero_destino: numeroDestino.value,
    veiculo: i_veiculo,
    regularidade: i_regularidade,
    dias: i_dias,
  };

  salvarDados(dados);
});

function dataAtualFormatada(dataO) {
  let data = new Date(dataO);
  dataFormatada = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  return dataFormatada;
}

function salvarDados(dados) {
  const timeElapsed = Date.now();
  const dataCompleta = new Date(timeElapsed);
  let data = Date.parse(dataCompleta);

  database_ref.child("Caronas/" + uid + "/" + data).set(dados, (error) => {
    if (error) {
      alert("Erro ao salvar dados de usúario");
    } else {
      alert("Sucesso ao salvar dados de usúario");
      location.href = "caronas.html";
    }
  });
}

function recuperarCaronas(endereco) {
  let caronas = database_ref.child(endereco);
  caronas.on("value", (snapshot) => {
    const data = snapshot.val();
    for (key in data) {
      console.log(data[key]);
      exibirDados(data[key]);
    }
    
  });

}

function exibirDados(dados) {
  const caronasView = document.getElementById("card-container");
  caronasView = document.createElement('');
}
