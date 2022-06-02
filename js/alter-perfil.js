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
const database = firebaseApp.database();

const btnUpdate = document.getElementById("btnUpdate");
const btnCancel = document.getElementById("btnCancel");

const fields = document.querySelectorAll("[required]");

const formUser = document.getElementById("form-user");
const loading = document.getElementById("loading");

let imgName, imgUrl, uid;
let files = [];
let reader = new FileReader();
let dadosUsuario;
let change_image = false; 

document.getElementById("mudar_imagem").onclick = function (e) {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = (e) => {
    files = e.target.files;
    reader = new FileReader();
    reader.onload = function () {
      document.getElementById("image_perfil").src = reader.result;
      change_image = true;
    };
    reader.readAsDataURL(files[0]);
  };
  input.click();
};

function uploadImage(nome, ocupacao, telefone, email) {
  const timeElapsed = Date.now();
  imgName = new Date(timeElapsed).toISOString();

  let storageRef = firebaseApp.storage().ref("Imagens/" + imgName + ".jpg");

  let uploadTask = storageRef.put(files[0]).then((snapshot) => {
    storageRef.getDownloadURL().then(function(url) {
      imgUrl = url;
      console.log(url);
      writeUserData(nome, ocupacao, telefone, email, imgUrl);
    });
  }).catch((error)=>{
    console.log(error);
  });
}

auth.onAuthStateChanged((user) => {
  // Check for user status
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    carregarDadosUsuario(user);
    // ...
  } else {
    // User is signed out
    // ...
  }
});

function carregarDadosUsuario(user) {
  uid = user.uid;
  database
    .ref()
    .child("usuario/" + user.uid)
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        dadosUsuario = {
          local_imagen: snapshot.val().local_imagen,
        };
        imgUrl = snapshot.val().local_imagen;
        exibirDados(snapshot.val());
        loading.classList.add("off");
        formUser.classList.remove("off");
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function exibirDados(snapshot) {
  const image = document.getElementById("image_perfil");
  const nome = document.getElementById("nome_user");
  const ocupacao = document.getElementById("ocupacao_user");
  const telefone = document.getElementById("telefone_user");
  const email = document.getElementById("email_user");

  nome.value = snapshot.nome;
  ocupacao.value = snapshot.ocupacao;
  telefone.value = snapshot.telefone;
  email.value = snapshot.email;
  image.src = snapshot.local_imagen;
}

btnCancel.addEventListener("click", () => {
  // [START auth_signin_password_modular]
  location.href = "home.html";
});

btnUpdate.addEventListener("click", () => {
  const nome = document.getElementById("nome_user");
  const ocupacao = document.getElementById("ocupacao_user");
  const telefone = document.getElementById("telefone_user");
  const email = document.getElementById("email_user");
  const senhaAtual = document.getElementById("senha_atual");
  const senhaNova = document.getElementById("nova_senha");
  const senhaNovaConfir = document.getElementById("confir_nova_senha");

  if(change_image){
    uploadImage(nome.value, ocupacao.value, telefone.value, email.value);
  }else{
    console.log(imgUrl)
    writeUserData(nome.value, ocupacao.value, telefone.value, email.value, imgUrl);
  }
  

  /* validandoCampos(
    nome.value,
    ocupacao.value,
    telefone.value,
    email.value,
    senhaAtual.value,
    senhaNova.value,
    senhaNovaConfir.value
  ); */
});

function writeUserData(nome, ocupacao, telefone, email, imageUrl) {
  dadosUsuario = {
    nome: nome,
    email: email,
    ocupacao: ocupacao,
    telefone: telefone,
    local_imagen: imageUrl,
  };

  // Push to Firebase Database
  database
    .ref()
    .child("usuario/" + uid)
    .update(dadosUsuario, (error) => {
      if (error) {
        // The write failed...
        alert("Erro ao salvar dados de usúario");
      } else {
        // Data saved successfully!
        alert("Dados Alterados com sucesso.");
        location.href = "home.html";
      }
    });
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

  return function () {
    const error = verifyErrors();

    if (error) {
      field.style.borderColor = "red";
    } else {
      field.style.borderColor = "green";
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

function validaSenha(senhaAtual) {
  if (senhaAtual != null && senhaAtual > 5) {
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
  id("telefone_user").onkeyup = function () {
    mascara(this, mascaraTelefone);
  };
};
