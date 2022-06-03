const btnSair = document.getElementById("btnSair");

/*

const conteudo = document.getElementById("conteudo");
const loading = document.getElementById("loading");

*/

btnSair.addEventListener("click", () => {
  auth
    .signOut()
    .then(() => {
      location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
});
