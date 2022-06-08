const btnCadastrarCarona = document.getElementById("btnCadastrarCarona");
const btnCancel = document.getElementById("btnCancelCarona");

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

btnCancel.addEventListener("click", () => {
  // [START auth_signin_password_modular]
  location.href = "caronas.html";
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
    const dataC = snapshot.val();
    for (key in dataC) {
      console.log(dataC[key]);
      exibirDados(dataC[key]);
    }
    
  });

}

function exibirDados(dadosCarona) {
  let caronasView = document.getElementById("card-container").innerHTML;
  caronasView = caronasView + '<div class="card">'+
  '<div class="card-content">'+
  '<div class="card-header">'+
  '<p><span>José Filho</span> - <span>Professor</span></p>'+
  '</div>'+
  '<div class="card-info">'+
  '<p>Origen:</p>'+
  '<p>Bairro: <span>'+dadosCarona.bairro_origem+'</span></p>'+
  '<p>Rua: <span>'+dadosCarona.rua_origem+'</span> n°: <span>'+dadosCarona.numero_origem+'</span></p>'+
  '<p><span>'+dadosCarona.data_origem+'</span> - <span>07:00 AM</span></p>'+
  '</div>'+
  '<div class="card-info">'+
  '<p>Destino:</p>'+
  '<p>Bairro: <span>'+dadosCarona.bairro_destino+'</span></p>'+
  '<p>Rua: <span>'+dadosCarona.rua_destino+'</span> n°: <span>'+dadosCarona.numero_destino+'</span></p>'+
  '</div>'+
  '<div class="card-info">'+
  '<p>Veículo: <span>'+dadosCarona.veiculo+'</span></p>'+
  '</div>'+
  '</div>'+
  '</div>';

  document.getElementById("card-container").innerHTML = caronasView;
}
