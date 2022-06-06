const btnCadastrarCarona = document.getElementById("btnCadastrarCarona");
let dados;
let uid ;
auth.onAuthStateChanged((user) => {
    uid = user.uid
    console.log(user);
  });

btnCadastrarCarona.addEventListener("click", () => {
  let bairroOrigem = document.getElementById("bairro-origem");
  let ruaOrigem = document.getElementById("rua-origem");
  let numeroOrigem = document.getElementById("num-origem");
  let dataOrigem = document.getElementById("data-origem");
  let horaOrigem = document.getElementById("hora-origem");
  let bairroDestino = document.getElementById("bairro-destino");
  let ruaDestino = document.getElementById("rua-destino");
  let numeroDestino = document.getElementById("num-destino");

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
