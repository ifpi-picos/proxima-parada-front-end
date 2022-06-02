const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBD5ZcQvTucYhZfXIF90h2IKNXTb1eF3yA",
  authDomain: "proxima-parada-001.firebaseapp.com",
  databaseURL: "https://proxima-parada-001-default-rtdb.firebaseio.com",
  projectId: "proxima-parada-001",
  storageBucket: "proxima-parada-001.appspot.com",
  messagingSenderId: "933133262129",
  appId: "1:933133262129:web:908e83750d11c2ccdbe410",
});

const dbStorage = firebaseApp.firestore();
const auth = firebaseApp.auth();
const database = firebaseApp.firebase.database();

const btnLogin = document.getElementById("btnLogin");
const btnSignup = document.getElementById("btnSignup");
const progressBar = document.getElementById("loading-login");

auth.onAuthStateChanged((user) => {
  // Check for user status
  console.log(user);
});
const usuarioLogado = auth.currentUser;

console.log(usuarioLogado);

btnLogin.addEventListener("click", () => {
  const emailLogin = document.getElementById("email_login");
  const senhaLogin = document.getElementById("senha_login");

  // [START auth_signin_password_modular]
  if (emailLogin.value != "") {
    if (senhaLogin.value != "") {
      loginUser(emailLogin.value, senhaLogin.value);
      //console.log("Sucesso");
      progressBar.classList.remove("off");
    } else {
      alert("Preencha o campo senha.");
    }
  } else {
    alert("Preencha o campo email.");
  }
});

btnSignup.addEventListener("click", () => {
  const nome = document.getElementById("nome");
  const ocupacao = document.getElementById("ocupacao");
  const telefone = document.getElementById("telefone");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const confirSenha = document.getElementById("confir_senha");

  validandoCampos(
    nome.value,
    ocupacao.value,
    telefone.value,
    email.value,
    senha.value,
    confirSenha.value
  );
});

function loginUser(email, senha) {
  auth
    .signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //console.log("sucesso");
      location.href = "home.html";
      progressBar.classList.add("off");
    })
    .catch((error) => {
      progressBar.classList.add("off");
      if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
      } else if (error.code === "auth/user-disabled") {
        alert("Esse usuário foi desabilitado.");
      } else if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta. digite novamente.");
        this.loginForm.controls.password.setValue(null);
      } else {
        alert(error.message);
      }
    });

  /*const task = auth.signInWithEmailAndPassword(email, senha);
  task.on(
    "states changed",
    function (snapshot) {
      let progress = (snapshot.bytesTranferred / snapshot.totalBytes) * 100;
      progressBar.style.width = progress + "%";
    },
    function (userCredential) {
      // Signed in
      var user = userCredential.user;
      //console.log("sucesso");
      location.href = "home.html";
      progressBar.classList.add("off");
    },
    function (error) {
      progressBar.classList.add("off");
      if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
      } else if (error.code === "auth/user-disabled") {
        alert("Esse usuário foi desabilitado.");
      } else if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado.");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta. digite novamente.");
        this.loginForm.controls.password.setValue(null);
      } else {
        alert(error.message);
      }
    }
  ); */
  // [END auth_signin_password_modular]
}

function createUser(nome, ocupacao, telefone, email, senha) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      var database_ref = database.ref();

      // Add this user to Firebase Database
      writeUserData(nome, ocupacao, telefone, email, user, database_ref);
      // DOne

      // ...
    })
    .catch((error) => {
      if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
      } else if (error.code === "auth/auth/email-already-in-use") {
        alert("Esse email ja é utilizado por outro usuário.");
      } else if (error.code === "auth/weak-password") {
        alert("Senha muito fraca.");
        email.setValue(null);
      } else {
        alert(error.message);
      }
      // ..
    });
}

function writeUserData(nome, ocupacao, telefone, email, user, database_ref) {
  // Create User data
  var dadosUsuario = {
    nome: nome,
    email: email,
    ocupacao: ocupacao,
    telefone: telefone,
    local_imagen:
      "https://firebasestorage.googleapis.com/v0/b/proxim…=media&token=00adc825-1d94-4453-b923-c6356bf7886c",
  };

  // Push to Firebase Database
  database_ref.child("usuario/" + user.uid).set(dadosUsuario, (error) => {
    if (error) {
      // The write failed...
      alert("Erro ao salvar dados de usúario, tente fazer login.");
      progressBar.classList.add("off");
    } else {
      // Data saved successfully!
      progressBar.classList.add("off");
      location.href = "home.html";
    }
  });
}

function validandoCampos(nome, ocupacao, telefone, email, senha, confirSenha) {
  if (senha != "" && senha > 5) {
    if (senha == confirSenha) {
      progressBar.classList.remove("off");
      createUser(nome, ocupacao, telefone, email, senha);
      //console.log("Sucesso");
    } else {
      alert("Senhas diferentes.");
    }
  } else {
    alert("Senhas muito curta.");
  }
}

  /* Máscaras ER */
  function mascara(telefone, fun) {
    numeroTelefone = telefone;
    valueFun = fun;
    setTimeout("execmascara()", 1);
  }
  
  function execmascara() {
    numeroTelefone.value = valueFun(numeroTelefone.value);
  }
  
  function mascaraTelefone(numTel) {
    numTel = numTel.replace(/\D/g, ""); //Remove tudo telefone que não é dígito
    numTel = numTel.replace(/^(\d{2})(\d)/g, "($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
    numTel = numTel.replace(/(\d)(\d{8})/g, "$1 $2"); //Coloca espaço entre 9 e os outros numeros
    numTel = numTel.replace(/(\d)(\d{4})$/, "$1-$2"); //Coloca hífen entre telefone quarto e telefone quinto dígitos
    return numTel;
  }
  
  function id(elemento) {
    return document.getElementById(elemento);
  }
  
  window.onload = function () {
    id("telefone").onkeyup = function () {
      mascara(this, mascaraTelefone);
    };
  };
  