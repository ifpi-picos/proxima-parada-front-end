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
  console.log(user);
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
  if (i_regularidade == true) {
    console.log("entrou no regularidade");
    for (const d of checkDias) {
      if (d.checked) {
        i_dias.push(r.value);
      }
    }
  }

  dados = {
    uid_usuario: uid,
    bairro_origem: bairroOrigem.value,
    rua_origem: ruaOrigem.value,
    numero_origem: numeroOrigem.value,
    data_origem: dataOrigem.value,
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

function salvarDados(dados) {
  console.log(dados);

  database_ref.child("Caronas/" + uid).set(dados, (error) => {
    if (error) {
      // The write failed...
      alert("Erro ao salvar dados de usúario");
    } else {
      alert("Sucesso ao salvar dados de usúario");
      // Data saved successfully!
    }
  });
}
