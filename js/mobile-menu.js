const imageUser = document.querySelector(".img-user");
const loadingUser = document.querySelector(".loading-img");

const btnSair = document.getElementById("btnSair");

const imagePerfil = document.querySelector(".container");

auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    //console.log(uid);
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
        imageUser.src = snapshot.val().local_imagen;
        loadingUser.classList.add("off");
        imageUser.classList.remove("off");
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
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

class MobileNavbar {
  constructor(mobileMenu, menuOptions, navLinks) {
    this.mobileMenu = document.querySelector(mobileMenu);
    this.menuOptions = document.querySelector(menuOptions);
    this.navLinks = document.querySelectorAll(navLinks);
    this.activeClass = "active";

    this.handleClick = this.handleClick.bind(this);
  }

  animateLinks() {
    this.navLinks.forEach((link, index) => {
      link.style.animation
        ? (link.style.animation = "")
        : (link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`);
    });
  }

  handleClick() {
    this.menuOptions.classList.toggle(this.activeClass);
    this.mobileMenu.classList.toggle(this.activeClass);
    this.animateLinks();
  }

  addClickEvent() {
    this.mobileMenu.addEventListener("click", this.handleClick);
    this.navLinks.forEach((link) => {
      link.addEventListener("click", this.handleClick);
    });
  }

  init() {
    if (this.mobileMenu) {
      this.addClickEvent();
    }
    return this;
  }
}

const mobileNavbar = new MobileNavbar(
  ".mobile-menu",
  ".menu-options",
  ".nav-list li"
);
mobileNavbar.init();
