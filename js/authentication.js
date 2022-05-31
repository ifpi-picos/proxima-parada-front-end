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

const fields = document.querySelectorAll("[required]");

auth.onAuthStateChanged((user) => {
  // Check for user status
  console.log(user);
});

btnLogin.addEventListener("click", () => {
  const emailLogin = document.getElementById("email_login");
  const senhaLogin = document.getElementById("senha_login");

  // [START auth_signin_password_modular]
  if (emailLogin.value != "") {
    if (senhaLogin.value != "") {
      loginUser(email.value, senha.value);
      //console.log("Sucesso");
    } else {
      alert("Preencha o campo senha.");
    }
  } else {
    alert("Preencha o campo email.");
  }
});

function loginUser(email, senha) {
  auth
    .signInWithEmailAndPassword(email, senha)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      //console.log("sucesso");
      location.href = "home.html";
    })
    .catch((error) => {
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

  // [END auth_signin_password_modular]
}

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
      location.href = "home.html";
    
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
    endereco_imagen: "",
  };

  // Push to Firebase Database
  database_ref.child("usuario/" + user.uid).set(dadosUsuario, (error) => {
    if (error) {
      // The write failed...
      alert("Erro ao salvar dados de usúario, tente fazer login.");
    } else {
      // Data saved successfully!
      alert("Usuário criado com sucesso.");
      location.href = "home.html";
    }
  });
}

function validandoCampos(nome, ocupacao, telefone, email, senha, confirSenha) {
  if (senha != "" && senha > 5) {
    if (senha == confirSenha) {
      createUser(nome, ocupacao, telefone, email, senha);
      //console.log("Sucesso");
    } else {
      alert("Senhas diferentes.");
    }
  } else {
    console.log(senha);
    alert("Senhas muito curta.");
  }
}

function ValidateField(field) {
  // logica para verificar se existem erros
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      // se não for customError
      // então verifica se tem erro
      if (field.validity[error] && !field.validity.valid) {
        foundError = error;
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "Por favor, preencha este campo",
      },
      phone: {
        valueMissing: "Por favor, preencha este campo",
        typeMismatch: "Por favor, preencha um número válido",
      },
      email: {
        valueMissing: "Por favor, preencha este campo",
        typeMismatch: "Por favor, preencha um email válido",
      },
      password: {
        valueMissing: "Por favor, preencha este campo",
      },
    };

    return messages[field.type][typeError];
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error");

    if (message) {
      spanError.classList.add("active");
      spanError.innerHTML = message;
    } else {
      spanError.classList.remove("active");
      spanError.innerHTML = "";
    }
  }

  return function () {
    const error = verifyErrors();

    if (error) {
      const message = customMessage(error);

      field.style.borderColor = "red";
      setCustomMessage(message);
    } else {
      field.style.borderColor = "green";
      setCustomMessage();
    }
  };
}

function customValidation(event) {
  const field = event.target;
  const validation = ValidateField(field);

  validation();
}

for (field of fields) {
  field.addEventListener("invalid", (event) => {
    // eliminar telefone bubble
    event.preventDefault();

    customValidation(event);
  });
  field.addEventListener("blur", customValidation);
}

function verificaSenha(senha1, senha2) {
  if (senha1 == senha2) {
    return true;
  } else {
    return true;
  }
}

function validaSenha(senha) {
  if (senha != null && senha > 5) {
    return false;
  } else {
    return true;
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
