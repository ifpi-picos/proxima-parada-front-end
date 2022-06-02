const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBD5ZcQvTucYhZfXIF90h2IKNXTb1eF3yA",
  authDomain: "proxima-parada-001.firebaseapp.com",
  databaseURL: "https://proxima-parada-001-default-rtdb.firebaseio.com",
  projectId: "proxima-parada-001",
  storageBucket: "proxima-parada-001.appspot.com",
  messagingSenderId: "933133262129",
  appId: "1:933133262129:web:908e83750d11c2ccdbe410",
});

const auth = firebaseApp.auth();
const user = firebaseApp.auth().currentUser;
const database = firebaseApp.database();

const btnSair = document.getElementById("btnSair");

const image = document.getElementById("img-home");

const conteudo = document.getElementById("conteudo");
const loading = document.getElementById("loading");

let imgUrl, uid;

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    console.log(uid);
    carregarDadosUsuario(user.uid);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function carregarDadosUsuario(uid) {
  database
    .ref()
    .child("usuario/" + uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        imgUrl = snapshot.val().local_imagen;
        exibirDados(imgUrl);
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function exibirDados(imgUrl) {
  image.src = imgUrl;

  loading.classList.add("off");
  conteudo.classList.remove("off");
}

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
