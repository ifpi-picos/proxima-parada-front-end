const conteudoCaronas = document.querySelector('.conteudo-caronas')
const loadingCaronas = document.querySelector('.loading-caronas')

let dados;
let uid;
let currentUser;

auth.onAuthStateChanged((user) => {
  uid = user.uid;
  recuperarCaronas("Caronas/");
});

function recuperarCaronas(endereco) {
  let caronas = database_ref.child(endereco);
  caronas.on("value", (snapshot) => {
    const dataC = snapshot.val();
    for (key1 in dataC) {
      for (key2 in dataC[key1]) {
       /*  if(dataC[key1][key2].disponivel =='true'){
          exibirDados(dataC[key1][key2]);
        } */
        exibirDados(dataC[key1][key2]);
      }
    }
    loadingUser.classList.add("off");
    conteudoCaronas.classList.remove("off");
  });
}

function exibirDados(dadosCarona) {
  let caronasView = document.getElementById("card-container").innerHTML;
  caronasView =
    caronasView + 
    `<div class="card">
      <div class="card-content">
          <div class="card-header">
              <p><span>${dadosCarona.nome_usuario}</span> - <span>${dadosCarona.ocupacao_usuario}</span></p>
          </div>
          <div class="card-info">
              <h3>Origen</h3>
              <p>Bairro: <span>${dadosCarona.bairro_origem}</span></p>
              <p>Rua: <span>${dadosCarona.rua_origem}</span> n°: <span>${dadosCarona.numero_origem}</span></p>
              <p><span>${dadosCarona.data_origem}</span> - <span>${dadosCarona.hora_origem}</span></p>
          </div>
          <div class="card-info">
              <h3>Destino</h3>
              <p>Bairro: <span>${dadosCarona.bairro_destino}</span></p>
              <p>Rua: <span>${dadosCarona.rua_destino}</span> n°: <span>${dadosCarona.numero_destino}</span></p>
          </div>
          <div class="card-info">
              <p>Veículo: <span>${dadosCarona.veiculo}</span></p>
          </div>
          <button class="button">Conversar com o proprietário</button>
      </div>
    </div>`;

  document.getElementById("card-container").innerHTML = caronasView;
}
