let regBtn = document.querySelector('#register-toggle-btn');
let loginBtn = document.querySelector('#login-toggle-btn');
let regForm = document.querySelector('#registerForm');
let loginForm = document.querySelector('#loginForm');

loginBtn.addEventListener('click', function handleClick(){
    // loginForm.classList.remove('displayNone');
    // regForm.classList.add('displayNone');
    // loginForm.style.display="block";
    // regForm.style.display="none";
    loginForm.style.opacity=1;
    regForm.style.opacity=0;
    
    loginForm.style.zIndex=1;
    regForm.style.zIndex=-1;
    loginForm.style.width="100%";
    regForm.style.width=0;
    regBtn.style.backgroundColor="#d3d3d3";
    loginBtn.style.backgroundColor="white";
})

regBtn.addEventListener('click', function hc(){
    regForm.style.opacity=1;
    loginForm.style.opacity=0;
    
    regForm.style.zIndex=1;
    loginForm.style.zIndex=-1;
    regForm.style.width="100%";
    loginForm.style.width=0;
    loginBtn.style.backgroundColor="#d3d3d3";
    regBtn.style.backgroundColor="white";
})