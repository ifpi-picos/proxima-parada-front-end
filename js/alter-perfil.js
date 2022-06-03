const btnUpdateUser = document.getElementById("btnUpdateUser");
/* const btnUpdateEmPass = document.getElementById("btnUpdateEmPass"); */
const btnCancel = document.getElementById("btnCancel");

const formUser = document.getElementById("form-user");
const loading = document.getElementById("loading");
const progressBar = document.getElementById("loading-perfil");

let imgName, imgUrl, uid;
let files = [];
let reader = new FileReader();
let dadosUsuario;
let change_image = false;

const image = document.getElementById("image_perfil");
const nome = document.getElementById("nome_user");
const ocupacao = document.getElementById("ocupacao_user");
const telefone = document.getElementById("telefone_user");
/* const email = document.getElementById("email_user");
const senhaAtual = document.getElementById("senha_atual");
const senhaNova = document.getElementById("nova_senha");
const senhaNovaConfir = document.getElementById("confir_nova_senha"); */

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

btnCancel.addEventListener("click", () => {
  // [START auth_signin_password_modular]
  location.href = "home.html";
});

btnUpdateUser.addEventListener("click", () => {
  progressBar.classList.remove("off");
  if (change_image) {
    uploadImage(nome.value, ocupacao.value, telefone.value);
  } else {
    console.log(imgUrl);
    writeUserData(
      nome.value,
      ocupacao.value,
      telefone.value,
      imgUrl
    );
  }
});

/* 
 btnUpdateEmPass.addEventListener("click", () => {
  progressBar.classList.remove("off");
  if (senhaNova.value != "" && senhaNovaConfir.value != "") {
    console.log(senhaNova.value);
    alterandoSenha(senhaNova.value);
  } else {
    console.log(email.value);
    alteracaoEmail(email.value);
  }
});

function alteracaoEmail(email) {
   auth.sendPasswordResetEmail(email).then(() => {
    console.log('email sent!');
    writeUserData(nome.value, ocupacao.value, telefone.value, email, imgUrl);
  }).catch(function(error) {
    // An error happened.
    progressBar.classList.add("off");
      if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
      } else if (error.code === "auth/auth/email-already-in-use") {
        alert("Esse email ja é utilizado por outro usuário.");
      } else {
        alert(error.message);
      }
  }); 

  user
    .updateEmail(email)
    .then(() => {
      writeUserData(nome.value, ocupacao.value, telefone.value, email, imgUrl);
    })
    .catch((error) => {
      progressBar.classList.add("off");
      if (error.code === "auth/invalid-email") {
        alert("Formato de email inválido.");
      } else if (error.code === "auth/auth/email-already-in-use") {
        alert("Esse email ja é utilizado por outro usuário.");
      } else {
        alert(error.message);
      }
    });
}

function alterandoSenha(senha) {
  user
    .updatePassword(senha)
    .then(() => {
      progressBar.classList.add("off");
      alert("Senha alterada com sucesso.");
      location.href = "home.html";
    })
    .catch((error) => {
      progressBar.classList.add("off");
      if (error.code === "auth/weak-password") {
        alert("Senha muito fraca.");
        email.setValue(null);
      } else {
        alert(error.message);
      }
    });
}
  */
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
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

function exibirDados(snapshot) {
  nome.value = snapshot.nome;
  ocupacao.value = snapshot.ocupacao;
  telefone.value = snapshot.telefone;
  image.src = snapshot.local_imagen;

  loading.classList.add("off");
  formUser.classList.remove("off");
}

function uploadImage(nome, ocupacao, telefone) {
  /* const timeElapsed = Date.now();
  imgName = new Date(timeElapsed).toISOString(); */

  imgName = uid;

  let storageRef = firebaseApp.storage().ref("Imagens/" + imgName + ".jpg");

  let uploadTask = storageRef
    .put(files[0])
    .then((snapshot) => {
      storageRef.getDownloadURL().then(function (url) {
        imgUrl = url;
        console.log(url);
        writeUserData(nome, ocupacao, telefone, imgUrl);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

function writeUserData(nome, ocupacao, telefone, imageUrl) {
  dadosUsuario = {
    nome: nome,
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
        progressBar.classList.add("off");
        alert("Erro ao salvar dados de usúario");
      } else {
        // Data saved successfully!
        progressBar.classList.add("off");
        alert("Dados Alterados com sucesso.");
        location.href = "home.html";
      }
    });
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
  