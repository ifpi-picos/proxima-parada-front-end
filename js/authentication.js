import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const btnLogin = document.querySelector("#btnLogin");
const btnSignup = document.getElementById("btnSignup");

const email = document.getElementById("email_login");
const password = document.getElementById("senha_login");

btnLogin.addEventListener("click", () => {
  console.log("botão login presionado");

  // [START auth_signin_password_modular]
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  // [END auth_signin_password_modular]
});
btnSignup.addEventListener("click", () => {
  console.log("botão cadastrar presionado");
});