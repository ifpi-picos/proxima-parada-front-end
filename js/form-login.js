console.clear();

const signup = document.getElementById('signup');
const login = document.getElementById('login');

signup.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element === "slide-up") {
			login.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

login.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element === "slide-up") {
			signup.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

/* function loginBtn(){
	location.href = "home.html";
}
function signupBtn(){
	console.log('Botão signup presionado');
} */

/*
 signup.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			login.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

login.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signup.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
}); */